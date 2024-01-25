/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiBreakpoint, logicalCSS, mathWithUnits } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiEmptyPromptStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiEmptyPrompt: css`
      text-align: center;
      margin: auto;

      ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
        /* the width becomes as wide as necessary to contain all of its contents */
        ${logicalCSS('max-width', 'max-content')}
      }
    `,
    vertical: css``,
    horizontal: css`
      ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
        justify-content: flex-start;
        text-align: start;
      }
    `,
    main: {
      euiEmptyPrompt__main: css`
        display: flex;
        flex-direction: column;
      `,
      vertical: css`
        justify-content: center;
      `,
      horizontal: css`
        align-items: center;

        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          flex-direction: row-reverse;
        }
      `,
    },
    icon: {
      euiEmptyPrompt__icon: css`
        /* Consumers should use an EuiImage (recommended) with the horizontal layout
         * But they can use for example an img or other react node */
        & > * {
          flex-shrink: 1;
          ${logicalCSS(
            'max-width',
            mathWithUnits(euiTheme.size.l, (x) => x * 24)
          )}
        }
      `,
      vertical: css`
        ${logicalCSS('margin-bottom', euiTheme.size.base)}
      `,
      horizontal: css`
        display: flex;
        align-items: center;
        justify-content: center;

        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          ${logicalCSS('min-width', '40%')}
          ${logicalCSS('max-width', '50%')}
        }
      `,
    },
    actions: {
      euiEmptyPrompt__actions: css``,
      vertical: css``,
      horizontal: css`
        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          justify-content: flex-start;
        }
      `,
    },
  };
};
