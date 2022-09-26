/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFontSize, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiCodeBlockFullScreenWrapperStyles = ({
  euiTheme,
}: UseEuiTheme) => {
  return {
    euiCodeBlockFullScreenWrapper: css`
      position: fixed;
      inset-block-start: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-end: 0;
    `,
  };
};
