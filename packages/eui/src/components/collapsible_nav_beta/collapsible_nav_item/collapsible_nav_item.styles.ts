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
  mathWithUnits,
  euiFontSize,
} from '../../../global_styling';
import { euiButtonColor } from '../../../themes/amsterdam/global_styling/mixins/button';

/**
 * Style variables shared between accordion, link, and sub items
 */
export const euiCollapsibleNavItemVariables = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    height: euiTheme.size.xl,
    padding: euiTheme.size.s,
    ...euiFontSize(euiThemeContext, 's'),
    animation: `${euiTheme.animation.normal} ease-in-out`, // Matches EuiButton
    borderRadius: euiTheme.border.radius.small,
    backgroundHoverColor: euiTheme.colors.lightestShade,
    backgroundSelectedColor: euiButtonColor(euiThemeContext, 'text')
      .backgroundColor,
    color: euiTheme.colors.text,
    rightIconColor: euiTheme.colors.disabledText,
  };
};

/**
 * Title styles
 */

export const euiCollapsibleNavItemTitleStyles = {
  euiCollapsibleNavItem__title: css`
    flex-grow: 1;
  `,
};

/**
 * Sub item groups
 */

export const euiCollapsibleNavSubItemsStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCollapsibleNavItem__items: css``,
    isTopItem: css`
      ${logicalCSS('padding-top', euiTheme.size.xs)}
      ${logicalCSS('padding-left', euiTheme.size.xl)}
    `,
    isSubItem: css`
      ${logicalCSS('border-left', euiTheme.border.thin)}
      ${logicalCSS(
        'margin-left',
        mathWithUnits([euiTheme.size.xs], (x) => x * 4)
      )}
      ${logicalCSS(
        'padding-left',
        mathWithUnits(
          [euiTheme.size.s, euiTheme.border.width.thin],
          (x, y) => x - y
        )
      )}
    `,
  };
};

/**
 * Top-level item only styles
 */

export const euiCollapsibleNavTopItemStyles = ({
  euiTheme: _euiTheme,
}: UseEuiTheme) => {
  return {
    // If this is the only top-level item in the list, assume the nav is showing a single solution and
    // use no left padding + increase its relative icon size
    euiCollapsibleNavTopItem: css`
      &:only-child {
        .euiCollapsibleNavItem__items {
          ${logicalCSS('padding-left', 0)}
        }

        .euiCollapsibleNavItem__icon {
          transform: scale(1.25);
        }
      }
    `,
  };
};
