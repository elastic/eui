/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme, euiFocusRing } from '@elastic/eui';
import { css } from '@emotion/react';

export const getResetStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;

  return css`
    button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      color: inherit;
      border-radius: 0;
      font-size: inherit;
      font-family: inherit;
    }

    input,
    textarea,
    select {
      font-size: 1rem; // Inherit from html root
      font-family: inherit;
    }

    dd {
      margin: 0;
    }

    figure {
      margin: 0;
    }

    * {
      ${euiFocusRing(theme, 'outset', { color: euiTheme.colors.primary })};
    }
  `;
};
