// Convert hexadecimal color into an array of RGB integer values
// Modified from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

import { hslToRgb } from './hsl_to_rgb';
import { rgbToHex } from './rgb_to_hex';
import { HEX, HSL } from './color_types';

export function hslToHex({ h, s, l }: HSL): HEX {
  const { r, g, b } = hslToRgb({ h, s, l });
  return rgbToHex(`rgb(${r}, ${g}, ${b})`);
}
