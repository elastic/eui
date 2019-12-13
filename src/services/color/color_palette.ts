import chroma from 'chroma-js';

const MID_COLOR_STOP = '#F5F7FA';

/**
 * This function takes a color palette name and returns an array of hex color
 * codes for use in UI elements such as charts.
 * https://github.com/gka/palettes
 *
 */

export function colorPalette(
  /**
   * The beginning hexadecimal color code or array of codes
   */
  hexStart: string[],
  /**
   * The number of colors in the resulting array (default 10)
   */
  len: number = 10,
  /**
   * Forces color interpolation to be calculated separately for each side (default false)
   */
  diverging: boolean = false,
  /**
   * Uses a more static interpolation for non-continuous spectrums
   */
  categorical: boolean = true
) {
  let hexEnd: string[] = [];

  // If diverging, but the end array is empty, split the start array and duplicate the mid color
  if (diverging) {
    const numColorsHalf = Math.ceil(hexStart.length / 2);

    const colorsLeft = diverging
      ? hexStart.filter(function(item, index) {
          if (index < numColorsHalf) {
            return true; // keep it
          }
        })
      : hexStart;
    const colorsRight = diverging
      ? hexStart
          .reverse()
          .filter(function(item, index) {
            if (index < numColorsHalf) {
              return true; // keep it
            }
          })
          .reverse()
      : [];

    hexStart = colorsLeft;
    hexEnd = colorsRight;
  }

  const even = len % 2 === 0;
  const numColorsLeft = diverging ? Math.ceil(len / 2) + (even ? 1 : 0) : len;
  const numColorsRight = diverging ? Math.ceil(len / 2) + (even ? 1 : 0) : 0;

  // If only a single color is provided append the mid-point color
  if (hexStart.length === 1) {
    diverging
      ? hexStart.push(MID_COLOR_STOP)
      : hexStart.unshift(MID_COLOR_STOP);
  }
  if (hexEnd.length === 1 && diverging) {
    hexEnd.unshift(MID_COLOR_STOP);
  }

  function createSteps(colors: string[], steps: number) {
    if (!colors.length) {
      return colors;
    }

    if (!categorical) {
      return chroma
        .bezier(colors)
        .scale()
        .correctLightness()
        .colors(steps);
    } else {
      return chroma.scale(colors).colors(steps);
    }
  }

  const stepsLeft = createSteps(hexStart, numColorsLeft);
  const stepsRight = createSteps(hexEnd, numColorsRight);

  return (even && diverging
    ? stepsLeft.slice(0, stepsLeft.length - 1)
    : stepsLeft
  ).concat(stepsRight.slice(1));
}
