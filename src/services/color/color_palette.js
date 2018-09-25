/**
 * Create the color object for manipulation by other functions
 */
class Color {
  constructor(r, g, b) {
    this.r = r; // Red value
    this.g = g; // Green value
    this.b = b; // Blue value
    this.collection = [r, g, b];
    this.text = createHex(this.collection);
  }
}

/**
 * This function takes a color palette name and returns an array of hex color
 * codes for use in UI elements such as charts.
 *
 * @param {string} hexStart The beginning hexidecimal color code
 * @param {string} hexEnd The ending hexidecimal color code
 * @param {number} len The number of colors in the resulting array (default 10)
 * @returns {Array} Returns an array of hexidecimal color codes
 */

function colorPalette(hexStart, hexEnd, len = 10) {
  if (isHex(hexStart) && isHex(hexEnd)) {
    const hex1 = formatHex(hexStart); // format to #RRGGBB
    const hex2 = formatHex(hexEnd); // format to #RRGGBB
    const colorArray = [];
    const hexPalette = [];
    const count = len - 1;
    const startHex = colorParse(hex1); // get RGB equivalent values as array
    const endHex = colorParse(hex2); // get RGB equivalent values as array
    colorArray[0] = new Color(startHex[0], startHex[1], startHex[2]); // create first color obj
    colorArray[count] = new Color(endHex[0], endHex[1], endHex[2]); // create last color obj
    const step = stepCalc(count, colorArray[0], colorArray[count]); // create array of step increments
    // build the color palette array
    hexPalette[0] = colorArray[0].text; // set the first color in the array
    for (let i = 1; i < count; i++) {
      // set the intermediate colors in the array
      const r = (colorArray[0].r + (step[0] * i));
      const g = (colorArray[0].g + (step[1] * i));
      const b = (colorArray[0].b + (step[2] * i));
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
 * Check if argument is a valid 3 or 6 character hexidecimal color code
 */
function isHex(value) {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 * Calculate and construct the hexideciaml color code from RGB values
 */
function createHex(rgbValues) {
  let result = '';
  let val = 0;
  let piece;
  const base = 16;
  for (let k = 0; k < 3; k++) {
    val = Math.round(rgbValues[k]);
    piece = val.toString(base); // Converts to radix 16 based value (0-9, A-F)
    if (piece.length < 2) {piece = `0${piece}`;}
    result = result + piece;
  }
  result = `#${result.toUpperCase()}`; // Return in #RRGGBB fomat
  return result;
}

/**
 * Convert hexideciaml color into an array of RGB integer values
 */
function colorParse(color) {
  const base = 16;
  let col = color.toUpperCase().replace('#', '');

  if (col.length === 3) {
    const a = col.substr(0, 1);
    const b = col.substr(1, 1);
    const c = col.substr(2, 1);
    col = a + a + b + b + c + c;
  }
  const num = [col.substr(0, 2), col.substr(2, 2), col.substr(4, 2)];
  const ret = [parseInt(num[0], base), parseInt(num[1], base), parseInt(num[2], base)];
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
  const step = [
    (cEnd.r - cStart.r) / steps, // Calc step amount for red value
    (cEnd.g - cStart.g) / steps, // Calc step amount for green value
    (cEnd.b - cStart.b) / steps, // Calc step amount for blue value
  ];

  return step;
}

export { colorPalette };
