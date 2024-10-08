/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { euiScrollBarStyles, euiCanAnimate } from '../../../../global_styling';

export const euiDataGridCellPopoverStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDataGridRowCell__popover: css`
      ${euiScrollBarStyles(euiThemeContext)}
      overflow: auto;

      /* For some reason, the normal popover opacity transition doesn't work for datagrid popovers
       * so we'll force it via an animation. If we don't, cells constrained by the inline max-width
       * style that we set will see a flash of unwanted content before repositioning */
      ${euiCanAnimate} {
        animation-duration: ${euiTheme.animation.normal};
        animation-name: ${fadeIn};
      }
    `,
  };
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
