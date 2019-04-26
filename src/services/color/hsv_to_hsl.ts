import { HSL, HSV } from './color_types';

/* Ref: https://en.wikipedia.org/wiki/HSL_and_HSV: "HSV to HSL"*/
export function hsvToHsl({ h, s, v }: HSV): HSL {
  const l = v - (v * s) / 2;
  const lCheck = Math.min(l, l - 1);
  s = lCheck ? Math.abs((v - l) / lCheck) : 0;

  return {
    h,
    s: Number(s.toFixed(2)),
    l: Number(l.toFixed(2)),
  };
}
