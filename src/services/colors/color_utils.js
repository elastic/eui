/**
 * This function calculates if the text on a given background color needs to
 * be light or dark for better readability.
 * The color must be specified via its red, green and blue value in the range of
 * 0 to 255.
 * The formular is based on this Stackoverflow answer: https://stackoverflow.com/a/3943023
 * which itself is based upon the WCAG recommendation for color contrast.
 *
 * @param {number} red The red component in the range 0 to 255
 * @param {number} green The green component in the range 0 to 255
 * @param {number} blue The blue component in the range 0 to 255
 * @returns {boolean} True if the background requires light text on it, false otherwise.
 */
function requiresLightText(red, green, blue) {
  const [r, g, b] = [red, green, blue]
    .map(c => c / 255.0)
    .map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance <= 0.179;
}

export { requiresLightText };
