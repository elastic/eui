/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../../services';
import {
  logicalCSS,
  mathWithUnits,
  euiYScrollWithShadows,
} from '../../../../global_styling';

import { euiCollapsibleNavItemVariables } from '../collapsible_nav_item.styles';

export const euiCollapsedNavPopoverStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCollapsedNavPopover__panel: css`
      ${logicalCSS(
        'width',
        mathWithUnits(euiTheme.size.base, (x) => x * 15)
      )}
    `,
    euiCollapsedNavPopover__items: css`
      ${euiYScrollWithShadows(euiThemeContext)}
      padding-block: ${euiTheme.size.s};
      padding-inline: ${euiTheme.size.xs};

      ${logicalCSS('max-height', '50vh')}
      @media (max-height: ${euiTheme.breakpoint.s}px) {
        ${logicalCSS('max-height', '75vh')}
      }
    `,
  };
};

export const euiCollapsedNavPopoverTitleStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const sharedStyles = euiCollapsibleNavItemVariables(euiThemeContext);

  return {
    euiCollapsedNavPopover__title: css`
      padding: ${euiTheme.size.m};
      font-weight: ${euiTheme.font.weight.bold};
    `,
    link: css`
      /* Vertically align the external icon */
      display: flex;
      align-items: center;

      /* Horizontally align with other external link icons */
      [class*='euiLink__externalIcon'] {
        ${logicalCSS('margin-left', 'auto')}
        ${logicalCSS('margin-right', euiTheme.size.xxs)}
        color: ${sharedStyles.rightIconColor};
      }
    `,
    span: css`
      display: block;
    `,
  };
};
