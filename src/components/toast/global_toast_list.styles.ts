/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  euiMaxBreakpoint,
  euiMinBreakpoint,
  euiScrollBarStyles,
  logicalCSS,
  logicalCSSWithFallback,
  logicalSizeCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiGlobalToastListStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiToastWidth = euiTheme.base * 25;
  return {
    /**
     * 1. Allow list to expand as items are added, but cap it at the screen height.
     * 2. Allow some padding for shadow
     */
    // Base
    euiGlobalToastList: css`
      ${euiScrollBarStyles(euiThemeContext)}
      display: flex;
      flex-direction: column;
      align-items: stretch;
      position: fixed;
      z-index: ${euiTheme.levels.toast};
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('width', `${euiToastWidth}px`)} /* 2 */
      ${logicalCSS('max-height', '100vh')} /* 1 */
      ${logicalCSSWithFallback('overflow-y', 'auto')}

      /* Hide the scrollbar entirely */
      scrollbar-width: none;

      &::-webkit-scrollbar {
        ${logicalSizeCSS(0, 0)}
      }

      /* The top and bottom padding give height to the list creating a dead-zone effect
         when there's no toasts in the list, meaning you can't click anything beneath it.
         Only add the padding if there's content. */
      &:not(:empty) {
        ${logicalCSS('padding-left', euiTheme.size.base)}
        ${logicalCSS('padding-right', euiTheme.size.base)}
        ${logicalCSS('padding-vertical', euiTheme.size.base)}
      }

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        &:not(:empty) {
          ${logicalCSS('left', 0)}
          ${logicalCSS('width', '100%')} /* 1 */
        }
      }
    `,
    // Variants
    right: css`
      &:not(:empty) {
        ${logicalCSS('right', 0)};

        ${euiMinBreakpoint(euiThemeContext, 'm')} {
          ${logicalCSS('padding-left', `${euiTheme.base * 4}px`)}/* 2 */
        }
      }
    `,
    left: css`
      &:not(:empty) {
        ${logicalCSS('left', 0)};

        ${euiMinBreakpoint(euiThemeContext, 'm')} {
          ${logicalCSS('padding-right', `${euiTheme.base * 4}px`)}/* 2 */
        }
      }
    `,
  };
};

export const euiGlobalToastListItemStyles = ({ euiTheme }: UseEuiTheme) => {
  const euiShowToast = keyframes`
  from {
    transform: translateY(${euiTheme.size.l}) scale(.9);
    opacity: 0;
  }

  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;
  return {
    // Base
    euiGlobalToastListItem: css`
      ${logicalCSS('margin-bottom', euiTheme.size.base)}
      animation: ${euiTheme.animation.normal} ${euiShowToast}
        ${euiTheme.animation.resistance};
      opacity: 1;

      &:first-child {
        /* justify-content: flex-end interferes with overflowing content,
           so we'll use this to push items to the bottom instead. */
        ${logicalCSS('margin-top', 'auto')}
      }

      &:last-child {
        ${logicalCSS('margin-bottom', 0)}
      }
    `,
    // States
    dismissed: css`
      transition: opacity ${euiTheme.animation.normal};
      opacity: 0;
    `,
  };
};
