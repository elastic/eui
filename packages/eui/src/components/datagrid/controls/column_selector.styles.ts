/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  euiYScrollWithShadows,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiShadowLarge } from '../../../themes';

export const euiDataGridColumnSelectorStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const maxStaticHeight = mathWithUnits(euiTheme.size.base, (x) => x * 25);
  const maxResponsiveHeight = `min(${maxStaticHeight}, 50vh)`;

  return {
    euiDataGridColumnSelector: css`
      ${euiYScrollWithShadows(euiThemeContext)}
      ${logicalCSS('max-height', maxResponsiveHeight)}
      padding: ${euiTheme.size.s};
    `,
    euiDataGridColumnSelector__item: css`
      padding: ${euiTheme.size.xs};

      &.euiDataGridColumnSelector__item-isDragging {
        ${euiShadowLarge(euiThemeContext)}
        background-color: ${euiTheme.colors.emptyShade};
      }
    `,
  };
};
