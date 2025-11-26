/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const MAX_INITIALS = 2;

/**
 * This function calculates the initials/acronym for a given name.
 * It defaults to only 2 characters and will take the first character (of each word).
 * If only one word is supplied for the name, it will only pass back the first letter of the word,
 * unless forced to 2 letters by setting `initialsLength` to `2`.
 * It will pass back the characters with the same casing as the original string
 * unless otherwise specified.
 *
 * @param {string} name The full name of the item to turn into initials
 * @param {number} initialsLength (Optional) How many characters to show (max 2 allowed)
 * @param {string} initials (Optional) Custom initials (max 2 characters)
 */
export function toInitials(
  name: string,
  initialsLength?: 1 | 2,
  initials?: string
) {
  // If `initials` provided, check if it's a single emoji
  // in order to support complex, "multi-character" ones
  if (initials && typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    const segments = Array.from(segmenter.segment(initials));

    if (segments.length === 1 && isEmoji(segments[0].segment)) {
      return segments[0].segment;
    }
  }

  // Calculate the number of initials to show, maxing out at MAX_INITIALS
  let calculatedInitialsLength: number = initials
    ? initials.split('').length
    : name.split(' ').length;

  calculatedInitialsLength =
    calculatedInitialsLength > MAX_INITIALS
      ? MAX_INITIALS
      : calculatedInitialsLength;

  // Check if initialsLength was passed and set to calculated, unless greater than MAX_INITIALS
  if (initialsLength) {
    calculatedInitialsLength =
      initialsLength <= MAX_INITIALS ? initialsLength : MAX_INITIALS;
  }

  let calculatedInitials;
  // A. Set to initials prop if exists (but truncate to 2 characters max unless length is supplied)
  if (initials) {
    calculatedInitials = initials.substring(0, calculatedInitialsLength);
  } else {
    if (name.trim() && name.split(' ').length > 1) {
      // B. If there are any spaces in the name, set to first letter of each word
      calculatedInitials = name.match(/\b(\w)/g);
      calculatedInitials =
        calculatedInitials &&
        calculatedInitials.join('').substring(0, calculatedInitialsLength);
    } else {
      // C. Set to the name's initials truncated based on calculated length
      calculatedInitials = name.substring(0, calculatedInitialsLength);
    }
  }

  return calculatedInitials || '';
}

function isEmoji(str: string) {
  /**
   * The \p escape sequence allows matching a character based on its Unicode properties
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
   * @see https://www.unicode.org/Public/UCD/latest/ucd/emoji/emoji-data.txt
   * @see https://www.unicode.org/reports/tr51/#Definitions
   * @see https://util.unicode.org/UnicodeJsps/character.jsp?a=1F440&B1=Show
   */
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
  return emojiRegex.test(str);
}
