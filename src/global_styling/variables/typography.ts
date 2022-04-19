/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { keysOf } from '../../components/common';

export type _EuiThemeFontSizeMeasurement = 'px' | 'rem' | 'em';

/*
 * Font scale
 */

// TODO: How to reduce to just the array
export const fontScale = {
  xxxs: 0.5625,
  xxs: 0.6875,
  xs: 0.75,
  s: 0.875,
  m: 1,
  l: 1.375,
  xl: 1.6875,
  xxl: 2.125,
};

export const FONT_SCALES = keysOf(fontScale);
export type _EuiThemeFontScale = keyof typeof fontScale;

/*
 * Font base settings
 */

export type _EuiThemeFontBase = {
  /**
   * The whole font family stack for all parts of the UI.
   * We encourage only customizing the first font in the stack.
   */
  family: string;
  /**
   * The font family used for monospace UI elements like EuiCode
   */
  familyCode?: string;
  /**
   * Controls advanced features OpenType fonts.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
   */
  featureSettings?: string;
  /**
   * A computed number that is 1/4 of `base`
   */
  baseline: number;
  /**
   * Establishes the ideal line-height percentage, but it is the `baseline` integer that establishes the final pixel/rem value
   */
  lineHeightMultiplier: number;
};

/*
 * Font weights
 */

export interface _EuiThemeFontWeight {
  light: CSSProperties['fontWeight'];
  regular: CSSProperties['fontWeight'];
  medium: CSSProperties['fontWeight'];
  semiBold: CSSProperties['fontWeight'];
  bold: CSSProperties['fontWeight'];
}

/**
 * Body / Base styles
 */

export interface _EuiThemeBody {
  /**
   * A sizing key from one of the font scales to set as the base body font-size
   */
  scale: _EuiThemeFontScale;
  /**
   * A font weight key for setting the base body weight
   */
  weight: keyof _EuiThemeFontWeight;
}

/*
 * Font
 */

export type EuiThemeFont = _EuiThemeFontBase & {
  scale: { [key in _EuiThemeFontScale]: number };
  weight: _EuiThemeFontWeight;
  body: _EuiThemeBody;
};
