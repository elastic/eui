/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, mathWithUnits } from '../../../global_styling';
import {
  euiFormControlStyles,
  euiFormControlDefaultShadow,
  euiFormControlText,
  euiFormVariables,
} from '../../form/form.styles';

export const euiComboBoxInputStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const formStyles = euiFormControlStyles(euiThemeContext);
  const formVariables = euiFormVariables(euiThemeContext);

  const pillHeight = mathWithUnits(euiTheme.size.l, (x) => x - 2);
  const pillLineHeight = mathWithUnits(pillHeight, (x) => x - 2);

  // Align the content of prepend/append to the first row of the control
  const sideContentTop = (rowHeight: string) => `
    > .euiFormControlLayout__prepend,
    > .euiFormControlLayout__append {
      align-items: flex-start;

      > * {
        /* The sides have vertical padding, subtract it so the content is
           exactly one row high and doesn't make the control taller */
        ${logicalCSS('height', `calc(${rowHeight} - ${euiTheme.size.xs} * 2)`)}
      }
    }
  `;

  return {
    // Wrapper which visually mimics a form control
    euiComboBoxInputWrapper: css`
      ${euiFormControlDefaultShadow(euiThemeContext)}
      display: flex;

      &:focus-within {
        ${formStyles.focus}
      }
    `,
    multiSelect: css`
      flex-wrap: wrap;
    `,
    // \`selectionDisplay="collapse"\`: single row, pills that don't fit are hidden
    // (but stay rendered so they can be measured) and folded into a "+N" badge
    collapsed: css`
      position: relative;
      flex-wrap: nowrap;
      overflow: hidden;

      /* Match the pills' height and vertical centering */
      .euiComboBoxCollapsedBadge {
        display: flex;
        align-items: center;
        flex-shrink: 0;

        .euiBadge {
          ${logicalCSS('height', pillHeight)}
          line-height: ${pillLineHeight};
          ${logicalCSS('margin-vertical', '1px')}
          margin-inline: 0;
        }
      }

      /* When even a single pill doesn't fit, let it shrink (and truncate) so it
         never runs under the clear/dropdown icons or the badge */
      .euiComboBoxPill:not(.euiComboBoxPill--collapsed) {
        flex-shrink: 1;
        ${logicalCSS('min-width', '0')}
      }

      .euiComboBoxPill--collapsed {
        position: absolute;
        visibility: hidden;
        pointer-events: none;
      }
    `,
    // Hidden selections listed in the "+N" popover
    collapsedList: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: ${euiTheme.size.xs};
      ${logicalCSS('max-height', '240px')}
      overflow-block: auto;

      /* The pill's default max-width is relative to its container, which
         shrinks to fit the pills - use a fixed max width instead */
      .euiComboBoxPill {
        ${logicalCSS('max-width', '300px')}
      }
    `,
    uncompressed: `
      ${formStyles.uncompressed}
      ${logicalCSS('height', 'auto')}
      ${logicalCSS('padding-vertical', euiTheme.size.s)}
      ${logicalCSS('padding-left', euiTheme.size.m)}
      column-gap: ${euiTheme.size.s};
      row-gap: ${euiTheme.size.xs};
    `,
    compressed: css`
      ${formStyles.compressed}
      ${logicalCSS('height', 'auto')}
      ${logicalCSS('padding-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-left', euiTheme.size.xs)}
      column-gap: ${euiTheme.size.xs};
      row-gap: ${euiTheme.size.xxs};
    `,
    plainText: {
      plainText: css`
        align-items: center;
        cursor: text;
      `,
      compressed: `
        ${logicalCSS('padding-left', euiTheme.size.s)}
      `,
      uncompressed: `
        ${logicalCSS('padding-left', euiTheme.size.m)}
      `,
    },

    invalid: css(formStyles.invalid),
    disabled: css(formStyles.disabled),
    open: css`
      ${formStyles.focus}
    `,
    inGroup: css(formStyles.inGroup),

    // Actual input element, which has variable width depending on its value
    euiComboBoxInput: css`
      /* Force input height to expand to fill this element. */
      ${logicalCSS('height', euiTheme.size.l)}
      ${logicalCSS('min-width', '2px')}
      ${logicalCSS('max-width', '100%')}

      /* Reset input appearance to mimic text */
      ${euiFormControlText(euiThemeContext)}
      background: transparent;

      &:disabled {
        color: ${euiTheme.colors.textDisabled};
      }

      /* Ensure that no input states are visible on the hidden input */
      /* stylelint-disable declaration-no-important */
      appearance: none !important;
      border: none !important;
      box-shadow: none !important;
      outline: none !important;
      /* stylelint-enable declaration-no-important */
    `,

    // EuiFormControlLayout overrides
    formLayout: {
      euiComboBox__formControlLayout: css``,
      // Allow the form control to expand to any height to accommodate multiple rows of pills
      multiSelect: css`
        ${logicalCSS('height', 'auto')}

        /* The control has no definite height, so the sides' default \`height: 100%\`
           doesn't resolve. Let them stretch instead so prepend/append dividers
           span the full height of the control */
        > .euiFormControlLayout__prepend,
        > .euiFormControlLayout__append {
          ${logicalCSS('height', 'auto')}
          align-self: stretch;
        }

        ${sideContentTop(formVariables.controlHeight)}
      `,
      multiSelectCompressed: css`
        ${sideContentTop(formVariables.controlCompressedHeight)}
      `,
    },
  };
};
