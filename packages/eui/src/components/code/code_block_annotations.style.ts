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
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';

export const euiCodeBlockAnnotationsStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
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
      border-radius: 50%;
      ${highContrastModeStyles(euiThemeContext, {
        none: `background-color: ${euiTheme.colors.primary};`,
        // Windows high contrast themes ignore background-color
        forced: `
          border: ${mathWithUnits(buttonIconSize, (x) => x / 2)} solid ${
          euiTheme.colors.primary
        };`,
      })}
    `,
  };
};
