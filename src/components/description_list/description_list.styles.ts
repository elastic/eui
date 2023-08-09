/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalTextAlignCSS,
  euiMaxBreakpoint,
  euiMinBreakpoint,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiDescriptionListStyles = (euiThemeContext: UseEuiTheme) => {
  // Grid display for column and responsive column
  const columnDisplay = `
    display: grid;
    grid-template-columns: fit-content(360px) 1fr;
    row-gap: ${euiThemeContext.euiTheme.size.s}; 
    align-items: baseline;
  `;

  return {
    euiDescriptionList: css``,

    // Types
    row: css``,
    inline: css``,
    column: css`
      ${columnDisplay}
    `,
    // Responsive columns behave as a row on breakpoints xs-s
    responsiveColumn: css`
      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        grid-template-columns: 1fr;
      }
      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        ${columnDisplay}
      }
    `,

    // Alignment
    center: css`
      ${logicalTextAlignCSS('center')}
    `,
    left: css`
      ${logicalTextAlignCSS('left')}
    `,
    // Column gap
    s: css`
      column-gap: ${euiThemeContext.euiTheme.size.base};
    `,
    m: css`
      column-gap: ${euiThemeContext.euiTheme.size.xxl};
    `,
  };
};
