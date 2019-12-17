import { HEX } from './color_types';
import { colorPalette } from './color_palette';

interface EuiPalette {
  colors: string[];
}

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
    '#8EC5B4',
    '#7FB0DF',
    '#DF8795',
    '#AB92C6',
    '#EDD6E5',
    '#D3D6E6',
    '#D2BF9B',
    '#F3B379',
    '#C19489',
    '#6484A8',
  ];

  const lightest = [
    '#C8DED7',
    '#B5CDE7',
    '#E9AFB7',
    '#C4B5D3',
    '#FBF8FB',
    '#E5E5E5',
    '#E8E0D2',
    '#F4D5AE',
    '#CAB9B5',
    '#94A0B0',
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

const positiveColor: HEX = '#209280';
const negativeColor: HEX = '#CC5642';
const lightNegativeColor: HEX = '#E37660';
const coolArray: HEX[] = [euiPaletteColorBlind().colors[1], '#6092C0'];
const warmArray: HEX[] = [euiPaletteColorBlind().colors[7], negativeColor];

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
  const midColor = '#F4F3DB';
  const cools = colorPalette([...coolArray.slice().reverse(), midColor], 3);
  const warms = colorPalette([midColor, ...warmArray], 3);

  if (steps === 1) {
    return { colors: [cools[0]] };
  } else if (steps <= 3) {
    return euiPalette([cools[0], midColor, lightNegativeColor], steps, true);
  }

  return euiPalette([...cools, ...warms], steps, true);
};

const euiPaletteComplimentary = function(steps: number): EuiPalette {
  if (steps === 1) {
    return { colors: [euiPaletteColorBlind().colors[7]] };
  }

  return euiPalette(
    [euiPaletteColorBlind().colors[7], euiPaletteColorBlind().colors[9]],
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
