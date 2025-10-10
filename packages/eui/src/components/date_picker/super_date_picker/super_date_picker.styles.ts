/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, makeHighContrastColor } from '../../../services';
import {
  euiFontSize,
  euiMaxBreakpoint,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { highContrastModeStyles } from '../../../global_styling/functions/high_contrast';
import {
  euiFormVariables,
  euiFormControlDefaultShadow,
  euiFormControlInvalidStyles,
  euiFormControlDisabledStyles,
  euiFormControlFocusStyles,
  euiFormControlHighlightBorderStyles,
} from '../../form/form.styles';

export const euiSuperDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const forms = euiFormVariables(euiThemeContext);

  const inputWidth = euiTheme.base * 30;
  const buttonWidth = euiTheme.base * 7; // @see _button_display.styles.ts
  const gap = euiTheme.size.s;

  // Default restricted width
  const restrictedWidth = mathWithUnits(
    gap,
    (gap) => inputWidth + gap + buttonWidth
  );

  // Set a sensible min-width for when width is auto
  const minFormWidth = parseFloat(forms.maxWidth) / 2;
  const autoMinWidth = mathWithUnits(
    gap,
    (gap) => minFormWidth + gap + buttonWidth
  );

  // Needs updating colors
  const needsUpdatingBackgroundColor =
    euiTheme.components.superDatePickerBackgroundSuccees;
  const needsUpdatingTextColor = makeHighContrastColor(euiTheme.colors.success)(
    needsUpdatingBackgroundColor
  );

  return {
    euiSuperDatePicker: css`
      display: flex;
      gap: ${gap};
      ${logicalCSS('max-width', '100%')}

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        ${logicalCSS('width', '100%')}
      }
    `,

    widths: {
      restricted: css`
        ${logicalCSS('width', restrictedWidth)}
      `,
      full: css`
        ${logicalCSS('width', '100%')}
      `,
      auto: css`
        display: inline-flex;
        ${logicalCSS('min-width', `min(${autoMinWidth}, 100%)`)}
        ${logicalCSS('width', 'auto')}
      `,
    },

    // Special rendering cases that override all permutations of the above widths
    noUpdateButton: {
      // Skipping css`` and using the `label` key instead to reduce repeat Emotion generated classNames
      restricted: `
        label: noUpdateButton;
        ${logicalCSS('width', `${inputWidth}px`)};
      `,
      auto: `
        label: noUpdateButton;
        ${logicalCSS('min-width', `min(${minFormWidth}px, 100%)`)};
      `,
      full: `
        label: noUpdateButton;
      `,
    },
    isAutoRefreshOnly: {
      // display: block over flex is required to have the nested .euiPopover wrap expand to the wrapper width
      restricted: `
        label: isAutoRefreshOnly;
        display: block;
        ${logicalCSS('width', forms.maxWidth)}
      `,
      auto: `
        label: isAutoRefreshOnly;
      `,
      full: `
        label: isAutoRefreshOnly;
        display: block;
      `,
    },
    // isQuickSelectOnly forces `width` to be `auto`
    isQuickSelectOnly: css`
      ${logicalCSS('min-width', 0)}

      /* Override default EuiFormControlLayout styles that prevents side nodes from overwhelming the main control */
      .euiFormControlLayout__prepend {
        ${logicalCSS('max-width', 'none')}
      }

      .euiFormControlLayoutDelimited__delimiter:first-child {
        ${logicalCSS('padding-horizontal', 0)}
      }
    `,

    euiSuperDatePicker__range: css`
      flex-grow: 1;
      overflow: hidden;
    `,
    euiSuperDatePicker__rangeInput: css`
      flex-grow: 1;
      ${logicalCSS('width', 'auto')}
      overflow: hidden;
    `,
    euiSuperDatePicker__prettyFormat: css`
      ${_buttonStyles(euiThemeContext)}
      text-align: start;

      --euiFormControlStateHoverColor: ${forms.borderHovered};
      ${euiFormControlDefaultShadow(euiThemeContext)}

      &:focus {
        ${euiFormControlFocusStyles(euiThemeContext)}
      }

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          border: none;
        `,
      })}
    `,

    // Form states
    states: {
      euiSuperDatePicker__formControlLayout: css`
        .euiFormControlLayout__childrenWrapper {
          --euiFormControlStateHoverColor: ${forms.borderHovered};

          ${highContrastModeStyles(euiThemeContext, {
            none: `
              ${euiFormControlDefaultShadow(euiThemeContext)}
              box-shadow: none;
            `,
            preferred: 'border: none;',
          })}

          /* using wrapper hover styles instead */
          .euiDatePopoverButton:not(.euiDatePopoverButton-isSelected):hover {
            outline: none;
          }

          .euiPopover {
            /* mimic input border-radius */
            border-radius: ${forms.controlBorderRadius};

            &:first-child {
              ${logicalCSS('border-top-left-radius', 'inherit')}
              ${logicalCSS('border-bottom-left-radius', 'inherit')}
            }

            &:last-child {
              ${logicalCSS('border-top-right-radius', 'inherit')}
              ${logicalCSS('border-bottom-right-radius', 'inherit')}
            }
          }

          .euiDatePopoverButton {
            background-color: transparent;
            border-radius: inherit;
          }
        }
      `,
      default: css`
        .euiFormControlLayout__childrenWrapper {
          color: ${forms.textColor};
          background-color: ${forms.backgroundColor};
        }

        /* Focus/selection underline per-button */
        .euiDatePopoverButton {
          --euiFormControlStateHoverColor: ${forms.borderHovered};
          box-shadow: none;
        }

        .euiDatePopoverButton:focus,
        .euiPopover-isOpen .euiDatePopoverButton {
          ${euiFormControlFocusStyles(euiThemeContext)}
        }
      `,
      disabled: css`
        .euiFormControlLayout__childrenWrapper {
          ${euiFormControlDisabledStyles(euiThemeContext)}
        }
      `,
      invalid: css`
        .euiFormControlLayout__childrenWrapper {
          color: ${euiTheme.colors.textDanger};
          background-color: ${forms.backgroundColor};

          &:has(.euiPopover-isOpen, .euiDatePopoverButton:focus) {
            --euiFormControlStateColor: ${forms.borderColor};
            --euiFormControlStateHoverColor: ${forms.borderHovered};
          }

          &:not(:has(.euiPopover-isOpen, .euiDatePopoverButton:focus)) {
            ${euiFormControlInvalidStyles(euiThemeContext)}
          }

          .euiDatePopoverButton:focus,
          .euiPopover-isOpen .euiDatePopoverButton {
            ${euiFormControlFocusStyles(euiThemeContext)}
          }
        }
      `,
      needsUpdating: css`
        .euiFormControlLayout__childrenWrapper {
          --euiFormControlStateColor: ${euiTheme.colors.success};
          --euiFormControlStateHoverColor: ${euiTheme.colors.success};
          --euiFormControlStateWidth: ${euiTheme.border.width.thin};

          color: ${needsUpdatingTextColor};
          background-color: ${needsUpdatingBackgroundColor};

          ${euiFormControlHighlightBorderStyles}

          &:has(.euiPopover-isOpen),
          &:focus-within {
            --euiFormControlStateColor: ${forms.borderColor};
            --euiFormControlStateHoverColor: ${forms.borderHovered};
          }
        }

        .euiFormControlLayoutDelimited__delimiter {
          color: inherit;
        }

        /* Focus/selection underline per-button */
        .euiDatePopoverButton {
          ${euiFormControlDefaultShadow(euiThemeContext, {
            withBorder: false,
            withBackgroundColor: false,
          })}
          background-color: inherit;
          box-shadow: none;
        }

        .euiDatePopoverButton:focus,
        .euiPopover-isOpen .euiDatePopoverButton {
          ${euiFormControlFocusStyles(euiThemeContext)}
        }
      `,
    },
  };
};

export const _buttonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return css`
    ${logicalCSS('height', '100%')}
    ${logicalCSS('width', '100%')}
    ${logicalCSS('padding-horizontal', euiTheme.size.s)}

    font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: inherit;
    background-color: inherit;

    &:disabled {
      cursor: not-allowed;
    }
  `;
};
