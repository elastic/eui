interface EuiPalette {
  colors: string[];
}

const euiPaletteColorBlind: EuiPalette = {
  colors: [
    '#1EA593',
    '#2B70F7',
    '#CE0060',
    '#38007E',
    '#FCA5D3',
    '#F37020',
    '#E49E29',
    '#B0916F',
    '#7B000B',
    '#34130C',
  ],
};

const euiPaletteForLightBackground: EuiPalette = {
  colors: [
    '#006BB4',
    '#017D73',
    '#F5A700',
    '#BD271E',
    '#DD0A73',
  ],
};

const euiPaletteForDarkBackground: EuiPalette = {
  colors: [
    '#4DA1C0',
    '#01B2A4',
    '#C06C4C',
    '#BF4D4D',
    '#F5258C',
  ],
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
