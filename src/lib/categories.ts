// Category case-normalization. The old content has "Web前端" (33 posts) and
// "web前端" (20 posts) which are the same category typed with different casing.
// We merge by a lowercased key and pick a stable display label.

const DISPLAY_OVERRIDES: Record<string, string> = {
  "web前端": "Web前端",
};

/** Canonical display label for a raw category string. */
export function canonicalCategory(raw: string): string {
  const trimmed = raw.trim();
  const key = trimmed.toLowerCase();
  return DISPLAY_OVERRIDES[key] ?? trimmed;
}

/** Stable key used to group categories (case-insensitive). */
export function categoryKey(raw: string): string {
  return canonicalCategory(raw).toLowerCase();
}
