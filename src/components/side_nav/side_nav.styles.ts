/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiCanAnimate, logicalCSS } from '../../global_styling';

export const euiSideNavMobileStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const fastTransition = `${euiTheme.animation.extraFast} ${euiTheme.animation.resistance}`;
  const slowTransition = `${euiTheme.animation.extraSlow} ${euiTheme.animation.resistance}`;

  return {
    // Mobile button
    euiSideNav__mobileToggle: css`
      ${logicalCSS('width', '100%')}
      ${logicalCSS('height', 'auto')}

      /* Inherit from the wrapping heading element */
      padding: 1em;
      font-size: inherit;
      text-align: start;

      border-radius: 0;
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
    `,
    euiSideNav__mobileToggleContent: css`
      justify-content: space-between;
    `,

    // Mobile content
    content: {
      euiSideNav__mobileContent: css`
        ${euiCanAnimate} {
          transition: max-block-size ${fastTransition},
            padding-block ${fastTransition}, opacity ${slowTransition},
            visibility ${slowTransition};
        }
      `,
      hidden: css`
        overflow: hidden;
        visibility: hidden;
        opacity: 0;
        max-block-size: 0;
        padding-inline: ${euiTheme.size.l};
      `,
      open: css`
        visibility: visible;
        opacity: 1;
        max-block-size: 5000px;
        padding: ${euiTheme.size.l};
      `,
    },
  };
};
