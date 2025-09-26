/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';

/**
 * Font units of measure
 */

export const EuiThemeFontUnits = ['rem', 'px', 'em'] as const;

export type _EuiThemeFontUnit = (typeof EuiThemeFontUnits)[number];

/*
 * Font scale
 */

export const EuiThemeFontScales = [
  'xxxs',
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
] as const;

export type _EuiThemeFontScale = (typeof EuiThemeFontScales)[number];

export type _EuiThemeFontScales = Record<_EuiThemeFontScale, number>;

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
   * The font family used for serif UI elements like blockquotes within EuiText
   */
  familySerif?: string;
  /**
   * Controls advanced features OpenType fonts.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
   */
  featureSettings?: string;
  /**
   * Sets the default units used for font size & line height set by UI components
   * like EuiText or EuiTitle. Defaults to `rem`.
   *
   * NOTE: This may overridden by some internal usages, e.g.
   * EuiText's `relative` size which must use `em`.
   *
   * @default 'rem'
   */
  defaultUnits: _EuiThemeFontUnit;
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

export const EuiThemeFontWeights = [
  'light',
  'regular',
  'medium',
  'semiBold',
  'bold',
] as const;

export type _EuiThemeFontWeight = (typeof EuiThemeFontWeights)[number];

export type _EuiThemeFontWeights = {
  /** - Default value: 300 */
  light: CSSProperties['fontWeight'];
  /** - Default value: 400 */
  regular: CSSProperties['fontWeight'];
  /** - Default value: 500 */
  medium: CSSProperties['fontWeight'];
  /** - Default value: 600 */
  semiBold: CSSProperties['fontWeight'];
  /** - Default value: 700 */
  bold: CSSProperties['fontWeight'];
};

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
  weight: keyof _EuiThemeFontWeights;
}

/**
 * Title styles
 */

export interface _EuiThemeTitle {
  /**
   * A font weight key for setting the base weight for titles and headings
   */
  weight: keyof _EuiThemeFontWeights;
}

/*
 * Font
 */

export type _EuiThemeFont = _EuiThemeFontBase & {
  scale: _EuiThemeFontScales;
  /**
   * See {@link https://eui.elastic.co/docs/getting-started/theming/tokens/typography/font-weight/ | Reference} for more information
   */
  weight: _EuiThemeFontWeights;
  body: _EuiThemeBody;
  title: _EuiThemeTitle;
};
