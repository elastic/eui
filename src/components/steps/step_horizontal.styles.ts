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
import { euiTitle } from '../title/title.styles';
import { euiStepVariables } from './step.styles';

export const euiStepHorizontalStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

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

      // create the connecting lines
      &::before,
      &::after {
        content: '';
        position: absolute;
        background-color: ${euiTheme.border.color};
        block-size: ${euiTheme.border.width.thick};
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
    `,
    // Note: these selectors must be nested because focus/hover state
    // is on the parent container, but affects specific children
    enabled: css`
      &:focus,
      &:hover {
        .euiStepHorizontal__title {
          text-decoration: underline;
        }
      }

      &:focus {
        outline: none;

        .euiStepHorizontal__number {
          ${euiFocusRing(euiThemeContext)}
        }

        .euiStepHorizontal__number:not(:focus-visible) {
          outline: ${euiTheme.focus.width} solid ${euiTheme.colors.darkestShade};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
    `,
  };
};

export const euiStepHorizontalNumberStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiStepHorizontal__number: css`
      position: relative; /* 1 */
      z-index: ${Number(euiTheme.levels.content) + 1}; /* 1 */

      ${euiCanAnimate} {
        transition: all ${euiTheme.animation.fast} ease-in-out;
      }
    `,
  };
};

export const euiStepHorizontalTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiStepHorizontal__title: css`
      ${euiTitle(euiThemeContext, 'xs')};
      margin-block-start: ${euiTheme.size.s};
      font-weight: ${euiTheme.font.weight.bold};
      text-align: center;

      // hide titles on small screens
      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        display: none;
      }
    `,
    disabled: css`
      color: ${euiTheme.colors.disabledText};
    `,
  };
};
