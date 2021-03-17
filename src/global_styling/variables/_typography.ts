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

import { keysOf } from '../../components/common';
import { computed } from '../../services/theme/utils';
import {
  fontSizeFromScale,
  lineHeightFromBaseline,
} from '../functions/_typography';

// Typographic scale -- loosely based on Major Third (1.250)
// TODO: Doesn't seem to like arrays -- Not necessary for this specific key anymore though
// scale: [2.25, 1.75, 1.25, 1.125, 1, 0.875, 0.75],
const scale = {
  xxxs: 0.5625,
  xxs: 0.6875,
  xs: 0.75,
  s: 0.875,
  m: 1,
  l: 1.25,
  xl: 1.75,
  xxl: 2.125,
};

export const SCALES = keysOf(scale);
export type EuiFontScale = keyof typeof scale;

const baseline = 4;
const lineHeightMultiplier = 1.5;

export type EuiFont = {
  family: string;
  familyCode?: string;
  featureSettings?: string;
  baseline: number;
  lineHeightMultiplier: number;
  scale: { [key in EuiFontScale]: number };
};

// Families & base font settings
const font: EuiFont = {
  family:
    "'Inter UI', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  familyCode: "'Roboto Mono', Consolas, Menlo, Courier, monospace",

  // Careful using ligatures. Code editors like ACE will often error because of width calculations
  featureSettings: "'calt' 1, 'kern' 1, 'liga' 1",

  baseline,
  lineHeightMultiplier,
  scale,
};

// Font weights
const fontWeight = {
  weightLight: '300', // TODO
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

type EuiFontSize = {
  [mapType in EuiFontScale]: {
    fontSize: string;
    lineHeight: string;
  };
};
const fontSize = SCALES.reduce((acc, elem) => {
  acc[elem] = {
    fontSize: computed(['base', `font.scale.${elem}`], ([base, scale]) =>
      fontSizeFromScale(base, scale)
    ),
    lineHeight: computed(['base', 'font'], ([base, font]) =>
      lineHeightFromBaseline(base, font, font.scale[elem])
    ),
  };
  return acc;
}, {} as EuiFontSize);

// TODO -> MOVE TO COMPONENT
// $euiCodeFontWeightRegular:  400;
// $euiCodeFontWeightBold:     700;

export default {
  font,
  fontSize,
  fontWeight,
};
