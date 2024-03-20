/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, SerializedStyles } from '@emotion/react';
import { useEuiMemoizedStyles, UseEuiTheme } from '../../services/theme';
import { logicalSide, LogicalSides } from '../functions';

export const PADDING_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiPaddingSize = (typeof PADDING_SIZES)[number];

/**
 * Get a single padding size
 */

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

/**
 * @returns An object map of padding size keys to padding values,
 * e.g. { s: '8px', m: '16px', ... }
 */
const _getEuiPaddingSize = (euiThemeContext: UseEuiTheme) =>
  PADDING_SIZES.reduce(
    (stylesAcc, size) => ({
      ...stylesAcc,
      [size]: size === 'none' ? null : euiPaddingSize(euiThemeContext, size),
    }),
    {} as Record<EuiPaddingSize, string>
  );

export const useEuiPaddingSize = (size: EuiPaddingSize) => {
  const sizes = useEuiMemoizedStyles(_getEuiPaddingSize);
  return sizes[size];
};

/**
 * Get an object of all padding sizes for all possible padding properties
 */

type PaddingStyles = Record<EuiPaddingSize, SerializedStyles>;
type PaddingGenerator = (euiTheme: UseEuiTheme) => PaddingStyles;

const paddingCSSProperties = Object.entries(logicalSide).reduce(
  (acc, [key, property]) => ({ ...acc, [key]: `padding-${property}` }),
  { all: 'padding' }
);
const paddingCSSGenerators = Object.entries(paddingCSSProperties).reduce(
  (acc, [key, property]) => {
    // Use a `_` prefix to stop Emotion from auto-applying the fn name as a label
    const _euiPaddingGenerator = (euiThemeContext: UseEuiTheme) =>
      PADDING_SIZES.reduce(
        (stylesAcc, size) => ({
          ...stylesAcc,
          [size]:
            size === 'none'
              ? null
              : css`
                  ${property}: ${euiPaddingSize(euiThemeContext, size)};
                  label: ${size};
                `,
        }),
        {} as PaddingStyles
      );

    return { ...acc, [key]: _euiPaddingGenerator };
  },
  {} as Record<LogicalSides | 'all', PaddingGenerator>
);

export const useEuiPaddingCSS = (side?: LogicalSides) => {
  return useEuiMemoizedStyles(paddingCSSGenerators[side || 'all']);
};
