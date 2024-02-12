/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiTextStyles } from '../text/text.styles';

export const euiInlineEditTextStyles = (euiThemeContext: UseEuiTheme) => {
  const textFontStyles = euiTextStyles(euiThemeContext);

  return {
    euiInlineEditText: css``,

    fontSize: {
      xs: css`
        .euiFieldText {
          ${textFontStyles.xs}
        }
      `,
      s: css`
        .euiFieldText {
          ${textFontStyles.s}
        }
      `,
      m: css`
        .euiFieldText {
          ${textFontStyles.m}
        }
      `,
    },
  };
};
