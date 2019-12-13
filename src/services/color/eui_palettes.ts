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
  return {
    colors: colorPalette(colors, steps, diverge),
  };
};

const euiPaletteColorBlind = function(): EuiPalette {
  return {
    colors: [
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
    ],
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
  return euiPalette(['#f4e7e6', negativeColor], steps);
};

const euiPalettePositive = function(steps: number): EuiPalette {
  return euiPalette(['#e9f1f1', positiveColor], steps);
};

const euiPaletteCool = function(steps: number): EuiPalette {
  return euiPalette(coolArray, steps);
};

const euiPaletteWarm = function(steps: number): EuiPalette {
  return euiPalette(warmArray, steps);
};

const euiPaletteGray = function(steps: number): EuiPalette {
  return euiPalette(
    ['#f5f7fa', '#d3dae6', '#98a2b3', '#69707d', '#343741'],
    steps
  );
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
