/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

export const euiTextTruncateStyles = {
  euiTextTruncate: css`
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  `,
  truncatedText: css`
    user-select: none;
    pointer-events: none;
  `,
  fullText: css`
    position: absolute;
    inset: 0;
    overflow: hidden;
    color: rgba(0, 0, 0, 0);

    /* Safari-only CSS hack
       Adding text-overflow: ellipsis makes VoiceOver's screen reader outline obey the container width,
       but Chrome+FF don't need it, and it interferes with their text selection highlights
     */
    @supports (-webkit-hyphens: none) {
      text-overflow: ellipsis;
    }
  `,
};
