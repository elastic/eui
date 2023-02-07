/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, logicalSizeCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiCodeBlockAnnotationsStyles = (
  euiTheme: UseEuiTheme['euiTheme']
) => {
  return {
    euiCodeBlockAnnotation: css`
      position: absolute;
      ${logicalCSS('right', 0)}
      ${logicalCSS('top', '50%')}
      transform: translateY(-50%) translateX(50%);
      line-height: 1;
    `,
    euiCodeBlockAnnotation__buttonIcon: css`
      ${logicalSizeCSS(euiTheme.size.base)}
      transform: scale(0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${euiTheme.colors.primary};
      border-radius: 50%;
    `,
  };
};
