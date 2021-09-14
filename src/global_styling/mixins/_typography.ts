/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme, isLegacyTheme } from '../../services/theme';

// Some mixins that help us deal with browser scaling of text more consistently.
// Essentially, fonts across eui should scale against the root html element, not
// against parent inheritance.

// Our base fonts

export const useEuiFont = () => {
  const {
    euiTheme: { font, themeName },
  } = useEuiTheme();
  const legacyTheme = isLegacyTheme(themeName);
  return `
    font-family: ${font.family};
    font-weight: ${font.weight.regular};
    letter-spacing: ${legacyTheme ? '-.005em' : 'normal'};
    text-size-adjust: 100%;
    font-kerning: normal;
  `;
};
