/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { HEX } from './color_types';
import { colorPalette } from './color_palette';

export type EuiPalette = string[];

const flatten = (arr: any[]) => [].concat(...arr);

const euiPalette = function (
  colors: string[],
  steps: number,
  diverge: boolean = false,
  categorical: boolean = true
): EuiPalette {
  // This function also trims the first color so white/black is never a color
  if (!diverge && steps > 1) {
    const palette = colorPalette(colors, steps + 1);
    palette.shift();
    return palette;
  }

  return colorPalette(colors, steps, diverge, categorical);
};

export interface EuiPaletteColorBlindProps {
  /**
   * How many variations of the series is needed
   */
  rotations?: number;
  /**
   * Order similar colors as `group`s or just `append` each variation
   */
  order?: 'append' | 'group';
  /**
   * Specifies if the direction of the color variations
   */
  direction?: 'lighter' | 'darker' | 'both';
  /**
   * Use the default sort order, or re-sort them based on the color wheel (natural)
   */
  sortBy?: 'default' | 'natural';
  /**
   * Shift the sorting order by a certain number when used in conjunction with `'natural'` `sortBy`.
   * Defaults to a number close to green.
   */
  sortShift?: string;
}

export const euiPaletteColorBlind = ({
  rotations = 1,
  order = 'append',
  direction = 'lighter',
  sortBy = 'default',
  sortShift = '-100',
}: EuiPaletteColorBlindProps = {}): EuiPalette => {
  let colors: string[] = [];

  let base = [
    '#00BEB8', // 0 green
    '#93E5E0', // 1 light green
    '#599DFF', // 2 blue
    '#B4D5FF', // 3 light blue
    '#ED6BA2', // 4 dark pink
    '#FFBED5', // 5 light pink
    '#F66D64', // 6 red
    '#FFC0B8', // 7 tan
    '#C79700', // 8 brown
    '#E8D297', // 9 yellow
  ];

  if (sortBy === 'natural') {
    // Sort the colors based on the color wheel, but shifting the values based on sortShift
    base = [...base].sort(function (a, b) {
      return (
        chroma(a).set('hsl.h', sortShift).hsl()[0] -
        chroma(b).set('hsl.h', sortShift).hsl()[0]
      );
    });
  }

  if (rotations > 1) {
    const palettes = base.map((color) => {
      // Create the darkest and lightest versions of each color using black and white
      const palette = colorPalette(['black', color, 'white'], 5, false, true);
      // Then removing the extremes
      palette.pop();
      palette.shift();

      switch (direction) {
        case 'lighter':
          return colorPalette([palette[1], palette[2]], rotations, false, true);
        case 'darker':
          return colorPalette([palette[1], palette[0]], rotations, false, true);
        case 'both':
          return colorPalette(palette, rotations, false, true);
      }
    });

    if (order === 'group') {
      colors = flatten(palettes);
    } else {
      for (let i = 0; i < rotations; i++) {
        const rotation = palettes.map((palette) => palette[i]);
        colors.push(...rotation);
      }
    }
  } else {
    colors = base;
  }

  return colors;
};

/**
 * Color blind palette with text is meant for use when text is applied on top of the color.
 * It increases the brightness of the color to give the text more contrast.
 */
export const euiPaletteColorBlindBehindText = (
  paletteProps: EuiPaletteColorBlindProps = {}
) => {
  const originalPalette = euiPaletteColorBlind(paletteProps);
  const newPalette = originalPalette.map((color) =>
    chroma(color).brighten(0.5).hex()
  );
  return newPalette;
};

export const euiPaletteForLightBackground = function (): EuiPalette {
  return ['#007775', '#004FC7', '#A6005E', '#AF000E', '#854D00'];
};

export const euiPaletteForDarkBackground = function (): EuiPalette {
  return ['#00BEB8', '#599DFF', '#ED6BA2', '#F66D64', '#C79700'];
};

const greenColor: HEX = '#007775';
const redColor: HEX = '#AF000E';
const lightRedColor: HEX = euiPaletteColorBlind()[6];
const coolArray: HEX[] = [euiPaletteColorBlind()[2], '#599DFF'];
const warmArray: HEX[] = [euiPaletteColorBlind()[7], euiPaletteColorBlind()[6]];

export const euiPaletteForStatus = function (steps: number): EuiPalette {
  if (steps === 1) {
    return [greenColor];
  }
  if (steps <= 3) {
    return euiPalette(
      [greenColor, euiPaletteColorBlind()[5], redColor],
      steps,
      true
    );
  }
  return euiPalette(
    [
      greenColor,
      euiPaletteColorBlind()[0],
      euiPaletteColorBlind()[9],
      lightRedColor,
      redColor,
    ],
    steps,
    true
  );
};

export const euiPaletteForTemperature = function (steps: number): EuiPalette {
  const cools = colorPalette([...coolArray.slice().reverse(), '#F1F9FF'], 3);
  const warms = colorPalette(['#FFF4F1', ...warmArray], 3);

  if (steps === 1) {
    return [cools[0]];
  } else if (steps <= 3) {
    return euiPalette([cools[0], lightRedColor], steps, true);
  }

  return euiPalette([...cools, ...warms], steps, true);
};

export const euiPaletteComplementary = function (steps: number): EuiPalette {
  if (steps === 1) {
    return [euiPaletteColorBlind()[2]];
  }

  return euiPalette(
    [euiPaletteColorBlind()[2], euiPaletteColorBlind()[8]],
    steps,
    true
  );
};

export const euiPaletteRed = function (steps: number): EuiPalette {
  if (steps === 1) {
    return [lightRedColor];
  }

  return euiPalette(['white', redColor], steps);
};

export const euiPaletteGreen = function (steps: number): EuiPalette {
  if (steps === 1) {
    return [euiPaletteColorBlind()[0]];
  }

  return euiPalette(['white', greenColor], steps);
};

export const euiPaletteCool = function (steps: number): EuiPalette {
  if (steps === 1) {
    return [coolArray[1]];
  }

  return euiPalette(['white', ...coolArray], steps);
};

export const euiPaletteWarm = function (steps: number): EuiPalette {
  if (steps === 1) {
    return [lightRedColor];
  }

  return euiPalette(['#FFF4F1', ...warmArray], steps);
};

export const euiPaletteGray = function (steps: number): EuiPalette {
  if (steps === 1) {
    return ['#B1C3DE'];
  }

  return euiPalette(
    ['white', '#F5F9FF', '#DEE7F4', '#C7D5E9', '#B1C3DE', '#9CB1D3', '#86A0C8'],
    steps,
    false
  );
};
