/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/css';
import { UseEuiTheme } from '../../services';

// Note: These styles must be in a separate file due to using `css` from `@emotion/css`
// (i.e., applying styles in vanilla JS / directly to DOM nodes instead of React)

export const euiCodeBlockLineStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCodeBlock__line: css`
      display: block;
    `,
    hasLineNumbers: css`
      display: flex;
      user-select: none;
    `,
    lineText: {
      euiCodeBlock__lineText: css`
        flex-grow: 1;
        display: inline-block;
        padding-inline-start: ${euiTheme.size.m};
        border-inline-start: ${euiTheme.border.thin};
        user-select: text;
      `,
      isHighlighted: css`
        background: ${euiTheme.colors.backgroundBasePrimary};
        border-inline-start: ${euiTheme.border.width.thick} solid
          ${euiTheme.colors.primary};
      `,
    },
    lineNumber: {
      euiCodeBlock__lineNumberWrapper: css`
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;
        user-select: none;
        padding-inline-end: ${euiTheme.size.m};
        box-sizing: content-box; /* Width is calculated in JS and padding needs to be added on to that value */
      `,
      euiCodeBlock__lineNumber: css`
        color: ${euiTheme.colors.subduedText};
        text-align: end;
        display: block;

        /* Note: This must use a CSS pseudo element to print the line number
           to prevent line numbers from being copied as text */
        &::before {
          content: attr(data-line-number);
        }
      `,
    },
  };
};
