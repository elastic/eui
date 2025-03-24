/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Options as EuiPresetOptions } from '@elastic/eui-docusaurus-preset';

const baseUrl = process.env.DOCS_BASE_URL || '/';
const googleTagManagerId = process.env.DOCS_GOOGLE_TAG_MANAGER_ID || undefined;

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
      require.resolve('@elastic/eui-docusaurus-preset'),
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/elastic/eui/tree/main/packages/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/elastic/eui/tree/main/packages/website/',
        },
        googleTagManager: googleTagManagerId && {
          containerId: googleTagManagerId,
        },
      } satisfies EuiPresetOptions
    ],
  ],

  plugins: [
    [
      'docusaurus-lunr-search',
      {
        disableVersioning: true, // We don't use docusaurus docs versioning
      },
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
          sidebarId: 'components',
          position: 'left',
          label: 'Components',
        },
        {
          type: 'docSidebar',
          sidebarId: 'patterns',
          position: 'left',
          label: 'Patterns',
        },
        {
          type: 'docSidebar',
          sidebarId: 'content',
          position: 'left',
          label: 'Content',
        },
        {
          type: 'docSidebar',
          sidebarId: 'dataviz',
          position: 'left',
          label: 'Data visualization',
        },
        {
          href: 'https://github.com/elastic/eui/tree/main/packages/eui/changelogs',
          label: 'EUI Changelog',
          position: 'right',
          component: 'changelog',
        },
        {
          href: 'https://github.com/elastic/eui',
          label: 'GitHub',
          position: 'right',
          component: 'github',
        },
        {
          href: 'https://www.figma.com/community/file/964536385682658129',
          label: 'Figma',
          position: 'right',
          component: 'figma',
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
