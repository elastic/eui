/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS, euiYScroll } from '../../global_styling';
import { euiShadowFlat } from '../../themes';

export const euiCollapsibleNavBetaStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiCollapsibleNavBeta: css`
      /* This extra padding is needed for EuiPopovers to have enough
         space to render with the right anchorPosition */
      ${logicalCSS('padding-bottom', euiTheme.size.xs)}

      /* Allow the nav to scroll, in case consumers don't use EuiFlyoutBody/EuiFyoutFooter */
      ${euiYScroll(euiThemeContext)}

      /* In case things get really dire responsively, ensure the footer doesn't overtake the body */
      .euiFlyoutBody {
        ${logicalCSS('min-height', '50%')}
      }

      .euiFlyoutFooter {
        background-color: ${euiTheme.colors.emptyShade};
        ${logicalCSS('border-top', euiTheme.border.thin)}
      }
    `,
    left: css`
      ${logicalCSS('border-right', euiTheme.border.thin)}
    `,
    right: css`
      ${logicalCSS('border-left', euiTheme.border.thin)}
    `,
    isPush: css`
      ${euiShadowFlat(euiThemeContext)}
    `,
    isPushCollapsed: css`
      /* Hide the scrollbar for docked mode (while still keeping the nav scrollable) 
         Otherwise if scrollbars are visible, button icon visibility suffers */
      &,
      .euiFlyoutBody__overflow {
        scrollbar-width: none; /* Firefox */

        &::-webkit-scrollbar {
          display: none; /* Chrome, Edge, & Safari */
        }
      }
    `,
    isOverlayFullWidth: css`
      /* Override EuiFlyout's max-width */
      &.euiFlyout {
        ${logicalCSS('max-width', '100% !important')}
      }
    `,
  };
};
