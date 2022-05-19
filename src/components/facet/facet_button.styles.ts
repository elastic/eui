/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiTextTruncate, euiTextShift } from '../../global_styling';

import { euiLinkFocusCSS } from '../link/link.styles';

export const euiFacetButtonStyles = (_theme: UseEuiTheme) => {
  const { euiTheme } = _theme;

  return {
    // Base
    euiFacetButton: css`
    text-align: left;

    &:hover,
    &:focus {
      // Make sure the quantity doesn't get an underline on hover
      &:not(:disabled) .euiFacetButton__text {
        text-decoration: underline;
      }
    }

    &:focus:not(:disabled) [class*='euiFacetButton__text'] {
      ${euiLinkFocusCSS(_theme)}
    }

    &:disabled {
      color: ${euiTheme.colors.disabledText};
      pointer-events: none;

      [class*='euiFacetButton__icon'],
      [class*='euiFacetButton__quantity'] {
        opacity: 0.5;
      }

      &:hover,
      &:focus {
        text-decoration: none;
      }
    },
  `,
    // Selections
    isSelected: css`
      [class*='euiFacetButton__text'] {
        font-weight: ${euiTheme.font.weight.bold};
      }
    `,
    unSelected: css``,
  };
};

export const euiFacetButtonContentElementsStyles = ({
  euiTheme,
}: UseEuiTheme) => ({
  euiFacetButton__content: css``,
  euiFacetButton__text: css`
    ${euiTextShift('bold', 'data-text', euiTheme)}
    ${euiTextTruncate()}
    flex-grow: 1;
  `,
});
