import chroma from 'chroma-js';
import { rgbDef } from './color_types';

export function calculateLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function calculateContrast(rgb1: rgbDef, rgb2: rgbDef): number {
  let contrast =
    (calculateLuminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05) /
    (calculateLuminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05);

  if (contrast < 1) {
    contrast = 1 / contrast;
  }
  return contrast;
}

export function createNonTextContrast(background: string, foreground: string) {
  let contrast = chroma.contrast(foreground, background);

  // Determine the lightness factor of the background color first to
  // determine whether to shade or tint the foreground.
  const brightness = chroma(background).lab()[0]; // get LAB Lightness value
  let highContrastTextColor = chroma(foreground).hex();

  while (contrast < 3) {
    if (brightness > 50) {
      highContrastTextColor = chroma(highContrastTextColor)
        .darken(0.1)
        .hex();
    } else {
      highContrastTextColor = chroma(highContrastTextColor)
        .brighten(0.1)
        .hex();
    }

    contrast = chroma.contrast(highContrastTextColor, background);

    // @if (lightness($highContrastTextColor) < 5) {
    //   @warn 'High enough contrast could not be determined. Most likely your background color does not adjust for light mode.';
    //   @return $highContrastTextColor;
    // }

    // @if (lightness($highContrastTextColor) > 95) {
    //   @warn 'High enough contrast could not be determined. Most likely your background color does not adjust for dark mode.';
    //   @return $highContrastTextColor;
    // }
  }

  return highContrastTextColor;
}
