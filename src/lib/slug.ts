// Slug helpers. We deliberately keep CJK characters verbatim — running them
// through an ASCII slugifier would blank Chinese filenames. Astro percent-encodes
// the generated output paths; `Astro.params` reads them back decoded.

/**
 * Derive the public slug for a post from its collection entry id.
 * Co-located image posts live at `<name>/index.md`, giving id `<name>/index`;
 * collapse the trailing `/index` so the URL stays `/posts/<name>/`.
 */
export function postSlug(id: string): string {
  return id.replace(/\/index$/, "");
}

/** Build the canonical post URL. */
export function postUrl(id: string): string {
  return `/posts/${postSlug(id)}/`;
}
