/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  mathWithUnits,
  logicalCSS,
  euiFontSizeFromScale,
  euiCanAnimate,
  euiAnimScale,
  logicalSizeCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiButtonFillColor } from '../../themes/amsterdam/global_styling/mixins';

import { euiStepVariables } from './step.styles';

export const euiStepNumberStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  const createStepsNumber = (size: string, fontSize: string) => {
    const highContrastBorder = highContrastMode
      ? `border: ${euiTheme.border.thin};`
      : '';

    return `
      display: inline-flex;
      justify-content: center;
      align-items: center;
      ${logicalCSS('width', size)};
      ${logicalCSS('height', size)};
      font-size: ${fontSize};
      font-weight: ${euiTheme.font.weight.medium};
      text-align: center;
      color: ${euiTheme.colors.emptyShade};
      background-color: ${euiTheme.colors.primary};
      border-radius: 50%;
      ${highContrastBorder}
    `;
  };

  return {
    euiStepNumber: css`
      flex-shrink: 0;
    `,
    // sizes
    m: css`
      ${createStepsNumber(
        euiStep.numberSize,
        euiFontSizeFromScale('s', euiTheme)
      )}
    `,
    s: css`
      ${createStepsNumber(
        euiStep.numberSize,
        euiFontSizeFromScale('s', euiTheme)
      )}
    `,
    xs: css`
      ${createStepsNumber(
        euiStep.numberXSSize,
        euiFontSizeFromScale('xs', euiTheme)
      )}
    `,
    none: css`
      ${createStepsNumber(
        euiStep.numberXXSSize,
        euiFontSizeFromScale('xs', euiTheme)
      )}
    `,
    // status
    incomplete: css`
      background-color: transparent;
      color: ${euiTheme.colors.text};
      border: ${euiTheme.border.thick};
    `,
    disabled: css`
      ${euiButtonFillColor(euiThemeContext, 'disabled')}
    `,
    loading: css`
      background: transparent;
    `,
    warning: css`
      ${euiButtonFillColor(euiThemeContext, 'warning')}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    danger: css`
      ${euiButtonFillColor(euiThemeContext, 'danger')}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    complete: css`
      ${euiButtonFillColor(euiThemeContext, 'success')}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    current: css`
      border: ${euiTheme.border.width.thick} solid ${euiTheme.colors.body};
      box-shadow: 0 0 0 ${euiTheme.border.width.thick}
        ${euiTheme.colors.primary};
    `,
  };
};

export const euiStepNumberIconStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiStepNumber__icon: css``,
    complete: css`
      /* Thicken the checkmark by adding a slight stroke */
      stroke: currentColor;
      stroke-width: ${mathWithUnits(euiTheme.border.width.thin, (x) => x / 2)};
    `,
    danger: css`
      /* Thicken the cross by adding a slight stroke */
      stroke: currentColor;
      stroke-width: ${mathWithUnits(euiTheme.border.width.thin, (x) => x / 2)};
    `,
    warning: css`
      /* Slight extra visual offset */
      margin-block-start: -${euiTheme.border.width.thick};
    `,
    none: css(logicalSizeCSS(euiTheme.size.s)),
  };
};
