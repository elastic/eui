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

export const euiHeaderSectionStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiHeaderSection: css`
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      gap: ${euiTheme.size.s};
    `,
    grow: css`
      flex-grow: 1;
    `,
    // By default, EuiHeader uses `justify-content: space-between`, which means
    // sections are left-aligned by default (even when alone) with no extra CSS needed
    left: css`
      ${logicalCSS('margin-left', euiTheme.size.s)};
    `,
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment/Box_alignment_in_flexbox#alignment_and_auto_margins
    right: css`
      ${logicalCSS('margin-left', 'auto')};
      ${logicalCSS('margin-right', euiTheme.size.s)};
    `,
  };
};
