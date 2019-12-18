import { HEX } from './color_types';
import { colorPalette } from './color_palette';
import { flatten } from 'lodash';

interface EuiPalette {
  colors: string[];
}

const euiPalette = function(
  colors: string[],
  steps: number,
  diverge: boolean = false
): EuiPalette {
  // This function also trims the lightest color so white is never a color
  if (!diverge && steps > 1) {
    const palette = colorPalette(colors, steps + 1);
    palette.shift();
    return { colors: palette };
  }

  return { colors: colorPalette(colors, steps, diverge) };
};

const euiPaletteColorBlind = function(
  /**
   * How many variations of the series is needed
   */
  rotations: number = 1,
  /**
   * Should similar colors be grouped (true) or just append each variation (false)
   */
  combined: boolean = false
): EuiPalette {
  let colors: string[] = [];

  const base = [
    '#5BBAA0', // 0 green
    '#6092C0', // 1 blue
    '#D36086', // 2 dark pink
    '#9170B8', // 3 purple
    '#EEAFCF', // 4 light pink
    '#FAE181', // 5 yellow
    '#CDBD9D', // 6 tan
    '#F19F58', // 7 orange
    '#B46F5F', // 8 brown
    '#E7664C', // 9 red
  ];

  if (rotations > 1) {
    const palettes = base.map(color =>
      euiPalette(['white', color], rotations).colors.reverse()
    );

    if (combined) {
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

  return { colors };
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

const positiveColor: HEX = '#209280';
const negativeColor: HEX = '#CC5642';
const lightNegativeColor: HEX = euiPaletteColorBlind().colors[9];
const coolArray: HEX[] = [euiPaletteColorBlind().colors[1], '#6092C0'];
const warmArray: HEX[] = [euiPaletteColorBlind().colors[7], negativeColor];

const euiPaletteForStatus = function(steps: number): EuiPalette {
  if (steps === 1) {
    return {
      colors: [euiPaletteColorBlind().colors[0]],
    };
  }
  if (steps <= 3) {
    return euiPalette(
      [euiPaletteColorBlind().colors[0], lightNegativeColor],
      steps,
      true
    );
  }

  return euiPalette([positiveColor, negativeColor], steps, true);
};

const euiPaletteForTemperature = function(steps: number): EuiPalette {
  const cools = colorPalette([...coolArray.slice().reverse(), '#EBEFF5'], 3);
  const warms = colorPalette(['#F4F3DB', ...warmArray], 3);

  if (steps === 1) {
    return { colors: [cools[0]] };
  } else if (steps <= 3) {
    return euiPalette([cools[0], lightNegativeColor], steps, true);
  }

  return euiPalette([...cools, ...warms], steps, true);
};

const euiPaletteComplimentary = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: [euiPaletteColorBlind().colors[1]] };
  }

  return euiPalette(
    [euiPaletteColorBlind().colors[1], euiPaletteColorBlind().colors[7]],
    steps,
    true
  );
};

const euiPaletteNegative = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: [lightNegativeColor] };
  }

  return euiPalette(['white', negativeColor], steps);
};

const euiPalettePositive = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: [euiPaletteColorBlind().colors[0]] };
  }

  return euiPalette(['white', positiveColor], steps);
};

const euiPaletteCool = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: [coolArray[1]] };
  }

  return euiPalette(['white', ...coolArray], steps);
};

const euiPaletteWarm = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: [lightNegativeColor] };
  }

  return euiPalette(['#FBFBDC', ...warmArray], steps);
};

const euiPaletteGray = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: ['#98a2b3'] };
  }

  return euiPalette(
    ['white', '#d3dae6', '#98a2b3', '#69707d', '#343741'],
    steps,
    false
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
