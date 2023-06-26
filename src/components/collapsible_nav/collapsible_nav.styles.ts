/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiCollapsibleNavStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCollapsibleNav: css``, // The majority of styles extend from EuiFlyout
    push: css``, // No z-index needed
    overlay: css`
      z-index: ${euiTheme.levels.navigation};
    `,
  };
};
