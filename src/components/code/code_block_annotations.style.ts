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
  logicalSizeCSS,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiCodeBlockAnnotationsStyles = (
  euiTheme: UseEuiTheme['euiTheme']
) => {
  const buttonIconSize = mathWithUnits(euiTheme.size.base, (x) => x - 1.5);

  return {
    euiCodeBlockAnnotation: css`
      position: absolute;
      ${logicalCSS('right', 0)}
      ${logicalCSS('top', '50%')}
      transform: translate(50%, -50%);
      line-height: 1;
    `,
    euiCodeBlockAnnotation__buttonIcon: css`
      ${logicalSizeCSS(buttonIconSize)}
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${euiTheme.colors.primary};
      border-radius: 50%;
    `,
  };
};
