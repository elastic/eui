/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiFontSize } from '../../global_styling';

export const euiHealthStyles = (euiTheme: UseEuiTheme) => ({
  euiHealth: css`
    display: inline-block;
  `,
  // Text sizes
  xs: css`
    ${euiFontSize(euiTheme, 'xs')}
  `,
  s: css`
    ${euiFontSize(euiTheme, 's')}
  `,
  m: css`
    ${euiFontSize(euiTheme, 'm')}
  `,
  inherit: css`
    font-size: inherit;
  `,
});
