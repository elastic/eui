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
  euiDisabledSelector,
  logicalCSS,
  logicalCSSWithFallback,
  mathWithUnits,
} from '../../../global_styling';
import {
  euiFormControlStyles,
  euiFormControlDefaultShadow,
  euiFormControlText,
  euiFormVariables,
} from '../../form/form.styles';

/* Minimum widths (px) used by `selectionDisplay="collapse"` and shared with the
 * fit calculation in `EuiComboBoxInput`.
 * TODO: derive these from `euiTheme.size` once the component is converted to a
 * functional component, where the theme is available outside of render */
// Room kept free for the caret and the first typed characters
export const COLLAPSE_INPUT_MIN_WIDTH = 12;
// A lone pill may truncate to fit, but not below this width
export const COLLAPSE_PILL_MIN_WIDTH = 64;

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
    // `selectionDisplay="collapse"`: single row, pills that don't fit are hidden
    // (but stay rendered so they can be measured) and folded into a "+N" badge
    collapsed: css`
      position: relative;
      flex-wrap: nowrap;
      overflow: hidden;

      /* The input keeps the width that getVisibleCount reserved for it, so only
         the last pill shrinks. Its maximum width is set inline, to keep a long
         query from running under the icons. */
      .euiComboBox__input {
        flex-shrink: 0;
        ${logicalCSS('min-width', `${COLLAPSE_INPUT_MIN_WIDTH}px`)}
      }

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

          &:is(${euiDisabledSelector}) {
            border-color: ${euiTheme.components.badgeBorderColorHollow};
          }
        }
      }

      /* Visible pills are shown in full (see getVisibleCount), except the last
         one, which may shrink below its content and truncate to use the remaining
         space */
      .euiComboBoxPill {
        flex-shrink: 0;
        ${logicalCSS('min-width', '0')}
      }

      /* The only item that shrinks. The fit calculation already guarantees that it
         stays wide enough. */
      .euiComboBoxPill--shrinkable {
        flex-shrink: 1;
      }

      /* Hidden "+N" badge, only rendered so that its width can be measured */
      .euiComboBoxCollapsedBadgeMeasure {
        position: absolute;
        visibility: hidden;
        pointer-events: none;
      }

      /* Pills that don't fit stay in the DOM so updateVisibleCount can keep
         measuring them (to bring them back when there is more room).
         display: none would remove their layout box and measure as 0, so they
         are hidden with visibility and taken out of the flow with
         position: absolute instead. visibility: hidden also keeps them out of
         the tab order and the accessibility tree; the "+N" popover lists them. */
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
      /* Pills keep their natural width, as they do in the control */
      align-items: flex-start;
      ${logicalCSS('width', 'max-content')}
      ${logicalCSS('max-width', 'min(300px, calc(100vw - 32px))')}
      gap: ${euiTheme.size.xs};
      ${logicalCSS('max-height', '240px')}
      ${logicalCSSWithFallback('overflow-y', 'auto')}

      .euiComboBoxPill {
        /* prevent pills from collapsing */
        flex-shrink: 0;
        ${logicalCSS('max-width', '100%')}
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
      `,
      multiSelectGroup: css`
        /* The control has no definite height, so the sides' default height: 100%
           doesn't resolve. Let them stretch instead so prepend/append dividers
           span the full height of the control */
        > .euiFormControlLayout__prepend,
        > .euiFormControlLayout__append {
          ${logicalCSS('height', 'auto')}
          align-self: stretch;
          /* The sides keep their natural width and only give up space (truncating
             their content) when the center would otherwise drop below its minimum
             width, so how far they can shrink is limited by that minimum. */
          flex-shrink: 1;

          > * {
            ${logicalCSS('max-width', '100%')}
            ${logicalCSS('min-width', '0')}
          }
        }

        /* The center (pills and input) starts from no width, so the full width of
           all pills isn't counted as overflow that the sides would have to absorb.
           It keeps enough room for the input, the "+N" badge and the icons. */
        > .euiFormControlLayout__childrenWrapper {
          flex: 1 1 0%;
          ${logicalCSS(
            'min-width',
            mathWithUnits(euiTheme.size.xxxxl, (x) => x * 2)
          )}
        }

        ${sideContentTop(formVariables.controlHeight)}
      `,
      multiSelectCompressed: css`
        ${sideContentTop(formVariables.controlCompressedHeight)}
      `,
    },
  };
};
