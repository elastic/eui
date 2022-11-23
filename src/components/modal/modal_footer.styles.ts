/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiMaxBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiModalFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiModalFooter: css`
      display: flex;
      justify-content: flex-end;
      padding-block: ${euiTheme.size.base} ${euiTheme.size.l};
      padding-inline: ${euiTheme.size.l};
      flex-grow: 0;
      flex-shrink: 0; // ensure the height of the footer is based off its contents and doesn't squish
      gap: ${euiTheme.size.base};

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        background: ${euiTheme.colors.lightestShade};
        padding-block: ${euiTheme.size.m};
        padding-inline: ${euiTheme.size.l};
        justify-content: stretch;
        gap: ${euiTheme.size.s};

        > * {
          flex: 1;
        }
      }
    `,
  };
};
