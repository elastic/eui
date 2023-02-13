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
  isDisabled: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);

  // the vertical line is centered on the number, so we need to offset the line by half the number size
  // and because the vertical line is 2px, we also need to offset the number by 1px to center it
  const lineStartPosition = mathWithUnits(euiStep.numberSize, (x) => x / 2 - 1);
  const lineEndPosition = mathWithUnits(euiStep.numberSize, (x) => x / 2 + 1);

  const linerGradient = `linear-gradient(to right, transparent 0, transparent ${lineStartPosition}, ${euiTheme.border.color} ${lineStartPosition}, ${euiTheme.border.color} ${lineEndPosition}, transparent ${lineEndPosition}, transparent 100%)`;

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

      .euiStep__title {
        padding-block-start: ${euiTheme.size.xxs};
      }
    `,
    small: css`
      &:not(:last-of-type) {
        // Adjust the line to be centered on the small number
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
  };
};

export const euiStepContentStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);

  return {
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
    `,
    small: css`
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
    `,
    medium: css`
      // Align the content's contents with the title
      padding-inline-start: ${mathWithUnits(
        [euiStep.numberSize, euiStep.numberMargin],
        (x, y) => x / 2 + y
      )};

      // Align content border to horizontal center of step number
      margin-inline-start: ${mathWithUnits(euiStep.numberSize, (x) => x / 2)};
    `,
  };
};
