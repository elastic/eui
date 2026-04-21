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
import { euiTitle } from '../title/title.styles';
import { euiListItemVariables } from '../list_item_layout/_list_item_layout.styles';

export const euiContextMenuPanelTitleStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { textPadding } = euiListItemVariables(euiThemeContext);

  return {
    euiContextMenuPanelTitle: css`
      display: flex;
      align-items: center;
      ${logicalCSS('padding-horizontal', textPadding.horizontal)}
      ${euiTitle(euiThemeContext, 'xxs')}
    `,
    text: css`
      flex-grow: 1;
      overflow: hidden; /* allows for text truncation */
      ${logicalCSS('padding-vertical', textPadding.vertical)}
      ${logicalCSS('padding-horizontal', textPadding.horizontal)}
    `,
  };
};
