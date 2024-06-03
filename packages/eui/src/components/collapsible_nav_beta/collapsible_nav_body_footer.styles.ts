/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS, euiYScrollWithShadows } from '../../global_styling';

// Hide the scrollbar for docked mode (while still keeping the nav scrollable)
// Otherwise if scrollbars are visible, button icon visibility suffers.
export const hideScrollbars = `
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Edge, & Safari */
  }
`;

export const euiCollapsibleNavBodyStyles = {
  euiCollapsibleNav__body: css``,
  isPushCollapsed: css`
    .euiFlyoutBody__overflow {
      ${hideScrollbars}
    }
  `,
};

export const euiCollapsibleNavFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiCollapsibleNav__footer: css`
      /* In case things get really dire responsively, ensure the footer doesn't overtake the body */
      ${logicalCSS('max-height', '50%')}
      background-color: ${euiTheme.colors.emptyShade};
      ${logicalCSS('border-top', euiTheme.border.thin)}
    `,
    euiFlyoutFooter__overflow: css`
      ${euiYScrollWithShadows(euiThemeContext, { side: 'end' })}
    `,
    isPushCollapsed: css`
      ${hideScrollbars}
    `,
  };
};
