/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalShorthandCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiCodeSyntaxColors, euiCodeSyntaxTokens } from './code_syntax.styles';

export const euiCodeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiCodeSyntax = euiCodeSyntaxColors(euiThemeContext);

  return {
    /*
     * 1. Size the code against the text its embedded within.
     */
    euiCode: css`
      font-family: ${euiTheme.font.familyCode};
      font-size: 0.9em; /* 1 */
      ${logicalShorthandCSS('padding', '0.2em 0.5em')} /* 1 */
      background: ${euiCodeSyntax.backgroundColor};
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.bold};
      color: ${euiCodeSyntax.inlineCodeColor};

      ${euiCodeSyntaxTokens(euiThemeContext)}
    `,
    transparentBackground: css`
      background: transparent;
    `,
  };
};
