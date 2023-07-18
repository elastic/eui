/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';
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

  // Box shadow simulates borders without affecting width
  const leftBoxShadow = `-${euiTheme.border.width.thin} 0 0 0 ${borderColor}`;
  // Bottom borders are needed for responsive flex-wrap behavior
  const bottomBoxShadow = `0 ${euiTheme.border.width.thin} 0 0 ${borderColor}`;

  return {
    euiFilterButton: css`
      ${euiFilterButtonDisplay(euiThemeContext)}
      ${logicalCSS('height', controlHeight)}
      border-radius: 0;
      box-shadow: ${leftBoxShadow}, ${bottomBoxShadow};
    `,
    withNext: css`
      & + .euiFilterButton {
        ${logicalCSS('margin-left', `-${euiTheme.size.xs}`)}
        /* Remove just the left faux border */
        box-shadow: ${bottomBoxShadow};
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
    hasIcon: css`
      .euiButtonEmpty__content {
        justify-content: space-between;
      }
    `,
  };
};
