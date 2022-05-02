/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalStyle } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiHorizontalRuleStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiHorizontalRule: css`
    border: none;
    ${logicalStyle('height', euiTheme.border.width.thin)}
    background-color: ${euiTheme.border.color};
    flex-shrink: 0; // Ensure when used in flex group, it retains its size
    flex-grow: 0; // Ensure when used in flex group, it retains its size
  `,

  // Sizes
  full: css`
    ${logicalStyle('width', '100%')}
  `,
  half: css`
    ${logicalStyle('width', '50%')}
    ${logicalStyle('margin-horizontal', 'auto')}
  `,
  quarter: css`
    ${logicalStyle('width', '25%')}
    ${logicalStyle('margin-horizontal', 'auto')}
  `,

  // Margins
  none: '',
  xs: css`
    margin-block: ${euiTheme.size.s};
  `,
  s: css`
    margin-block: ${euiTheme.size.m};
  `,
  m: css`
    margin-block: ${euiTheme.size.base};
  `,
  l: css`
    margin-block: ${euiTheme.size.l};
  `,
  xl: css`
    margin-block: ${euiTheme.size.xl};
  `,
  xxl: css`
    margin-block: ${euiTheme.size.xxl};
  `,
});
