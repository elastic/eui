import { HSL, RGB } from './color_types';

/* Ref: https://en.wikipedia.org/wiki/HSL_and_HSV: "HSL to RGB"*/
export function hslToRgb({ h, s, l }: HSL): RGB {
  let r;
  let g;
  let b;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const k = h / 60;
  const x = c * (1 - Math.abs((k % 2) - 1));
  const m = l - c / 2;

  r = g = b = 0;

  if (k >= 0 && k <= 1) {
    r = c;
    g = x;
  }
  if (k > 1 && k <= 2) {
    r = x;
    g = c;
  }
  if (k > 2 && k <= 3) {
    g = c;
    b = x;
  }
  if (k > 3 && k <= 4) {
    g = x;
    b = c;
  }
  if (k > 4 && k <= 5) {
    r = x;
    b = c;
  }
  if (k > 5 && k <= 6) {
    r = c;
    b = x;
  }

  r += m;
  g += m;
  b += m;

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
