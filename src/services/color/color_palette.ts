import { rgbDef } from './color_types';
import { hexToRgb } from './hex_to_rgb';

/**
 * Create the color object for manipulation by other functions
 */
class Color {
  collection: rgbDef;
  text: string;

  constructor(public r: number, public g: number, public b: number) {
    this.collection = [r, g, b];
    this.text = createHex(this.collection);
  }
}

/**
 * This function takes a color palette name and returns an array of hex color
 * codes for use in UI elements such as charts.
 *
 * @param {string} hexStart The beginning hexadecimal color code
 * @param {string} hexEnd The ending hexadecimal color code
 * @param {number} len The number of colors in the resulting array (default 10)
 * @returns {Array} Returns an array of hexadecimal color codes
 */

export function colorPalette(
  hexStart: string,
  hexEnd: string,
  len: number = 10
) {
  if (isHex(hexStart) && isHex(hexEnd)) {
    const colorArray: Color[] = [];
    const hexPalette: string[] = [];
    const count = len - 1;
    const startHex = hexToRgb(hexStart); // get RGB equivalent values as array
    const endHex = hexToRgb(hexEnd); // get RGB equivalent values as array
    colorArray[0] = new Color(startHex[0], startHex[1], startHex[2]); // create first color obj
    colorArray[count] = new Color(endHex[0], endHex[1], endHex[2]); // create last color obj
    const step = stepCalc(count, colorArray[0], colorArray[count]); // create array of step increments
    // build the color palette array
    hexPalette[0] = colorArray[0].text; // set the first color in the array
    for (let i = 1; i < count; i++) {
      // set the intermediate colors in the array
      const r = colorArray[0].r + step[0] * i;
      const g = colorArray[0].g + step[1] * i;
      const b = colorArray[0].b + step[2] * i;
      colorArray[i] = new Color(r, g, b);
      hexPalette[i] = colorArray[i].text;
    } // all the colors in between
    hexPalette[count] = colorArray[count].text; // set the last color in the array

    return hexPalette;
  } else {
    throw new Error('Please provide two valid hex color codes.');
  }
}

/**
 * Check if argument is a valid 3 or 6 character hexadecimal color code
 */
function isHex(value: string): boolean {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 * Calculate and construct the hexadecimal color code from RGB values
 */
function createHex(rgbValues: rgbDef): string {
  let result = '';
  let val = 0;
  let piece;
  const base = 16;
  for (let k = 0; k < 3; k++) {
    val = Math.round(rgbValues[k]);
    piece = val.toString(base); // Converts to radix 16 based value (0-9, A-F)
    if (piece.length < 2) {
      piece = `0${piece}`;
    }
    result = result + piece;
  }
  result = `#${result.toUpperCase()}`; // Return in #RRGGBB format
  return result;
}

/**
 * Calculate the step increment for each piece of the hexadecimal color code
 */
function stepCalc(st: number, cStart: Color, cEnd: Color): rgbDef {
  const steps = st;
  const step: rgbDef = [
    (cEnd.r - cStart.r) / steps, // Calc step amount for red value
    (cEnd.g - cStart.g) / steps, // Calc step amount for green value
    (cEnd.b - cStart.b) / steps, // Calc step amount for blue value
  ];

  return step;
}
