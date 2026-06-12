// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Update this to your deployed URL (used for canonical links / sitemap).
  site: "https://darylwxc.github.io",
  // Hide the dev toolbar pinned to the bottom-center of the screen.
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      // "palenight" is the bundled Shiki theme closest to Butterfly's "pale night".
      themes: {
        light: "material-theme-lighter",
        dark: "material-theme-palenight",
      },
      wrap: true, // matches Hexo's code_word_wrap: true
    },
  },
});
