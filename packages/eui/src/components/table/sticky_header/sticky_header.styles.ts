/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
import { euiShadowMedium } from '../../../global_styling/mixins/_shadow';

export const euiTableStickyHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiTableStickyHeader: css`
      position: fixed;
      z-index: 3; /* Above table content but below modals/flyouts */
      
      /* Hidden by default, shown when stuck */
      visibility: hidden;
      opacity: 0;
      transition: opacity ${euiTheme.animation.fast} ${euiTheme.animation.resistance};
      
      /* Visible when stuck */
      &[data-is-stuck='true'] {
        visibility: visible;
        opacity: 1;
        box-shadow: ${euiShadowMedium(euiThemeContext)};
      }
    `,
    euiTableStickyHeaderWrapper: css`
      overflow: hidden;
    `,
    euiTableStickyHeaderTable: css`
      ${logicalCSS('width', '100%')}
      background-color: ${euiTheme.colors.emptyShade};
      table-layout: inherit; /* Match parent table layout */
    `,
    // Hide the original thead when sticky header is visible
    hiddenOriginalHeader: css`
      thead {
        transition: opacity ${euiTheme.animation.fast} ${euiTheme.animation.resistance};
        
        &[data-original-hidden='true'] {
          opacity: 0;
          visibility: hidden;
        }
      }
    `,
  };
};
