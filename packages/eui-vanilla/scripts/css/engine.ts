/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';
import { getComputed } from '@elastic/eui-theme-common';

import type { UseEuiTheme } from '@elastic/eui/src/services/theme/hooks';

export const THEMES = [
  { name: 'light', colorMode: 'LIGHT' },
  { name: 'dark', colorMode: 'DARK' },
] as const;
export type ColorMode = (typeof THEMES)[number]['colorMode'];

/**
 * CSS sheet function.
 *
 * @param ctx - theme context
 * @param root - CSS selector
 * @returns CSS
 */
export type CssSheet = (ctx: UseEuiTheme, root: string) => string;

/**
 * One generated CSS file.
 *
 * @param sheets - CSS sheets
 * @param reset - optional CSS prepended as-is (`base` reset)
 */
export type CssOutput = { sheets: CssSheet[]; reset?: string };

/**
 * Create theme context for a color mode.
 *
 * @param colorMode - color mode
 * @returns theme context
 */
export const contextFor = (colorMode: ColorMode): UseEuiTheme => ({
  euiTheme: getComputed(EuiThemeBorealis, {}, colorMode),
  colorMode,
  // TODO: forced-colors / high-contrast
  highContrastMode: false,
  modifications: {},
});

/**
 * Run sheets for each document theme. Selector wrapping is `[data-theme]`.
 *
 * @param sheets - CSS sheets
 * @returns CSS
 */
export const emit = (sheets: CssSheet[]): string =>
  THEMES.map(({ name, colorMode }) => {
    const ctx = contextFor(colorMode);
    const root = `[data-theme='${name}']`;

    return sheets
      .map((sheet) => sheet(ctx, root))
      .filter(Boolean)
      .join('\n');
  }).join('\n\n');
