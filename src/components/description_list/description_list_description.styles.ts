/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, logicalTextAlignCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiDescriptionListDescriptionStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDescriptionList__description: css``,

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
      // Align description text left when DecriptionList is centered
      left: css`
        ${logicalTextAlignCSS('left')};
      `,
    },

    // Row type is the default DOM layout
    row: css``,

    column: css`
      width: 50%; // Flex-basis doesn't work in IE with padding
      padding-left: ${euiTheme.size.s};

      &:not(:first-of-type) {
        margin-top: ${euiTheme.size.base};
      }
    `,

    // Nested inline styles for type and font
    inlineStyles: {
      inline: css`
        display: inline;
      `,
      compressed: css`
        ${euiFontSize(euiThemeContext, 'xs')};
      `,
      normal: css`
        ${euiFontSize(euiThemeContext, 's')};
      `,
    },

    mobile: css`
      width: 100%;
      padding: 0;
    `,
  };
};
