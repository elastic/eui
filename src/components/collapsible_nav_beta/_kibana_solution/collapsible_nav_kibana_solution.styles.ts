/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { mathWithUnits } from '../../../global_styling';

import { euiCollapsibleNavItemVariables } from '../collapsible_nav_item/collapsible_nav_item.styles';

export const euiCollapsibleNavKibanaSolutionStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const sharedStyles = euiCollapsibleNavItemVariables(euiThemeContext);

  return {
    euiCollapsibleNavKibanaSolution: css``,
    collapsed: css`
      margin-block-start: ${euiTheme.size.base};
    `,
    uncollapsed: css`
      margin: ${sharedStyles.padding};
    `,

    // Solution switcher title (popover toggle)
    euiCollapsibleNavKibanaSolution__title: css`
      margin-block-start: ${euiTheme.size.base};
      margin-block-end: ${euiTheme.size.s};

      /* EuiCollapsibleNavLink override */
      &:is(button) {
        inline-size: 100%;
      }
    `,
    // Make the solution logo slightly larger
    euiCollapsibleNavKibanaSolution__logo: css`
      transform: scale(1.25);
    `,
    // Align the layer icon to the accordion arrows
    euiCollapsibleNavKibanaSolution__switcherIcon: css`
      margin-inline-start: auto;
    `,

    // Solution switcher popover
    euiCollapsibleNavKibanaSolution__switcherPopover: css`
      /* Custom title appearance */
      .euiPopoverTitle {
        padding: ${mathWithUnits(
          [euiTheme.size.s, euiTheme.size.xxs],
          (x, y) => x + y
        )};
        margin-block-end: 0;
        border-block-end: none;
      }

      /* EuiCollapsedNavPopover overrides */
      [class*='euiCollapsedNavPopover__title'] {
        padding: 0;
      }

      [class*='euiCollapsedNavPopover__items'] {
        padding: 0;
        mask-image: none;
      }
    `,
    euiCollapsibleNavKibanaSolution__secondaryItems: css`
      /* padding-bottom already handled by the popover panel */
      padding-block-end: 0;
    `,
  };
};
