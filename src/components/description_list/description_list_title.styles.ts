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
  euiTextBreakWord,
  logicalTextAlignCSS,
  euiBreakpoint,
} from '../../global_styling';
import { tint, UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  const columnDisplay = `
    ${logicalCSS('width', '50%')} // Flex-basis doesn't work in IE with padding
    ${logicalCSS('padding-right', euiTheme.size.s)}
  `;
  return {
    euiDescriptionList__title: css`
      ${euiTextBreakWord()};
      // Add margin only to the non-first <dt>.
      &:not(:first-of-type) {
        margin-top: ${euiTheme.size.base};
      }
    `,

    // Types
    row: css``,
    column: css`
      ${columnDisplay}
    `,
    responsiveColumn: css`
      ${euiBreakpoint(['xs', 's'], euiThemeContext)} {
        width: 100%;
        padding: 0;
      }
      ${euiBreakpoint(['xl'], euiThemeContext)} {
        ${columnDisplay}
      }
    `,
    inline: css`
      display: inline;
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.medium};
      background-color: ${colorMode === 'DARK'
        ? tint(euiTheme.colors.lightestShade, 0.5)
        : euiTheme.colors.lightestShade};
      margin: 0 ${euiTheme.size.xs};

      // Make sure the first <dt> doesn't get a margin.
      &:first-of-type {
        margin-left: 0;
      }
    `,

    // This nested block handles just the font styling based on compressed and reverse
    fontStyles: {
      normal: css`
        ${euiTitle(euiThemeContext, 'xs')};
      `,
      reverse: css`
        ${euiFontSize(euiThemeContext, 's')};
      `,
      compressed: css`
        ${euiTitle(euiThemeContext, 'xxs')}
      `,
    },

    // Inline types
    inlineStyles: {
      normal: css`
        ${euiFontSize(euiThemeContext, 's')};
        padding: 1px ${euiTheme.size.xs};
      `,
      compressed: css`
        ${euiFontSize(euiThemeContext, 'xs')};
        padding: 0 ${euiTheme.size.xs};
      `,
    },

    // Alignment
    right: css`
      ${logicalTextAlignCSS('right')};
    `,
  };
};
