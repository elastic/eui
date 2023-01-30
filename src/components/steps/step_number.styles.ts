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
import {
  UseEuiTheme,
  chooseLightOrDarkText,
  transparentize,
} from '../../services';
import { euiStepVariables } from './step.styles';
import { euiButtonColor } from '../../themes/amsterdam/global_styling/mixins';

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

const getBackground = (
  euiThemeContext: UseEuiTheme,
  backgroundColor: string
) => {
  const { euiTheme } = euiThemeContext;

  return `
    color: ${chooseLightOrDarkText(
      backgroundColor,
      euiTheme.colors.ghost,
      euiTheme.colors.ink
    )};
    background-color: ${backgroundColor};
  `;
};

export const euiStepNumberStyles = (
  euiThemeContext: UseEuiTheme,
  statusIsComplete?: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);
  const buttonColorDisabled = euiButtonColor(euiThemeContext, 'disabled')
    .backgroundColor;

  return {
    euiStepNumber: css`
      flex-shrink: 0;
    `,
    // sizes
    small: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberSmallSize,
        euiFontSizeFromScale('xs', euiTheme)
      )}
    `,
    medium: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberSize,
        euiFontSizeFromScale('s', euiTheme)
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
      background-color: ${transparentize(buttonColorDisabled, 0.7)};
      color: ${euiTheme.colors.disabledText};
    `,
    loading: css`
      background: transparent;
    `,
    warning: css`
      ${getBackground(euiThemeContext, euiTheme.colors.warning)}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    danger: css`
      ${getBackground(euiThemeContext, euiTheme.colors.danger)}
      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    complete: css`
      ${getBackground(euiThemeContext, euiTheme.colors.success)}
      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    current: css``,
    euiStepNumber__icon: css`
      vertical-align: middle;
      position: relative;
      inset-block-start: -1px;

      // Thicken the checkmark by adding a slight stroke.
      ${statusIsComplete &&
      `
        stroke: currentColor;
        stroke-width: 0.5px;
      `}
    `,
  };
};
