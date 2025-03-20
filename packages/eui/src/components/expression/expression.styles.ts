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
  logicalShorthandCSS,
  logicalTextAlignCSS,
  euiTextBreakWord,
  euiTextTruncate,
  mathWithUnits,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { transparentize } from '../../services/color';
import { UseEuiTheme } from '../../services';

const _colorCSS = (color: string) => {
  return `
    &:focus {
      background-color: ${transparentize(color, 0.1)};
    }
  `;
};

export const euiExpressionStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiExpression: css`
      ${euiTextBreakWord()}
      display: inline-block;
      font-family: ${euiTheme.font.familyCode};
      ${euiFontSize(euiThemeContext, 's')}
      ${logicalTextAlignCSS('left')}
      ${logicalShorthandCSS(
        'padding',
        `${mathWithUnits(euiTheme.size.s, (x) => x / 2)} 0`
      )}
      color: ${euiTheme.colors.textParagraph};

      &:focus {
        ${logicalCSS('border-bottom-style', 'solid')}
      }

      & + .euiExpression {
        ${logicalCSS('margin-left', euiTheme.size.s)}
      }
    `,

    // Variants
    columns: css`
      display: flex;
      ${logicalCSS('width', '100%')}
      ${logicalCSS('margin-bottom', euiTheme.size.xs)}
      padding: ${euiTheme.size.xs};
      ${highContrastModeStyles(euiThemeContext, {
        // Render the bottom border in high contrast mode for extra visibility
        none: `
          border-radius: ${euiTheme.size.xs};
          border-color: transparent;
        `,
      })}
    `,

    truncate: css`
      ${logicalCSS('max-width', '100%')}
    `,

    // States
    isClickable: css`
      cursor: pointer;
      ${logicalCSS('border-bottom', euiTheme.border.editable)}

      &[class*='-columns'] {
        background-color: ${euiTheme.colors.lightestShade};

        &:focus,
        &:hover:not(:disabled) {
          [class*='euiExpression__description'],
          [class*='euiExpression__value'] {
            /* Inner child specificity so it inherits underline color from text color */
            text-decoration: underline;
          }
        }
      }
    `,

    isActive: {
      base: css`
        ${logicalCSS('border-bottom-style', 'solid')}
      `,
      subdued: css`
        border-color: ${euiTheme.colors.textSubdued};
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
      accentSecondary: css`
        border-color: ${euiTheme.colors.accentSecondary};
      `,
    },

    subdued: css(_colorCSS(euiTheme.colors.textSubdued)),
    primary: css(_colorCSS(euiTheme.colors.textPrimary)),
    success: css(_colorCSS(euiTheme.colors.textSuccess)),
    warning: css(_colorCSS(euiTheme.colors.textWarning)),
    danger: css(_colorCSS(euiTheme.colors.textDanger)),
    accent: css(_colorCSS(euiTheme.colors.textAccent)),
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
      color: ${euiTheme.colors.textSubdued};
    `,
    primary: css`
      color: ${euiTheme.colors.textPrimary};
    `,
    success: css`
      color: ${euiTheme.colors.textSuccess};
    `,
    warning: css`
      color: ${euiTheme.colors.textWarning};
    `,
    danger: css`
      color: ${euiTheme.colors.textDanger};
    `,
    accent: css`
      color: ${euiTheme.colors.textAccent};
    `,
    isUppercase: css`
      text-transform: uppercase;
    `,
    columns: css`
      ${logicalTextAlignCSS('right')}
      ${logicalCSS('margin-right', euiTheme.size.s)}
      flex-shrink: 0; /* Ensures it doesn't get smaller in case the value is really long */
    `,
  };
};

export const euiExpressionValueStyles = ({}: UseEuiTheme) => {
  return {
    euiExpression__value: css``,
    truncate: css`
      ${euiTextTruncate()}
      display: inline-block;
      vertical-align: bottom;
    `,
    columns: css`
      flex-grow: 1;
    `,
  };
};

export const euiExpressionIconStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiExpression__icon: css`
      ${logicalCSS('margin-left', euiTheme.size.xs)}
    `,
    columns: css`
      ${logicalCSS('margin-top', euiTheme.size.xs)}
    `,
  };
};
