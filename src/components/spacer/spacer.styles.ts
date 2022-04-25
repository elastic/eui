/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiSpacerStyles = ({ euiTheme }: UseEuiTheme) => ({
  // base
  euiSpacer: css`
    flex-shrink: 0; // don't ever let this shrink in height if direct descendent of flex;
  `,
  // variants
  xs: css`
    height: ${euiTheme.size.xs};
  `,
  s: css`
    height: ${euiTheme.size.s};
  `,
  m: css`
    height: ${euiTheme.size.base};
  `,
  l: css`
    height: ${euiTheme.size.l};
  `,
  xl: css`
    height: ${euiTheme.size.xl};
  `,
  xxl: css`
    height: ${euiTheme.size.xxl};
  `,
});
