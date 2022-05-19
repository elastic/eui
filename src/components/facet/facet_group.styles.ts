/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { EuiFacetGroupLayout } from './facet_group';
import { logicalCSS } from '../../global_styling';

const _facetGroupGutterSize = ({
  gutterSize,
  layout,
}: {
  gutterSize: string;
  layout: EuiFacetGroupLayout;
}) => {
  const layoutStyles =
    layout === 'horizontal' &&
    `
      display: flex;
      flex-direction: row;
      gap: 0 ${gutterSize};`;

  return layoutStyles;
};

export const euiFacetGroupStyles = (
  { euiTheme }: UseEuiTheme,
  layout: EuiFacetGroupLayout
) => {
  const buttonMarginVerticalSize = `calc(${euiTheme.size.m} / 2)`;

  return {
    // Base
    euiFacetGroup: css`
      > [class*='euiFacetButton'] {
        ${logicalCSS('margin-vertical', buttonMarginVerticalSize)};
      }
    `,
    // Gutter sizes
    none: css(
      _facetGroupGutterSize({
        gutterSize: '0',
        layout,
      })
    ),
    s: css(
      _facetGroupGutterSize({
        gutterSize: euiTheme.size.s,
        layout,
      })
    ),
    m: css(
      _facetGroupGutterSize({
        gutterSize: euiTheme.size.m,
        layout,
      })
    ),
    l: css(
      _facetGroupGutterSize({
        gutterSize: euiTheme.size.l,
        layout,
      })
    ),
    // layouts
    horizontal: css``,
    vertical: css``,
  };
};
