// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

export default defineConfig({
  site: "https://ghulamhaiderdev.github.io",
  output: "static",
  integrations: [
    react(),
    mdx(),
    sitemap(),
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: false,
      SVG: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["github.com", "avatars.githubusercontent.com"],
  },
});
