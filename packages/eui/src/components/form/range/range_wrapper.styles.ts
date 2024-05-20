/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFormVariables } from '../form.styles';
import { UseEuiTheme } from '../../../services';

export const euiRangeWrapperStyles = (euiThemeContext: UseEuiTheme) => {
  const form = euiFormVariables(euiThemeContext);

  return {
    euiRangeWrapper: css`
      display: flex;
      align-items: center;

      /* TODO: When converting forms to Emotion, allow passing wrapperProps
         to EuiFieldNumber and then move this CSS to range_input.styles.ts */
      > .euiFormControlLayout {
        /* Allow the width to shrink */
        inline-size: auto;
        /* Don't allow inputs to overwhelm the actual range in width */
        max-inline-size: 50%;

        /* The input should take priority over prepend/append labels */
        .euiFormControlLayout__childrenWrapper {
          flex-shrink: 0;
        }

        .euiFormControlLayout__prepend,
        .euiFormControlLayout__append {
          flex-shrink: 1;
          /* Remove the default 50% max-width on prepend/appends, as a max-width is
             already set on the wrapper, and a static width already set on the input */
          max-inline-size: none;
        }
      }
    `,
    // Skip the css`` on the default height to avoid generating a className
    uncompressed: `
      block-size: ${form.controlHeight};
    `,
    compressed: css`
      block-size: ${form.controlCompressedHeight};
    `,
    // Skip the css`` on the default width to avoid generating a className
    formWidth: `
      max-inline-size: ${form.maxWidth};
    `,
    fullWidth: css`
      max-inline-size: 100%;
    `,
  };
};
