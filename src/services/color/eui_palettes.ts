import { flatten } from 'lodash';
import chroma from 'chroma-js';
import { HEX } from './color_types';
import { colorPalette } from './color_palette';

export type EuiPalette = string[];

const euiPalette = function(
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

export const euiPaletteColorBlind = function(
  /**
   * How many variations of the series is needed
   */
  rotations: number = 1,
  /**
   * Order similar colors as `group`s or just `append` each variation
   */
  order: 'append' | 'group' = 'append',
  /**
   * Specifies if the direction of the color variations
   */
  direction: 'lighter' | 'darker' | 'both' = 'lighter'
): EuiPalette {
  let colors: string[] = [];

  const base = [
    '#54B399', // 0 green
    '#6092C0', // 1 blue
    '#D36086', // 2 dark pink
    '#9170B8', // 3 purple
    '#CA8EAE', // 4 light pink
    '#D6BF57', // 5 yellow
    '#B9A888', // 6 tan
    '#DA8B45', // 7 orange
    '#AA6556', // 8 brown
    '#E7664C', // 9 red
  ];

  if (rotations > 1) {
    const palettes = base.map(color => {
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
        const rotation = palettes.map(palette => palette[i]);
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
export const euiPaletteColorBlindBehindText = function(): EuiPalette {
  const originalPalette = euiPaletteColorBlind();
  const newPalette = originalPalette.map(color =>
    chroma(color)
      .brighten(0.5)
      .hex()
  );
  return newPalette;
};

export const euiPaletteForLightBackground = function(): EuiPalette {
  return ['#006BB4', '#017D73', '#F5A700', '#BD271E', '#DD0A73'];
};

export const euiPaletteForDarkBackground = function(): EuiPalette {
  return ['#1BA9F5', '#7DE2D1', '#F990C0', '#F66', '#FFCE7A'];
};

const positiveColor: HEX = '#209280';
const negativeColor: HEX = '#CC5642';
const lightNegativeColor: HEX = euiPaletteColorBlind()[9];
const coolArray: HEX[] = [euiPaletteColorBlind()[1], '#6092C0'];
const warmArray: HEX[] = [euiPaletteColorBlind()[7], euiPaletteColorBlind()[9]];

export const euiPaletteForStatus = function(steps: number): EuiPalette {
  if (steps === 1) {
    return [euiPaletteColorBlind()[0]];
  }
  if (steps <= 3) {
    return euiPalette(
      [
        euiPaletteColorBlind()[0],
        euiPaletteColorBlind()[5],
        lightNegativeColor,
      ],
      steps,
      true
    );
  }
  return euiPalette(
    [
      positiveColor,
      euiPaletteColorBlind()[0],
      euiPaletteColorBlind()[5],
      lightNegativeColor,
      negativeColor,
    ],
    steps,
    true
  );
};

export const euiPaletteForTemperature = function(steps: number): EuiPalette {
  const cools = colorPalette([...coolArray.slice().reverse(), '#EBEFF5'], 3);
  const warms = colorPalette(['#F4F3DB', ...warmArray], 3);

  if (steps === 1) {
    return [cools[0]];
  } else if (steps <= 3) {
    return euiPalette([cools[0], lightNegativeColor], steps, true);
  }

  return euiPalette([...cools, ...warms], steps, true);
};

export const euiPaletteComplimentary = function(steps: number): EuiPalette {
  if (steps === 1) {
    return [euiPaletteColorBlind()[1]];
  }

  return euiPalette(
    [euiPaletteColorBlind()[1], euiPaletteColorBlind()[7]],
    steps,
    true
  );
};

export const euiPaletteNegative = function(steps: number): EuiPalette {
  if (steps === 1) {
    return [lightNegativeColor];
  }

  return euiPalette(['white', negativeColor], steps);
};

export const euiPalettePositive = function(steps: number): EuiPalette {
  if (steps === 1) {
    return [euiPaletteColorBlind()[0]];
  }

  return euiPalette(['white', positiveColor], steps);
};

export const euiPaletteCool = function(steps: number): EuiPalette {
  if (steps === 1) {
    return [coolArray[1]];
  }

  return euiPalette(['white', ...coolArray], steps);
};

export const euiPaletteWarm = function(steps: number): EuiPalette {
  if (steps === 1) {
    return [lightNegativeColor];
  }

  return euiPalette(['#FBFBDC', ...warmArray], steps);
};

export const euiPaletteGray = function(steps: number): EuiPalette {
  if (steps === 1) {
    return ['#98a2b3'];
  }

  return euiPalette(
    ['white', '#d3dae6', '#98a2b3', '#69707d', '#343741'],
    steps,
    false
  );
};
