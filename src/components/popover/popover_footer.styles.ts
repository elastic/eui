/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiPopoverFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPopoverFooter: css`
      ${euiFontSize(euiThemeContext, 's')};
      border-top: ${euiTheme.border.thin};
    `,
  };
};
