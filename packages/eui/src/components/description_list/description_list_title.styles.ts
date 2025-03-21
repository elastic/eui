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
  logicalCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  return {
    euiDescriptionList__title: css`
      ${euiTextBreakWord()}
    `,

    // Types
    row: css``,
    column: css``,
    inline: css`
      display: inline;
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.medium};
      background-color: ${colorMode === 'DARK'
        ? euiTheme.colors.lightShade
        : euiTheme.colors.lightestShade};
      ${logicalCSS('margin-vertical', '0')}
      ${logicalCSS('margin-horizontal', euiTheme.size.xs)}

       ${colorMode === 'DARK' && `color: ${euiTheme.colors.textHeading};`}

      /* Make sure the first <dt> doesn't get a margin */
      &:first-of-type {
        ${logicalCSS('margin-left', '0')}
      }
    `,

    // This nested block handles just the font styling based on compressed and reverse
    fontStyles: {
      normal: css`
        ${euiTitle(euiThemeContext, 'xs')}
      `,
      reverse: css`
        ${euiFontSize(euiThemeContext, 's')}
      `,
      compressed: css`
        ${euiTitle(euiThemeContext, 'xxs')}
      `,
    },

    // Inline types
    inlineStyles: {
      normal: css`
        ${euiFontSize(euiThemeContext, 's')}
        ${logicalCSS('padding-vertical', '1px')}
        ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
      `,
      compressed: css`
        font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
        line-height: ${euiTheme.font.lineHeightMultiplier};
        ${logicalCSS('padding-vertical', '0')}
        ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
      `,
    },

    // Alignment
    right: css`
      ${logicalTextAlignCSS('right')}
    `,

    // Gutter
    // Add margin only to the non-first <dt>.
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
