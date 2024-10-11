/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicals, logicalSizeCSS } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const popoverArrowSize = 'm';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const borderColor = 'var(--euiPopoverBackgroundColor)';
  const arrowSize = euiTheme.size[popoverArrowSize];

  const highContrastBorder = (filter: string) =>
    highContrastMode ? `filter: ${filter} !important;` : ''; // Using !important for high contrast mode filters to override hasDragDrop higher specificity CSS

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

      ${highContrastBorder(`
        drop-shadow(0 ${euiTheme.border.width.thin} 0 ${euiTheme.border.color})
        drop-shadow(0 -${euiTheme.border.width.thin} 0 ${euiTheme.colors.emptyShade})`)}
    `,

    bottom: css`
      &::before {
        ${logicals.top}: -${arrowSize};
        ${logicals['border-left']}: ${arrowSize} solid transparent;
        ${logicals['border-right']}: ${arrowSize} solid transparent;
        ${logicals['border-bottom']}: ${arrowSize} solid ${borderColor};
      }

      ${highContrastBorder(`
        drop-shadow(0 ${euiTheme.border.width.thin} 0 ${euiTheme.colors.emptyShade}) 
        drop-shadow(0 -${euiTheme.border.width.thin} 0 ${euiTheme.border.color})`)}
    `,

    left: css`
      &::before {
        ${logicals.top}: 50%;
        ${logicals.right}: -${arrowSize};
        ${logicals['border-top']}: ${arrowSize} solid transparent;
        ${logicals['border-bottom']}: ${arrowSize} solid transparent;
        ${logicals['border-left']}: ${arrowSize} solid ${borderColor};
      }

      ${highContrastBorder(`
        drop-shadow(${euiTheme.border.width.thin} 0 0 ${euiTheme.border.color}) 
        drop-shadow(-${euiTheme.border.width.thin} 0 0 ${euiTheme.colors.emptyShade})`)}
    `,

    right: css`
      &::before {
        ${logicals.top}: 50%;
        ${logicals.left}: -${arrowSize};
        ${logicals['border-top']}: ${arrowSize} solid transparent;
        ${logicals['border-bottom']}: ${arrowSize} solid transparent;
        ${logicals['border-right']}: ${arrowSize} solid ${borderColor};
      }

      ${highContrastBorder(`
        drop-shadow(${euiTheme.border.width.thin} 0 0 ${euiTheme.colors.emptyShade}) 
        drop-shadow(-${euiTheme.border.width.thin} 0 0 ${euiTheme.border.color})`)}
    `,
  };
};
