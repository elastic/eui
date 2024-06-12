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
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiFormControlStyles, euiFormVariables } from '../form.styles';

export const euiFilePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formStyles = euiFormControlStyles(euiThemeContext);
  const formVariables = euiFormVariables(euiThemeContext);

  return {
    euiFilePicker: css`
      --euiFormControlLeftIconsCount: 1; /* Manually account for .euiFilePicker__icon */
      position: relative;

      &:has(input:focus) {
        --euiFormControlStateColor: ${euiTheme.colors.primary};
      }
    `,
    isDroppingFile: css`
      --euiFormControlStateColor: ${euiTheme.colors.primary};
    `,
    invalid: css`
      --euiFormControlStateColor: ${euiTheme.colors.danger};
    `,
    hasFiles: css`
      --euiFormControlRightIconsCount: 1;
    `,
    loading: css`
      --euiFormControlRightIconsCount: 1;
    `,

    // Skip the css() on the default width to avoid generating a className
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),

    // The input is an invisible dropzone / button
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

    euiFilePicker__prompt: css`
      pointer-events: none; /* Don't block the user from dropping files onto the filepicker */
      border: ${euiTheme.border.width.thick} dashed
        var(--euiFormControlStateColor, ${euiTheme.colors.lightShade});

      ${euiCanAnimate} {
        transition: border-color ${euiTheme.animation.fast} ease-in,
          background-color ${euiTheme.animation.fast} ease-in;
      }
    `,

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
  };
};
