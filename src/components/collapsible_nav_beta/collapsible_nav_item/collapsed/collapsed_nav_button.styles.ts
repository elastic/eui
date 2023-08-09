/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import { logicalCSS } from '../../../../global_styling';

import { euiCollapsibleNavItemVariables } from '../collapsible_nav_item.styles';

export const euiCollapsedNavButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const sharedStyles = euiCollapsibleNavItemVariables(euiThemeContext);

  return {
    euiCollapsedNavButton: css`
      display: flex;
      margin: ${sharedStyles.padding};

      &.euiButtonIcon:hover {
        transform: none;
      }
    `,
    isSelected: css`
      &,
      &:hover,
      &:focus {
        background-color: ${sharedStyles.backgroundSelectedColor};
      }
    `,
  };
};

export const euiCollapsedNavItemTooltipStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCollapsedNavItemTooltip: css``,
    // Bring the tooltip closer to the nav - it's a little too far otherwise
    left: css`
      ${logicalCSS('margin-left', `-${euiTheme.size.m}`)}
    `,
    right: css`
      ${logicalCSS('margin-right', `-${euiTheme.size.m}`)}
    `,
    // If the item has a popover and the popover is open, we don't want the
    // tooltip to appear if so - the popover already renders the item title
    hidden: css`
      display: none;
    `,
  };
};
