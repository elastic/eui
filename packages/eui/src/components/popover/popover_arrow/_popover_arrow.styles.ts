/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalSizeCSS } from '../../../global_styling';
import { _popoverArrowStyles } from '../../../services/popover';
import { UseEuiTheme } from '../../../services';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const arrowSize = euiTheme.size.base;
  const arrowStyles = _popoverArrowStyles(euiThemeContext, arrowSize);

  return {
    // Wrapper
    euiPopoverArrowWrapper: css`
      position: absolute;
      z-index: 1;
      ${logicalSizeCSS(arrowSize)}
    `,

    // Base
    euiPopoverArrow: css`
      ${arrowStyles._arrowStyles}
      background-color: var(--euiPopoverBackgroundColor);
    `,

    ...arrowStyles.positions,
  };
};
