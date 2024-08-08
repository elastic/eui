/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

import { euiFormControlDefaultShadow, euiFormVariables } from '../form.styles';

export const euiFormControlLayoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return {
    euiFormControlLayout: css``,
    // Skip the css`` on the default height to avoid generating a className
    uncompressed: `
      ${logicalCSS('height', form.controlHeight)}
    `,
    compressed: css`
      ${logicalCSS('height', form.controlCompressedHeight)}
    `,
    // Skip the css`` on the default width to avoid generating a className
    formWidth: `
      ${logicalCSS('max-width', form.maxWidth)}
      ${logicalCSS('width', '100%')}
    `,
    fullWidth: css`
      ${logicalCSS('max-width', '100%')}
      ${logicalCSS('width', '100%')}
    `,

    group: {
      group: css`
        display: flex;
        align-items: stretch;

        /* Account for inner box-shadow style border */
        padding: ${euiTheme.border.width.thin};
        ${euiFormControlDefaultShadow(euiThemeContext, {
          withBackground: false,
        })}
        background-color: ${form.backgroundColor};
        /* Keep backgrounds inside border radius */
        overflow: hidden;

        /* Force the stretch of any children so they expand the full height of the control */
        > *,
        .euiButtonEmpty,
        .euiText,
        .euiFormLabel,
        .euiButtonIcon {
          ${logicalCSS('height', '100%')}
        }
      `,
      // Skipping css`` to avoid repeated compressed/uncompressed classNames
      uncompressed: `
        border-radius: ${form.controlBorderRadius};
      `,
      compressed: `
        border-radius: ${form.controlCompressedBorderRadius};
      `,
    },

    children: {
      euiFormControlLayout__childrenWrapper: css`
        position: relative;
      `,
      inGroup: css`
        flex-grow: 1;
        overflow: hidden; /* Ensure truncation works in children elements */
      `,
      prependOnly: css`
        ${logicalCSS('border-top-right-radius', 'inherit')}
        ${logicalCSS('border-bottom-right-radius', 'inherit')}
      `,
      appendOnly: `
        ${logicalCSS('border-top-left-radius', 'inherit')}
        ${logicalCSS('border-bottom-left-radius', 'inherit')}
      `,
    },
  };
};
