/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiBackgroundColor,
  logicals,
  logicalSizeCSS,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const popoverArrowSize = 'm';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // Match the background color of panels
  const borderColor = euiBackgroundColor(euiThemeContext, 'plain');
  const arrowSize = euiTheme.size[popoverArrowSize];

  return {
    // Base
    euiPopoverArrow: css`
      position: absolute;
      ${logicalSizeCSS(0, 0)}

      /* This part of the arrow matches the panel. */
      &::before {
        content: '';
        position: absolute;
        ${logicalSizeCSS(0, 0)}
      }
    `,

    // POSITIONS
    top: css`
      &::before {
        ${logicals.bottom}: -${arrowSize};
        ${logicals['border-left']}: ${arrowSize} solid transparent;
        ${logicals['border-right']}: ${arrowSize} solid transparent;
        ${logicals['border-top']}: ${arrowSize} solid ${borderColor};
      }
    `,

    bottom: css`
      &::before {
        ${logicals.top}: -${arrowSize};
        ${logicals['border-left']}: ${arrowSize} solid transparent;
        ${logicals['border-right']}: ${arrowSize} solid transparent;
        ${logicals['border-bottom']}: ${arrowSize} solid ${borderColor};
      }
    `,

    left: css`
      &::before {
        ${logicals.top}: 50%;
        ${logicals.right}: -${arrowSize};
        ${logicals['border-top']}: ${arrowSize} solid transparent;
        ${logicals['border-bottom']}: ${arrowSize} solid transparent;
        ${logicals['border-left']}: ${arrowSize} solid ${borderColor};
      }
    `,

    right: css`
      &::before {
        ${logicals.top}: 50%;
        ${logicals.left}: -${arrowSize};
        ${logicals['border-top']}: ${arrowSize} solid transparent;
        ${logicals['border-bottom']}: ${arrowSize} solid transparent;
        ${logicals['border-right']}: ${arrowSize} solid ${borderColor};
      }
    `,
  };
};
