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

export const euiContextMenuPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiContextMenuPanel: css`
      ${logicalCSS('width', '100%')}
      visibility: visible;
      outline-offset: -${euiTheme.focus.width};

      &:focus {
        outline: none; /* Hide focus ring because of tabindex=-1 on Safari */
      }
    `,
  };
};
