/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, logicalSizeCSS } from '../../../global_styling';

import { euiHeaderVariables } from '../../header/header.styles';

export const euiCollapsibleNavButtonWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const { height, padding } = euiHeaderVariables(euiThemeContext);

  return {
    euiCollapsibleNavButtonWrapper: css`
      display: flex;
      align-items: center;
      justify-content: center;
      ${logicalSizeCSS(height)}
    `,
    euiCollapsibleNavButton: css`
      &.euiButtonIcon:hover {
        transform: none;
      }
    `,
    left: css`
      ${logicalCSS('border-right', euiTheme.border.thin)}
      ${logicalCSS('margin-left', `-${padding}`)}
      ${logicalCSS('margin-right', padding)}
    `,
    right: css`
      ${logicalCSS('border-left', euiTheme.border.thin)}
      ${logicalCSS('margin-right', `-${padding}`)}
      ${logicalCSS('margin-left', padding)}
    `,
  };
};
