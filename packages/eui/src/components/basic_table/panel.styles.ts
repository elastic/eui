/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import type { UseEuiTheme } from '../../services';

export const euiBasicTablePanelStyles = ({ euiTheme }: UseEuiTheme) => css`
  background-color: ${euiTheme.colors.backgroundBaseSubdued};
  border: ${euiTheme.border.thin};
  border-radius: ${euiTheme.border.radius.medium};

  /* Reset bottom border styles if the next sibling is EuiBasicTable or another panel */
  &:has(+ .euiBasicTable),
  & {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
    border-block-end-width: 0;
  }

  /* Reset top border styles if the previous sibling is another panel */
  & + & {
    border-start-start-radius: 0;
    border-start-end-radius: 0;
  }
`;
