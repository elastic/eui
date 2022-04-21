/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services/theme';

export const PADDING_SIZES = ['none', 's', 'm', 'l'] as const;

export type _EuiPaddingSize = {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: typeof PADDING_SIZES[number];
};

// TODO: Make into a hook too
export const euiPaddingStyles = ({ euiTheme }: UseEuiTheme, side: string) => {
  return {
    none: null,
    s: css`
      padding-${side}: ${euiTheme.size.s};
    `,
    m: css`
      padding-${side}: ${euiTheme.size.m};
    `,
    l: css`
      padding-${side}: ${euiTheme.size.l};
    `,
  };
};
