/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';
import { getComputed } from '@elastic/eui-theme-common';

import type { UseEuiTheme } from '../../../eui/src/services/theme/hooks';

export const COLOR_MODES = ['LIGHT', 'DARK'] as const;
export type ColorMode = (typeof COLOR_MODES)[number];

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
 * Run sheets for each color mode. Selector wrapping is `[data-color-mode]`.
 *
 * @param sheets - CSS sheets
 * @returns CSS
 */
export const emit = (sheets: CssSheet[]): string =>
  COLOR_MODES.map((colorMode) => {
    const ctx = contextFor(colorMode);
    const root = `[data-color-mode='${colorMode}']`;

    return sheets
      .map((sheet) => sheet(ctx, root))
      .filter(Boolean)
      .join('\n');
  }).join('\n\n');
