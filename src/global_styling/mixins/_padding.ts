/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme, UseEuiTheme } from '../../services/theme';
import { logicalSide, LogicalSides } from '../functions';

export const PADDING_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiPaddingSize = typeof PADDING_SIZES[number];

export const euiPaddingSize = (
  size: EuiPaddingSize,
  { euiTheme }: UseEuiTheme
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

export const useEuiPaddingSize = (size: EuiPaddingSize) => {
  const euiTheme = useEuiTheme();
  return euiPaddingSize(size, euiTheme);
};

export const useEuiPaddingCSS = (side?: LogicalSides) => {
  const property = side ? `padding-${logicalSide[side]}` : 'padding';

  return {
    none: null,
    xs: `
      ${property}: ${useEuiPaddingSize('xs')};
    `,
    s: `
      ${property}: ${useEuiPaddingSize('s')};
    `,
    m: `
      ${property}: ${useEuiPaddingSize('m')};
    `,
    l: `
      ${property}: ${useEuiPaddingSize('l')};
    `,
    xl: `
      ${property}: ${useEuiPaddingSize('xl')};
    `,
  };
};
