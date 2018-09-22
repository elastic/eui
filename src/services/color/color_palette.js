import { palettes } from './eui_palettes';

/**
 * This function takes a color palette name and returns an array of hex color
 * codes for use in UI elements such as charts.
 *
 * @param {string} paletteName Required. The name of the palette being requested
 * Set paletteName to "custom" and provide two hex color codes for a custom palette
 * @param {string} hexStart The beginning hexidecimal color code
 * @param {string} hexEnd The ending hexidecimal color code
 * @param {number} len The number of colors in the resulting array (default 10)
 * @returns {Array} Returns an array of hexidecimal color codes
 */

function colorPalette(paletteName, hexStart, hexEnd, len = 10) {
  if (typeof paletteName !== 'undefined' && paletteName !== 'custom') {
    try {
      const palette = palettes[paletteName]; // get the palette
      const hexColors = palette.colors; // get the palette colors
      return hexColors;
    } catch(e) {
      const availablePalettes = Object.keys(palettes);
      throw new Error(`${paletteName} is not a valid palette name. Please select from ${availablePalettes}`);
    }
  } else if (paletteName === 'custom') {
    if (isHex(hexStart) && isHex(hexEnd)) {
      const hex1 = formatHex(hexStart);
      const hex2 = formatHex(hexEnd);
      const customColors = generatePalette(hex1, hex2, len); // generate custom palette
      return customColors;
    } else {
      throw new Error('Please provide two valid hex color codes.');
    }
  }
}

/**
 * Check if argument is a valid 3 or 6 character hexidecimal color code
 */
function isHex(value) {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 * Check if value can be interpreted as a number for subsequent math operations
 */
function isValid(c) {
  let valid = 'n';
  if ((!isNaN(c[0])) && (!isNaN(c[1])) && (!isNaN(c[2]))) {valid = 'y';}
  return valid;
}

/**
 * Calculate and construct the hexideciaml color code from RGB values
 */
function createHex(c) {
  let result = '';
  let k = 0;
  let val = 0;
  let piece;
  const d = 1;
  const base = 16;
  for (k = 0; k < 3; k++) {
    val = Math.round(c[k] / d);
    piece = val.toString(base); // Converts to radix 16 based value (0-9, A-F)
    if (piece.length < 2) {piece = `0${piece}`;}
    result = result + piece;
  }
  result = `#${result.toUpperCase()}`; // Return in #RRGGBB fomat
  return result;
}

/**
 * Create the color object for manipulation by other functions
 */
class Color {
  constructor(r, g, b) {
    this.r = r; // Red value
    this.g = g; // Green value
    this.b = b; // Blue value
    this.collection = new Array(r, g, b);
    this.valid = isValid(this.collection);
    this.text = createHex(this.collection);
  }
}

/**
 * Convert hexideciaml color into an array of RGB integer values
 */
function colorParse(color) {
  const m = 1;
  const base = 16;
  let a;
  let b;
  let c = color.toUpperCase();
  let col = c.replace(/[\#\(]*/i, '');

  if (col.length === 3) {
    a = col.substr(0, 1);
    b = col.substr(1, 1);
    c = col.substr(2, 1);
    col = a + a + b + b + c + c;
  }
  const num = new Array(col.substr(0, 2), col.substr(2, 2), col.substr(4, 2));
  const ret = new Array(parseInt(num[0], base) * m, parseInt(num[1], base) * m, parseInt(num[2], base) * m);
  return(ret);
}

/**
 * Format hexideciaml inputs to #RRGGBB
 */
function formatHex(hex) {
  let cleanHex = hex;
  if (cleanHex.length === 3 || cleanHex.length === 6) {
    cleanHex = `#${cleanHex}`;
  }
  if (cleanHex.length === 4) {
    cleanHex = cleanHex.split('');
    cleanHex = cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2] + cleanHex[3] + cleanHex[3];
  }
  return cleanHex;
}

/**
 * Calculate the step increment for each piece of the hexidecimal color code
 */
function stepCalc(st, cStart, cEnd) {
  const steps = st;
  const step = new Array(3);
  step[0] = (cEnd.r - cStart.r) / steps; // Calc step amount for red value
  step[1] = (cEnd.g - cStart.g) / steps; // Calc step amount for green value
  step[2] = (cEnd.b - cStart.b) / steps; // Calc step amount for blue value

  return step;
}

/**
 * Generate a custom plette array from two hexidecimal color code values
 */
function generatePalette(start, end, len) {
  const colorArray = new Array();
  const hexPalette = new Array();
  const count = len - 1;
  const startHex = colorParse(start);
  const endHex = colorParse(end);
  let i = 1;
  let step = new Array(3);
  colorArray[0] = new Color(startHex[0], startHex[1], startHex[2]); // first color
  colorArray[count] = new Color(endHex[0], endHex[1], endHex[2]); // last color
  step = stepCalc(count, colorArray[0], colorArray[count]); // get array of step increments
  hexPalette[0] = colorArray[0].text; // set the first index value of the array
  for (i = 1; i < count; i++) {
    // set the intermediate index values of the array
    const r = (colorArray[0].r + (step[0] * i));
    const g = (colorArray[0].g + (step[1] * i));
    const b = (colorArray[0].b + (step[2] * i));
    colorArray[i] = new Color(r, g, b);
    hexPalette[i] = colorArray[i].text;
  } // all the colors in between
  hexPalette[count] = colorArray[count].text; // set the last index value of the array

  return hexPalette;
}

export { colorPalette };
