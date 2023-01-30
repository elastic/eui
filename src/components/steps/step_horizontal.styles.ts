/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  euiBreakpoint,
  logicalShorthandCSS,
  euiFocusRing,
  euiCanAnimate,
  mathWithUnits,
} from '../../global_styling/';
import { euiShadowXSmall } from '../../themes/amsterdam/global_styling/mixins';
import { euiTitle } from '../title/title.styles';
import { euiStepVariables } from './step.styles';

const makeLineProgress = (euiTheme: UseEuiTheme['euiTheme']) => {
  return css`
    block-size: 2px;
    background-color: ${euiTheme.border.color};
  `;
};

export const euiStepHorizontalStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);

  /**
   * 1. Ensure the connecting lines stays behind the number
   * 2. Make the content of each step align to the top, even if the steps are of varying heights,
   *    e.g. due to some of their titles wrapping to multiple lines
   */

  return {
    euiStepHorizontal: css`
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.l} ${euiTheme.size.base} ${euiTheme.size.base}`
      )}
      display: flex; /* 2 */
      flex-direction: column; /* 2 */
      align-items: center; /* 2 */
      justify-content: flex-start; /* 2 */
      cursor: pointer;
      position: relative;
      inline-size: 100%;

      // focus & hover state
      ${!isDisabled &&
      `
        &:focus,
        &:hover {
          .euiStepHorizontal__title {
            text-decoration: underline;
          }
        }
      `}

      &:focus:not(.euiStepHorizontal-isDisabled) {
        outline: none;

        .euiStepHorizontal__number {
          ${euiFocusRing(euiThemeContext)}
        }
      }

      // create the connecting lines
      &::before,
      &::after {
        ${makeLineProgress(euiTheme)}
        content: '';
        position: absolute;
        inline-size: calc(50% - (${euiStep.numberSize} / 2));
        inset-block-start: ${mathWithUnits(
          [euiTheme.size.l, euiStep.numberSize],
          (x, y) => x + y / 2
        )};
        z-index: ${euiTheme.levels.content}; /* 1 */
      }

      &::before {
        inset-inline-start: 0;
      }

      &::after {
        inset-inline-end: 0;
      }

      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        display: inline-block !important;
      }
    `,
    isComplete: css`
      &::before,
      &::after {
        ${makeLineProgress(euiTheme)}
      }
    `,
    isIncomplete: css``,
    isDisabled: css`
      cursor: not-allowed;
    `,
    isSelected: css`
      .euiStepHorizontal__number:not([class*='danger']):not([class*='warning']):not([class*='loading']) {
        ${euiShadowXSmall(euiThemeContext)}
      }

      &::before {
        ${makeLineProgress(euiTheme)}
      }
    `,
    euiStepHorizontal__number: css`
      position: relative; /* 1 */
      z-index: ${euiTheme.levels.content} + 1; /* 1 */
      margin-inline-end: 0;

      ${euiCanAnimate} {
        transition: all ${euiTheme.animation.fast} ease-in-out;
      }
    `,
    euiStepHorizontal__title: css`
      ${euiTitle(euiThemeContext, 'xs')};
      margin-block-start: ${euiTheme.size.s};
      font-weight: ${euiTheme.font.weight.bold};
      text-align: center;

      ${isDisabled &&
      `
         color: ${euiTheme.colors.disabledText};
      `}

      // hide titles on small screens
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        display: none;
      }
    `,
  };
};
