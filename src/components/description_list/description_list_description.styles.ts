/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiFontSize,
  euiMaxBreakpoint,
  euiMinBreakpoint,
  logicalTextAlignCSS,
  logicalCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListDescriptionStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const columnDisplay = `
    ${logicalCSS('width', '50%')}
    ${logicalCSS('padding-left', euiTheme.size.s)}
  `;

  return {
    euiDescriptionList__description: css``,

    // Types
    row: css``,
    column: css`
      ${columnDisplay}
    `,
    responsiveColumn: css`
      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        ${logicalCSS('width', '100%')}
        padding: 0;
      }
      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        ${columnDisplay}
      }
    `,
    inline: css`
      display: inline;
    `,

    // This nested block handles just the font styling based on compressed and reverse
    fontStyles: {
      normal: css`
        ${euiFontSize(euiThemeContext, 's')};
      `,
      reverse: css`
        ${euiTitle(euiThemeContext, 'xs')}
      `,
      compressed: css`
        ${euiTitle(euiThemeContext, 'xxs')}
      `,
    },

    // Nested inline styles for type and font
    inlineStyles: {
      compressed: css`
        ${euiFontSize(euiThemeContext, 'xs')};
      `,
      normal: css`
        ${euiFontSize(euiThemeContext, 's')};
      `,
    },

    // Column types should align description text to the left when EuiDecriptionList is centered
    left: css`
      ${logicalTextAlignCSS('left')};
    `,

    // Gutter
    s: css`
      &:not(:first-of-type) {
        ${logicalCSS('margin-top', euiTheme.size.s)}
      }
    `,
    m: css`
      &:not(:first-of-type) {
        ${logicalCSS('margin-top', euiTheme.size.base)}
      }
    `,
  };
};
