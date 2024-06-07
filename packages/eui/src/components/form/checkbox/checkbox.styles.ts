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
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiFormVariables } from '../form.styles';

export const euiCheckboxStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const { controlDisabledColor } = euiFormVariables(euiThemeContext);

  const checkboxSize = euiTheme.size.base;
  const labelHeight = euiTheme.size.l;

  // Must use a top offset and not flex align-items: center - if the label text
  // wraps, we want the checkbox to remain top-aligned with the first line of text
  const topOffset = mathWithUnits(
    [labelHeight, checkboxSize],
    (x, y) => (x - y) / 2
  );

  // Apply cursor behavior to both the input and the label
  const inputAndLabelSelector = `&, & + .euiCheckbox__label`;

  return {
    euiCheckbox: css`
      display: flex;
      accent-color: ${euiTheme.colors.primary};
      color-scheme: ${colorMode.toLowerCase()};
    `,

    euiCheckbox__input: css`
      flex-shrink: 0;
      ${logicalSizeCSS(checkboxSize)}

      &:has(+ .euiCheckbox__label) {
        ${logicalCSS('margin-top', topOffset)}
      }

      &:focus-visible {
        outline: ${euiTheme.focus.width} solid ${euiTheme.colors.primary};
        outline-offset: ${euiTheme.border.width.thick};
      }

      ${inputAndLabelSelector} {
        cursor: pointer;
      }

      &:disabled {
        ${inputAndLabelSelector} {
          cursor: not-allowed;
          color: ${controlDisabledColor};
        }
      }

      /* readonly checkboxes are used by EuiMarkdownEditor */
      &[readOnly] {
        ${inputAndLabelSelector} {
          cursor: default;
          pointer-events: none;
        }
      }
    `,

    euiCheckbox__label: css`
      /* Use padding-left instead of flex gap to avoid a mouse click dead zone */
      ${logicalCSS('padding-left', euiTheme.size.s)}
      line-height: ${labelHeight};
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
    `,
  };
};
