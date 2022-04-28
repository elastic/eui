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

export const euiPaddingStyles = (
  { euiTheme }: UseEuiTheme,
  side?: LogicalSides
) => {
  const property = side ? `padding-${logicalSide[side]}` : 'padding';

  return {
    none: null,
    xs: `
      ${property}: ${euiTheme.size.xs};
    `,
    s: `
      ${property}: ${euiTheme.size.s};
    `,
    m: `
      ${property}: ${euiTheme.size.m};
    `,
    l: `
      ${property}: ${euiTheme.size.l};
    `,
    xl: `
      ${property}: ${euiTheme.size.xl};
    `,
  };
};

export const useEuiPadding = (size: EuiPaddingSize, side?: LogicalSides) => {
  const euiTheme = useEuiTheme();
  return euiPaddingStyles(euiTheme, side)[size];
};
