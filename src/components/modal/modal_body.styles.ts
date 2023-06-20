/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiYScrollWithShadows, euiMaxBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiModalBodyStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiModalBody: css`
      flex-grow: 1;
      overflow: hidden;
      /* The below fixes scroll on Chrome and Safari */
      display: flex;
      flex-direction: column;

      /* If a footer doesn't exist (body is the last element) add padding to the bottom */
      &:last-of-type .euiModalBody__overflow {
        padding-block-end: ${euiTheme.size.l};
      }
    `,
    euiModalBody__overflow: css`
      ${euiYScrollWithShadows(euiThemeContext)}
      padding-inline: ${euiTheme.size.l};
      padding-block: ${euiTheme.size.s};

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        padding-block-end: ${euiTheme.size.l};
      }
    `,
  };
};
