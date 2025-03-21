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
  mathWithUnits,
  euiTextShift,
  euiTextTruncate,
} from '../../global_styling';
import { euiFormVariables } from '../form/form.styles';

export const euiFilterButtonDisplay = ({ euiTheme }: UseEuiTheme) => {
  return {
    flex: '1 1 auto',
    minInlineSize: mathWithUnits(euiTheme.size.base, (x) => x * 3),
  };
};

export const euiFilterButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { controlHeight, borderColor } = euiFormVariables(euiThemeContext);

  const border = `${euiTheme.border.width.thin} solid ${borderColor}`;

  // Pseudo elements create borders without affecting width. We also prefer them
  // over box-shadow for Windows high contrast theme compatibility
  const leftBorder = `
    &::before {
      content: '';
      position: absolute;
      ${logicalCSS('right', '100%')}
      ${logicalCSS('vertical', 0)}
      ${logicalCSS('border-left', border)}
    }
  `;
  // Bottom borders are needed for responsive flex-wrap behavior
  const bottomBorder = `
    &::after {
      content: '';
      position: absolute;
      ${logicalCSS('top', '100%')}
      ${logicalCSS('horizontal', 0)}
      ${logicalCSS('border-bottom', border)}
    }
  `;

  return {
    euiFilterButton: css`
      position: relative;
      ${euiFilterButtonDisplay(euiThemeContext)}
      ${logicalCSS('height', controlHeight)}
      border-radius: 0;

      ${leftBorder}
      ${bottomBorder}

      /* :not(:disabled) specificity needed to override EuiButtonEmpty styles */
      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        /* Remove underline from whole button so notifications don't get the underline */
        text-decoration: none;

        .euiFilterButton__text {
          /* And put it only on the actual text part */
          text-decoration: underline;
        }
      }

      &:focus-visible {
        outline-offset: -${euiTheme.focus.width};
      }
    `,
    withNext: css`
      & + .euiFilterButton {
        ${logicalCSS('margin-left', `-${euiTheme.size.xs}`)}

        /* Remove just the left faux border */
        &::before {
          display: none;
        }
      }
    `,
    noGrow: css`
      flex-grow: 0;
    `,
    hasNotification: css`
      ${logicalCSS(
        'min-width',
        mathWithUnits(euiTheme.size.base, (x) => x * 6)
      )}
    `,
    hasActiveFilters: css`
      font-weight: ${euiTheme.font.weight.bold};
    `,
  };
};

export const euiFilterButtonChildStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    content: {
      euiFilterButton__content: css``,
      hasIcon: css`
        /* Align the dropdown arrow/caret to the right */
        & > .euiIcon:last-child {
          ${logicalCSS('margin-left', 'auto')}
        }
      `,
    },
    text: {
      euiFilterButton__text: css`
        ${euiTextShift('bold', 'data-text', euiTheme)}
        ${euiTextTruncate()}
      `,
      hasNotification: css`
        ${logicalCSS(
          'min-width',
          mathWithUnits(euiTheme.size.base, (x) => x * 3)
        )}
      `,
    },
    notification: {
      euiFilterButton__notification: css`
        cursor: inherit;
      `,
      disabled: css`
        opacity: 0.5;
      `,
    },
  };
};
