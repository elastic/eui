import { HSL, RGB } from './color_types';

/* Ref: http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl : "RGB – HSL" */
export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  let h;
  let s;
  const l = (min + max) / 2;

  if (min === max) {
    h = s = 0;
  } else {
    const range = max - min;
    s = l > 0.5 ? range / (2 - range) : range / (max + min);

    switch (max) {
      case r:
        h = (g - b) / range;
        break;
      case g:
        h = 2 + (b - r) / range;
        break;
      case b:
      default:
        h = 4 + (r - g) / range;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h = h + 360;
    }
  }

  return {
    h,
    s: Number(s.toFixed(2)),
    l: Number(l.toFixed(2)),
  };
}
