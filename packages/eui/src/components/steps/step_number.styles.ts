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
import { euiStepVariables } from './step.styles';
import { euiButtonFillColor } from '../../global_styling/mixins';

export const euiStepNumberStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  const createStepsNumber = (size: string, fontSize: string) => {
    return `
      display: inline-block;
      line-height: ${size};
      border-radius: ${size};
      ${logicalCSS('width', size)};
      ${logicalCSS('height', size)};
      text-align: center;
      color: ${euiTheme.colors.emptyShade};
      background-color: ${euiTheme.colors.primary};
      font-size: ${fontSize};
      font-weight: ${euiTheme.font.weight.medium};
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

export const euiStepNumberContentStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    // Statuses with icon content
    euiStepNumber__icon: css`
      vertical-align: middle;
      position: relative;
      inset-block-start: -${euiTheme.border.width.thin};
    `,
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
      inset-block-start: -${euiTheme.border.width.thick};
    `,
    // Statuses with number content
    euiStepNumber__number: css``,
    incomplete: css`
      /* Adjusts position because of thicker border */
      display: unset;
      position: relative;
      inset-block-start: -${euiTheme.border.width.thick};
    `,
    loading: css``,
    disabled: css``,
    current: css`
      /* Transform the step number so it appears in the center of the step circle */
      display: inline-block;
      transform: translateY(-${euiTheme.border.width.thick});
    `,
    none: css(logicalSizeCSS(euiTheme.size.s)),
  };
};
