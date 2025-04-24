/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import { logicalCSS, mathWithUnits, euiCanAnimate } from '../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../global_styling/functions/high_contrast';

export const euiResizableButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const buttonSize = euiTheme.size.base;
  const negativeMargin = mathWithUnits(buttonSize, (x) => x / -2);
  const grabHandleWidth = euiTheme.size.m;
  const grabHandleHeight = euiTheme.border.width.thin;
  const transitionSpeed = euiTheme.animation.fast;
  const transition = `${transitionSpeed} ease`;

  return {
    // Creates a resizable indicator (either a grab handle or a plain border) with CSS psuedo-elements.
    // 1. The "grab" handle transforms into a thicker straight line on :hover and :focus
    // 2. Start/end aligned grab handles should have a slight margin offset that disappears on hover/focus
    // 3. CSS hack to smooth out/anti-alias the 1px wide handles at various zoom levels
    // 4. High contrast modes should not rely on background-color to indicate focus state, but on border width
    euiResizableButton: css`
      z-index: 1;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      ${preventForcedColors(euiThemeContext)} /* 4 */

      &:disabled {
        display: none;
      }

      &::before,
      &::after {
        content: '';
        display: block;

        ${euiCanAnimate} {
          transition: width ${transition}, height ${transition},
            margin ${transition}, background-color ${transition};
        }
      }

      /* Lighten color on :hover for non-high-contrast modes */
      ${highContrastModeStyles(euiThemeContext, {
        /* 4 */
        none: `
          &:hover {
            &::before,
            &::after {
              background-color: ${euiTheme.colors.mediumShade};
            }
          }`,
      })}

      /* Add a transparent background to the container and color the border primary
         with primary color on :focus (NOTE - :active is needed for Safari) */
      &:focus,
      &:active {
        ${highContrastModeStyles(euiThemeContext, {
          /* 4 */
          none: `
            background-color: ${transparentize(euiTheme.colors.primary, 0.1)};

            &::before,
            &::after {
              background-color: ${euiTheme.colors.primary};
            }
          `,
        })}

        &::before,
        &::after {
          /* Overrides default transition so that "grab" background-color doesn't animate */
          ${euiCanAnimate} {
            transition: width ${transition}, height ${transition};
            transition-delay: ${mathWithUnits(transitionSpeed, (x) => x / 2)};
          }
        }
      }
    `,
    horizontal: css`
      cursor: col-resize;
      ${logicalCSS('height', '100%')}
      ${logicalCSS('width', buttonSize)}
    `,
    vertical: css`
      flex-direction: column;
      cursor: row-resize;
      ${logicalCSS('width', '100%')}
      ${logicalCSS('height', buttonSize)}
    `,
    accountForScrollbars: {
      horizontal: {
        both: css``,
        before: css(logicalCSS('margin-right', negativeMargin)),
        after: css(logicalCSS('margin-left', negativeMargin)),
        none: css(logicalCSS('margin-horizontal', negativeMargin)),
      },
      vertical: {
        both: css``,
        before: css(logicalCSS('margin-bottom', negativeMargin)),
        after: css(logicalCSS('margin-top', negativeMargin)),
        none: css(logicalCSS('margin-vertical', negativeMargin)),
      },
    },

    border: css`
      &::before,
      &::after {
        background-color: ${euiTheme.border.color};
      }
    `,
    borderDirection: {
      horizontal: css`
        &::before {
          ${logicalCSS('width', euiTheme.border.width.thin)}
          ${logicalCSS('height', '100%')}
        }

        &:hover,
        &:focus,
        &:active {
          &::after {
            ${logicalCSS('width', euiTheme.border.width.thin)}
            ${logicalCSS('height', '100%')}
          }
        }
        ${_highContrastForcedBorder(euiThemeContext, 'horizontal')}
      `,
      vertical: css`
        &::before {
          ${logicalCSS('height', euiTheme.border.width.thin)}
          ${logicalCSS('width', '100%')}
        }

        &:hover,
        &:focus,
        &:active {
          &::after {
            ${logicalCSS('height', euiTheme.border.width.thin)}
            ${logicalCSS('width', '100%')}
          }
        }
        ${_highContrastForcedBorder(euiThemeContext, 'vertical')}
      `,
    },

    handle: css`
      gap: ${mathWithUnits(grabHandleHeight, (x) => x * 2)};

      /* 1 */
      &:hover,
      &:focus,
      &:active {
        gap: 0;
      }

      ${euiCanAnimate} {
        transition: gap ${transition};
      }

      &::before,
      &::after {
        background-color: ${euiTheme.colors.darkestShade};
        transform: translateZ(0); /* 3 */
      }

      /* Lighten color on :hover */
      &:hover {
        &::before,
        &::after {
          /* Delay transition on hover so animation is not accidentally triggered on mouse over */
          ${euiCanAnimate} {
            transition-delay: ${transitionSpeed};
          }
        }
      }
    `,
    handleDirection: {
      horizontal: css`
        &::before,
        &::after {
          ${logicalCSS('width', grabHandleHeight)}
          ${logicalCSS('height', grabHandleWidth)}
          margin-block: ${euiTheme.size.base}; /* 2 */
        }

        /* 1 */
        &:hover,
        &:focus,
        &:active {
          &::before,
          &::after {
            ${logicalCSS('height', '100%')}
            margin-block: 0; /* 2 */
            transform: none; /* 3 */
          }
        }
        ${_highContrastForcedBorder(euiThemeContext, 'horizontal')}
      `,
      vertical: css`
        &::before,
        &::after {
          ${logicalCSS('height', grabHandleHeight)}
          ${logicalCSS('width', grabHandleWidth)}
          margin-inline: ${euiTheme.size.base}; /* 2 */
        }

        /* 1 */
        &:hover,
        &:focus,
        &:active {
          &::before,
          &::after {
            ${logicalCSS('width', '100%')}
            margin-inline: 0; /* 2 */
            transform: none; /* 3 */
          }
        }
        ${_highContrastForcedBorder(euiThemeContext, 'vertical')}
      `,
    },
    alignIndicator: {
      center: css`
        align-items: center;
      `,
      start: css`
        align-items: flex-start;
      `,
      end: css`
        align-items: flex-end;
      `,
    },
  };
};

/* 4 */
const _highContrastForcedBorder = (
  euiThemeContext: UseEuiTheme,
  direction: 'horizontal' | 'vertical'
) => {
  const { highContrastMode, euiTheme } = euiThemeContext;
  if (!highContrastMode) return '';

  const dimension = direction === 'horizontal' ? 'width' : 'height';

  return `
    &:focus, &:active {
      &::before, &::after {
        ${logicalCSS(dimension, euiTheme.border.width.thick)}
        background-color: ${
          highContrastMode === 'forced'
            ? euiTheme.border.color
            : euiTheme.colors.primary
        };
      }
    }
  `;
};
