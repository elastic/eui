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
  const { euiTheme } = euiThemeContext;

  const buttonSize = euiTheme.size.base;
  const grabHandleWidth = euiTheme.size.m;
  const grabHandleHeight = euiTheme.border.width.thin;

  const transitionSpeed = euiTheme.animation.fast;
  const transition = `${transitionSpeed} ease`;

  return {
    // Mimics the "grab" icon with CSS psuedo-elements.
    // 1. The "grab" icon transforms into a thicker straight line on :hover and :focus
    euiResizableButton: css`
      z-index: 1;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${mathWithUnits(grabHandleHeight, (x) => x * 2)};

      /* 1 */
      &:hover,
      &:focus {
        gap: 0;
        justify-content: center;
      }

      ${euiCanAnimate} {
        transition: gap ${transition}, justify-content ${transition};
      }

      &::before,
      &::after {
        content: '';
        display: block;
        background-color: ${euiTheme.colors.darkestShade};

        /* CSS hack to smooth out/anti-alias the 1px wide handles at various zoom levels */
        transform: translateZ(0);

        ${euiCanAnimate} {
          transition: width ${transition}, height ${transition},
            background-color ${transition};
        }
      }

      /* Lighten the "grab" icon on :hover */
      &:hover {
        &::before,
        &::after {
          background-color: ${euiTheme.colors.mediumShade};

          /* Delay transition on hover so animation is not accidentally triggered on mouse over */
          ${euiCanAnimate} {
            transition-delay: ${transitionSpeed};
          }
        }
      }

      /* Add a transparent background to the container and
         emphasize the "grab" icon with primary color on :focus */
      &:focus {
        background-color: ${transparentize(euiTheme.colors.primary, 0.1)};

        &::before,
        &::after {
          background-color: ${euiTheme.colors.primary};

          /* Overrides default transition so that "grab" icon background-color doesn't animate */
          ${euiCanAnimate} {
            transition: width ${transition}, height ${transition};
            transition-delay: ${mathWithUnits(transitionSpeed, (x) => x / 2)};
          }
        }
      }
    `,
    horizontal: css`
      cursor: col-resize;
      ${logicalCSS('width', buttonSize)}
      margin-inline: ${mathWithUnits(buttonSize, (x) => x / -2)};

      &::before,
      &::after {
        ${logicalCSS('width', grabHandleHeight)}
        ${logicalCSS('height', grabHandleWidth)}
      }

      /* 1 */
      &:hover,
      &:focus {
        &::before,
        &::after {
          ${logicalCSS('height', '100%')}
        }
      }
    `,
    vertical: css`
      flex-direction: column;
      cursor: row-resize;
      ${logicalCSS('height', buttonSize)}
      margin-block: ${mathWithUnits(buttonSize, (x) => x / -2)};

      &::before,
      &::after {
        ${logicalCSS('height', grabHandleHeight)}
        ${logicalCSS('width', grabHandleWidth)}
      }

      /* 1 */
      &:hover,
      &:focus {
        &::before,
        &::after {
          ${logicalCSS('width', '100%')}
        }
      }
    `,
  };
};
