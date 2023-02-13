/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  euiFontSizeFromScale,
  euiCanAnimate,
  euiAnimScale,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiStepVariables } from './step.styles';
import { euiButtonFillColor } from '../../themes/amsterdam/global_styling/mixins';

const createStepsNumber = (
  euiTheme: UseEuiTheme['euiTheme'],
  size: string,
  fontSize: string
) => {
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
    font-weight: ${euiTheme.font.weight.bold};
  `;
};

export const euiStepNumberStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  return {
    euiStepNumber: css`
      flex-shrink: 0;
    `,
    // sizes
    m: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberSize,
        euiFontSizeFromScale('s', euiTheme)
      )}
    `,
    s: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberSize,
        euiFontSizeFromScale('s', euiTheme)
      )}
    `,
    xs: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberXSSize,
        euiFontSizeFromScale('xs', euiTheme)
      )}
    `,
    // status
    incomplete: css`
      background-color: transparent;
      color: ${euiTheme.colors.text};
      border: ${euiTheme.border.thick};

      .euiStepNumber__number {
        // adjusts position because of thicker border
        display: unset;
        position: relative;
        inset-block-start: -2px;
      }
    `,
    disabled: css`
      color: ${euiButtonFillColor(euiThemeContext, 'disabled').color};
      background-color: ${euiButtonFillColor(euiThemeContext, 'disabled')
        .backgroundColor};
    `,
    loading: css`
      background: transparent;
    `,
    warning: css`
      color: ${euiButtonFillColor(euiThemeContext, 'warning').color};
      background-color: ${euiButtonFillColor(euiThemeContext, 'warning')
        .backgroundColor};

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    danger: css`
      color: ${euiButtonFillColor(euiThemeContext, 'danger').color};
      background-color: ${euiButtonFillColor(euiThemeContext, 'danger')
        .backgroundColor};

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }

      // Thicken the checkmark by adding a slight stroke.
      .euiStepNumber__icon {
        stroke: currentColor;
        stroke-width: 0.5px;
      }
    `,
    complete: css`
      color: ${euiButtonFillColor(euiThemeContext, 'success').color};
      background-color: ${euiButtonFillColor(euiThemeContext, 'success')
        .backgroundColor};

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }

      // Thicken the checkmark by adding a slight stroke.
      .euiStepNumber__icon {
        stroke: currentColor;
        stroke-width: 0.5px;
      }
    `,
    current: css``,
    euiStepNumber__icon: css`
      vertical-align: middle;
      position: relative;
      inset-block-start: -1px;
    `,
  };
};
