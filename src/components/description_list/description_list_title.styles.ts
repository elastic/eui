/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize } from '../../global_styling';
import { tint, UseEuiTheme } from '../../services';
import { euiText } from '../text/text.styles';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const { lineHeight } = euiFontSize(euiThemeContext, 's');

  return {
    euiDescriptionList__title: css``,

    // TYpes
    row: css`
      ${euiTitle(euiThemeContext, 'xs')}
      line-height: ${lineHeight};
      margin-top: ${euiTheme.size.base};

      // Make sure the first <dt> doesn't get a margin.
      &:first-of-type {
        margin-top: 0;
      }
    `,
    inline: css`
      ${euiFontSize(euiThemeContext, 's')};
      display: inline;
      border-radius: ${euiTheme.border.radius.small};
      font-weight: ${euiTheme.font.weight.medium};
      background-color: ${colorMode === 'DARK'
        ? tint(euiTheme.colors.lightestShade, 0.5)
        : euiTheme.colors.lightestShade};
      padding: 1px ${euiTheme.size.xs};
      margin: 0 ${euiTheme.size.xs};

      // Make sure the first <dt> doesn't get a margin.
      &:first-of-type {
        margin-left: 0;
      }
    `,
    column: css`
      ${euiTitle(euiThemeContext, 'xs')};
      line-height: ${lineHeight};
      width: 50%; // Flex-basis doesn't work in IE with padding
      padding-right: ${euiTheme.size.s};
    `,
    responsiveColumn: css`
      ${euiTitle(euiThemeContext, 'xs')};
      line-height: ${lineHeight};
      width: 50%; // Flex-basis doesn't work in IE with padding
      padding-right: ${euiTheme.size.s};
    `,

    rowReverse: css`
      ${euiText(euiTheme)};
      ${euiFontSize(euiThemeContext, 's')};
    `,

    rowCompressed: css`
      ${euiTitle(euiThemeContext, 'xxs')}
      line-height: ${lineHeight};
    `,

    rowCompressedReverse: css`
      ${euiText(euiTheme)};
      ${euiFontSize(euiThemeContext, 's')};
    `,

    columnCenter: css`
      // Align the title to smash against the description.
      text-align: right;
    `,

    columnReverse: css`
      ${euiText(euiTheme)};
      ${euiFontSize(euiThemeContext, 's')};
    `,

    columnCompressed: css`
      ${euiTitle(euiThemeContext, 'xxs')};
      line-height: ${lineHeight};
      text-align: right;
    `,

    columnCompressedReverse: css`
      ${euiText(euiTheme)};
      ${euiFontSize(euiThemeContext, 's')};
    `,

    inlineCompressed: css`
      ${euiFontSize(euiThemeContext, 'xs')};
      padding: 0 ${euiTheme.size.xs};
    `,

    // // Text styles
    // normal: css``,
    // reverse: css`
    //   /* ${euiText(euiTheme)};
    //   ${euiFontSize(euiThemeContext, 's')}; */
    // `,

    // // Compressed
    // compressed: css`
    //   /* ${euiTitle(euiThemeContext, 'xxs')}
    //   line-height: ${lineHeight}; */
    // `,

    // reverseNormal: css``,

    // Types
    // row: {
    //   nonCompressed: {
    //     normal: css``,
    //     reverse: css`
    //       ${euiText(euiTheme)};
    //       ${euiFontSize(euiThemeContext, 's')};
    //     `,
    //   },
    //   compressed: {
    //     normal: css`
    //       ${euiTitle(euiThemeContext, 'xxs')}
    //       line-height: ${lineHeight};
    //     `,
    //     reverse: css`
    //       ${euiText(euiTheme)};
    //       ${euiFontSize(euiThemeContext, 's')};
    //     `,
    //   },
    // },
  };
};
