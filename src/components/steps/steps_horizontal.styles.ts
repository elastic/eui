/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

//  1. Make each step the same width
export const euiStepsHorizontalStyles = () => {
  return {
    euiStepsHorizontal: css`
      display: flex;
      align-items: stretch;
    `,
    euiStepsHorizontal__item: css`
      flex-grow: 1; /* 1 */
      flex-basis: 0%; /* 1 */

      // Remove the respective lines if the first or last child
      &:first-of-type > .euiStepHorizontal::before,
      &:last-of-type > .euiStepHorizontal::after {
        display: none;
      }
    `,
  };
};
