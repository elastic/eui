import { hsvToRgb } from './hsv_to_rgb';
import { rgbToHex } from './rgb_to_hex';
import { HEX, HSV } from './color_types';

export function hsvToHex({ h, s, v }: HSV): HEX {
  const { r, g, b } = hsvToRgb({ h, s, v });
  return rgbToHex(`rgb(${r}, ${g}, ${b})`);
}
