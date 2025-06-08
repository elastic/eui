/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { serializeStyles, type CSSObject } from '@emotion/serialize';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../../services';
import { euiCanAnimate, euiTextBreakWord } from '../../../global_styling';
import { euiTitle } from '../../title/title.styles';

export const euiFormLabel = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  // Exclude the fontWeight from the title, since we're setting our own later
  const { fontWeight: _, ..._titleStyles } = euiTitle(euiThemeContext, 'xxxs');
  // Since we're not returning a css`` string (to avoid generating an extra Emotion
  // className), we need to manually serialize the style object into a string
  const titleStyles = serializeStyles([_titleStyles as CSSObject]).styles;

  return `
    ${titleStyles}
    font-weight: ${euiTheme.font.weight.semiBold};
    ${euiTextBreakWord()}
  `;
};

export const euiFormLabelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'formVariant'
  );

  return {
    euiFormLabel: css`
      ${euiFormLabel(euiThemeContext)}
      display: inline-block;

      ${euiCanAnimate} {
        transition: color ${euiTheme.animation.fast}
          ${euiTheme.animation.resistance};
      }
    `,
    // Skip css`` to avoid generating an extra Emotion className
    // Use :where to reduce specificity & make the CSS easier to override by prepend/append nodes
    notDisabled: `
      &:where([for]) {
        cursor: pointer;
      }
    `,
    invalid: css`
      color: ${isRefreshVariant
        ? euiTheme.colors.textDanger
        : euiTheme.colors.danger};
    `,
    // Focused state should override invalid state
    focused: css`
      color: ${isRefreshVariant ? '' : euiTheme.colors.primary};
    `,
  };
};
