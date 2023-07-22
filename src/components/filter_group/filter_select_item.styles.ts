/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalShorthandCSS,
  logicalTextAlignCSS,
  euiFontSize,
} from '../../global_styling';

export const euiFilterSelectItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFilterSelectItem: css`
      display: block; /* Necessary to make sure it doesn't force the whole popover to be too wide */
      ${logicalCSS('width', '100%')}
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.xs} ${euiTheme.size.m}`
      )}

      ${euiFontSize(euiThemeContext, 's')}
      ${logicalTextAlignCSS('left')}

      color: ${euiTheme.colors.text};
      ${logicalCSS(
        'border-bottom',
        `${euiTheme.border.width.thin} solid ${euiTheme.colors.lightestShade}`
      )}
    `,
  };
};
