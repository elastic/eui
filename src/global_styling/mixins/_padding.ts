/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { useEuiTheme, UseEuiTheme } from '../../services/theme';
import { logicalSide, LogicalSides } from '../functions';

export const PADDING_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiPaddingSize = (typeof PADDING_SIZES)[number];

export const euiPaddingSize = (
  { euiTheme }: UseEuiTheme,
  size: EuiPaddingSize
) => {
  switch (size) {
    case 'none':
      return null;
    case 'm':
      return euiTheme.size.base;
    default:
      return euiTheme.size[size];
  }
};

export const euiPaddingSizeCSS = (
  euiThemeContext: UseEuiTheme,
  side?: LogicalSides
) => {
  const property = side ? `padding-${logicalSide[side]}` : 'padding';

  return {
    none: null,
    xs: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 'xs')};
    `,
    s: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 's')};
    `,
    m: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 'm')};
    `,
    l: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 'l')};
    `,
    xl: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 'xl')};
    `,
  };
};

export const useEuiPaddingSize = (size: EuiPaddingSize) => {
  const euiTheme = useEuiTheme();
  return euiPaddingSize(euiTheme, size);
};

export const useEuiPaddingCSS = (side?: LogicalSides) => {
  const euiTheme = useEuiTheme();
  return euiPaddingSizeCSS(euiTheme, side);
};
