/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { mathWithUnits, logicalShorthandCSS } from '../../global_styling';

export const euiStepVariables = (euiThemeContext: UseEuiTheme) => {
  return {
    numberSmallSize: euiThemeContext.euiTheme.size.l,
    numberSize: euiThemeContext.euiTheme.size.xl,
    numberMargin: euiThemeContext.euiTheme.size.base,
  };
};

export const euiStepStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean,
  isSmall: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);

  const linerGradient = `linear-gradient(to right, transparent 0, transparent 15px, ${euiTheme.border.color} 15px, ${euiTheme.border.color} 17px, transparent 17px, transparent 100%)`;

  return {
    euiStep: css`
      // Create border on all but the last step &:not(:last-of-type) {
      &:not(:last-of-type) {
        background-image: ${linerGradient};
        background-repeat: no-repeat;
      }
    `,
    // sizes
    medium: css`
      &:not(:last-of-type) {
        background-position: left ${euiTheme.size.xl};
      }
    `,
    small: css`
      &:not(:last-of-type) {
        background-position: -${euiTheme.size.xs} ${euiTheme.size.l};
      }
    `,
    isDisabled: css``,
    euiStep__title: css`
      ${isDisabled &&
      `
         color: ${euiTheme.colors.disabledText};
      `}
    `,
    euiStep__titleWrapper: css`
      display: flex;
      gap: ${euiStep.numberMargin};
    `,
    euiStep__content: css`
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.base} ${euiTheme.size.base} ${euiTheme.size.xl}`
      )}
      ${logicalShorthandCSS('margin', `${euiTheme.size.s} 0`)}
         // Align the content's contents with the title
         padding-inline-start: ${mathWithUnits(
        [euiStep.numberSize, euiStep.numberMargin],
        (x, y) => x / 2 + y
      )};
      margin-block-end: 0;
      padding-block-end: ${mathWithUnits(
        [euiTheme.size.xl, euiTheme.size.s],
        (x, y) => x + y
      )};

      ${isSmall &&
      `
        // Align the content's contents with the title
        padding-inline-start: ${mathWithUnits(
          [euiStep.numberSmallSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )};

        // Align content border to horizontal center of step number
        margin-inline-start: ${mathWithUnits(
          euiStep.numberSmallSize,
          (x) => x / 2
        )};
      `}

      ${!isSmall &&
      `
        // Align the content's contents with the title
        padding-inline-start: ${mathWithUnits(
          [euiStep.numberSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )};

        // Align content border to horizontal center of step number
        margin-inline-start: ${mathWithUnits(euiStep.numberSize, (x) => x / 2)};
      `}
    `,
  };
};
