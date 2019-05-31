import { HSV, RGB } from './color_types';

export function rgbToHsv({ r, g, b }: RGB): HSV {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue;
  const value = max;
  const saturation = max === 0 ? 0 : delta / max;
  switch (max) {
    case min:
    default:
      hue = 0;
      break;
    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      hue = (b - r) / delta + 2;
      break;
    case b:
      hue = (r - g) / delta + 4;
      break;
  }
  return {
    h: hue * 60,
    s: saturation,
    v: value,
  };
}
