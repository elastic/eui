/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { mathWithUnits } from '../../global_styling';

import type { EuiFacetGroupGutterSizes } from './facet_group';

export const euiFacetGroupStyles = ({ euiTheme }: UseEuiTheme) => {
  const gutterSizesMap = {
    none: 0,
    s: euiTheme.size.xs,
    m: euiTheme.size.s,
    l: euiTheme.size.m,
  };
  const _getVerticalGutters = (sizeKey: EuiFacetGroupGutterSizes) => {
    const size = gutterSizesMap[sizeKey];
    return `gap: ${size} 0;`;
  };
  const _getHorizontalGutters = (sizeKey: EuiFacetGroupGutterSizes) => {
    const size = gutterSizesMap[sizeKey];
    return `
      gap: ${size} ${mathWithUnits([size, euiTheme.size.m], (x, y) => x + y)};
    `;
  };

  return {
    // Base
    euiFacetGroup: css`
      display: flex;
      flex-grow: 1;
    `,
    // layouts
    horizontal: css`
      flex-direction: row;
      flex-wrap: wrap;
    `,
    vertical: css`
      flex-direction: column;
    `,
    gutterSizes: {
      vertical: {
        none: css(_getVerticalGutters('none')),
        s: css(_getVerticalGutters('s')),
        m: css(_getVerticalGutters('m')),
        l: css(_getVerticalGutters('l')),
      },
      horizontal: {
        none: css(_getHorizontalGutters('none')),
        s: css(_getHorizontalGutters('s')),
        m: css(_getHorizontalGutters('m')),
        l: css(_getHorizontalGutters('l')),
      },
    },
  };
};
