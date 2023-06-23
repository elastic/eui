/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { euiShadowSmall } from '../../themes/amsterdam/global_styling/mixins';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiHeaderVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    height: euiTheme.size.xxxl,
    childHeight: euiTheme.size.xxl,
  };
};

export const euiHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { height } = euiHeaderVariables(euiThemeContext);

  return {
    euiHeader: css`
      display: flex;
      justify-content: space-between;
      ${logicalCSS('height', height)}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      ${euiShadowSmall(euiThemeContext)}
    `,
  };
};
