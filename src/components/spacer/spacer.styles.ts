/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicals } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiSpacerStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiSpacer: css`
    flex-shrink: 0; /* Don't ever let this shrink in height if direct descendent of flex */
  `,
  // Sizes
  xs: css`
    ${logicals.height}: ${euiTheme.size.xs};
  `,
  s: css`
    ${logicals.height}: ${euiTheme.size.s};
  `,
  m: css`
    ${logicals.height}: ${euiTheme.size.base};
  `,
  l: css`
    ${logicals.height}: ${euiTheme.size.l};
  `,
  xl: css`
    ${logicals.height}: ${euiTheme.size.xl};
  `,
  xxl: css`
    ${logicals.height}: ${euiTheme.size.xxl};
  `,
});
