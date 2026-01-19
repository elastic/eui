/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '@elastic/eui-theme-common';

import {
  euiButtonDisplaysColors,
  logicalCSS,
} from '../../../../global_styling';
import {
  appendPrependSelector,
  buttonSelector,
  textSelector,
} from '../form_control_layout.styles';
import { euiFormControlFocusStyles, euiFormVariables } from '../../form.styles';

export const euiFormAppendPrependStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  const appendPrepend = appendPrependSelector;
  const buttons = buttonSelector;
  const text = textSelector;
  const buttonStyles = euiButtonDisplaysColors(euiThemeContext);

  return {
    side: css`
      position: relative;
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.s};
      block-size: 100%;
      max-inline-size: 100%;
      border-radius: ${form.controlLayoutInnerBorderRadius};

      /* Focus is handled by the wrapper. This ensures correct positioning and border radius */
      &:focus-visible {
        outline: none;
      }
    `,
    uncompressed: css`
      &:not(:has(> ${buttons}:first-child, > *:first-child ${buttons})) {
        ${logicalCSS('padding-left', euiTheme.size.s)}
      }

      &:not(:has(> ${buttons}:last-child, > *:last-child ${buttons})) {
        ${logicalCSS('padding-right', euiTheme.size.s)}
      }
    `,
    compressed: css`
      &:not(:has(> ${buttons}:first-child, > *:first-child ${buttons})) {
        ${logicalCSS('padding-left', euiTheme.size.xs)}
      }

      &:not(:has(> ${buttons}:last-child, > *:last-child ${buttons})) {
        ${logicalCSS('padding-right', euiTheme.size.xs)}
      }
    `,
    wrapper: css`
      position: relative;

      &:has(${appendPrepend}:focus-visible) {
        &::after {
          ${euiFormControlFocusStyles(euiThemeContext)}
          content: '';
          position: absolute;
          inset: -${euiTheme.size.xs};
          border-radius: ${form.controlLayoutBorderRadius};
          pointer-events: none;
        }
      }
    `,
    isInteractive: css`
      ${buttonStyles.empty.primary};
      background-color: ${form.backgroundColor};

      * {
        cursor: pointer;
      }

      ${text} {
        color: currentColor;
        cursor: pointer;
      }
    `,
    disabled: css`
      color: ${form.textColorDisabled};

      .euiFormLabel,
      .euiNotificationBadge {
        color: ${form.textColorDisabled};
      }
    `,
    label: css`
      &:where(:has(+ *)) {
        margin-inline-end: -${euiTheme.size.xs};
      }
    `,
    icon: css`
      &:where(:has(+ .euiFormLabel)) {
        margin-inline-end: -${euiTheme.size.xs};
      }
    `,
  };
};
