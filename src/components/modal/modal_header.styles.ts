/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiModalHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiModalHeader: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: ${euiTheme.size.l} ${euiTheme.size.xxl};
      padding-block: ${euiTheme.size.l} ${euiTheme.size.base};
      flex-grow: 0;
      flex-shrink: 0;

      // If a body doesn't exist, remove some extra padding from footer
      & + .euiModalFooter {
        padding-block-start: ${euiTheme.size.s};
      }
    `,
  };
};
