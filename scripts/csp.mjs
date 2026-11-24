/**
 * Post-build hardening for every page in dist/.
 *
 * GitHub Pages cannot send response headers, so the Content Security Policy
 * goes in a <meta http-equiv> tag instead. Every inline script that runs is
 * allowed by its SHA-256 hash; nothing else inline may execute, and there are
 * no inline event handlers. The tag goes straight after <meta charset> so it
 * covers the early theme script too.
 *
 * Meta CSP cannot carry frame-ancestors, report-uri or sandbox; those need real
 * headers (a CDN in front of Pages), which this site does not have.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const EXECUTABLE = /^(|module|text\/javascript|application\/javascript)$/i;

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const policy = (hashes) =>
  [
    "default-src 'self'",
    `script-src 'self'${hashes.map((h) => ` '${h}'`).join('')}`,
    "style-src 'self'",
    // Per-element custom properties (animation delays, card tilt) live in
    // style attributes; inline <style> blocks are still refused.
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: https://github.com https://avatars.githubusercontent.com",
    "font-src 'self' data:", // small font subsets are inlined by the bundler
    // Live refresh of PR status, repo stats and Dev.to articles.
    "connect-src 'self' https://api.github.com https://dev.to",
    "object-src 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    // DOM XSS: no HTML strings may reach innerHTML-style sinks.
    "require-trusted-types-for 'script'",
    "trusted-types 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

let pages = 0;
for await (const file of htmlFiles(DIST)) {
  let html = await readFile(file, 'utf8');
  if (/http-equiv="Content-Security-Policy"/i.test(html)) continue;
  if (/\son[a-z]+\s*=/i.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) {
    throw new Error(`${file}: inline event handler found; move it into a script`);
  }
  const hashes = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attrs, body] = m;
    if (/\ssrc\s*=/i.test(attrs) || !body) continue;
    const type = (attrs.match(/\stype\s*=\s*"([^"]*)"/i) || [, ''])[1];
    if (!EXECUTABLE.test(type)) continue; // JSON data blocks never execute
    hashes.push(`sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`);
  }
  const tags =
    `<meta http-equiv="Content-Security-Policy" content="${policy([...new Set(hashes)])}">` +
    `<meta name="referrer" content="strict-origin-when-cross-origin">`;
  const charset = html.match(/<meta charset="[^"]*"\s*\/?>/i);
  if (!charset) throw new Error(`${file}: no <meta charset> to anchor the CSP after`);
  html = html.replace(charset[0], charset[0] + tags);
  await writeFile(file, html);
  pages++;
  console.log(`[csp] ${file.replace(DIST, '')}: ${hashes.length} inline script hash(es)`);
}
console.log(`[csp] hardened ${pages} page(s)`);
