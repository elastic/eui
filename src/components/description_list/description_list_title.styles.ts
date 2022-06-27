/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, euiTextBreakWord } from '../../global_styling';
import { tint, UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  const sharedColumnStyles = () => {
    return `
      width: 50%; // Flex-basis doesn't work in IE with padding
      padding-right: ${euiTheme.size.s};
    `;
  };

  const sharedInlineStyles = () => {
    return `
      display: inline;
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.medium};
      background-color: ${
        colorMode === 'DARK'
          ? tint(euiTheme.colors.lightestShade, 0.5)
          : euiTheme.colors.lightestShade
      };
      margin: 0 ${euiTheme.size.xs};

      // Make sure the first <dt> doesn't get a margin.
      &:first-of-type {
        margin-left: 0;
      }
    `;
  };

  return {
    euiDescriptionList__title: css`
      ${euiTextBreakWord()};
      // Add margin only to the non-first <dt>.
      &:not(:first-of-type) {
        margin-top: ${euiTheme.size.base};
      }
    `,

    // Row types
    row: css`
      ${euiTitle(euiThemeContext, 'xs')};
    `,

    rowReverse: css`
      ${euiFontSize(euiThemeContext, 's')};
    `,

    rowCompressed: css`
      ${euiTitle(euiThemeContext, 'xxs')}
    `,

    rowCompressedReverse: css`
      ${euiFontSize(euiThemeContext, 's')};
    `,

    // Column types
    column: css`
      ${euiTitle(euiThemeContext, 'xs')};
      ${sharedColumnStyles()};
    `,

    columnReverse: css`
      ${euiFontSize(euiThemeContext, 's')};
      ${sharedColumnStyles()};
    `,

    columnCompressed: css`
      ${euiTitle(euiThemeContext, 'xxs')};
      ${sharedColumnStyles()};
    `,

    columnCompressedReverse: css`
      ${euiFontSize(euiThemeContext, 's')};
      ${sharedColumnStyles()};
    `,

    columnCenter: css`
      // Align the title to smash against the description.
      text-align: right;
    `,

    // Inline types
    inline: css`
      ${euiFontSize(euiThemeContext, 's')};
      ${sharedInlineStyles()};
      padding: 1px ${euiTheme.size.xs};
    `,

    inlineCompressed: css`
      ${euiFontSize(euiThemeContext, 'xs')};
      ${sharedInlineStyles()};
      padding: 0 ${euiTheme.size.xs};
    `,
  };
};
