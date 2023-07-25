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

export const euiCollapsibleNavSubItemGroupTitleStyles = ({
  euiTheme,
}: UseEuiTheme) => {
  return {
    euiCollapsibleNavItem__groupTitle: css`
      ${logicalCSS('margin-top', euiTheme.size.base)}
      ${logicalShorthandCSS(
        'padding',
        `${euiTheme.size.xs} ${euiTheme.size.s}`
      )}
    `,
  };
};
