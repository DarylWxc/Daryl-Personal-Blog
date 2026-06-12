import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** All non-draft posts, newest first. */
export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}
