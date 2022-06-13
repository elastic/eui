/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, useEuiTheme } from '../../services';
import { EuiFacetGroupLayout } from './facet_group';

const _facetGroupGutterSize = ({
  gutterSize,
  layout,
}: {
  gutterSize: string;
  layout: EuiFacetGroupLayout;
}) => {
  const { euiTheme } = useEuiTheme();
  const isHorizontalLayout = layout === 'horizontal';
  const gutterHorizontal = `calc(${euiTheme.size.m} + ${gutterSize})`;
  const gutterVertical = gutterSize;

  return isHorizontalLayout
    ? `gap: ${gutterVertical} ${gutterHorizontal};`
    : `gap: ${gutterVertical} 0;`;
};

export const euiFacetGroupStyles = (
  { euiTheme }: UseEuiTheme,
  layout: EuiFacetGroupLayout
) => ({
  // Base
  euiFacetGroup: css`
    display: flex;
    flex-grow: 1;
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
      gutterSize: euiTheme.size.xs,
      layout,
    })
  ),
  m: css(
    _facetGroupGutterSize({
      gutterSize: euiTheme.size.s,
      layout,
    })
  ),
  l: css(
    _facetGroupGutterSize({
      gutterSize: euiTheme.size.m,
      layout,
    })
  ),
  // layouts
  horizontal: css`
    flex-direction: row;
    flex-wrap: wrap;
  `,
  vertical: css`
    flex-direction: column;
  `,
});
