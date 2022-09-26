/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiCodeBlockColors, euiCodeSyntaxTokens } from './code_block.styles';

export const euiCodeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiCode = euiCodeBlockColors(euiThemeContext);

  return {
    /*
     * 1. Size the code against the text its embedded within.
     */
    euiCode: css`
      font-family: ${euiTheme.font.familyCode};
      font-size: 0.9em; /* 1 */
      padding: 0.2em 0.5em; /* 1 */
      background: ${euiCode.backgroundColor};
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.bold};
      color: ${euiCode.inlineCodeColor};

      ${euiCodeSyntaxTokens(euiThemeContext)};
    `,
    transparentBackground: css`
      background: transparent;
    `,
  };
};
