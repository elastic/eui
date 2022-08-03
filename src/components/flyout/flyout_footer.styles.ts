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

export const euiFlyoutFooterStyles = (
  paddingSize: EuiFlyoutPaddingSize,
  euiThemeContext: UseEuiTheme
) => {
  const euiTheme = euiThemeContext.euiTheme;

  const paddingWithPixels = getFlyoutPadding(paddingSize, euiThemeContext);

  // Removing the 'px' from the end of euiTheme.size.m to perform calculation
  // euiTheme.form.maxWidth is a CSS Property based on maxWidth and has the potential to be a
  // string or a number.
  const paddingAmount =
    typeof paddingWithPixels === 'string'
      ? parseInt(paddingWithPixels.replace('px', ''))
      : paddingWithPixels;

  return {
    euiFlyoutFooter: css`
      background: ${euiTheme.colors.lightestShade};
    `,
    none: css`
      padding: ${paddingWithPixels};
    `,
    s: css`
      padding: ${paddingWithPixels};
    `,
    m: css`
      padding: ${paddingAmount * 0.75}px ${paddingWithPixels};
    `,
    l: css`
      padding: ${paddingAmount / 1.5}px ${paddingWithPixels};
    `,
  };
};
