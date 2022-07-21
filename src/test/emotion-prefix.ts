/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const replaceEmotionPrefix = (selector: string) => {
  // Matches the Emotion className pattern + the EUI variant naming convention.
  // Starts with `css-[hash]-`.
  // Contains `eui[ComponentName] or `Eui[ComponentName]`.
  // Capture the component name (from above) and all variant additions until the end of the string.
  const euiMatch = selector.match(
    /css-[\d\w]{5,}-(?<euiComponent>[eE]ui[A-Z][\d\w-]*$)/
  );
  // Use the captured group (`euiComponent`) if available and prepend with `emotion-`,
  // otherwise use the full selector.
  return euiMatch?.groups?.euiComponent
    ? `emotion-${euiMatch.groups.euiComponent}`
    : selector;
};
