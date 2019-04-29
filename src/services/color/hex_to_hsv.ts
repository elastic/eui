// Convert hexadecimal color into an array of RGB integer values
// Modified from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

import { hexToRgb } from './hex_to_rgb';
import { rgbToHsv } from './rgb_to_hsv';
import { HEX, HSV } from './color_types';

export function hexToHsv(hex: HEX): HSV {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsv({ r, g, b });
}
