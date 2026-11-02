/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiCanAnimate, logicalCSS } from '../../../global_styling';

export const euiAccordionArrowStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiAccordion__arrow: css`
    flex-shrink: 0;

    /* The hit target stays still. Only the triangle glyph turns. */
    .euiButtonIcon__icon {
      /* POC: 5×6 motion-study glyph, not a theme size. */
      inline-size: 5px;
      block-size: 6px;

      ${euiCanAnimate} {
        transition: transform ${euiTheme.animation.normal}
            ${euiTheme.animation.resistance},
          opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance};
      }
    }
  `,
  left: css`
    ${logicalCSS('margin-right', euiTheme.size.xs)}
  `,
  right: css`
    ${logicalCSS('margin-left', euiTheme.size.xs)}
  `,
  // POC: closed opacity 0.7 is from the motion study, not a theme token.
  isClosed: css`
    .euiButtonIcon__icon {
      transform: rotate(0deg);
      opacity: 0.7;
    }
  `,
  isOpen: css`
    .euiButtonIcon__icon {
      transform: rotate(90deg);
      opacity: 1;
    }
  `,
});
