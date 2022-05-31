/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/*
 * Mixin that hides elements offscreen to only be read by screen reader
 * See https://github.com/elastic/eui/pull/5130 and https://github.com/elastic/eui/pull/5152 for more info
 */
export const euiScreenReaderOnly = () => `
  // Take the element out of the layout
  position: absolute;
  // Keep it vertically inline
  top: auto;
  // Chrome requires a left value, and Selenium (used by Kibana's FTR) requires an off-screen position for its .getVisibleText() to not register SR-only text
  left: -10000px;
  // The element must have a size (for some screen readers)
  width: 1px;
  height: 1px;
  // But reduce the visible size to nothing
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  // And ensure no overflows occur
  overflow: hidden;
  // Chrome requires the negative margin to not cause overflows of parent containers
  margin: -1px;
`;
