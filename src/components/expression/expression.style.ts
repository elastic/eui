/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiFontSize,
  logicalCSS,
  euiTextBreakWord,
  euiTextTruncate,
} from '../../global_styling';
import { transparentize } from '../../services/color';
import { UseEuiTheme } from '../../services';

const _colorCSS = (color: string) => {
  return `
    &:focus {
      background-color: ${transparentize(color, 0.1)};
    }
  `;
};

export const euiExpressionStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiExpression: css`
      ${euiTextBreakWord()};
      font-family: ${euiTheme.font.familyCode};
      border-bottom: ${euiTheme.border.width.thick} solid transparent;
      ${euiFontSize('s', euiTheme)};
      display: inline-block;
      text-align: left;
      padding: calc(${euiTheme.size.s} / 2) 0;
      color: ${euiTheme.colors.text};

      &:focus {
        border-bottom-style: solid;
      }

      & + .euiExpression {
        margin-left: ${euiTheme.size.s};
      }
    `,

    // Variants
    columns: css`
      border-color: transparent;
      // Ensures there's no flash of the dashed style before turning solid for the active state
      border-bottom-style: solid;
      margin-bottom: ${euiTheme.size.xs};

      width: 100%;
      display: flex;
      padding: ${euiTheme.size.xs};
      border-radius: ${euiTheme.size.xs};

      .euiExpression__description {
        text-align: right;
        ${logicalCSS('margin-right', euiTheme.size.s)};
        flex-shrink: 0; // Ensures it doesn't get smaller in case the value is really long
      }

      .euiExpression__value {
        flex-grow: 1;
      }

      .euiExpression__icon {
        ${logicalCSS('margin-top', euiTheme.size.xs)};
      }
    `,

    truncate: css`
      max-width: 100%;

      /* .euiExpression__description, */
      .euiExpression__value {
        ${euiTextTruncate()}
        display: inline-block;
        vertical-align: bottom;
      }
    `,

    // States
    isClickable: css`
      cursor: pointer;
      border-bottom: ${euiTheme.border.editable};
    `,

    'isClickable-columns': css`
      background-color: ${euiTheme.colors.lightestShade};

      &:focus,
      &:hover:not(:disabled) {
        .euiExpression__description,
        .euiExpression__value {
          // inner child specificity so it inherits underline color from text color
          text-decoration: underline;
        }
      }
    `,

    isActive: {
      base: css`
        border-bottom-style: solid;
      `,
      subdued: css`
        border-color: ${euiTheme.colors.subdued};
      `,
      primary: css`
        border-color: ${euiTheme.colors.primary};
      `,
      success: css`
        border-color: ${euiTheme.colors.success};
      `,
      warning: css`
        border-color: ${euiTheme.colors.warning};
      `,
      danger: css`
        border-color: ${euiTheme.colors.danger};
      `,
      accent: css`
        border-color: ${euiTheme.colors.accent};
      `,
    },

    subdued: css(_colorCSS(euiTheme.colors.subdued)),
    primary: css(_colorCSS(euiTheme.colors.primaryText)),
    success: css(_colorCSS(euiTheme.colors.successText)),
    warning: css(_colorCSS(euiTheme.colors.warningText)),
    danger: css(_colorCSS(euiTheme.colors.dangerText)),
    accent: css(_colorCSS(euiTheme.colors.accentText)),
  };
};

export const euiExpressionDescriptionStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiExpression__description: css``,
    truncate: css`
      ${euiTextTruncate()}
      display: inline-block;
      vertical-align: bottom;
    `,
    subdued: css`
      color: ${euiTheme.colors.subdued};
    `,
    primary: css`
      color: ${euiTheme.colors.primaryText};
    `,
    success: css`
      color: ${euiTheme.colors.successText};
    `,
    warning: css`
      color: ${euiTheme.colors.warningText};
    `,
    danger: css`
      color: ${euiTheme.colors.dangerText};
    `,
    accent: css`
      color: ${euiTheme.colors.accentText};
    `,
    isUppercase: css`
      text-transform: uppercase;
    `,
  };
};
