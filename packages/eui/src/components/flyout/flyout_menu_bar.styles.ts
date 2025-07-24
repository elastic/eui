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

export const euiFlyoutMenuBarStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiFlyoutMenuBar: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      ${logicalCSS('height', '36px')}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
      background-color: ${euiTheme.colors.emptyShade};
      flex-shrink: 0;
    `,

    euiFlyoutMenuBar__content: css`
      display: flex;
      align-items: center;
      flex: 1;
      ${logicalCSS('min-width', '0')}/* Allow content to shrink */
    `,

    euiFlyoutMenuBar__title: css`
      font-size: ${euiTheme.size.m};
      font-weight: ${euiTheme.font.weight.semiBold};
      color: ${euiTheme.colors.title};
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,

    euiFlyoutMenuBar__actions: css`
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
      flex-shrink: 0;
    `,
  };
};
