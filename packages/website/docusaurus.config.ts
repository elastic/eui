import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const baseUrl = process.env.DOCS_BASE_URL || '/';

const config: Config = {
  title: 'Elastic UI Framework',
  tagline: 'The framework powering the Elastic Stack',
  favicon: 'favicon.ico',
  trailingSlash: true,

  // Set the production url of your site here
  url: 'https://eui.elastic.co',

  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/elastic/eui/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/elastic/eui/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Elastic UI',
      logo: {
        alt: 'Elastic UI',
        src: 'images/eui_logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'rootSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/elastic/eui',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `EUI is dual-licensed under <a href="https://github.com/elastic/eui/blob/main/licenses/ELASTIC-LICENSE-2.0.md">Elastic License 2.0</a> and <a href="https://github.com/elastic/eui/blob/main/licenses/SSPL-LICENSE.md">Server Side Public License, v 1</a> | Crafted with ❤️ by <a href="https://elastic.co">Elastic</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['scss'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
