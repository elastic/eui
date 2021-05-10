/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { CSSProperties } from 'react';
import { keysOf } from '../../components/common';
import { computed } from '../../services/theme/utils';

/*
 * Font scale
 */

// Typographic scale -- loosely based on Major Third (1.250)
export const fontScale = {
  xxxs: 0.5625,
  xxs: 0.6875,
  xs: 0.75,
  s: 0.875,
  m: 1,
  l: 1.25,
  xl: 1.75,
  xxl: 2.125,
};

export const SCALES = keysOf(fontScale);
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

// Families & base font settings
export const fontBase: _EuiThemeFontBase = {
  family: "'Inter UI', BlinkMacSystemFont, Helvetica, Arial, sans-serif",
  familyCode: "'Roboto Mono', Menlo, Courier, monospace",

  // Careful using ligatures. Code editors like ACE will often error because of width calculations
  featureSettings: "'calt' 1, 'kern' 1, 'liga' 1",

  baseline: computed(([base]) => base / 4, ['base']),
  lineHeightMultiplier: 1.5,
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

export const fontWeight: _EuiThemeFontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

/*
 * Font
 */

export type EuiThemeFont = _EuiThemeFontBase & {
  scale: { [key in _EuiThemeFontScale]: number };
  weight: _EuiThemeFontWeight;
};

export const font: EuiThemeFont = {
  ...fontBase,
  scale: fontScale,
  weight: fontWeight,
};
