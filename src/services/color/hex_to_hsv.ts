import { hexToRgb } from './hex_to_rgb';
import { rgbToHsv } from './rgb_to_hsv';
import { HEX, HSV } from './color_types';

export function hexToHsv(hex: HEX): HSV {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsv({ r, g, b });
}
