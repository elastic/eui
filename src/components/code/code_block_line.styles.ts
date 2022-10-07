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
import { euiBackgroundColor } from '../../global_styling';
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
        padding-inline-start: ${euiTheme.size.s};
        border-inline-start: ${euiTheme.border.thin};
        user-select: text;
      `,
      isHighlighted: css`
        background: ${euiBackgroundColor(euiThemeContext, 'primary')};
        border-inline-start: ${euiTheme.border.width.thick} solid
          ${euiTheme.colors.primary};
      `,
    },
    lineNumber: {
      euiCodeBlock__lineNumber: css`
        flex-grow: 0;
        flex-shrink: 0;
        user-select: none;
        padding-inline-end: ${euiTheme.size.s};
        box-sizing: content-box; // Width is calculated in JS and padding needs to be added on to that value.

        &:before {
          content: attr(data-line-number);
          color: ${euiTheme.colors.subduedText};
          text-align: end;
          display: block;
        }
      `,
    },
  };
};
