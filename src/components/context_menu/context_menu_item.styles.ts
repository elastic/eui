/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, logicalTextAlignCSS } from '../../global_styling';

import { euiContextMenuVariables } from './context_menu.styles';

export const euiContextMenuItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { padding } = euiContextMenuVariables(euiThemeContext);

  return {
    euiContextMenuItem: css`
      display: block;
      ${logicalCSS('width', '100%')}
      ${logicalTextAlignCSS('left')}
      color: ${euiTheme.colors.text};
      outline-offset: -${euiTheme.focus.width};

      &:enabled:hover,
      &:enabled:focus {
        text-decoration: underline;
      }

      &:enabled:focus {
        background-color: ${euiTheme.focus.backgroundColor};
      }
    `,
    disabled: css`
      color: ${euiTheme.colors.disabledText};
      cursor: default;
    `,
    // Sizes
    ...padding,
  };
};
