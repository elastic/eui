import { HSL, HSV } from './color_types';

/* Ref: https://en.wikipedia.org/wiki/HSL_and_HSV: "HSV to HSL"*/
export function hslToHsv({ h, s, l }: HSL): HSV {
  const v = s * Math.min(l, 1 - l) + l;
  s = v ? 2 - (2 * l) / v : 0;

  return {
    h,
    s: Number(s.toFixed(2)),
    v: Number(v.toFixed(2)),
  };
}
