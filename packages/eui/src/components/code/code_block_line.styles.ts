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
import { mathWithUnits } from '../../global_styling';
import { UseEuiTheme } from '../../services';

// Note: These styles must be in a separate file due to using `css` from `@emotion/css`
// (i.e., applying styles in vanilla JS / directly to DOM nodes instead of React)

export const euiCodeBlockLineStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const lineMargins = euiTheme.size.m;
  const lineWidth = euiTheme.border.width.thin;

  // Increase highlight border width in high contrast modes
  const highlightWidth = highContrastMode
    ? mathWithUnits(euiTheme.border.width.thick, (x) => x * 1.5)
    : euiTheme.border.width.thick;
  const highlightOffset = mathWithUnits(
    [lineMargins, lineWidth, highlightWidth],
    (x, y, z) => x + y - z
  );

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
        padding-inline-start: ${lineMargins};
        border-inline-start: ${lineWidth} solid ${euiTheme.border.color};
        user-select: text;
      `,
      isHighlighted: css`
        background: ${euiTheme.colors.backgroundBasePrimary};
        border-inline-start: ${highlightWidth} solid ${euiTheme.colors.primary};
        padding-inline-start: ${highlightOffset};
      `,
    },
    lineNumber: {
      euiCodeBlock__lineNumberWrapper: css`
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;
        user-select: none;
        padding-inline-end: ${lineMargins};
        box-sizing: content-box; /* Width is calculated in JS and padding needs to be added on to that value */
      `,
      euiCodeBlock__lineNumber: css`
        color: ${euiTheme.colors.textSubdued};
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
