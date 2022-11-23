/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalTextAlignCSS, euiMinBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiDescriptionListStyles = (euiThemeContext: UseEuiTheme) => {
  // Flex display for column and responsive column
  const columnDisplay = `
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;  
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
  };
};
