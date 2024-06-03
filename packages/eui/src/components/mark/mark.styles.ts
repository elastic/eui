/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../services';
import { euiScreenReaderOnly } from '../accessibility';

export const euiMarkStyles = ({ euiTheme, colorMode }: UseEuiTheme) => {
  // TODO: Was $euiFocusBackgroundColor
  const transparency = { LIGHT: 0.1, DARK: 0.3 };

  return {
    euiMark: css`
      background-color: ${transparentize(
        euiTheme.colors.primary,
        transparency[colorMode]
      )};
      font-weight: ${euiTheme.font.weight.bold};
      /* Override the browser's black color.
         Can't use 'inherit' because the text to background color contrast may not be sufficient */
      color: ${euiTheme.colors.text};
    `,
  };
};

export const euiMarkScreenReaderStyles = (
  highlightStart: string,
  highlightEnd: string
) => {
  return {
    hasScreenReaderHelpText: css`
      &::before,
      &::after {
        ${euiScreenReaderOnly()}
      }

      &::before {
        content: ' [${highlightStart}] ';
      }

      &::after {
        content: ' [${highlightEnd}] ';
      }
    `,
  };
};
