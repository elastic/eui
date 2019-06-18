/**
 * This function returns the same string with the first letter of the first word capitalized.
 *
 * @param {string} strint The input string
 */

export function toSentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
