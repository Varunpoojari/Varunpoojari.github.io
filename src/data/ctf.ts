/**
 * Capture the flag. Three flags hide in the page source, the browser console
 * and the path robots.txt asks crawlers to skip.
 *
 * The flags themselves are not in this repository. The deploy workflow passes
 * them in from the CTF_FLAGS Actions secret (a JSON array of three strings),
 * and the browser only ever receives SHA-256 hashes of them. A CI build
 * without the secret fails rather than shipping a CTF that cannot be solved;
 * a local build uses placeholder flags.
 */
const meta = [
  { where: 'page source', hint: 'Recon starts before anything runs. Read what the server sent you.' },
  { where: 'browser console', hint: 'Developers leave notes where developers look. Open the tools.' },
  { where: 'robots.txt', hint: 'Asking crawlers to stay out of a path is not the same as locking it.' },
];

function load(): string[] {
  const raw = process.env.CTF_FLAGS;
  if (!raw) {
    if (process.env.CI) throw new Error('CTF_FLAGS secret is not set; refusing to build an unsolvable CTF.');
    return meta.map((_, i) => `flag{local_dev_${i + 1}}`);
  }
  const list = JSON.parse(raw);
  if (!Array.isArray(list) || list.length !== meta.length || !list.every((f) => typeof f === 'string' && /^flag\{[^}]+\}$/.test(f))) {
    throw new Error(`CTF_FLAGS must be a JSON array of ${meta.length} strings shaped flag{...}.`);
  }
  return list;
}

export const flags = load().map((flag, i) => ({ ...meta[i], flag }));
