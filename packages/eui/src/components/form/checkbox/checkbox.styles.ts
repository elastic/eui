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
  euiFormCustomControlStyles,
  euiFormCustomControlVariables,
} from '../form.styles';

export const euiCheckboxStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const controlStyles = euiFormCustomControlStyles(euiThemeContext);
  const {
    colors: { unselectedBorder },
  } = euiFormCustomControlVariables(euiThemeContext);

  return {
    euiCheckbox: css(controlStyles.wrapper),

    input: {
      euiCheckbox__square: css`
        ${controlStyles.input.fauxInput}
        border-radius: ${euiTheme.border.radius.small};
      `,
      hasLabel: controlStyles.input.hasLabel, // Skip css`` className generation
      enabled: {
        selected: css(controlStyles.input.enabled.selected),
        unselected: css(controlStyles.input.enabled.unselected),
      },
      disabled: {
        selected: css(controlStyles.input.disabled.selected),
        unselected: css(controlStyles.input.disabled.unselected),
      },
      // Readonly checkboxes are used by EuiMarkdownEditor
      // Maintain the initial color to enforce that clicks are not doing anything
      readOnly: css`
        &:has(input:focus-visible) {
          outline: ${euiTheme.focus.width} solid ${unselectedBorder};
        }

        &:has(input:focus) {
          border-color: ${unselectedBorder};
        }
      `,

      icon: {
        euiCheckbox__icon: css``,
        check: css`
          ${controlStyles.input.icon}
          stroke: currentColor;
        `,
        indeterminate: css`
          transform: scale(0.5);
        `,
      },

      euiCheckbox__input: css`
        ${controlStyles.input.hiddenInput}

        &[readonly] {
          cursor: default;
        }
      `,
    },

    label: {
      euiCheckbox__label: css(controlStyles.label.label),
      enabled: controlStyles.label.enabled,
      disabled: css(controlStyles.label.disabled),
      readOnly: css`
        cursor: default;
      `,
    },
  };
};
