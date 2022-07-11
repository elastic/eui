/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalTextAlignCSS } from '../../global_styling';

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
    responsiveColumn: css`
      ${euiBreakpoint(['xs', 's'], euiThemeContext)} {
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
