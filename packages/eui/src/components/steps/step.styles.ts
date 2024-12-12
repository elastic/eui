/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, makeHighContrastColor } from '../../services';
import { mathWithUnits, logicalCSS } from '../../global_styling';

export const euiStepVariables = (euiTheme: UseEuiTheme['euiTheme']) => {
  return {
    numberSize: euiTheme.size.xl,
    numberXSSize: euiTheme.size.l,
    numberXXSSize: euiTheme.size.base,
    numberMargin: euiTheme.size.base,
  };
};

export const euiStepStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  // the vertical line is centered on the number, so we need to offset the line
  // by half of the number size & half of the line size to center it
  const getLeftPosition = (numberSize: string) =>
    mathWithUnits(
      [numberSize, euiTheme.border.width.thick],
      (x, y) => x / 2 - y / 2
    );

  return {
    euiStep: css`
      position: relative;

      /* Create border on all but the last step */
      &:not(:last-of-type)::before {
        content: '';
        position: absolute;
        ${logicalCSS('bottom', 0)}
        ${logicalCSS('border-left', euiTheme.border.thick)}
      }
    `,
    // Sizes
    m: css`
      &:not(:last-of-type)::before {
        ${logicalCSS('top', euiStep.numberSize)}
        ${logicalCSS('left', getLeftPosition(euiStep.numberSize))}
      }
    `,
    s: css`
      &:not(:last-of-type)::before {
        ${logicalCSS('top', euiStep.numberSize)}
        ${logicalCSS('left', getLeftPosition(euiStep.numberSize))}
      }
    `,
    xs: css`
      &:not(:last-of-type)::before {
        ${logicalCSS('top', euiStep.numberXSSize)}
        ${logicalCSS('left', getLeftPosition(euiStep.numberXSSize))}
      }
    `,
    xxs: css`
      &:not(:last-of-type)::before {
        ${logicalCSS('top', euiStep.numberXXSSize)}
        ${logicalCSS('left', getLeftPosition(euiStep.numberXXSSize))}
      }
    `,
  };
};

export const euiStepContentStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  return {
    euiStep__content: css`
      ${logicalCSS('margin-top', euiTheme.size.s)}
      ${logicalCSS('padding-top', euiTheme.size.base)}
      ${logicalCSS(
        'padding-bottom',
        mathWithUnits([euiTheme.size.xl, euiTheme.size.s], (x, y) => x + y)
      )}
      ${logicalCSS('padding-right', euiTheme.size.base)}
    `,
    // Sizes
    m: css`
      /* Align the content's contents with the title */
      ${logicalCSS(
        'padding-left',
        mathWithUnits(
          [euiStep.numberSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )
      )}
      /* Align content border to horizontal center of step number */
      ${logicalCSS(
        'margin-left',
        mathWithUnits(euiStep.numberSize, (x) => x / 2)
      )}
    `,
    // `s` is the same as `m` - use a getter to duplicate its content
    get s() {
      return this.m;
    },
    xs: css`
      /* Align the content's contents with the title */
      ${logicalCSS(
        'padding-left',
        mathWithUnits(
          [euiStep.numberXSSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )
      )}
      /* Align content border to horizontal center of step number */
      ${logicalCSS(
        'margin-left',
        mathWithUnits(euiStep.numberXSSize, (x) => x / 2)
      )}
    `,
    xxs: css`
      /* Align the content's contents with the title */
      ${logicalCSS(
        'padding-left',
        mathWithUnits(
          [euiStep.numberXXSSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )
      )}
      /* Align content border to horizontal center of step number */
      ${logicalCSS(
        'margin-left',
        mathWithUnits(euiStep.numberXXSSize, (x) => x / 2)
      )}
    `,
  };
};

export const euiStepTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  return {
    euiStep__titleWrapper: css`
      display: flex;
      gap: ${euiStep.numberMargin};
    `,
    euiStep__title: css``,
    isDisabled: css`
      color: ${makeHighContrastColor(euiTheme.colors.disabledText)(
        euiTheme.colors.body
      )};
    `,
    // Sizes
    m: css``,
    s: css`
      ${logicalCSS('padding-top', euiTheme.size.xs)}
    `,
    xs: css``,
    xxs: css`
      line-height: ${euiStep.numberXXSSize};
    `,
  };
};
