/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, logicalCSSWithFallback } from '../../../global_styling';

export const euiSuperSelectStyles = {
  euiSuperSelect__listbox: css`
    ${logicalCSS('max-height', '300px')}
    ${logicalCSSWithFallback('overflow-y', 'auto')}
    ${logicalCSSWithFallback('overflow-x', 'hidden')}
  `,
};

export const euiSuperSelectItemStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiSuperSelect__item: css`
    padding: ${euiTheme.size.s};
  `,
  hasDividers: css`
    &:not(:last-of-type) {
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
    }
  `,
});
