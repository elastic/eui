/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

/**
 * Emotion styles for child flyouts.
 * Provides background variants coordinated with the EUI theme.
 *
 * Returns an object with the following CSS snippets:
 * - `backgroundDefault`: plain background
 * - `backgroundShaded`: subdued background used to de-emphasize child content
 */
export const euiChildFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const {
    euiTheme: {
      colors: { backgroundBasePlain, backgroundBaseSubdued },
    },
  } = euiThemeContext;

  return {
    backgroundDefault: css`
      /* Default background for flyouts */
      background: ${backgroundBasePlain};
    `,
    backgroundShaded: css`
      /* Shaded background for child flyouts */
      background: ${backgroundBaseSubdued};
    `,
  };
};
