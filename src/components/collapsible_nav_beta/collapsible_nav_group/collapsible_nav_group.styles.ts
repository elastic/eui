/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';

import { euiCollapsibleNavItemVariables } from '../collapsible_nav_item/collapsible_nav_item.styles';

export const euiCollapsibleNavGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const sharedStyles = euiCollapsibleNavItemVariables(euiThemeContext);

  return {
    euiCollapsibleNavGroup: css``,
    isWrapper: css`
      margin: ${sharedStyles.padding};
    `,
    euiCollapsibleNavGroup__title: css`
      margin-block: ${euiTheme.size.base};
      margin-inline: 0;

      /* Make title icons slightly larger */
      .euiIcon {
        transform: scale(1.25);
      }
    `,
  };
};
