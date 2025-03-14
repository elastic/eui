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
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';
import { euiStepVariables } from './step.styles';
import { euiButtonFillColor } from '../../global_styling/mixins';

export const euiStepNumberStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  const createStepsNumber = (size: string, fontSize: string) => {
    return `
      display: flex;
      justify-content: center;
      align-items: center;
      ${logicalCSS('width', size)};
      ${logicalCSS('height', size)};
      font-size: ${fontSize};
      font-weight: ${euiTheme.font.weight.medium};
      color: ${euiTheme.colors.emptyShade};
      background-color: ${euiTheme.colors.primary};
      border-radius: 50%;
      ${highContrastModeStyles(euiThemeContext, {
        preferred: `border: ${euiTheme.border.thick};`,
      })}
    `;
  };

  // euiButtonColor utils add colored borders in high contrast mode, but
  // we want to set our own standardized border instead
  const unsetButtonBorder = (buttonStyles: object) => ({
    ...buttonStyles,
    border: undefined,
  });

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
      color: ${euiTheme.colors.textParagraph};
      border: ${euiTheme.border.thick};
    `,
    disabled: css`
      ${euiButtonFillColor(euiThemeContext, 'disabled')}
      ${highContrastModeStyles(euiThemeContext, {
        forced: 'opacity: 0.5;',
      })}
    `,
    loading: css`
      background: transparent;
      ${highContrastModeStyles(euiThemeContext, {
        preferred: 'border: none;',
      })}
    `,
    warning: css`
      ${unsetButtonBorder(euiButtonFillColor(euiThemeContext, 'warning'))}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    danger: css`
      ${unsetButtonBorder(euiButtonFillColor(euiThemeContext, 'danger'))}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    complete: css`
      ${unsetButtonBorder(euiButtonFillColor(euiThemeContext, 'success'))}

      ${euiCanAnimate} {
        animation: ${euiAnimScale} ${euiTheme.animation.fast}
          ${euiTheme.animation.bounce};
      }
    `,
    current: css`
      transform: scale(1.1);
      box-shadow: inset 0 0 0 ${euiTheme.border.width.thick}
        ${euiTheme.colors.emptyShade};

      ${highContrastModeStyles(euiThemeContext, {
        none: `
          border: ${euiTheme.border.width.thick} solid ${euiTheme.colors.primary};
        `,
        // !important overrides horizontal steps' euiOutline usage. The extra offset
        // is here to helps reduce subpixel gaps between the outline and the border
        preferred: `
          border-width: ${euiTheme.border.width.thick};
          outline-offset: -${euiTheme.border.width.thin} !important;
        `,
        // For Windows forced color themes, just invert the background/foreground colors
        forced: `
          color: ${euiTheme.colors.emptyShade};
          background-color: ${euiTheme.colors.fullShade};
          ${preventForcedColors(euiThemeContext)}
        `,
      })}
    `,
  };
};

export const euiStepNumberContentStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    // Statuses with icon content
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
    warning: {
      // Slight extra offset for visual balance. Intentionally uses static px and not tokens
      m: `margin-block-start: -2px;`,
      s: `margin-block-start: -2px;`,
      xs: `margin-block-start: -1px;`,
      none: `margin-block-start: -0.5px;`,
    },
    // Title sizes
    none: css(logicalSizeCSS(euiTheme.size.s)),
  };
};
