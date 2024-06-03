/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { logicalCSS, euiCanAnimate } from '../../../global_styling';
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
      }

      & > .euiAccordion__triggerWrapper {
        border-radius: ${sharedStyles.borderRadius};

        ${euiCanAnimate} {
          transition: background-color ${sharedStyles.animation};
        }

        &:hover,
        &:focus-within {
          background-color: ${sharedStyles.backgroundHoverColor};

          .euiAccordion__arrow .euiIcon {
            color: ${sharedStyles.color};
          }
        }

        /* Move the keyboard focus outline to the entire trigger wrapper */
        &:has(:focus-visible) {
          outline-style: auto;
          outline-offset: -${euiTheme.focus.width};

          *:focus {
            outline: none;
          }
        }

        /* Weird workaround for Safari showing a strange focus ring bump around the arrow */
        overflow: hidden;
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
    isSelected: css`
      & > .euiAccordion__triggerWrapper {
        background-color: ${sharedStyles.backgroundSelectedColor};

        &:hover,
        &:focus-within {
          background-color: ${sharedStyles.backgroundSelectedColor};
        }
      }
    `,
    isTopItem: css`
      margin: ${sharedStyles.padding};
    `,
    isSubItem: css`
      /* Adds extra spacing to the bottom of the accordion while open. Notes:
         1. This uses a pseudo element instead of margin-bottom on the accordion,
            because otherwise the height calculations the accordion uses will be off
            and cause buggy animation behavior
         2. Setting a margin or padding bottom on .euiAccordion__children does not
            seem to work correctly and gets collapsed instead of stacking
       */
      &.euiAccordion-isOpen .euiAccordion__children::after {
        content: '';
        display: block;
        ${logicalCSS('height', euiTheme.size.m)}
      }
    `,
    // Arrow element
    euiCollapsibleNavAccordion__arrow: css`
      /* Ensure there's no non-clickable deadzones in the accordion trigger wrapper */
      margin: 0;
      ${logicalCSS('height', sharedStyles.height)}
      /* Slight visual offset from edge of entire item */
      ${logicalCSS('width', euiTheme.size.xl)}

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

      &.euiAccordion__arrow[aria-expanded='true'] > .euiIcon {
        color: ${sharedStyles.color};
        transform: rotate(-90deg);
      }

      /* Unset default accordion arrow style */
      &:hover,
      &:focus {
        background-color: transparent;
      }
    `,
  };
};
