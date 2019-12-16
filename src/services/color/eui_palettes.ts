import { HEX } from './color_types';
import { colorPalette } from './color_palette';

interface EuiPalette {
  colors: string[];
}

const euiPalette = function(
  colors: string[],
  steps: number,
  diverge: boolean = false
): EuiPalette {
  return { colors: colorPalette(colors, steps, diverge) };
};

const euiPaletteColorBlind = function(
  /**
   * How many variations of the series is needed
   */
  rotations: 1 | 2 | 3 = 1,
  /**
   * Should similar colors be grouped (true) or just append each variation (false)
   */
  combined: boolean = false
): EuiPalette {
  let colors: string[] = [];

  const base = [
    '#4DAC93', // 0 green
    '#3594D6', // 1 blue
    '#D15D75', // 2 dark pink
    '#9170B8', // 3 purple
    '#EEAFCF', // 4 light pink
    '#ADB6DD', // 5 light purple
    '#BAA066', // 6 tan
    '#E59145', // 7 orange
    '#B46F5F', // 8 brown
    '#47688A', // 9 blue-gray
  ];

  const lighter = [
    '#8ec5b4',
    '#7fb0df',
    '#df8795',
    '#ab92c6',
    '#edd6e5',
    '#d3d6e6',
    '#d2bf9b',
    '#f3b379',
    '#c19489',
    '#6484a8',
  ];

  const lightest = [
    '#c8ded7',
    '#b5cde7',
    '#e9afb7',
    '#c4b5d3',
    '#fbf8fb',
    '#e5e5e5',
    '#e8e0d2',
    '#f4d5ae',
    '#cab9b5',
    '#94a0b0',
  ];

  if (rotations === 2) {
    if (combined) {
      base.map((color, i) => {
        colors.push(color);
        colors.push(lighter[i]);
      });
    } else {
      colors.push(...base);
      colors.push(...lighter);
    }
  } else if (rotations === 3) {
    if (combined) {
      base.map((color, i) => {
        colors.push(color);
        colors.push(lighter[i]);
        colors.push(lightest[i]);
      });
    } else {
      colors.push(...base);
      colors.push(...lighter);
      colors.push(...lightest);
    }
  } else {
    colors = base;
  }

  return {
    colors,
  };
};

const euiPaletteForLightBackground = function(): EuiPalette {
  return {
    colors: ['#006BB4', '#017D73', '#F5A700', '#BD271E', '#DD0A73'],
  };
};

const euiPaletteForDarkBackground = function(): EuiPalette {
  return {
    colors: ['#1BA9F5', '#7DE2D1', '#F990C0', '#F66', '#FFCE7A'],
  };
};

const coolArray: HEX[] = [
  '#eef6f6',
  euiPaletteColorBlind().colors[1],
  '#00629f',
];
const warmArray: HEX[] = [
  '#fbf2cc',
  euiPaletteColorBlind().colors[7],
  '#bd271e',
];
const positiveColor: HEX = '#209280';
const negativeColor: HEX = '#cc5642';

const euiPaletteForStatus = function(steps: number): EuiPalette {
  return euiPalette([positiveColor, warmArray[0], negativeColor], steps, true);
};

const euiPaletteForTemperature = function(steps: number): EuiPalette {
  return euiPalette(
    coolArray
      .slice()
      .reverse()
      .concat(warmArray),
    steps,
    true
  );
};

const euiPaletteComplimentary = function(steps: number): EuiPalette {
  return euiPalette(
    [euiPaletteColorBlind().colors[7], euiPaletteColorBlind().colors[9]],
    steps,
    true
  );
};

const euiPaletteNegative = function(steps: number): EuiPalette {
  // Palettes starting with white shouldn't actually show a white (invisible) color
  const palette = euiPalette(['#FFF', negativeColor], Number(steps) + 1).colors;
  palette.shift();
  return { colors: palette };
};

const euiPalettePositive = function(steps: number): EuiPalette {
  // Palettes starting with white shouldn't actually show a white (invisible) color
  const palette = euiPalette(['#FFF', positiveColor], Number(steps) + 1).colors;
  palette.shift();
  return { colors: palette };
};

const euiPaletteCool = function(steps: number): EuiPalette {
  // Palettes starting with white shouldn't actually show a white (invisible) color
  const palette = euiPalette(coolArray, Number(steps) + 1).colors;
  palette.shift();
  return { colors: palette };
};

const euiPaletteWarm = function(steps: number): EuiPalette {
  // Palettes starting with white shouldn't actually show a white (invisible) color
  const palette = euiPalette(warmArray, Number(steps) + 1).colors;
  palette.shift();
  return { colors: palette };
};

const euiPaletteGray = function(steps: number): EuiPalette {
  // Palettes starting with white shouldn't actually show a white (invisible) color
  const palette = euiPalette(
    ['#fff', '#d3dae6', '#98a2b3', '#69707d', '#343741'],
    Number(steps) + 1
  ).colors;
  palette.shift();
  return { colors: palette };
};

export const palettes = {
  euiPaletteForLightBackground,
  euiPaletteForDarkBackground,
  euiPaletteColorBlind,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteComplimentary,
  euiPaletteNegative,
  euiPalettePositive,
  euiPaletteCool,
  euiPaletteWarm,
  euiPaletteGray,
};
