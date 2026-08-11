/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  euiButtonSizeMap,
  euiDisabledSelector,
  highContrastModeStyles,
  logicalCSS,
} from '../../../global_styling';

const primaryDisabledSelector = `.euiSplitButtonActionPrimary:is(${euiDisabledSelector})`;
const secondaryDisabledSelector = `.euiSplitButtonActionSecondary:is(${euiDisabledSelector})`;

export const euiSplitButtonStyles = (
  euiThemeContext: UseEuiTheme,
  backgroundColor: string
) => {
  const { euiTheme } = euiThemeContext;

  const buttonSizeMap = euiButtonSizeMap(euiThemeContext);

  const borderStyles = (color: string) => `
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: ${euiTheme.border.width.thin} solid ${color};
      border-radius: ${euiTheme.border.radius.small};
      pointer-events: none;
    }
  `;

  return {
    euiSplitButton: css`
      position: relative;
      display: inline-flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: ${euiTheme.size.xs};
      border-radius: ${euiTheme.border.radius.small};
      background-color: ${backgroundColor};

      &:where([data-size='s']) {
        block-size: ${buttonSizeMap.s.height};
      }

      &:where([data-size='m']) {
        block-size: ${buttonSizeMap.m.height};
      }

      /* The container is styled disabled if only one child is disabled */
      &:has(${primaryDisabledSelector}, ${secondaryDisabledSelector}) {
        background-color: ${euiTheme.colors.backgroundBaseDisabled};
      }
    `,
    hasBorder: css`
      ${highContrastModeStyles(euiThemeContext, {
        none: `
          &:where(:not([data-fill])):not(:has(${primaryDisabledSelector}, ${secondaryDisabledSelector})) {
            ${borderStyles(`var(--euiSplitButtonBorderColor)`)}
          }
        `,
        preferred: `
          &:where(:not([data-fill])) {
            ${borderStyles(`var(--euiSplitButtonBorderColor)`)}

            &:has(${primaryDisabledSelector}, ${secondaryDisabledSelector}) {
              ${borderStyles(euiTheme.colors.borderBaseDisabled)}
            }
          }

          &:where([data-fill]):has(${primaryDisabledSelector}, ${secondaryDisabledSelector}) {
            ${borderStyles(euiTheme.colors.borderBaseDisabled)}
          }
        `,
        forced: `
          ${borderStyles(`var(--euiSplitButtonBorderColor)`)}
        `,
      })}
    `,
  };
};

export const euiSplitButtonActionStyles = (
  euiThemeContext: UseEuiTheme,
  size: 's' | 'm'
) => {
  const { euiTheme } = euiThemeContext;
  const buttonSizeMap = euiButtonSizeMap(euiThemeContext);

  // uses smaller sizes due to the buttons being inset into the parent container
  const buttonSize =
    size === 's' ? buttonSizeMap.xs.height : buttonSizeMap.s.height;
  const buttonMinWidth =
    size === 's' ? buttonSizeMap.xs.minWidth : buttonSizeMap.s.minWidth;
  const buttonRadius =
    size === 's' ? buttonSizeMap.xs.radiusInset : buttonSizeMap.s.radiusInset;

  const commonStyles = `
    block-size: ${buttonSize};
    border-radius: ${buttonRadius};
    /* prevent issues in jsdom where pointer-events: none is inherited from the pseudo element */
    pointer-events: auto;

     /* zero-specificity ancestor :has() check */
    &:where(:not(:has(${primaryDisabledSelector}, ${secondaryDisabledSelector})) &) {
      border: none;
    }
    
    &:where(:has(${primaryDisabledSelector}, ${secondaryDisabledSelector}) &) {
      &:is(${euiDisabledSelector}) {
        border: none;
      }
    }
   
  `;

  return {
    euiSplitButtonActionPrimary: css`
      ${commonStyles}
      z-index: ${euiTheme.levels.content};

      &:not(:has(svg:only-child)) {
        min-inline-size: ${buttonMinWidth}px;
      }

      &:has(svg:only-child) {
        inline-size: ${buttonSize};
      }
    `,
    euiSplitButtonActionSecondary: css`
      ${commonStyles}
      inline-size: ${buttonSize};
    `,
  };
};

export const euiSplitButtonDividerStyles = (
  euiThemeContext: UseEuiTheme,
  color: string
) => {
  const { euiTheme } = euiThemeContext;

  return {
    divider: css`
      block-size: calc(100% - ${euiTheme.size.s});
      /* uses a border to ensure proper rendering in Windows high contrast themes */
      border-inline-start: ${euiTheme.border.width.thin} solid ${color};
      ${logicalCSS('margin-horizontal', euiTheme.size.xs)};

      &:where(
          ${primaryDisabledSelector} + &,
          :has(~ ${secondaryDisabledSelector})
        ) {
        border-color: ${euiTheme.colors.borderBaseDisabled};
      }
    `,
  };
};
