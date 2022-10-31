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
import { UseEuiTheme } from '../../../services';
import { euiFormControlStyle } from '../form.styles';

export const euiTextAreaStyles = (
  euiThemeContext: UseEuiTheme,
  options: {
    fullWidth?: boolean;
    compressed?: boolean;
  } = {}
) => {
  return {
    euiTextArea: css`
      ${euiFormControlStyle(euiThemeContext, options)}
      block-size: auto;
    `,
    fullWidth: css``,
    compressed: css`
      block-size: auto;
    `,
    // resize modifiers
    vertical: css`
      resize: vertical;
    `,
    horizontal: css`
      resize: horizontal;
    `,
    both: css`
      resize: both;
    `,
    none: css`
      resize: none;
    `,
  };
};
