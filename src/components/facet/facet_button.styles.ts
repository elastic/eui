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
  euiTextTruncate,
  euiTextShift,
  logicalTextAlignCSS,
} from '../../global_styling';

export const euiFacetButtonStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiFacetButton: css`
    ${logicalTextAlignCSS('left')}

    &:not(:disabled) {
      &:hover,
      &:focus {
        /* Make sure the quantity doesn't get an underline on hover */
        text-decoration: none;

        .euiFacetButton__text {
          text-decoration: underline;
        }
      }

      &:focus .euiFacetButton__text {
        text-decoration-thickness: ${euiTheme.border.width.thick};
      }
    }

    &:disabled {
      color: ${euiTheme.colors.disabledText};
      pointer-events: none;
    }
  `,
});

export const euiFacetButtonTextStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiFacetButton__text: css`
    ${euiTextShift('bold', 'data-text', euiTheme)}
    ${euiTextTruncate()}
    flex-grow: 1;
  `,
  isSelected: css`
    font-weight: ${euiTheme.font.weight.bold};
  `,
  unSelected: css``,
});

export const euiFacetButtonIconStyles = () => ({
  euiFacetButton__icon: css``,
  isDisabled: css`
    opacity: 0.5;
  `,
});

export const euiFacetButtonLoadingSpinnerStyles = () => ({
  euiFacetButton__loadingSpinner: css``,
});

export const euiFacetButtonQuantityStyles = () => ({
  euiFacetButton__quantity: css``,
  isDisabled: css`
    opacity: 0.5;
  `,
});
