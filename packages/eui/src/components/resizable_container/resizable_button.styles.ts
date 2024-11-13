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

export const euiResizableButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const buttonSize = euiTheme.size.base;
  const negativeMargin = mathWithUnits(buttonSize, (x) => x / -2);
  const grabHandleWidth = euiTheme.size.m;

  const borderWidth = highContrastMode
    ? mathWithUnits(euiTheme.border.width.thin, (x) => x * 1.5)
    : euiTheme.border.width.thin;
  const borderWidthActive = highContrastMode
    ? mathWithUnits(euiTheme.border.width.thin, (x) => x * 2)
    : euiTheme.border.width.thin;

  const transitionSpeed = euiTheme.animation.fast;
  const transition = `${transitionSpeed} ease`;

  return {
    // Creates a resizable indicator (either a grab handle or a plain border) with CSS psuedo-elements.
    // 1. The "grab" handle transforms into a thicker straight line on :hover and :focus
    // 2. Start/end aligned grab handles should have a slight margin offset that disappears on hover/focus
    // 3. CSS hack to smooth out/anti-alias the 1px wide handles at various zoom levels
    // 4. We use `border`s instead of `background-color` to support Windows high contrast themes
    euiResizableButton: css`
      z-index: 1;
      flex-shrink: 0;
      display: flex;
      justify-content: center;

      &:disabled {
        display: none;
      }

      &::before,
      &::after {
        content: '';
        display: block;
        border-style: solid; /* 4 */
        border-width: 0;

        ${euiCanAnimate} {
          transition: width ${transition}, height ${transition},
            margin ${transition}, border ${transition};
        }
      }

      /* Lighten color on :hover */
      &:hover {
        &::before,
        &::after {
          border-color: ${euiTheme.colors.mediumShade}; /* 4 */
        }
      }

      /* Add a transparent background to the container and color the border primary
         with primary color on :focus (NOTE - :active is needed for Safari) */
      &:focus,
      &:active {
        background-color: ${transparentize(euiTheme.colors.primary, 0.1)};

        &::before,
        &::after {
          border-color: ${euiTheme.colors.primary}; /* 4 */

          /* Overrides default transition so that the "grab" border-color doesn't animate */
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
        border-color: ${euiTheme.border.color}; /* 4 */
      }
    `,
    borderDirection: {
      horizontal: css`
        &::before {
          ${logicalCSS('border-left-width', borderWidth)} /* 4 */
          ${logicalCSS('height', '100%')}
        }

        &:hover,
        &:focus,
        &:active {
          &::after {
            ${logicalCSS('border-left-width', borderWidthActive)} /* 4 */
            ${logicalCSS('height', '100%')}
          }
        }
      `,
      vertical: css`
        &::before {
          ${logicalCSS('border-top-width', borderWidth)} /* 4 */
          ${logicalCSS('width', '100%')}
        }

        &:hover,
        &:focus,
        &:active {
          &::after {
            ${logicalCSS('border-top-width', borderWidthActive)} /* 4 */
            ${logicalCSS('width', '100%')}
          }
        }
      `,
    },

    handle: css`
      gap: ${mathWithUnits(borderWidth, (x) => x * 2)};

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
        border-color: ${euiTheme.colors.darkestShade}; /* 4 */
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
          ${logicalCSS('border-left-width', borderWidth)} /* 4 */
          ${logicalCSS('height', grabHandleWidth)}
          margin-block: ${euiTheme.size.base}; /* 2 */
        }

        /* 1 */
        &:hover,
        &:focus,
        &:active {
          &::before,
          &::after {
            ${logicalCSS('border-left-width', borderWidthActive)} /* 4 */
            ${logicalCSS('height', '100%')}
            margin-block: 0; /* 2 */
            transform: none; /* 3 */
          }
        }
      `,
      vertical: css`
        &::before,
        &::after {
          ${logicalCSS('border-top-width', borderWidth)} /* 4 */
          ${logicalCSS('width', grabHandleWidth)}
          margin-inline: ${euiTheme.size.base}; /* 2 */
        }

        /* 1 */
        &:hover,
        &:focus,
        &:active {
          &::before,
          &::after {
            ${logicalCSS('border-top-width', borderWidthActive)} /* 4 */
            ${logicalCSS('width', '100%')}
            margin-inline: 0; /* 2 */
            transform: none; /* 3 */
          }
        }
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
