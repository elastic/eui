/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import {
  euiFontSize,
  euiScrollBarStyles,
  logicalCSS,
  logicalCSSWithFallback,
  mathWithUnits,
} from '../../../../global_styling';

export const euiQuickSelectPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiQuickSelectPanel: css`
      &:not(:first-child) {
        ${logicalCSS('border-top', euiTheme.border.thin)}
        ${logicalCSS('padding-top', euiTheme.size.m)}
        ${logicalCSS('margin-top', euiTheme.size.m)}
      }
    `,
    euiQuickSelectPanel__title: css`
      float: left; /* Required for fieldset/legend elements */
      ${logicalCSS('margin-bottom', euiTheme.size.m)}
    `,
    euiQuickSelectPanel__section: css`
      clear: both; /* Required for fieldset/legend elements */
      ${logicalCSS('margin-top', euiTheme.size.s)}
      ${logicalCSS(
        'max-height',
        mathWithUnits(euiTheme.size.m, (x) => x * 12)
      )}
      overflow: hidden;
      ${logicalCSSWithFallback('overflow-y', 'auto')}
      ${euiScrollBarStyles(euiThemeContext)}
      ${euiFontSize(euiThemeContext, 's')}
    `,
  };
};
