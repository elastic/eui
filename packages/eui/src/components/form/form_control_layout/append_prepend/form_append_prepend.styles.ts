/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '@elastic/eui-theme-common';

import { logicalCSS } from '../../../../global_styling';
import { buttonSelectors } from '../form_control_layout.styles';
import { euiFormVariables } from '../../form.styles';

export const euiFormAppendPrependStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  const buttons = buttonSelectors;

  return {
    side: css`
      position: relative;
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
      block-size: 100%;
      max-inline-size: 100%;
    `,
    uncompressed: css`
      &:not(:has(> ${buttons}:first-child, > *:first-child ${buttons})) {
        ${logicalCSS('padding-left', euiTheme.size.m)}
      }

      &:not(:has(> ${buttons}:last-child, > *:last-child ${buttons})) {
        ${logicalCSS('padding-right', euiTheme.size.m)}
      }
    `,
    compressed: css`
      &:not(:has(> ${buttons}:first-child, > *:first-child ${buttons})) {
        ${logicalCSS('padding-left', euiTheme.size.s)}
      }

      &:not(:has(> ${buttons}:last-child, > *:last-child ${buttons})) {
        ${logicalCSS('padding-right', euiTheme.size.s)}
      }
    `,
    append: css`
      border-radius: 0;
      border-start-end-radius: ${euiTheme.border.radius.small};
      border-end-end-radius: ${euiTheme.border.radius.small};
    `,
    prepend: css`
      border-radius: 0;
      border-start-start-radius: ${euiTheme.border.radius.small};
      border-end-start-radius: ${euiTheme.border.radius.small};
    `,
    isInteractive: css`
      color: ${euiTheme.colors.textPrimary};

      &:hover {
        background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};
      }

      &:focus,
      &:focus-visible {
        outline: none;

        /* apply a focus style that matches input focus more closely */
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          border: ${euiTheme.border.width.thick} solid
            ${euiTheme.components.forms.borderFocused};
          /* ensure it stays on top of hovered borders */
          z-index: 2;
          pointer-events: none;
          border-radius: inherit;
        }
      }

      .euiFormLabel {
        color: currentColor;
        cursor: pointer;
      }

      * {
        cursor: pointer;
      }
    `,
    disabled: css`
      color: ${form.textColorDisabled};

      .euiFormLabel {
        color: ${form.textColorDisabled};
      }
    `,
  };
};
