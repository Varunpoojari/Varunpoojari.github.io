// Refreshes src/data/snapshot.json, the offline fallback for GitHub and Dev.to data.
// Usage: npm run snapshot   (set GITHUB_TOKEN to avoid rate limits)
import { writeFile } from 'node:fs/promises';

const user = 'Varunpoojari';
const devto = 'varun_poojari';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'varunpoojari-portfolio' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const get = async (url, h) => {
  const res = await fetch(url, { headers: h });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

const repos = await get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, headers);
const prs = await get(`https://api.github.com/search/issues?q=author:${user}+type:pr&per_page=100`, headers);
const articles = await get(`https://dev.to/api/articles?username=${devto}&per_page=30`, {});

const key = (i) => `${i.repository_url.replace('https://api.github.com/repos/', '')}#${i.number}`;

const snapshot = {
  takenAt: new Date().toISOString(),
  repos: Object.fromEntries(
    repos.map((r) => [r.name, { name: r.name, stars: r.stargazers_count, forks: r.forks_count, language: r.language, pushedAt: r.pushed_at, topics: r.topics ?? [] }]),
  ),
  prs: Object.fromEntries(
    prs.items.map((i) => [key(i), { key: key(i), state: i.pull_request?.merged_at ? 'merged' : i.state === 'open' ? 'open' : 'closed', updatedAt: i.updated_at }]),
  ),
  articles: articles.map((a) => ({
    title: a.title, url: a.url, publishedAt: a.published_at, readingTime: a.reading_time_minutes,
    tags: a.tag_list ?? [], description: a.description, reactions: a.positive_reactions_count ?? 0,
  })),
};

await writeFile(new URL('../src/data/snapshot.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`snapshot: ${Object.keys(snapshot.repos).length} repos, ${Object.keys(snapshot.prs).length} PRs, ${snapshot.articles.length} articles`);
