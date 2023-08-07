/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import {
  logicalCSS,
  mathWithUnits,
  euiCanAnimate,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

import { euiCollapsibleNavItemVariables } from './collapsible_nav_item.styles';

export const euiCollapsibleNavAccordionStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const sharedStyles = euiCollapsibleNavItemVariables(euiThemeContext);

  return {
    // NOTE: Specific usage of `>`s selectors are important here, because accordions can be nested
    // - just because a parent accordion is open or selected does not mean its child accordion is the same
    euiCollapsibleNavAccordion: css`
      .euiAccordion__button {
        overflow: hidden; /* Title text truncation doesn't work otherwise */

        /* unset accordion underline - only show for EuiLinks (which display their own underlines)
         * so that behavior between link accordions and non-link accordions is consistent */
        &:hover,
        &:focus {
          cursor: default;
          text-decoration: none;
        }
      }

      .euiAccordion__triggerWrapper {
        border-radius: ${sharedStyles.borderRadius};

        ${euiCanAnimate} {
          transition: background-color ${sharedStyles.animation};
        }
      }

      .euiAccordion__buttonContent {
        ${logicalCSS('max-width', '100%')}
        flex-basis: 100%;
        display: flex;
        align-items: center;
      }

      .euiCollapsibleNavLink {
        ${logicalCSS('width', '100%')}
      }
    `,
    isTopItem: css`
      margin: ${sharedStyles.padding};

      & > .euiAccordion__triggerWrapper {
        &:hover {
          background-color: ${sharedStyles.backgroundHoverColor};
        }
      }
    `,
    isSelected: css`
      & > .euiAccordion__triggerWrapper {
        background-color: ${sharedStyles.backgroundSelectedColor};

        &:hover {
          background-color: ${sharedStyles.backgroundSelectedColor};
        }
      }
    `,
    isSubItem: css`
      &.euiAccordion-isOpen {
        ${logicalCSS('margin-bottom', euiTheme.size.m)}
      }
    `,
    // Arrow element
    euiCollapsibleNavAccordion__arrow: css`
      /* Slight visual offset from edge of entire item */
      ${logicalCSS('margin-right', euiTheme.size.xs)}

      /* Give the arrow button its own clearer hover animation to indicate its hitbox */
      ${euiCanAnimate} {
        transition: background-color ${sharedStyles.animation};
      }

      &:hover,
      &:focus-visible {
        background-color: ${euiTheme.colors.lightShade};

        & > .euiIcon {
          color: ${sharedStyles.color};
        }
      }

      /* Rotate the arrow icon, not the button itself -
       * otherwise the background rotates and looks a bit silly */
      transform: none !important; /* stylelint-disable-line declaration-no-important */

      & > .euiIcon {
        color: ${sharedStyles.rightIconColor};
        transform: rotate(90deg);

        ${euiCanAnimate} {
          transition: transform ${sharedStyles.animation},
            color ${sharedStyles.animation};
        }
      }

      &.euiAccordion__iconButton-isOpen > .euiIcon {
        color: ${sharedStyles.color};
        transform: rotate(-90deg);
      }
    `,
    // Children wrapper
    children: {
      euiCollapsibleNavAccordion__children: css``,
      isTopItem: css`
        ${logicalCSS('padding-top', euiTheme.size.xs)}
        ${logicalCSS('padding-left', euiTheme.size.xl)}
      `,
      isSubItem: css`
        ${logicalCSS('border-left', euiTheme.border.thin)}
        ${logicalCSS('margin-left', euiTheme.size.s)}
        ${logicalCSS(
          'padding-left',
          mathWithUnits(
            [euiTheme.size.s, euiTheme.border.width.thin],
            (x, y) => x - y
          )
        )}
      `,
    },
  };
};
