/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const COLOR_SHADES_COUNT = 14;

export type _ColorData = string[];

export type _ColorMatrix = {
  blue: _ColorData;
  blueGrey: _ColorData;
  neutralGrey: _ColorData;
  teal: _ColorData;
  pink: _ColorData;
  green: _ColorData;
  yellow: _ColorData;
  red: _ColorData;
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
    '#f5f9ff',
    '#dee7f4',
    '#c7d5e9',
    '#b1c3de',
    '#9cb1d3',
    '#86a0c8',
    '#718fbc',
    '#617eaa',
    '#516d99',
    '#405b85',
    '#33496b',
    '#283851',
    '#1d283a',
    '#121923',
  ],
  neutralGrey: [
    '#f5f9fe',
    '#e1e6ee',
    '#ced4de',
    '#bac2ce',
    '#a7b0bf',
    '#959faf',
    '#838ea0',
    '#727d8f',
    '#626d7e',
    '#505b6b',
    '#404958',
    '#303845',
    '#212833',
    '#131922',
  ],
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
  const position = shade > 0 ? shade - 1 : shade;
  return COLOR_MATRIX[group][position].toLowerCase();
};
