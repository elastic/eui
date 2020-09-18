/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
 * @returns {string} True if the color is dark, false otherwise.
 */

export const MAX_INITIALS = 2;

export function toInitials(
  name: string,
  initialsLength?: 1 | 2,
  initials?: string
): string | null {
  // Calculate the number of initials to show, maxing out at MAX_INITIALS
  let calculatedInitialsLength: number = initials
    ? initials.split(' ').length
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

  return calculatedInitials;
}
