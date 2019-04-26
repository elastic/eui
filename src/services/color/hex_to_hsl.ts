// Convert hexadecimal color into an array of RGB integer values
// Modified from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

import { hexToRgb } from './hex_to_rgb';
import { rgbToHsl } from './rgb_to_hsl';
import { HEX, HSL } from './color_types';

export function hexToHsl(hex: HEX): HSL {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsl({ r, g, b });
}
