import chroma from 'chroma-js';
import { range } from 'lodash';
import { HEX } from './color_types';
import { isValidHex } from './is_valid_hex';

const MID_COLOR_STOP = '#F5F7FA';

/**
 * This function takes a color palette name and returns an array of hex color
 * codes for use in UI elements such as charts.
 * https://github.com/gka/palettes
 *
 * @param {HEX | array of HEX} hexStart The beginning hexadecimal color code or array of codes
 * @param {HEX | array of HEX} hexEnd The ending hexadecimal color code or array of codes for diverging schemes
 * @param {number} len The number of colors in the resulting array (default 10)
 * @param {boolean} diverging Forces color interpolation to be calculated separately for each side (default false)
 * @param {boolean} correctLightness Lightness range is spread evenly across a color scale (default true)
 * @param {boolean} bezier Smoothed the multi-stop gradients (default true)
 * @returns {Array} Returns an array of hexadecimal color codes
 */

export function colorPalette(
  hexStart: HEX | HEX[],
  hexEnd: HEX | HEX[] = [],
  len: number = 10,
  diverging: boolean = false,
  correctLightness: boolean = true,
  bezier: boolean = true
) {
  // if hexes are simple strings convert to an array
  hexStart = typeof hexStart === 'string' ? hexStart.split('!') : hexStart;
  hexEnd = typeof hexEnd === 'string' ? hexEnd.split('!') : hexEnd;

  // If diverging is false, combine start and end into one array for continuous
  hexStart = !diverging ? hexStart.concat(hexEnd) : hexStart;
  hexEnd = !diverging ? [] : hexEnd;

  if (diverging && hexEnd.length < 1) {
    const numColorsHalf =
      Math.ceil(hexStart.length / 2) + (hexStart.length % 2 === 0 ? 1 : 0);

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

  // Then validate the colors
  hexStart.map(color => isHex(color));
  hexEnd.map(color => isHex(color));

  const even = len % 2 === 0;
  const numColorsLeft = diverging ? Math.ceil(len / 2) + (even ? 1 : 0) : len;
  const numColorsRight = diverging ? Math.ceil(len / 2) + (even ? 1 : 0) : 0;

  const genColors =
    hexStart.length !== 1
      ? hexStart
      : autoColors(hexStart[0], numColorsLeft, diverging);
  const genColors2 =
    hexEnd.length !== 1
      ? hexEnd
      : autoColors(hexEnd[0], numColorsRight, diverging, true);

  const stepsLeft = hexStart.length
    ? chroma
        .scale(
          // @ts-ignore
          bezier && hexStart.length > 1 ? chroma.bezier(genColors) : genColors
        )
        .correctLightness(correctLightness)
        .colors(numColorsLeft)
    : [];

  const stepsRight =
    diverging && hexEnd.length
      ? chroma
          .scale(
            // @ts-ignore
            bezier && hexEnd.length > 1 ? chroma.bezier(genColors2) : genColors2
          )
          .correctLightness(correctLightness)
          .colors(numColorsRight)
      : [];

  return (even && diverging
    ? stepsLeft.slice(0, stepsLeft.length - 1)
    : stepsLeft
  ).concat(stepsRight.slice(1));
}

/**
 * Check if argument is a valid 3 or 6 character hexadecimal color code
 */
function isHex(value: string): boolean {
  if (isValidHex(value)) {
    return true;
  } else {
    throw new Error('Please provide valid hex color codes with the hash sign.');
  }
}

function autoGradient(
  color: HEX,
  numColors: number,
  diverging: boolean
): chroma.Color[] {
  const lab = chroma(color).lab(); // Convert to LAB format
  const lRange = 100 * (0.95 - 1 / numColors);
  const lStep = lRange / (numColors - 1);
  const lStart = (100 - lRange) * 0.5;
  const theRange = range(lStart, lStart + numColors * lStep, lStep);
  let offset = 0;
  if (!diverging) {
    offset = 9999;
    for (let i = 0; i < numColors; i++) {
      const diff = lab[0] - theRange[i];
      if (Math.abs(diff) < Math.abs(offset)) {
        offset = diff;
      }
    }
  }

  return theRange.map(l => chroma.lab(l + offset, lab[1], lab[2]));
}

function autoColors(
  color: HEX,
  numColors: number,
  diverging: boolean,
  reverse: boolean = false
): chroma.Color[] {
  if (diverging) {
    const colors = autoGradient(color, 3, diverging).concat(
      chroma(MID_COLOR_STOP)
    );
    if (reverse) colors.reverse();
    return colors;
  } else {
    return autoGradient(color, numColors, diverging);
  }
}
