// Auto-excerpt for homepage cards: strip markdown to a short plain-text preview.
export function excerpt(body: string | undefined, length = 140): string {
  if (!body) return "";
  // Respect an explicit Hexo "more" marker if present.
  const more = body.split(/<!--\s*more\s*-->/i)[0];
  const text = more
    .replace(/```[\s\S]*?```/g, " ")        // fenced code
    .replace(/`[^`]*`/g, " ")               // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")  // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")// links -> text
    .replace(/[#>*_~\-]+/g, " ")            // md punctuation
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? text.slice(0, length) + "…" : text;
}
