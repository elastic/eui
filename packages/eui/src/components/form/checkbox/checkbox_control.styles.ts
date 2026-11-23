/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiCanAnimate, logicalSizeCSS } from '../../../global_styling';
import {
  euiFormCustomControlStyles,
  euiFormCustomControlVariables,
} from '../form.styles';

export const euiCheckboxControlStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const controlStyles = euiFormCustomControlStyles(euiThemeContext);
  const {
    colors: { selected, selectedIcon, unselected },
  } = euiFormCustomControlVariables(euiThemeContext);

  // The motion study suggested fast; normal lets the fill and stroke read more clearly.
  const speed = euiTheme.animation.normal;
  const ease = euiTheme.animation.resistance;

  return {
    euiCheckboxControl: css`
      ${controlStyles.input.fauxInput}
      border-radius: ${euiTheme.border.radius.inline};

      /* Fill that grows from the center. Hidden while scaled to 0. */
      &::before {
        content: '';
        position: absolute;
        inset: calc(-1 * ${euiTheme.border.width.thin});
        background: ${selected};
        border-radius: inherit;
        transform: scale(0);
        pointer-events: none;
      }

      /* Indeterminate mark. 8px centered in the 16px control leaves a 3px gap inside the 1px border, same as the radio dot. */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        margin: auto;
        ${logicalSizeCSS(euiTheme.size.s)}
        border-radius: ${euiTheme.size.xxs};
        background-color: ${selected};
        transform: scale(0);
        pointer-events: none;
      }

      ${euiCanAnimate} {
        transition-property: background-color, color, border-color;
        transition-duration: ${speed};
        transition-timing-function: ${ease};

        &::before,
        &::after {
          transition: transform ${speed} ${ease};
        }

        .euiCheckbox__stroke path {
          /* Uncheck wipes the stroke in half the fill time. */
          transition: stroke-dashoffset calc(${speed} * 0.5) ${ease};
        }
      }

      /* Check: the stroke starts after the fill and draws a bit longer. */
      &.euiCheckboxControl-isChecked {
        ${euiCanAnimate} {
          .euiCheckbox__stroke path {
            transition: stroke-dashoffset calc(${speed} * 1.5) ${ease}
              calc(${speed} * 0.4);
          }
        }
      }
    `,
    enabled: {
      selected: css`
        ${controlStyles.input.enabled.selected}

        &::before,
        &::after {
          content: none;
        }
      `,
      unselected: css(controlStyles.input.enabled.unselected),
      // High contrast keeps the filled box and the stop icon.
      indeterminate: highContrastMode
        ? css`
            ${controlStyles.input.enabled.selected}

            &::before,
            &::after {
              content: none;
            }
          `
        : css`
            color: transparent;
            background-color: ${unselected};
            border-color: ${selected};

            &::after {
              transform: scale(1);
            }

            .euiIcon {
              visibility: hidden;
            }
          `,
      checked: css`
        color: ${selectedIcon};
        background-color: ${unselected};
        border-color: ${selected};

        &::before {
          transform: scale(1);
        }

        .euiCheckbox__stroke path {
          stroke-dashoffset: 0;
        }
      `,
      excluded: css`
        ${controlStyles.input.enabled.selected}
        background-color: ${euiTheme.colors.backgroundFilledDanger};
        border-color: ${euiTheme.colors.backgroundFilledDanger};

        &::before,
        &::after {
          content: none;
        }
      `,
    },
    disabled: {
      selected: css`
        ${controlStyles.input.disabled.selected}

        &::before,
        &::after {
          content: none;
        }
      `,
      unselected: css`
        ${controlStyles.input.disabled.unselected}

        &::before,
        &::after {
          content: none;
        }
      `,
    },
    // Pen-stroke check. The filled check icon cannot draw on or wipe off.
    stroke: css`
      position: absolute;
      inset: 0;
      inline-size: 100%;
      block-size: 100%;
      pointer-events: none;

      path {
        fill: none;
        stroke: ${selectedIcon};
        /* Stroke width from the motion study, not a theme token. */
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
      }
    `,
    icon: {
      euiCheckbox__icon: css``,
      check: css`
        ${controlStyles.input.icon}
        stroke: currentColor;
      `,
      indeterminate: css`
        transform: scale(0.5);
      `,
    },
  };
};
