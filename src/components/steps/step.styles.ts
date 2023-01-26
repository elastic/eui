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

export const euiStepStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);

  const linerGradient = `linear-gradient(to right, transparent 0, transparent 15px, ${euiTheme.border.color} 15px, ${euiTheme.border.color} 17px, transparent 17px, transparent 100%)`;

  return {
    euiStep: css`
      // Create border on all but the last step &:not(:last-of-type) {
      background-image: ${linerGradient};
      background-repeat: no-repeat;

      &:not(:last-of-type) {
        background-position: left ${euiTheme.size.xl};
      }
    `,
    small: css`
      &:not(:last-of-type) {
        background-position: left -${euiTheme.size.xs} ${euiTheme.size.l};
      }
    `,
    euiStep__titleWrapper: css`
      display: flex;
    `,
    euiStep__circle: css`
      flex-shrink: 0;
      margin-inline-end: ${euiStep.numberMargin};
      // Ensure that the step number vertically aligns with the title text
      vertical-align: top;
    `,
    euiStep__content: {
      small: css`
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

        // Align content border to horizontal center of step number
        margin-inline-start: ${mathWithUnits(euiStep.numberSize, (x) => x / 2)};
      `,
      regular: css`
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
    },
  };
};
