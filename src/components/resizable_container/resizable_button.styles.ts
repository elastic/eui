/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';

export const euiResizableButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const transitionSpeed = euiTheme.animation.fast;
  const transition = `${transitionSpeed} ease`;

  return {
    euiResizableButton: css`
      position: relative;
      flex-shrink: 0;
      z-index: 1;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        ${logicalCSS('top', '50%')}
        ${logicalCSS('left', '50%')}
        background-color: ${euiTheme.colors.darkestShade};
        transition: width ${transition}, height ${transition},
          transform ${transition}, background-color ${transition};
      }

      /* Lighten the "grab" icon on :hover */
      &:hover {
        &::before,
        &::after {
          background-color: ${euiTheme.colors.mediumShade};
          /* Delay transition on hover so animation is not accidentally triggered on mouse over */
          transition-delay: ${transitionSpeed};
        }
      }

      /* Add a transparent background to the container and
         emphasize the "grab" icon with primary color on :focus */
      &:focus {
        background-color: ${transparentize(euiTheme.colors.primary, 0.1)};

        &::before,
        &::after {
          background-color: ${euiTheme.colors.primary};

          /* Overrides default transition so that "grab" icon background-color doesn't animate */
          transition: width ${transition}, height ${transition},
            transform ${transition};
          transition-delay: ${mathWithUnits(transitionSpeed, (x) => x / 2)};
        }
      }
    `,
  };
};
