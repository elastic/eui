// The contents of this file is derived from https://github.com/adamgruber/sass-extract-js by Adam Gruber
// MIT License
// Copyright (c) 2017 Adam Gruber
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*
 * Add escaped quotes around font names other than the generic CSS font families
 * While quotes are not required, they are recommended by the spec
 * https://www.w3.org/TR/css-fonts-3/#generic-font-families
 *
 * @param {string} str Font family name
 *
 * @return {string}
 */
function quoteFontName(str) {
  const genericFonts = [
    'serif',
    'sans-serif',
    'cursive',
    'fantasy',
    'monospace',
  ];
  return genericFonts.includes(str.toLowerCase()) ? str : `'${str}'`;
}

/*
 * Get the CSS value from a sass-extract data structure
 * https://github.com/jgranstrom/sass-extract#general-variable-value-structure
 *
 * @param {object} sassVar Abstract data structure for SASS variable
 *
 * @return {string|int} CSS value
 */
function getSassValue(sassVar) {
  const { type, value } = sassVar;
  switch (type) {
    case 'SassNumber':
      return sassVar.unit ? `${value}${sassVar.unit}` : value;

    case 'SassColor': {
      const { r, g, b, a, hex } = value;
      const hasAlpha = a !== 1;
      return hasAlpha
        ? `rgba(${r.toFixed()}, ${g.toFixed()}, ${b.toFixed()}, ${a})`
        : hex;
    }

    case 'SassList': {
      const isStringList = value.every(item => item.type === 'SassString');
      const newList = value.map(getSassValue);
      return isStringList
        ? newList.map(quoteFontName).join(', ')
        : newList.join(' ');
    }

    case 'SassMap':
      return transformVars(value);

    default:
      return value;
  }
}

/*
 * Transform style object key
 * - Strip leading '$'
 *
 * @param {string} key Style object key
 *
 * @return {string} Converted key
 */
function transformKey(key) {
  return key.replace('$', '');
}

/*
 * Reduce SASS-compiled variables object into theme object
 *
 * @param {object} varsObj Output from `sass-extract` render
 *
 * @return {object} Transformed variables object
 */
function transformVars(varsObj) {
  return Object.keys(varsObj).reduce((acc, key) => {
    const newKey = transformKey(key);
    const newVal = getSassValue(varsObj[key]);
    acc[newKey] = newVal;
    return acc;
  }, {});
}

module.exports = {
  run: () => ({
    postExtract: extractedVariables =>
      transformVars(extractedVariables.global),
  }),
};
