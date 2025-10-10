/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  euiCanAnimate,
  euiFontSize,
  euiTextTruncate,
  highContrastModeStyles,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import {
  euiFormControlShowBackgroundLine,
  euiFormControlStyles,
  euiFormVariables,
} from '../form.styles';

export const euiFilePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const formStyles = euiFormControlStyles(euiThemeContext);
  const formVariables = euiFormVariables(euiThemeContext);
  const { fontSize, lineHeight } = euiFontSize(euiThemeContext, 's');

  return {
    euiFilePicker: css`
      --euiFormControlLeftIconsCount: 1; /* Manually account for .euiFilePicker__icon */
      position: relative;
      border-radius: ${formVariables.controlBorderRadius};

      &:has(input:focus) {
        --euiFormControlStateColor: ${formVariables.borderFocused};
      }

      &:hover {
        --euiFormControlStateColor: ${highContrastMode
          ? euiTheme.border.color
          : formVariables.borderHovered};
        --euiFormControlStateStyle: solid;
      }

      &:focus-within {
        ${highContrastModeStyles(euiThemeContext, {
          forced: `
              ${euiFormControlShowBackgroundLine(
                euiThemeContext,
                formVariables.borderFocused
              )}
            `,
        })}
      }
    `,
    isDroppingFile: css`
      --euiFormControlStateColor: ${euiTheme.colors.borderStrongSuccess};
      --euiFormControlStateStyle: ${highContrastMode === 'forced'
        ? 'solid'
        : 'dashed'};

      background-color: ${euiTheme.components.forms.backgroundDropping};
    `,
    invalid: css`
      --euiFormControlStateColor: ${formVariables.borderInvalid};

      &:hover {
        --euiFormControlStateColor: ${formVariables.borderInvalidHovered};
      }

      ${highContrastModeStyles(euiThemeContext, {
        forced: `
          ${euiFormControlShowBackgroundLine(
            euiThemeContext,
            formVariables.borderInvalid
          )}
        `,
      })}
    `,
    hasFiles: css`
      --euiFormControlRightIconsCount: 1;
      font-weight: ${euiTheme.font.weight.bold};
    `,
    loading: css`
      --euiFormControlRightIconsCount: 1;

      /* Clip EuiProgress loading indicator that renders for large displays */
      border-radius: ${formVariables.controlCompressedBorderRadius};
      overflow: hidden;
    `,

    // Skip the css() on the default width to avoid generating a className
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),

    // The input is an invisible dropzone / button
    input: {
      euiFilePicker__input: css`
        position: absolute;
        inset: 0;
        opacity: 0;

        &:hover {
          cursor: pointer;
        }

        &:hover:disabled {
          cursor: not-allowed;
        }

        &:disabled {
          opacity: 0;
        }
      `,
      largeInteractive: css`
        &:hover,
        &:focus,
        .euiFilePicker-isDroppingFile & {
          & + .euiFilePicker__prompt {
            .euiFilePicker__promptText {
              ${highContrastModeStyles(euiThemeContext, {
                forced: `
                  text-decoration: underline;
                `,
              })}
            }

            .euiFilePicker__icon {
              transform: scale(1.05);
            }
          }
        }
      `,
    },

    euiFilePicker__prompt: css`
      pointer-events: none; /* Don't block the user from dropping files onto the filepicker */
      font-size: ${fontSize};
      line-height: 1; /* Vertically centers default display text */
      ${euiTextTruncate()}
      color: ${euiTheme.colors.textParagraph};
      border: ${euiTheme.border.width.thin}
        var(--euiFormControlStateStyle, dashed)
        var(--euiFormControlStateColor, ${formVariables.borderColor});

      ${euiCanAnimate} {
        transition: border-color ${euiTheme.animation.fast} ease-in,
          background-color ${euiTheme.animation.fast} ease-in;
      }
    `,
    disabled: css(formStyles.disabled),

    // Skip the css() on the default height to avoid generating a className
    uncompressed: formStyles.uncompressed,
    compressed: css(formStyles.compressed),

    // Completely different rendering style from the normal form controls
    large: {
      large: css`
        padding-inline: ${euiTheme.size.l};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        /* Child text truncation needed on prompt text due to flex display */
        .euiFilePicker__promptText {
          ${euiTextTruncate()}
          line-height: ${lineHeight}; /* Fix descenders getting cut off */
        }
      `,
      // Static heights so that surrounding contents don't shift around
      uncompressed: `
        ${logicalCSS(
          'height',
          mathWithUnits(euiTheme.size.base, (x) => x * 8)
        )}
        border-radius: ${formVariables.controlBorderRadius};
      `,
      compressed: css`
        ${logicalCSS(
          'height',
          mathWithUnits(euiTheme.size.base, (x) => x * 6.5)
        )}
        border-radius: ${formVariables.controlCompressedBorderRadius};
      `,
    },

    icon: {
      euiFilePicker__icon: css``,

      normal: css`
        position: absolute;
        ${logicalCSS('top', 0)}
        ${logicalCSS('height', '100%')}
      `,
      uncompressed: `
        ${logicalCSS('left', euiTheme.size.m)}
      `,
      compresssed: css`
        ${logicalCSS('left', euiTheme.size.s)}
        ${logicalCSS('width', euiTheme.size.m)}
      `,

      large: css`
        ${logicalCSS('margin-bottom', euiTheme.size.base)}

        ${euiCanAnimate} {
          transition: transform ${euiTheme.animation.fast}
            ${euiTheme.animation.resistance};
        }
      `,
    },

    rightIcon: {
      euiFilePicker__rightIcon: css`
        position: absolute;
      `,
      uncompressed: `
        ${logicalCSS('top', euiTheme.size.m)}
        ${logicalCSS('right', euiTheme.size.m)}
      `,
      compressed: css`
        ${logicalCSS('right', euiTheme.size.s)}
        ${logicalCSS('top', '50%')}
        ${logicalCSS(
          'margin-top',
          mathWithUnits(euiTheme.size.m, (x) => x / -2)
        )}
      `,
    },

    euiFilePicker__clearButton: css`
      pointer-events: auto; /* Undo the pointer-events: none applied to the enclosing prompt */
      position: relative; /* Required to sit above hidden input */
    `,
  };
};
