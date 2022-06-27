/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListDescriptionStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const { lineHeight } = euiFontSize(euiThemeContext, 's');

  return {
    euiDescriptionList__description: css``,

    // Types
    row: css`
      ${euiFontSize(euiThemeContext, 's')};
    `,
    inline: css`
      ${euiFontSize(euiThemeContext, 's')};
      display: inline;
    `,
    column: css`
      ${euiFontSize(euiThemeContext, 's')};
      width: 50%; // Flex-basis doesn't work in IE with padding
      padding-left: ${euiTheme.size.s};
    `,
    responsiveColumn: css`
      ${euiFontSize(euiThemeContext, 's')};
      width: 50%; // Flex-basis doesn't work in IE with padding
      padding-left: ${euiTheme.size.s};
    `,

    // Modifier combinations
    rowReverse: css`
      ${euiTitle(euiThemeContext, 'xs')}
    `,
    rowCompressed: css`
      ${euiFontSize(euiThemeContext, 's')};
    `,
    rowCompressedReverse: css`
      ${euiTitle(euiThemeContext, 'xxs')};
      line-height: ${lineHeight};
    `,

    columnReverse: css`
      ${euiTitle(euiThemeContext, 'xs')};
      line-height: ${lineHeight};
    `,
    columnCompressed: css`
      ${euiFontSize(euiThemeContext, 's')};
    `,
    columnCompressedReverse: css`
      ${euiTitle(euiThemeContext, 'xxs')};
      line-height: ${lineHeight};
    `,

    inlineCompressed: css`
      ${euiFontSize(euiThemeContext, 'xs')};
    `,
  };
};
