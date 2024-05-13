/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiTitleStyles } from '../title/title.styles';

export const euiInlineEditTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const titleFontStyles = euiTitleStyles(euiThemeContext);

  return {
    euiInlineEditTitle: css``,

    fontSize: {
      xxxs: css`
        .euiFieldText {
          ${titleFontStyles.xxxs}
        }
      `,
      xxs: css`
        .euiFieldText {
          ${titleFontStyles.xxs}
        }
      `,
      xs: css`
        .euiFieldText {
          ${titleFontStyles.xs}
        }
      `,
      s: css`
        .euiFieldText {
          ${titleFontStyles.s}
        }
      `,
      m: css`
        .euiFieldText {
          ${titleFontStyles.m}
        }
      `,
      l: css`
        .euiFieldText {
          ${titleFontStyles.l}
        }
      `,
    },
  };
};
