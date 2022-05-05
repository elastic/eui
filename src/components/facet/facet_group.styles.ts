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

const _facetGroupGutterSize = ({
  gutterSize,
  adjustmentSize,
  layout,
}: {
  gutterSize: string;
  adjustmentSize: string;
  layout: EuiFacetGroupLayout;
}) => {
  let layoutStyles;

  if (layout === 'horizontal') {
    layoutStyles = `
      display: flex;
      flex-direction: row;
      gap: 0 calc(${gutterSize} + ${adjustmentSize});`;
  } else {
    layoutStyles = `
    .euiFacetButton {
      width: 100%;
    }
    `;
  }

  return `
    > [class*='euiFacetButton'] {
      margin-block: calc(${gutterSize} / 2);
    }

    ${layoutStyles}
  `;
};

export const euiFacetGroupStyles = (
  { euiTheme }: UseEuiTheme,
  layout: EuiFacetGroupLayout
) => ({
  // Base
  euiFacetGroup: css``,
  // Gutter sizes
  none: css(
    _facetGroupGutterSize({
      gutterSize: '0',
      adjustmentSize: euiTheme.size.m,
      layout,
    })
  ),
  s: css(
    _facetGroupGutterSize({
      gutterSize: euiTheme.size.xs,
      adjustmentSize: euiTheme.size.m,
      layout,
    })
  ),
  m: css(
    _facetGroupGutterSize({
      gutterSize: euiTheme.size.s,
      adjustmentSize: euiTheme.size.m,
      layout,
    })
  ),
  l: css(
    _facetGroupGutterSize({
      gutterSize: euiTheme.size.m,
      adjustmentSize: euiTheme.size.m,
      layout,
    })
  ),
});
