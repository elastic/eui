/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { logicalCSS } from '../../../../global_styling';

export const euiTimeZoneDisplayStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // This padding should probably not be part of this component to make it really reusable

  return {
    euiTimeZoneDisplay: css`
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      ${logicalCSS('padding-bottom', euiTheme.size.s)}
    `,
  };
};
