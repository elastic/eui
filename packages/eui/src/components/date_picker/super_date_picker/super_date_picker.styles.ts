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
  euiMaxBreakpoint,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiFormVariables } from '../../form/form.styles';

export const euiSuperDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const inputWidth = euiTheme.base * 30;
  const buttonWidth = euiTheme.base * 7; // @see _button_display.styles.ts
  const gap = euiTheme.size.s;

  // Default restricted width
  const restrictedWidth = mathWithUnits(
    gap,
    (gap) => inputWidth + gap + buttonWidth
  );

  // Set a sensible min-width for when width is auto
  const { maxWidth: maxFormWidth } = euiFormVariables(euiThemeContext);
  const minFormWidth = parseFloat(maxFormWidth) / 2;
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
    noUpdateButton: css`
      ${logicalCSS('min-width', `min(${minFormWidth}, 100%)`)}
      ${logicalCSS('width', `${inputWidth}px`)}
    `,
    isAutoRefreshOnly: css`
      ${logicalCSS('min-width', `min(${minFormWidth}, 100%)`)}
      ${logicalCSS('width', `${maxFormWidth}px`)}
    `,
    isQuickSelectOnly: css`
      ${logicalCSS('min-width', 0)}
    `,
  };
};
