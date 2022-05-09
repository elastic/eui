/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';

// Provides a solid reset and base for handling sizing layout
// Does not include any visual styles
export const euiButtonBaseCSS = ({ euiTheme }: UseEuiTheme) => {
  // TODO button variables should live outside of this function
  const euiButtonHeight = euiTheme.size.xxl;

  return `
  display: inline-block;
  appearance: none;
  cursor: pointer;
  height: ${euiButtonHeight};
  line-height: ${euiButtonHeight}; // prevents descenders from getting cut off
  text-align: center;
  white-space: nowrap;
  max-width: 100%;
  vertical-align: middle;
`;
};
