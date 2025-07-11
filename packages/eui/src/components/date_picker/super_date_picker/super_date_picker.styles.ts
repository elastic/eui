/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import {
  UseEuiTheme,
  isEuiThemeRefreshVariant,
  makeHighContrastColor,
} from '../../../services';
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
  euiFormControlShowBackgroundLine,
  euiFormControlFocusStyles,
  euiFormControlHighlightBorderStyles,
} from '../../form/form.styles';

export const euiSuperDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'formVariant'
  );

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

  const formLayoutStyles = `
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
    `;

  const popoverButtonFocusStyles = isRefreshVariant
    ? `
       ${euiFormControlFocusStyles(euiThemeContext)}
    `
    : `
      --euiFormControlStateColor: ${euiTheme.colors.primary};
      ${euiFormControlShowBackgroundLine(
        euiThemeContext,
        euiTheme.colors.primary
      )}
    `;

  const invalidStyles = isRefreshVariant
    ? `
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
    `
    : `
      ${euiFormControlInvalidStyles(euiThemeContext)}
    `;

  const needsUpdatingStyles = `
      --euiFormControlStateColor: ${euiTheme.colors.success};
      --euiFormControlStateHoverColor: ${euiTheme.colors.success};
      --euiFormControlStateWidth: ${euiTheme.border.width.thin};
      ${euiFormControlHighlightBorderStyles}
  
      &:has(.euiPopover-isOpen),
      &:focus-within {
        --euiFormControlStateColor: ${forms.borderColor};
        --euiFormControlStateHoverColor: ${forms.borderHovered};
      }
    `;

  const needsUpdatingPopoverButtonFocusStyles = isRefreshVariant
    ? `
      ${euiFormControlFocusStyles(euiThemeContext)}
    `
    : `
      --euiFormControlStateColor: ${euiTheme.colors.success};
      ${euiFormControlShowBackgroundLine(
        euiThemeContext,
        euiTheme.colors.success
      )}

      ${highContrastModeStyles(euiThemeContext, {
        // Force the fill color of all icons/svgs to give a bit more indication of state,
        // since Windows high contrast themes otherwise override background/text color
        forced: `
          svg,
          & + * svg {
            fill: ${euiTheme.colors.success};
          }
        `,
      })}
    `;

  const prettyFormatStyles = `
      --euiFormControlStateHoverColor: ${forms.borderHovered};
      ${euiFormControlDefaultShadow(euiThemeContext)}
      
      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          border: none;
        `,
      })}

      &:focus {
        ${euiFormControlFocusStyles(euiThemeContext)}
      }
    `;

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

      ${isRefreshVariant && prettyFormatStyles}
    `,

    // Form states
    states: {
      euiSuperDatePicker__formControlLayout: css`
        .euiFormControlLayout__childrenWrapper {
          --euiFormControlStateHoverColor: ${forms.borderHovered};
          ${euiFormControlDefaultShadow(euiThemeContext)}
          ${highContrastModeStyles(euiThemeContext, {
            none: 'box-shadow: none;',
            preferred: 'border: none;',
          })}

          ${isRefreshVariant && formLayoutStyles}
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
          ${!isRefreshVariant &&
          euiFormControlDefaultShadow(euiThemeContext, {
            withBorder: false,
            withBackgroundColor: false,
          })}
          box-shadow: none;
        }

        .euiDatePopoverButton:focus,
        .euiPopover-isOpen .euiDatePopoverButton {
          ${popoverButtonFocusStyles}
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

          ${invalidStyles}
        }
      `,
      needsUpdating: css`
        .euiFormControlLayout__childrenWrapper {
          color: ${needsUpdatingTextColor};
          background-color: ${needsUpdatingBackgroundColor};

          ${isRefreshVariant && needsUpdatingStyles}
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
          ${needsUpdatingPopoverButtonFocusStyles}
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
