/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../../services';
import { euiYScroll } from '../../../global_styling';

export const euiPageSidebarStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const embellishColor = transparentize(euiTheme.colors.lightShade, 0.3);

  return {
    euiPageSidebar: css`
      /* Prevent side bar width from changing when content width changes */
      flex: 0 1 0%;
    `,
    sticky: css`
      ${euiYScroll(euiThemeContext, { height: 'auto' })}
      flex-grow: 1;
      position: sticky;
    `,
    embellish: css`
      background: linear-gradient(
          160deg,
          ${embellishColor} 0,
          ${embellishColor} ${euiTheme.size.xl},
          transparent 0
        ),
        linear-gradient(
          175deg,
          ${embellishColor} 0,
          ${embellishColor} ${euiTheme.size.base},
          transparent 0
        );
    `,
  };
};
