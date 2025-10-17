/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiFlyoutMenuStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFlyoutMenu__container: css`
      block-size: calc(${euiTheme.size.m} * 3.5);
      flex-shrink: 0;
      padding-block: ${euiTheme.size.s};
      padding-inline: ${euiTheme.size.s};
      border-block-end: ${euiTheme.border.width.thin} solid
        ${euiTheme.border.color};
      padding-block-start: calc(${euiTheme.size.m} * 0.8);

      .euiTitle {
        padding-inline: ${euiTheme.size.s};
      }
    `,
    euiFlyoutMenu__spacer: css`
      padding-inline: ${euiTheme.size.m};
    `,
    euiFlyoutMenu__actions: css`
      block-size: calc(${euiTheme.size.m} * 1.8);
    `,
  };
};
