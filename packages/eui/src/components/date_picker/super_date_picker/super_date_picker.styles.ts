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
  euiFontSize,
  euiCanAnimate,
  euiMaxBreakpoint,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiFormVariables } from '../../form/form.styles';

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

  return {
    euiSuperDatePicker: css`
      display: flex;
      gap: ${gap};
      ${logicalCSS('max-width', '100%')}

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        ${logicalCSS('width', '100%')}
      }

      /* Fix border radius clipping, but only if the auto refresh append item isn't rendered */
      .euiFormControlLayout__childrenWrapper:last-child {
        ${logicalCSS('border-top-right-radius', 'inherit')}
        ${logicalCSS('border-bottom-right-radius', 'inherit')}
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
    `,

    euiSuperDatePicker__range: css`
      flex-grow: 1;
    `,
    euiSuperDatePicker__rangeInput: css`
      flex-grow: 1;
      /* Needs !important to override EuiFormControlLayoutDelimited's fullWidth CSS */
      ${logicalCSS('width', 'auto !important')}
    `,
    euiSuperDatePicker__prettyFormat: css`
      ${logicalCSS('height', '100%')}
      ${logicalCSS('width', '100%')}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      text-align: start;
      word-break: break-all;
      color: ${forms.textColor};
      background-color: ${forms.backgroundColor};

      &:disabled {
        background-color: ${forms.backgroundDisabledColor};
        color: ${forms.controlDisabledColor};
        cursor: not-allowed;
      }

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.fast} ease-in;
      }
    `,
  };
};
