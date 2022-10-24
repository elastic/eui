/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiModalFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiModalFooter: css`
      display: flex;
      justify-content: flex-end;
      padding: ${euiTheme.size.base} ${euiTheme.size.l} ${euiTheme.size.l};
      flex-grow: 0;
      flex-shrink: 0; // ensure the height of the footer is based off its contents and doesn't squish

      /* row-gap: ${euiTheme.size.base}; */

      > * + * {
        margin-inline-start: ${euiTheme.size.base};
      }

      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        inline-size: 100%;
        background: $euiColorLightestShade;
        padding: $euiSizeM $euiSizeL !important;
        justify-content: stretch;

        > * {
          flex: 1;

          + * {
            margin-inline-start: 0;
          }
        }
      }
    `,
  };
};
