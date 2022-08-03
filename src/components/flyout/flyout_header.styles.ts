/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { EuiFlyoutPaddingSize } from './flyout_types';
import { getFlyoutPadding } from './flyout_helpers';

export const euiFlyoutHeaderStyles = (
  paddingSize: EuiFlyoutPaddingSize,
  euiThemeContext: UseEuiTheme
) => {
  const euiTheme = euiThemeContext.euiTheme;
  return {
    euiFlyoutHeader: css`
      flex-grow: 0;
    `,

    border: css`
      border-bottom: ${euiTheme.border.thin};
      padding-bottom: ${getFlyoutPadding(paddingSize, euiThemeContext)};
    `,

    padding: css`
      padding: ${getFlyoutPadding(paddingSize, euiThemeContext)}
        ${getFlyoutPadding(paddingSize, euiThemeContext)} 0;
    `,
  };
};
