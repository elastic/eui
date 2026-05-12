/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiButtonColor } from '../../global_styling/mixins/_button';

export const euiListGroupItemStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    // Base
    euiListGroupItem: css`
      position: relative;
    `,
    euiListGroupItem__inner: css`
      display: flex;
      align-items: center;
      flex-grow: 1;
      max-inline-size: 100%;
      overflow: hidden;
      font-weight: inherit;
    `,
    // Colors
    primary: css`
      color: ${euiButtonColor(euiThemeContext, 'primary').color};
    `,
    text: css`
      color: ${euiButtonColor(euiThemeContext, 'text').color};
    `,
    subdued: css`
      color: ${euiTheme.colors.textSubdued};
    `,
  };
};

export const euiListGroupItemTooltipStyles = {
  // Base
  euiListGroupItem__tooltip: css`
    display: inline-flex; /* Allows the wrapped button/text to grow */
    ${logicalCSS('width', '100%')}
  `,
};
