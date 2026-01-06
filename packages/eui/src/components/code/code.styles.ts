/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  highContrastModeStyles,
  logicalShorthandCSS,
  logicalCSS,
  euiLineHeightFromBaseline,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiCodeSyntaxVariables } from './code_syntax.styles';

export const euiCodeStyles = (euiThemeContext: UseEuiTheme) => {
  const codeSyntaxVariables = euiCodeSyntaxVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;
  // Get line-height for 's' scale (0.9em relative to parent 'm' scale)
  // Since code is 0.9em, we need to calculate line-height based on the effective font size
  // Parent is typically 'm' scale, so 0.9em of 'm' is approximately 's' scale
  const lineHeight = euiLineHeightFromBaseline('s', euiTheme);

  return {
    /*
     * 1. Size the code against the text its embedded within.
     */
    euiCode: css`
      font-family: ${euiTheme.font.familyCode};
      font-size: 0.9em; /* 1 */
      line-height: ${lineHeight}; /* Match text line heights */
      ${logicalCSS('height', '20px')} /* Fixed height of 20px */
      ${logicalShorthandCSS('padding', '0 0.5em')} /* 1 - Remove vertical padding to maintain 20px height */
      background-color: ${codeSyntaxVariables.inlineBackgroundColor};
      ${highContrastModeStyles(euiThemeContext, {
        forced: `
          border: ${euiTheme.border.thin};
        `,
      })}
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.bold};
      color: ${codeSyntaxVariables.inlineCodeColor};

      ${codeSyntaxVariables.tokensCss}

      .token.atrule .token.rule,
      .token.keyword {
        color: ${codeSyntaxVariables.inlineCodeKeywordColor};
      }
    `,
    transparentBackground: css`
      background: transparent;
    `,
  };
};
