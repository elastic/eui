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

export const euiRadioStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const controlStyles = euiFormCustomControlStyles(euiThemeContext);
  const {
    colors: { selected, unselected },
  } = euiFormCustomControlVariables(euiThemeContext);

  const speed = euiTheme.animation.fast;
  const ease = euiTheme.animation.resistance;

  return {
    euiRadio: css(controlStyles.wrapper),

    input: {
      euiRadio__circle: css`
        ${controlStyles.input.fauxInput}
        ${controlStyles.input.focusVisible}
        border-radius: 50%;

        /* Drawn dot. 8px (size.s) centered in the 16px control leaves a 3px gap inside the 1px border. */
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          margin: auto;
          ${logicalSizeCSS(euiTheme.size.s)}
          border-radius: 50%;
          background-color: ${selected};
          transform: scale(0);
          pointer-events: none;
        }

        ${euiCanAnimate} {
          &::before {
            transition: transform ${speed} ${ease};
          }
        }
      `,
      hasLabel: controlStyles.input.hasLabel, // Skip css`` className generation
      enabled: {
        // High contrast keeps the filled circle and the dot icon.
        selected: highContrastMode
          ? css`
              ${controlStyles.input.enabled.selected}

              &::before {
                content: none;
              }
            `
          : css`
              color: transparent;
              background-color: ${unselected};
              border-color: ${selected};

              &::before {
                transform: scale(1);
              }

              .euiIcon {
                /* The icon fade-in animation would otherwise leave the old dot on top. */
                visibility: hidden;
              }
            `,
        unselected: css`
          ${controlStyles.input.enabled.unselected}
        `,
      },
      disabled: {
        selected: css`
          ${controlStyles.input.disabled.selected}

          &::before {
            content: none;
          }
        `,
        unselected: css`
          ${controlStyles.input.disabled.unselected}

          &::before {
            content: none;
          }
        `,
      },
      euiRadio__icon: css(controlStyles.input.icon),
      euiRadio__input: css(controlStyles.input.hiddenInput),
    },

    label: {
      euiRadio__label: css(controlStyles.label.label),
      enabled: controlStyles.label.enabled,
      disabled: css(controlStyles.label.disabled),
    },
  };
};
