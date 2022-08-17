/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalTextAlignCSS, euiBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiDescriptionListStyles = (euiThemeContext: UseEuiTheme) => {
  // Flex display for column and responsive column
  const columnDisplay = `
    //display: flex;
    align-items: baseline;
    flex-wrap: wrap;
  `;

  return {
    euiDescriptionList: css`
      display: flex;

      // [class*='euiDescriptionList__description']
      [class*='euiDescriptionList__description']:nth-child(2) {
        row-gap: 100px;
        border: 1px solid red;
        // background-color: yellow !important;
      }
    `,

    // Types
    row: css`
      flex-direction: row;
      flex-wrap: wrap;
      //row-gap: 100px;
    `,
    inline: css``,
    column: css`
      ${columnDisplay}
    `,
    // Responsive columns behave as a row on breakpoints xs-s
    responsiveColumn: css`
      ${euiBreakpoint(euiThemeContext, ['m', 'xl'])} {
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

    // Gutter
    s: css``,
    m: css``,
  };
};
