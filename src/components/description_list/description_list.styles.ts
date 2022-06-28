/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiBreakpoint } from '../../global_styling';

export const euiDescriptionListStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiDescriptionList: undefined,
    // Row types is the default DOM layout
    row: undefined,
    column: css`
      > * {
        margin-top: ${euiTheme.size.base};
      }

      // First two items don't have margin
      > *:first-child,
      > :nth-child(2) {
        margin-top: 0;
      }
    `,
    responsiveColumn: css`
      > * {
        margin-top: ${euiTheme.size.base};
      }

      ${euiBreakpoint(['xs', 's'])} {
        display: block;
      }
    `,
    inline: undefined,

    // Flex display for column and responsive column
    flex: css`
      display: flex;
      align-items: stretch;
      flex-wrap: wrap;
    `,

    //Alignment modifiers
    center: css`
      text-align: center;
    `,
    left: undefined,
  };
};
