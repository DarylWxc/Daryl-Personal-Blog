import type { Post } from "./posts";
import { getSortedPosts } from "./posts";
import { canonicalCategory, categoryKey } from "./categories";

export type Term = { name: string; count: number; posts: Post[] };

/**
 * Categories grouped by canonical (case-insensitive) key.
 * Returns a list sorted by post count, descending.
 */
export async function getCategories(): Promise<Term[]> {
  const posts = await getSortedPosts();
  const map = new Map<string, Term>();
  for (const post of posts) {
    for (const raw of post.data.categories) {
      const key = categoryKey(raw);
      const name = canonicalCategory(raw);
      const entry = map.get(key) ?? { name, count: 0, posts: [] };
      entry.posts.push(post);
      entry.count++;
      map.set(key, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

/** Tags grouped by exact (trimmed) name, sorted by count descending. */
export async function getTags(): Promise<Term[]> {
  const posts = await getSortedPosts();
  const map = new Map<string, Term>();
  for (const post of posts) {
    for (const raw of post.data.tags) {
      const name = raw.trim();
      if (!name) continue;
      const entry = map.get(name) ?? { name, count: 0, posts: [] };
      entry.posts.push(post);
      entry.count++;
      map.set(name, entry);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export type ArchiveGroup = { label: string; key: string; posts: Post[] };

/** Posts grouped by "Month YYYY", newest first. */
export async function getArchives(): Promise<ArchiveGroup[]> {
  const posts = await getSortedPosts();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const map = new Map<string, ArchiveGroup>();
  for (const post of posts) {
    const d = post.data.date;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = `${months[d.getMonth()]} ${d.getFullYear()}`;
    const entry = map.get(key) ?? { label, key, posts: [] };
    entry.posts.push(post);
    map.set(key, entry);
  }
  return [...map.values()].sort((a, b) => b.key.localeCompare(a.key));
}

/** Latest n posts. */
export async function getRecentPosts(n = 5): Promise<Post[]> {
  return (await getSortedPosts()).slice(0, n);
}

/** Find posts related to a given post by shared category or tag. */
export function relatedPosts(post: Post, all: Post[], limit = 6): Post[] {
  const cats = new Set(post.data.categories.map((c) => categoryKey(c)));
  const tags = new Set(post.data.tags.map((t) => t.trim()));
  const scored = all
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = 0;
      for (const c of p.data.categories) if (cats.has(categoryKey(c))) score += 2;
      for (const t of p.data.tags) if (tags.has(t.trim())) score += 1;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf());
  return scored.slice(0, limit).map((s) => s.p);
}
