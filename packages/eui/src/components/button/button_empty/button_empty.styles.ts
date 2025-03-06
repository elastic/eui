/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  logicalShorthandCSS,
  euiCanAnimate,
} from '../../../global_styling';
import { euiButtonDisplayStyles } from '../button_display/_button_display.styles';

export const euiButtonEmptyStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  // EuiButtonEmpty uses the same size/font styling as EuiButtonDisplay,
  // but does not share enough of the same colors/props to the point
  // of using the actual component - so we'll reuse its styles instead
  const displayStyles = euiButtonDisplayStyles(euiThemeContext);

  const experimentalStyles =
    isExperimental &&
    `
      /* using duplicate selector to ensure specificity */
      &&:hover,
      &&:active {
        background-color: transparent;
      }

      &:hover:not(:disabled),
      &:focus {
        text-decoration: underline;
      }
  `;

  return {
    euiButtonEmpty: css`
      ${displayStyles.euiButtonDisplay}
      ${logicalShorthandCSS('padding', `0 ${euiTheme.size.s}`)}
      
      /* Change the easing, quickness to not bounce so lighter backgrounds don't flash */
      ${euiCanAnimate} {
        transition-timing-function: ease-in;
        transition-duration: ${euiTheme.animation.fast};
      }
    `,
    isDisabled: displayStyles.isDisabled,
    // Sizes
    xs: displayStyles.xs,
    s: displayStyles.s,
    // uses array here to prevent adding duplicate "m" classname partial
    m: [
      displayStyles.m,
      isExperimental &&
        `
        ${logicalCSS('padding-horizontal', euiTheme.size.m)}
      `,
    ],
    // Flush sides
    flush: css`
      padding-inline: 0;
      ${experimentalStyles}
    `,
    left: css`
      ${logicalCSS('margin-right', euiTheme.size.s)}
    `,
    right: css`
      ${logicalCSS('margin-left', euiTheme.size.s)}
    `,
    both: css``,
  };
};
