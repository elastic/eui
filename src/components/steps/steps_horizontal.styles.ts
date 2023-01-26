/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, transparentize } from '../../services';

export const euiStepsHorizontalStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiStepsHorizontal: css`
      display: flex;
      align-items: stretch;
      background: ${transparentize(euiTheme.colors.lightestShade, 0.5)};
    `,
  };
};
