/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, SerializedStyles } from '@emotion/react';
import { useEuiMemoizedStyles, UseEuiTheme } from '../../services/theme';
import { LogicalSides } from '../functions';

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
 * @returns An object map of all padding sizes for all padding sides properties
 * e.g., {
 *   padding: { s: css`padding-size: 8px`, ... }
 *   left: { s: css`padding-inline-start: 8px`, ... }
 * }
 */
const _euiPaddingSidesAndSizes = (euiThemeContext: UseEuiTheme) => {
  const sizesMap = _getEuiPaddingSize(euiThemeContext);

  type SizeStylesMap = Record<EuiPaddingSize, SerializedStyles>;

  // The `_` prefix stops Emotion from applying the function name as a label
  const _generateSizeStyles = (cssProperty: string) =>
    Object.fromEntries(
      Object.entries(sizesMap).map(([sizeKey, sizeValue]) => [
        sizeKey,
        sizeValue === null
          ? null
          : css`
              ${cssProperty}: ${sizeValue};
              label: ${sizeKey};
            `,
      ])
    ) as SizeStylesMap;

  const sidesMap: Record<LogicalSides | 'padding', SizeStylesMap> = {
    padding: _generateSizeStyles('padding'),
    vertical: _generateSizeStyles('padding-block'),
    top: _generateSizeStyles('padding-block-start'),
    bottom: _generateSizeStyles('padding-block-end'),
    horizontal: _generateSizeStyles('padding-inline'),
    left: _generateSizeStyles('padding-inline-start'),
    right: _generateSizeStyles('padding-inline-end'),
  };

  return sidesMap;
};

export const useEuiPaddingCSS = (side?: LogicalSides) => {
  const memoizedSideMap = useEuiMemoizedStyles(_euiPaddingSidesAndSizes);
  return memoizedSideMap[side || 'padding'];
};
