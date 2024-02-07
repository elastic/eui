/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiBreakpoint, logicalCSS, mathWithUnits } from '../../global_styling';
import { euiFormVariables } from '../form/form.styles';

export const euiSearchBar__searchHolder = (euiThemeContext: UseEuiTheme) => {
  const { maxWidth } = euiFormVariables(euiThemeContext);
  return css`
    ${logicalCSS(
      'min-width',
      mathWithUnits(maxWidth, (x) => x / 2)
    )}
  `;
};

export const euiSearchBar__filtersHolder = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return css`
    ${euiBreakpoint(euiThemeContext, ['m', 'l', 'xl'])} {
      /* Helps with flex-wrapping */
      ${logicalCSS('max-width', `calc(100% - ${euiTheme.size.base})`)}
    }
  `;
};
