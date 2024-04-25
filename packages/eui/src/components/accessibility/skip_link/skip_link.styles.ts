/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

export const euiSkipLinkStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiSkipLink: css`
      /* stylelint-disable declaration-no-important */
      transition: none !important;

      &:focus {
        animation: none !important;
      }
    `,
    // Positions
    // Set positions on focus only as to not override screenReaderOnly position
    // When positioned absolutely, consumers still need to tell it WHERE (top,left,etc...)
    absolute: css`
      &:focus {
        position: absolute;
      }
    `,
    fixed: css`
      position: fixed !important; /* Needs to override euiScreenReaderOnly - prevents scroll jumping in Firefox */

      &:focus {
        inset-block-start: ${euiTheme.size.xs};
        inset-inline-start: ${euiTheme.size.xs};
        z-index: ${Number(euiTheme.levels.header) + 1};
      }
    `,
  };
};
