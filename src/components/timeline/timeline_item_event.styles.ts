/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

export const euiTimelineItemEventStyles = () => ({
  euiTimelineItemEvent: css`
    flex: 1;
  `,
  //  Vertical alignments
  top: css`
    align-self: flex-start;
  `,
  center: css`
    align-self: center;
  `,
});
