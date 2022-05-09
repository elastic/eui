/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';

// Correctly lays out the contents of a button when using the proper dom elements of:
// <button>
//   <span className="__content">
//     {icon/spinner}
//     {child}
//   </span>
// </button>
// 1. Apply margin to all but last item in the flex.
// 2. Margin gets flipped because of the row-reverse.
export const euiButtonContentCSS = (
  euiTheme: UseEuiTheme['euiTheme'],
  isReverse: boolean = false
) => {
  let cssStyles;

  if (isReverse) {
    cssStyles = `flex-direction: row-reverse;
  
      > * + * {
        margin-inline-start: 0; // 1, 2
        margin-inline-end: ${euiTheme.size.s}; // 1, 2
      }`;
  } else {
    cssStyles = ` display: flex;
      justify-content: center;
      align-items: center;
  
      > * + * {
        margin-inline-start: ${euiTheme.size.s}; // 1
      }`;
  }

  return `
      height: 100%;
      width: 100%;
      vertical-align: middle;
      ${cssStyles};
  
      [class*='euiButtonContent__icon'],
      [class*='euiButtonContent__spinner'] {
        flex-shrink: 0; // Ensures the icons/spinner don't scale down below their intended size
      }
    `;
};
