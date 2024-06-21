/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';

export const euiSaturationStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSaturation: css`
      z-index: 3; /* Required to be above the hue slider, which can overlap */
      position: relative;
      ${logicalCSS('width', '100%')}
      ${logicalCSS('padding-bottom', '100%')}
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.medium,
        (x) => x / 2
      )};
      touch-action: none; /* prevent TouchMove events from scrolling page */
    `,
  };
};
