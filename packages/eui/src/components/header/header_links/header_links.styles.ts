/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiHeaderLinksStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiHeaderLinks: css`
      display: flex;
    `,
    euiHeaderLinks__list: css`
      white-space: nowrap;
      display: flex;
      align-items: center;
    `,
    gutterSizes: {
      xxs: css`
        gap: ${euiTheme.size.xs};
      `,
      xs: css`
        gap: ${euiTheme.size.s};
      `,
      s: css`
        gap: ${euiTheme.size.m};
      `,
      m: css`
        gap: ${euiTheme.size.base};
      `,
      l: css`
        gap: ${euiTheme.size.l};
      `,
    },
    euiHeaderLinks__mobileList: css`
      .euiHeaderLink {
        display: block;
        ${logicalCSS('width', '100%')}

        /* EuiButtons normally center, which makes sense. In mobile though we want
         * them to align left. This is a safe hack given the specificity. */
        & > .euiButtonEmpty__content {
          justify-content: flex-start;
        }
      }
    `,
  };
};
