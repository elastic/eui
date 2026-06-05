/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import type { UseEuiTheme } from '../../services';
import { logicalShorthandCSS } from '../../global_styling';

export const euiBasicTablePanelStyles = ({ euiTheme }: UseEuiTheme) => css`
  background-color: ${euiTheme.colors.backgroundBaseSubdued};
  border: ${euiTheme.border.thin};
  border-block-end-width: 0;
  ${logicalShorthandCSS(
    'border-radius',
    `${euiTheme.border.radius.medium} ${euiTheme.border.radius.medium} 0 0`
  )}

  /* Reset top border styles if the previous sibling is another panel */
  & + & {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }
`;
