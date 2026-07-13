/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type EuiIllustrationColorMode = 'light' | 'dark';

/**
 * A theme-adaptable illustration.
 *
 * Illustrations are authored as raw SVGs exported straight from Figma and
 * dropped into `src/svgs` as `<name>.light.svg` + `<name>.dark.svg`.
 * `scripts/generate.js` optimizes each pair and produces the `src/generated`
 * modules that expose this shape.
 */
export type EuiIllustrationSource = Readonly<{
  /** Derived from the file name, e.g. `dashboard`. */
  id: string;
  /** Human-readable title derived from `id`, e.g. `Dashboard`. */
  title: string;
  /** Optimized SVG markup for the light color mode. */
  light: string;
  /** Optimized SVG markup for the dark color mode. */
  dark: string;
}>;
