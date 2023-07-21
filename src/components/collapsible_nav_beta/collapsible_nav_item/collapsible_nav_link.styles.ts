/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiCanAnimate,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

import { euiCollapsibleNavItemVariables } from './collapsible_nav_item.styles';

export const euiCollapsibleNavLinkStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const sharedStyles = euiCollapsibleNavItemVariables(euiThemeContext);

  return {
    // Shared between all links
    euiCollapsibleNavLink: css`
      display: flex;
      align-items: center;
      ${logicalCSS('height', sharedStyles.height)}
      padding: ${sharedStyles.padding};

      font-size: ${sharedStyles.fontSize};
      line-height: ${sharedStyles.lineHeight};
      color: ${sharedStyles.color};
      border-radius: ${sharedStyles.borderRadius};

      &:focus {
        outline-offset: -${euiTheme.focus.width};
        text-decoration-thickness: unset; /* unsets EuiLink style */
      }

      [class*='euiLink__externalIcon'] {
        /* Align with accordion arrows */
        ${logicalCSS('margin-right', euiTheme.size.xxs)}
        color: ${sharedStyles.rightIconColor};
      }
    `,
    isSelected: css`
      background-color: ${sharedStyles.backgroundSelectedColor};
    `,
    isTopItem: {
      isTopItem: css`
        font-weight: ${euiTheme.font.weight.semiBold};
        gap: ${euiTheme.size.base}; /* Distance between icon and text */

        /* If EuiLink falls through to render a button, fix button display */
        &:is(button) {
          inline-size: calc(
            100% - ${mathWithUnits(sharedStyles.padding, (x) => x * 2)}
          );
        }
      `,
      isNotAccordion: css`
        margin: ${sharedStyles.padding};
      `,
      isInteractive: css`
        ${euiCanAnimate} {
          transition: background-color ${sharedStyles.animation};
        }

        &:hover,
        &:focus-visible {
          background-color: ${sharedStyles.backgroundHoverColor};
        }
      `,
    },
    isSubItem: css`
      font-weight: ${euiTheme.font.weight.regular};
      gap: ${euiTheme.size.s}; /* Distance between icon and text */
    `,
  };
};
