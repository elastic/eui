/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

export const euiHueStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const height = euiTheme.size.m;

  return {
    // This wraps the range.
    // It is needed because there is no way to do a linear gradient in ie11 for the track
    euiHue: css`
      ${logicalCSS('height', height)}
      border-radius: ${height};
      background: linear-gradient(
        to right,
        #ff3232 0%,
        #fff130 20%,
        #45ff30 35%,
        #28fff0 52%,
        #282cff 71%,
        #ff28fb 88%,
        #ff0094 100%
      );
    `,
  };
};
