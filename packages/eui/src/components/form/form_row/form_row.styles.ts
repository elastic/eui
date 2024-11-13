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
import { euiFormVariables } from '../form.styles';

export const euiFormRowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { maxWidth, controlHeight, controlCompressedHeight } =
    euiFormVariables(euiThemeContext);

  return {
    euiFormRow: css`
      /* Coerce inline form elements to behave as block-level elements */
      display: flex;

      + .euiButton {
        ${logicalCSS('margin-top', euiTheme.size.base)}
      }
    `,
    // Skip css`` to avoid generating an Emotion className
    formWidth: `
      ${logicalCSS('max-width', maxWidth)}
    `,
    fullWidth: css`
      ${logicalCSS('max-width', '100%')}
    `,

    // Skip css`` to avoid generating an extra className
    row: `
      flex-direction: column;
      row-gap: ${euiTheme.size.xs};

      .euiFormRow__labelWrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      + .euiFormRow {
        ${logicalCSS('margin-top', euiTheme.size.base)}
      }
    `,
    // No difference from the uncompressed row for the current EUI theme
    get rowCompressed() {
      return this.row;
    },

    columnCompressed: css`
      flex-direction: row;
      align-items: stretch;
      column-gap: ${euiTheme.size.s};

      .euiFormRow__label {
        hyphens: auto;
      }

      .euiFormRow__labelWrapper {
        flex-basis: calc(33% - ${euiTheme.size.s}); /* Account for gap */
        ${logicalCSS('min-width', 0)}
        line-height: ${controlCompressedHeight};
      }

      .euiFormRow__fieldWrapper {
        flex-basis: 67%;
        ${logicalCSS('min-width', 0)}
      }

      + .euiFormRow {
        ${logicalCSS('margin-top', euiTheme.size.s)}
      }

      /* Increase spacing for switches */
      &:has(.euiSwitch) {
        &:not(:first-child) {
          ${logicalCSS('margin-top', euiTheme.size.m)}
        }

        &:not(:last-child) {
          ${logicalCSS('margin-bottom', euiTheme.size.m)}
        }

        .euiFormRow__labelWrapper {
          line-height: ${euiTheme.size.base};
        }
      }
    `,

    // Center display is primarily for inline form rows, which may have have
    // field content that is shorter than form controls (e.g. switches, text),
    // and should vertically center said content
    centerDisplayCss: (compressed: boolean) => `
      .euiFormRow__fieldWrapper {
        display: flex;
        align-items: center;
        ${logicalCSS(
          'min-height',
          compressed ? controlCompressedHeight : controlHeight
        )}
      }
    `,
    get center() {
      return css`
        ${this.row}
        ${this.centerDisplayCss(false)}
      `;
    },
    get centerCompressed() {
      return css`
        ${this.row}
        ${this.centerDisplayCss(true)}
      `;
    },
  };
};
