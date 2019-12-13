import { HEX } from './color_types';
import { colorPalette } from './color_palette';

interface EuiPalette {
  colors: string[];
}

const coolArray: HEX[] = ['#00629f', '#3594d6', '#eef6f6'].reverse();
const warmArray: HEX[] = ['#fbf2cc', '#e59145', '#bd271e'];
const positiveColor: HEX = '#209280';
const negativeColor: HEX = '#cc5642';

const euiPaletteColorBlind: EuiPalette = {
  colors: [
    '#4DAC93', // green
    '#3594D6', // blue
    '#D15D75', // dark pink
    '#9170B8', // purple
    '#EEAFCF', // light pink
    '#ADB6DD', // light purple
    '#BAA066', // tan
    '#E59145', // orange
    '#B46F5F', // brown
    '#47688A', // blue-gray
  ],
};

const euiPaletteForLightBackground: EuiPalette = {
  colors: ['#006BB4', '#017D73', '#F5A700', '#BD271E', '#DD0A73'],
};

const euiPaletteForDarkBackground: EuiPalette = {
  colors: ['#1BA9F5', '#7DE2D1', '#F990C0', '#F66', '#FFCE7A'],
};

// createPalette(['#43ad9a', '#fff3b3', '#cc5642'], 10, true),
const euiPaletteForStatus: EuiPalette = {
  colors: colorPalette([positiveColor, warmArray[0], negativeColor], 11, true),
};

const euiPaletteForTemperature: EuiPalette = {
  colors: colorPalette(
    coolArray
      .slice()
      .reverse()
      .concat(warmArray),
    11,
    true
  ),
};

const euiPaletteComplimentary: EuiPalette = {
  colors: colorPalette(['#e59145', '#dddddd', '#47688a'], 11, true),
};

const euiPaletteNegative: EuiPalette = {
  colors: colorPalette(['#f4e7e6', negativeColor], 10),
};

const euiPalettePositive: EuiPalette = {
  colors: colorPalette(['#e9f1f1', positiveColor], 10),
};

const euiPaletteCool: EuiPalette = {
  colors: colorPalette(coolArray, 10),
};

const euiPaletteWarm: EuiPalette = {
  colors: colorPalette(warmArray, 10),
};

const euiPaletteGray: EuiPalette = {
  colors: colorPalette(
    ['#f5f7fa', '#d3dae6', '#98a2b3', '#69707d', '#343741'],
    10
  ),
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
