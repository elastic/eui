/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  logicalCSSWithFallback,
  euiScrollBarStyles,
  euiPaddingSizeCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiResizablePanelStyles = (euiThemeContext: UseEuiTheme) => {
  return {
    euiResizablePanel: css`
      position: relative;
    `,
    collapsed: css`
      overflow: hidden;
    `,
    paddingSizes: {
      ...euiPaddingSizeCSS(euiThemeContext),
    },
  };
};

export const euiResizablePanelContentStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiResizablePanel__content: css`
      ${logicalCSS('height', '100%')}
    `,
    scrollable: css`
      ${euiScrollBarStyles(euiThemeContext)}
      ${logicalCSSWithFallback('overflow-y', 'auto')}
    `,
    collapsedChildren: css`
      * {
        display: none;
      }
    `,
    horizontal: {
      collapsed: css`
        ${logicalCSS('min-width', '0 !important')}
      `,
      hasCollapsibleButton: css`
        ${logicalCSS('min-width', `${euiTheme.size.l} !important`)}
      `,
    },
    vertical: {
      collapsed: css`
        ${logicalCSS('min-height', '0 !important')}
      `,
      hasCollapsibleButton: css`
        ${logicalCSS('min-height', `${euiTheme.size.l} !important`)}
      `,
    },
  };
};
