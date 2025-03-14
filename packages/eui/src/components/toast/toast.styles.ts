/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadowLarge } from '@elastic/eui-theme-common';

import { euiTextBreakWord, logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';
import { euiPanelBorderStyles } from '../panel/panel.styles';

export const euiToastStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const highlightStyles = (color: string) => `
    &:after {
      content: '';
      position: absolute;
      /* ensure highlight border is on top of panel border */
      z-index: 1;
      inset: 0;
      border-radius: inherit;
      ${logicalCSS('border-top', `2px solid ${color}`)}
      pointer-events: none;
    }
  `;

  return {
    // Base
    euiToast: css`
      border-radius: ${euiTheme.border.radius.medium};
      ${euiShadowLarge(euiThemeContext)}

      position: relative;
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}
      ${logicalCSS('padding-vertical', euiTheme.size.base)}
      background-color: ${euiTheme.colors.emptyShade};
      ${logicalCSS('width', '100%')}

      ${euiTextBreakWord()} /* Prevent long lines from overflowing */

      ${euiPanelBorderStyles(euiThemeContext, { hasFloatingBorder: false })}

      &:hover,
      &:focus {
        [class*='euiToast__closeButton'] {
          opacity: 1;
        }
      }
    `,
    // Elements
    euiToast__closeButton: css`
      position: absolute;
      ${logicalCSS('top', euiTheme.size.base)}
      ${logicalCSS('right', euiTheme.size.base)}
    `,
    // Variants
    primary: css`
      ${highlightStyles(euiTheme.colors.primary)}
    `,
    success: css`
      ${highlightStyles(euiTheme.colors.success)}
    `,
    warning: css`
      ${highlightStyles(euiTheme.colors.warning)}
    `,
    danger: css`
      ${highlightStyles(euiTheme.colors.danger)}
    `,
  };
};

export const euiToastHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base
    euiToastHeader: css`
      display: flex;
      /* Align icon with first line of title text if it wraps */
      align-items: baseline;
      /* Account for close button */
      ${logicalCSS('padding-right', euiTheme.size.l)}

      > * + * {
        /* Apply margin to all but last item in the flex */
        ${logicalCSS('margin-left', euiTheme.size.s)}
      }
    `,
    // Elements
    euiToastHeader__icon: css`
      flex: 0 0 auto;
      fill: ${euiTheme.colors.title};

      /* Vertically center icon with first line of title */
      transform: translateY(2px);
    `,
    euiToastHeader__title: css`
      ${euiTitle(euiThemeContext, 'xs')}
      font-weight: ${euiTheme.font.weight.bold};
    `,
    // Variants
    withBody: css`
      ${logicalCSS('margin-bottom', euiTheme.size.s)}
    `,
  };
};
