/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

/**
 * Used for testing CSS logical properties
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_writing_modes
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
 */
export const writingModeStyles = {
  writingMode: css``,
  ltr: css`
    direction: ltr;
  `,
  rtl: css`
    direction: rtl;
  `,
  'vertical-lr': css`
    writing-mode: vertical-lr;
  `,
  'vertical-rl': css`
    writing-mode: vertical-rl;
  `,
  // Sideways RL is the same as vertical RL
  sideways: css`
    writing-mode: sideways-lr;
  `,
};
