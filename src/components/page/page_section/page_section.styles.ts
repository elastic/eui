/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

export const ALIGNMENTS = ['top', 'center', 'horizontalCenter'] as const;
export const euiPageSectionStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiPageSection: css`
      width: 100%;
      min-width: 0; // Make sure that inner flex layouts don't get larger than this container
      display: flex;
      flex-direction: column;
    `,
    grow: css`
      flex-grow: 1;
    `,
    border: css`
      border-bottom: ${euiTheme.border.thin};
    `,
    // Alignments
    top: css``,
    center: css`
      align-items: center;
      justify-content: center;
    `,
    horizontalCenter: css`
      align-items: center;
    `,
  };
};
