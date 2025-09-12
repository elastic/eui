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

const ELASTIC_LICENSE_URL =
  'https://github.com/elastic/eui/blob/main/licenses/ELASTIC-LICENSE-2.0.md';
const SSPL_LICENSE_URL =
  'https://github.com/elastic/eui/blob/main/licenses/SSPL-LICENSE.md';

const baseUrl = process.env.DOCS_BASE_URL || '/';
const googleTagManagerId = process.env.DOCS_GOOGLE_TAG_MANAGER_ID || undefined;

let storybookBaseUrl: string = 'https://eui.elastic.co/storybook';

if (process.env.NODE_ENV === 'development') {
  storybookBaseUrl = 'http://localhost:6006';
} else if (process.env.STORYBOOK_BASE_URL) {
  storybookBaseUrl = process.env.STORYBOOK_BASE_URL;
}

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

  customFields: {
    storybookBaseUrl,
  },

  presets: [
    [
      require.resolve('@elastic/eui-docusaurus-preset'),
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/elastic/eui/tree/main/packages/website/',
          admonitions: {
            keywords: ['accessibility'],
            extendDefaults: true,
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/elastic/eui/tree/main/packages/website/',
        },
        googleTagManager: googleTagManagerId && {
          containerId: googleTagManagerId,
        },
      } satisfies EuiPresetOptions,
    ],
  ],

  plugins: [
    [
      'docusaurus-lunr-search',
      {
        disableVersioning: true, // We don't use docusaurus docs versioning
        fields: {
          title: {
            // We need high enough boost to ensure titles are prioritized
            // even if it's not a 100% match.
            // lunr scoring logic seems to be very picky about that
            boost: 200,
            extractor(doc) {
              // We need to include keywords in the title field/index
              // to boost their importance when searching.
              // They're not rendered in search results
              return `${doc.title}${doc.keywords ? ` ${doc.keywords}` : ''}`;
            },
          },
          content: { boost: 1 },
        },
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
          sidebarId: 'getting-started',
          position: 'left',
          label: 'Getting started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'components',
          position: 'left',
          label: 'Components',
        },
        {
          type: 'docSidebar',
          sidebarId: 'utilities',
          position: 'left',
          label: 'Utilities',
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
      copyright: `
        EUI is dual-licensed under <a href="${ELASTIC_LICENSE_URL}" target="_blank" rel="noreferrer">Elastic License 2.0</a>
        and <a href="${SSPL_LICENSE_URL}" target="_blank" rel="noreferrer">Server Side Public License, v1</a>
        | Crafted with ❤️ by <a href="https://elastic.co" target="_blank" rel="noreferrer">Elastic</a>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['scss'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
