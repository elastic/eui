/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiFontSize, euiTextTruncate } from '../../global_styling/mixins';
import {
  euiTextShift,
  euiButtonBaseCSS,
  euiButtonContentCSS,
} from '../../global_styling/functions';

export const euiFacetButtonStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiFacetButton: css`
    ${euiButtonBaseCSS(euiTheme)}
    ${euiFontSize('s', euiTheme)}

    height: ${euiTheme.size.xl};
    text-align: left;
    text-decoration: none;
    transition: all ${euiTheme.animation.fast} ease-in;

    &:hover,
    &:focus {
      // Make sure the quantity doesn't get an underline on hover
      &:not(:disabled) [class*='euiFacetButton__text'] {
        text-decoration: underline;
      }
    }

    &:focus:not(:disabled) [class*='euiFacetButton__text'] {
      // TODO replace these two lines with the euiLinkFocusCSS mixin once EuiLink is converted
      text-decoration: underline;
      text-decoration-thickness: ${euiTheme.border.width.thick};
    }

    &:disabled {
      color: ${euiTheme.colors.disabledText};
      pointer-events: none;

      [class*='euiFacetButton__content'] {
        pointer-events: auto;
        cursor: not-allowed;
      }

      [class*='euiFacetButton__icon'],
      [class*='euiFacetButton__quantity'] {
        opacity: 0.5;
      }

      &:focus {
        background-color: transparent;
      }

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  `,
  // Selections
  isSelected: css`
    [class*='euiFacetButton__text'] {
      font-weight: ${euiTheme.font.weight.bold};
    }
  `,
  unSelected: css``,
});

export const euiFacetButtonContentStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiFacetButton__content: css`
    ${euiButtonContentCSS(euiTheme)}
  `,
});

export const euiFacetButtonTextStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiFacetButton__text: css`
    ${euiTextShift('bold', 'data-text', euiTheme)}
    ${euiTextTruncate()}

  flex-grow: 1;
    vertical-align: middle;
  `,
});

export const euiFacetButtonIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiFacetButton__icon: css`
    transition: all ${euiTheme.animation.fast} ease-in;
  `,
});
