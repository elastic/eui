/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalShorthandCSS,
  logicalTextAlignCSS,
  euiFontSize,
} from '../../global_styling';

export const euiFilterSelectItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const focusStyles = `
    color: ${euiTheme.colors.primary};
    background-color: ${euiTheme.focus.backgroundColor};
    outline-offset: -${euiTheme.focus.width};
    text-decoration: underline;

    &:disabled {
      background-color: ${euiTheme.components.filterSelectItemBackgroundFocusDisabled};
    }
  `;

  return {
    euiFilterSelectItem: css`
      display: block; /* Necessary to make sure it doesn't force the whole popover to be too wide */
      ${logicalCSS('width', '100%')}
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.xs} ${euiTheme.size.m}`
      )}

      ${euiFontSize(euiThemeContext, 's')}
      ${logicalTextAlignCSS('left')}

      color: ${euiTheme.colors.textParagraph};
      ${logicalCSS(
        'border-bottom',
        `${euiTheme.border.width.thin} solid ${euiTheme.colors.borderBaseSubdued}`
      )}

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      &:focus {
        ${focusStyles}
      }

      &:disabled {
        cursor: not-allowed;
        text-decoration: none;
        color: ${euiTheme.colors.textDisabled};
      }
    `,
    isFocused: css`
      ${focusStyles}
    `,
  };
};
