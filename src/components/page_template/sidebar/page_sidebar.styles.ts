/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiYScroll } from '../../../global_styling';
import { transparentize, UseEuiTheme } from '../../../services';

export const euiPageSidebarStyles = ({ euiTheme }: UseEuiTheme) => ({
  /**
   * 1. Prevent side bar width from changing when content width changes.
   */
  euiPageSidebar: css`
    flex: 0 1 0%; /* 1 */
    border-right: ${euiTheme.border.width.thin} solid
      ${transparentize(euiTheme.colors.lightShade, 0.7)};
  `,

  sticky: css`
    ${euiYScroll(euiTheme)}
    flex-grow: 1;
    position: sticky;
  `,
});
