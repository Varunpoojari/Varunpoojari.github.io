/**
 * Build-time data from GitHub and Dev.to.
 *
 * Every function falls back to src/data/snapshot.json when the network or an
 * API is unavailable, so a build never fails because a third party is down.
 * Refresh the snapshot with `npm run snapshot`.
 */
import snapshot from '../data/snapshot.json';
import { githubUser, devtoUser } from '../data/profile';

export type RepoStats = {
  name: string;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  topics: string[];
};

export type PrState = { key: string; state: 'merged' | 'open' | 'closed'; updatedAt: string };

export type Article = {
  title: string;
  url: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  description: string;
  reactions: number;
};

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'varunpoojari-portfolio',
};
// In GitHub Actions the workflow passes GITHUB_TOKEN, which lifts the rate limit.
const token = typeof process !== 'undefined' ? process.env.GITHUB_TOKEN : undefined;
if (token) headers.Authorization = `Bearer ${token}`;

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getRepos(): Promise<Record<string, RepoStats>> {
  try {
    const data = await getJson<any[]>(
      `https://api.github.com/users/${githubUser}/repos?per_page=100&sort=pushed`,
      { headers },
    );
    return Object.fromEntries(
      data.map((r) => [
        r.name,
        { name: r.name, stars: r.stargazers_count, forks: r.forks_count, language: r.language, pushedAt: r.pushed_at, topics: r.topics ?? [] },
      ]),
    );
  } catch (err) {
    console.warn(`[live] repos: using snapshot (${(err as Error).message})`);
    return snapshot.repos as Record<string, RepoStats>;
  }
}

/** One search call returns the state of every PR Varun has authored. */
export async function getPrStates(): Promise<Record<string, PrState>> {
  try {
    const data = await getJson<any>(
      `https://api.github.com/search/issues?q=author:${githubUser}+type:pr&per_page=100`,
      { headers },
    );
    return Object.fromEntries(data.items.map((i: any) => [prKey(i), toPrState(i)]));
  } catch (err) {
    console.warn(`[live] PRs: using snapshot (${(err as Error).message})`);
    return snapshot.prs as Record<string, PrState>;
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const data = await getJson<any[]>(`https://dev.to/api/articles?username=${devtoUser}&per_page=30`);
    return data.map(toArticle);
  } catch (err) {
    console.warn(`[live] Dev.to: using snapshot (${(err as Error).message})`);
    return snapshot.articles as Article[];
  }
}

export function prKey(item: { repository_url: string; number: number }): string {
  const repo = item.repository_url.replace('https://api.github.com/repos/', '');
  return `${repo}#${item.number}`;
}

export function toPrState(i: any): PrState {
  const state = i.pull_request?.merged_at ? 'merged' : i.state === 'open' ? 'open' : 'closed';
  return { key: prKey(i), state, updatedAt: i.updated_at };
}

export function toArticle(a: any): Article {
  return {
    title: a.title,
    url: a.url,
    publishedAt: a.published_at,
    readingTime: a.reading_time_minutes,
    tags: a.tag_list ?? [],
    description: a.description,
    reactions: a.positive_reactions_count ?? 0,
  };
}
