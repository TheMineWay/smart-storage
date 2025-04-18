import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { GLOBAL_CONSTANTS } from "./constants";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Smart Storage",
  tagline: "Web storage made easy",
  favicon: "favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/smart-storage/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "TheMineWay", // Usually your GitHub org/user name.
  projectName: "smart-storage", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${GLOBAL_CONSTANTS.repo}/tree/main/docs/`,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    //image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Smart storage",
      logo: {
        alt: "Smart storage logo",
        src: "branding/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          href: GLOBAL_CONSTANTS.repo,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: GLOBAL_CONSTANTS.repo,
            },
          ],
        },
      ],
      copyright: `Smart Storage. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    metadata: [
      {
        name: "keywords",
        content: "web storage, local storage, session storage, smart storage",
      },
    ],
    presets: [
      [
        "@docusaurus/preset-classic",
        {
          sitemap: {
            lastmod: "date",
            changefreq: "weekly",
            priority: 0.5,
            ignorePatterns: ["/tags/**"],
            filename: "sitemap.xml",
            createSitemapItems: async (params) => {
              const { defaultCreateSitemapItems, ...rest } = params;
              const items = await defaultCreateSitemapItems(rest);
              return items.filter((item) => !item.url.includes("/page/"));
            },
          },
        },
      ],
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;
