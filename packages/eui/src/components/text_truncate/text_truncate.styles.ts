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
  /**
   * The below CSS is a hack to get double clicking and selecting the *full* text
   * instead of the truncated text (useful for copying/pasting, and mimics how
   * `text-overflow: ellipsis` works).
   *
   * Real talk: I'm lowkey amazed it works and it wouldn't surprise me if we ran into
   * cross-browser issues with this at some point. Hopefully CSS natively implements
   * custom text truncation some day (https://github.com/w3c/csswg-drafts/issues/3937)
   * and there'll be no need for the entire component at that point 🙏
   */
  // Makes the truncated text unselectable/un-clickable
  euiTextTruncate__truncatedText: css`
    user-select: none;
    pointer-events: none;
  `,
  // Positions the full text on top of the truncated text (so that clicking targets it)
  // and gives it a color opacity of 0 so that it's not actually visible
  euiTextTruncate__fullText: css`
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
