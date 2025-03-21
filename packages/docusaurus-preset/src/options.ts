/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Based on https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-preset-classic/src/options.ts

import type { ThemeConfig as BaseThemeConfig } from '@docusaurus/types';
import type { UserThemeConfig as ClassicThemeConfig } from '@docusaurus/theme-common';

import type { Options as DocsPluginOptions } from '@docusaurus/plugin-content-docs';
import type { Options as BlogPluginOptions } from '@docusaurus/plugin-content-blog';
import type { Options as PagesPluginOptions } from '@docusaurus/plugin-content-pages';
import type { Options as SitemapPluginOptions } from '@docusaurus/plugin-sitemap';
import type { Options as SVGRPluginOptions } from '@docusaurus/plugin-svgr';
import type { Options as ThemeOptions } from '@docusaurus/theme-classic';
import type { Options as GAPluginOptions } from '@docusaurus/plugin-google-analytics';
import type { Options as GtagPluginOptions } from '@docusaurus/plugin-google-gtag';
import type { Options as GTMPluginOptions } from '@docusaurus/plugin-google-tag-manager';

export type Options = {
  /**
   * Options for `@docusaurus/plugin-content-docs`.
   */
  docs?: DocsPluginOptions;

  /**
   * Options for `@docusaurus/plugin-content-pages`.
   */
  pages?: PagesPluginOptions;

  /**
   * Options for `@docusaurus/plugin-svgr`.
   */
  svgr?: SVGRPluginOptions;

  /**
   * Options for `@docusaurus/plugin-sitemap`.
   * Enabled in production builds
   */
  sitemap?: SitemapPluginOptions;

  /**
   * Options for `@docusaurus/theme-classic`.
   */
  theme?: ThemeOptions;

  /**
   * Options for `@docusaurus/plugin-content-blog`.
   * Use `false` to disable.
   */
  blog?: false | BlogPluginOptions;

  /**
   * Options for `@docusaurus/plugin-google-analytics`. Only enabled when the
   * key is present.
   */
  googleAnalytics?: GAPluginOptions;

  /**
   * Options for `@docusaurus/plugin-google-gtag`. Only enabled when the key
   * is present.
   */
  gtag?: GtagPluginOptions;

  /**
   * Options for `@docusaurus/plugin-google-tag-manager`. Only enabled when
   * the key is present.
   */
  googleTagManager?: GTMPluginOptions;
};

export type ThemeConfig = BaseThemeConfig & ClassicThemeConfig;
