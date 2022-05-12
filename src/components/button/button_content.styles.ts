/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

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
        ${logicalCSS('margin-left', 0)}; // 1, 2
        ${logicalCSS('margin-right', euiTheme.size.s)}; // 1, 2
      }`;
  } else {
    cssStyles = ` display: flex;
      justify-content: center;
      align-items: center;
  
      > * + * {
        ${logicalCSS('margin-left', euiTheme.size.s)}; // 1, 2
      }`;
  }

  return `
      ${logicalCSS('height', '100%')};
      ${logicalCSS('width', '100%')};
      vertical-align: middle;
      ${cssStyles};
  
      [class*='euiButtonContent__icon'],
      [class*='euiButtonContent__spinner'] {
        flex-shrink: 0; // Ensures the icons/spinner don't scale down below their intended size
      }
    `;
};
