/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { useEuiTheme, isDefaultTheme } from '../../services';

export const useEuiMarkStyles = () => {
  const { euiTheme } = useEuiTheme();
  return css`
    background-color: ${isDefaultTheme(euiTheme.themeName)
      ? 'transparent'
      : euiTheme.colors.euiFocusBackgroundColor};
    font-weight: ${euiTheme.type.euiFontWeightBold};
    // Override the browser's black color.
    // Can't use 'inherit' because the text to background color contrast may not be sufficient
    color: ${euiTheme.colors.euiTextColor};
  `;
};
