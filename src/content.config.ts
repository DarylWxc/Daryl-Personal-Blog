import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Hexo frontmatter allows `tags` / `categories` to be either a single scalar
// (`categories: Web前端`) or a YAML list. Normalize everything to string[].
const toArray = z
  .union([z.string(), z.array(z.string())])
  .transform((v) => (Array.isArray(v) ? v : [v]))
  .default([]);

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    // Hexo dates look like "2021-03-15 10:26:23" — coerce handles the string.
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: toArray,
    categories: toArray,
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
