/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalSizeCSS } from '../../../global_styling';
import {
  _EuiButtonColor,
  euiButtonEmptyColor,
  euiButtonSizeMap,
} from '../../../themes/amsterdam/global_styling/mixins/button';

export const euiButtonIconStyles = (euiThemeContext: UseEuiTheme) => {
  const sizes = euiButtonSizeMap(euiThemeContext);

  return {
    euiButtonIcon: css``,
    // Sizes
    xs: css`
      ${logicalSizeCSS(sizes.xs.height)}
      border-radius: ${sizes.xs.radius};
    `,
    s: css`
      ${logicalSizeCSS(sizes.s.height)}
      border-radius: ${sizes.s.radius};
    `,
    m: css`
      ${logicalSizeCSS(sizes.m.height)}
      border-radius: ${sizes.m.radius};
    `,
  };
};

export const _emptyHoverStyles = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor | 'disabled'
) => {
  return css`
    &:hover {
      background-color: ${euiButtonEmptyColor(euiThemeContext, color)
        .backgroundColor};
    }
  `;
};
