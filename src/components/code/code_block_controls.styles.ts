/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiPaddingSize } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { UseEuiCodeSyntaxVariables } from './code_syntax.styles';

export const euiCodeBlockControlsStyles = (
  euiThemeContext: UseEuiTheme,
  euiCodeSyntaxVariables: UseEuiCodeSyntaxVariables
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCodeBlock__controls: css`
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.xs};
      background: ${euiCodeSyntaxVariables.backgroundColor};
    `,
    offset: {
      none: css`
        inset-block-start: 0;
        inset-inline-end: 0;
      `,
      s: css`
        inset-block-start: ${euiPaddingSize(euiThemeContext, 's')};
        inset-inline-end: ${euiPaddingSize(euiThemeContext, 's')};
      `,
      m: css`
        inset-block-start: ${euiPaddingSize(euiThemeContext, 'm')};
        inset-inline-end: ${euiPaddingSize(euiThemeContext, 'm')};
      `,
      l: css`
        inset-block-start: ${euiPaddingSize(euiThemeContext, 'l')};
        inset-inline-end: ${euiPaddingSize(euiThemeContext, 'l')};
      `,
    },
  };
};
