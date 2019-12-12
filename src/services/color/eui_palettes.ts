interface EuiPalette {
  colors: string[];
}

const euiPaletteColorBlind: EuiPalette = {
  colors: [
    '#4DAC93',
    '#3594D6',
    '#D15D75',
    '#9170B8',
    '#EEAFCF',
    '#ADB6DD',
    '#BAA066',
    '#E59145',
    '#B46F5F',
    '#47688A',
  ],
};

const euiPaletteForLightBackground: EuiPalette = {
  colors: ['#006BB4', '#017D73', '#F5A700', '#BD271E', '#DD0A73'],
};

const euiPaletteForDarkBackground: EuiPalette = {
  colors: ['#1BA9F5', '#7DE2D1', '#F990C0', '#F66', '#FFCE7A'],
};

const euiPaletteForStatus: EuiPalette = {
  colors: [
    '#58BA6D',
    '#6ECE67',
    '#A5E26A',
    '#D2E26A',
    '#EBDF61',
    '#EBD361',
    '#EBC461',
    '#D99D4C',
    '#D97E4C',
    '#D75949',
  ],
};

export const palettes = {
  euiPaletteColorBlind,
  euiPaletteForLightBackground,
  euiPaletteForDarkBackground,
  euiPaletteForStatus,
};
