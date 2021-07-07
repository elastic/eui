/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * This function returns the same string with the first letter of the first word capitalized.
 *
 * @param {string} string The input string
 */

export function toSentenceCase(string: string): string {
  // First lowercase all letters
  const lowercase = string.toLowerCase();

  // Then just uppercase the first letter;
  return string.charAt(0).toUpperCase() + lowercase.slice(1);
}
