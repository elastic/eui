// Array of color-blind safe colors to use in visualizations or other
// spots that need a large range of varied, qualitative colors.
import { palettes } from '../../services/color/eui_palettes';

export const VISUALIZATION_COLORS = palettes.euiPaletteColorBlind.colors;

export const DEFAULT_VISUALIZATION_COLOR = VISUALIZATION_COLORS[1];
