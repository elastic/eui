/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { euiScreenReaderOnly } from '../accessibility';

export const euiMarkStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiMark: css`
      ${highContrastModeStyles(euiThemeContext, {
        // Override the browser's black color.
        // Can't use 'inherit' because the text to background color contrast may not be sufficient
        none: `
          color: ${euiTheme.colors.textParagraph};
          background-color: ${euiTheme.components.markBackground};
        `,
        // `!important` is required here because some marked text links
        // (e.g. EuiSideNav) will take precedence otherwise
        preferred: `
          color: ${euiTheme.colors.emptyShade} !important;
          background-color: ${euiTheme.colors.backgroundFilledPrimary};
        `,
      })}
      font-weight: ${euiTheme.font.weight.bold};
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
