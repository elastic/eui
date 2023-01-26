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
  shade,
  tint,
  getSaturation,
  makeHighContrastColor,
} from '../../services';
import { euiStepVariables } from './step.styles';

const createStepsNumber = (
  euiTheme: UseEuiTheme['euiTheme'],
  size: string,
  fontSize: string
) => {
  return css`
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

const getBackground = (euiThemeContext: UseEuiTheme, color: string) => {
  const { euiTheme, colorMode } = euiThemeContext;

  const isDarkMode = colorMode === 'DARK';
  const backgroundForSaturation = isDarkMode
    ? shade(color, 0.9)
    : tint(color, 0.7);

  const backgroundColor =
    getSaturation(color) > 0.5 ? backgroundForSaturation : color;

  return css`
    color: ${makeHighContrastColor(euiTheme.colors.text)(backgroundColor)};
    background-color: ${backgroundColor};
  `;
};

export const euiStepNumberStyles = (
  euiThemeContext: UseEuiTheme,
  statusIsComplete?: boolean
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const euiStep = euiStepVariables(euiThemeContext);

  return {
    euiStepNumber: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberSize,
        euiFontSizeFromScale('m', euiTheme)
      )}
    `,
    small: css`
      ${createStepsNumber(
        euiTheme,
        euiStep.numberSmallSize,
        euiFontSizeFromScale('s', euiTheme)
      )}
    `,
    // status
    incomplete: css`
      ${getBackground(euiThemeContext, euiTheme.colors.darkShade)}
    `,
    disabled: css`
      ${getBackground(euiThemeContext, euiTheme.colors.darkShade)}
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
      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    current: css``,
    euiStepNumber__icon: css`
      vertical-align: middle;
      position: relative;
      inset-block-start: -2px;

      // Thicken the checkmark by adding a slight stroke.
      ${statusIsComplete &&
      `
        stroke: currentColor;
        stroke-width: 0.5px;
      `}
    `,
  };
};
