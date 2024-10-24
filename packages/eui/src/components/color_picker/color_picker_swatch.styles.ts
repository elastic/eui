/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import {
  logicalSizeCSS,
  mathWithUnits,
  euiOutline,
} from '../../global_styling';

export const euiColorPickerSwatchStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiColorPickerSwatch: css`
      display: inline-block;
      ${logicalSizeCSS(euiTheme.size.l)}

      border-radius: ${mathWithUnits(
        euiTheme.border.radius.medium,
        (x) => x / 2
      )};
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBaseFormsColorSwatch};
      box-shadow: inset 0 0 0 ${euiTheme.border.width.thin}
        ${transparentize(euiTheme.colors.emptyShade, 0.05)};
      cursor: pointer;

      &:disabled {
        cursor: default;
      }

      /* Focus ring gets slightly cut off if not offset to the center */
      &:focus {
        ${euiOutline(euiThemeContext, 'center')}
      }
    `,
  };
};
