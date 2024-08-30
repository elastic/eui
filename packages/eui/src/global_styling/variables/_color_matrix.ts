/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiThemeSemanticMatrixColors } from './colors';

export const COLOR_SHADES_COUNT = 14;

export type _ColorData = string[];

export type _ColorMatrix = {
  blue: _ColorData;
  blueGrey: _ColorData;
  teal: _ColorData;
  pink: _ColorData;
  green: _ColorData;
  yellow: _ColorData;
  red: _ColorData;
};

export type _SemanticColors = {
  shade: string;
};

export const MATRIX_TO_SEMANTIC_COLOR_NAME_MAP = {
  blueGrey: 'shade',
  blue: 'primary',
  pink: 'accent',
  teal: 'highlight',
  green: 'success',
  red: 'danger',
  yellow: 'warning',
};

export const COLOR_MATRIX: _ColorMatrix = {
  blue: [
    '#f1f9ff',
    '#d2e7ff',
    '#b4d5ff',
    '#96c3ff',
    '#78b0ff',
    '#599dff',
    '#3788ff',
    '#2476f0',
    '#0b64dd',
    '#004fc7',
    '#00419e',
    '#043376',
    '#092551',
    '#09182f',
  ],
  blueGrey: [
    '#f6f9fc',
    '#ebeff6',
    '#e0e6f1',
    '#d4ddeb',
    '#c9d4e6',
    '#becce0',
    '#b3c3da',
    '#a9bad5',
    '#9eb1cf',
    '#93a8c9',
    '#89a0c4',
    '#7e97be',
    '#748fb8',
    '#6c86af',
    '#647ea7',
    '#5c759e',
    '#546d95',
    '#4c658c',
    '#445c83',
    '#3d5479',
    '#364c6f',
    '#2f4466',
    '#283c5c',
    '#223553',
    '#1b2d49',
    '#152640',
    '#0f1f38',
    '#09182F',
  ],
  // neutralGrey: [
  //   '#f5f9fe',
  //   '#e1e6ee',
  //   '#ced4de',
  //   '#bac2ce',
  //   '#a7b0bf',
  //   '#959faf',
  //   '#838ea0',
  //   '#727d8f',
  //   '#626d7e',
  //   '#505b6b',
  //   '#404958',
  //   '#303845',
  //   '#212833',
  //   '#131922',
  // ],
  teal: [
    '#eafdfc',
    '#c0f1ee',
    '#93e5e0',
    '#5dd8d2',
    '#00cbc5',
    '#00beb8',
    '#00b0aa',
    '#009e99',
    '#008c88',
    '#007775',
    '#00605d',
    '#004947',
    '#003432',
    '#001f1e',
  ],
  pink: [
    '#fff3f9',
    '#ffd9e7',
    '#ffbed5',
    '#fba3c4',
    '#f588b3',
    '#ed6ba2',
    '#e54a91',
    '#d13680',
    '#bd1f70',
    '#a6005e',
    '#85044b',
    '#650d3a',
    '#460f29',
    '#290d19',
  ],
  green: [
    '#eefdf4',
    '#caf1db',
    '#a6e4c2',
    '#7ed8a9',
    '#4dcb91',
    '#00bd79',
    '#00b060',
    '#009e50',
    '#008c40',
    '#00782d',
    '#006026',
    '#00491f',
    '#003317',
    '#001f10',
  ],
  yellow: [
    '#fef8ea',
    '#f3e5c1',
    '#e8d297',
    '#ddbf6a',
    '#d2ab30',
    '#c79700',
    '#bc8300',
    '#aa7100',
    '#996000',
    '#854d00',
    '#6A3f00',
    '#503100',
    '#382400',
    '#211700',
  ],
  red: [
    '#fff4f1',
    '#ffdad5',
    '#ffc0b8',
    '#ffa59c',
    '#fc8a80',
    '#f66d64',
    '#ee4c48',
    '#da3737',
    '#c61e25',
    '#af000e',
    '#8c0210',
    '#6a0d10',
    '#4a100f',
    '#2b0e0c',
  ],
};

// color matrix map for fast lookup
// valu based definition hierarchy: value-name-shade
// e.g.: '#AF000E': { group: 'danger', shade: 10 }
export const COLOR_MATRIX_MAP = new Map<
  string,
  { group: keyof _ColorMatrix; shade: number }
>();

if (COLOR_MATRIX_MAP.size === 0) {
  for (const [key, value] of Object.entries<_ColorData>(COLOR_MATRIX)) {
    for (const [index, colorValue] of value.entries()) {
      const position = index + 1;

      COLOR_MATRIX_MAP.set(colorValue.toLowerCase(), {
        group: key as keyof _ColorMatrix,
        shade: position,
      });
    }
  }
}

export const getColorMatrixValue = (
  group: keyof _ColorMatrix,
  shade: number
) => {
  const hasLargeScale = group === 'blueGrey';

  const step = hasLargeScale ? (shade / 10) * 2 - 1 : shade / 10;
  const position = step > 0 ? step - 1 : step;

  return COLOR_MATRIX[group][position].toLowerCase();
};

export const semanticColors: _EuiThemeSemanticMatrixColors =
  {} as _EuiThemeSemanticMatrixColors;

export const matrixColors = Object.keys(COLOR_MATRIX).reduce((acc, cur) => {
  const group = cur as keyof _ColorMatrix;
  const groupColors = COLOR_MATRIX[group];
  const hasLargeScale = groupColors.length > COLOR_SHADES_COUNT;
  let largeScaleIndex = 0;

  const colors = groupColors.reduce((acc, color, i) => {
    largeScaleIndex = i === 0 ? 1 : largeScaleIndex + 0.5;

    const shade = hasLargeScale ? largeScaleIndex * 10 : (i + 1) * 10;

    const semanticGroup = MATRIX_TO_SEMANTIC_COLOR_NAME_MAP[group];
    const semanticColorName =
      `${semanticGroup}${shade}` as unknown as keyof _EuiThemeSemanticMatrixColors;

    semanticColors[semanticColorName] = color;

    return {
      ...acc,
      [`${group}-${shade}`]: color,
    };
  }, {});

  return {
    ...acc,
    ...colors,
  };
}, {});
