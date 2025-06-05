/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type {
  LoadContext,
  PluginConfig,
  PluginModule,
  PluginOptions,
  Preset,
} from '@docusaurus/types';
import { Options } from './options';

/**
 * Docusaurus plugin to ignore any unwanted style imports, e.g. like Infima stylesheet imports.
 * This is needed so that Infima doesn't pollute global CSS scope
 * and affect how EUI components are rendered
 */
const ignoreInheritedStylesPlugin: PluginModule = () => ({
  name: 'ignore-styles-plugin',
  configureWebpack() {
    return {
      module: {
        rules: [
          {
            test: /node_modules\/infima/,
            use: 'null-loader',
          },
          {
            test: /node_modules\/@docusaurus\/theme-common\/lib\/hooks\/styles.css/,
            use: 'null-loader',
          },
        ],
      },
    };
  },
});

const makePluginConfig = (
  source: string,
  options?: PluginOptions
): string | [string, PluginOptions] => {
  if (!options) {
    return require.resolve(source);
  }

  return [require.resolve(source), options];
};

export default function preset(
  context: LoadContext,
  options: Options = {}
): Preset {
  const isProd = process.env.NODE_ENV === 'production';

  const themes: PluginConfig[] = [
    // EUI theme is based on the classic docusaurus theme
    require.resolve('@docusaurus/theme-classic'),

    require.resolve('@elastic/eui-docusaurus-theme'),
  ];

  const plugins: PluginConfig[] = [
    ignoreInheritedStylesPlugin,
    makePluginConfig('@docusaurus/plugin-content-docs', options.docs),
    makePluginConfig('@docusaurus/plugin-content-pages', options.pages),
    makePluginConfig('@docusaurus/plugin-svgr', options.svgr),
  ];

  if (options.blog !== false) {
    plugins.push(
      makePluginConfig('@docusaurus/plugin-content-blog', options.blog)
    );
  }

  if (isProd) {
    plugins.push(
      makePluginConfig('@docusaurus/plugin-sitemap', options.sitemap)
    );
  }

  if (options.googleAnalytics) {
    plugins.push(
      makePluginConfig(
        '@docusaurus/plugin-google-analytics',
        options.googleAnalytics
      )
    );
  }

  if (options.googleTagManager) {
    plugins.push(
      makePluginConfig(
        '@docusaurus/plugin-google-tag-manager',
        options.googleTagManager
      )
    );
  }

  if (options.gtag) {
    plugins.push(
      makePluginConfig('@docusaurus/plugin-google-gtag', options.gtag)
    );
  }

  return { themes, plugins };
}

export type { Options };
