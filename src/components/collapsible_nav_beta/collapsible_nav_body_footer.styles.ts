/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';

export const euiCollapsibleNavBodyStyles = {
  // In case things get really dire responsively, ensure the footer doesn't overtake the body
  euiCollapsibleNav__body: css`
    ${logicalCSS('min-height', '50%')}
  `,
  get isPushCollapsed() {
    return css`
      .euiFlyoutBody__overflow {
        ${this._isPushCollapsed}
      }
    `;
  },
  // CSS is reused by main euiCollapsibleNav styles in case the body component isn't used
  _isPushCollapsed: `
    /* Hide the scrollbar for docked mode (while still keeping the nav scrollable)
       Otherwise if scrollbars are visible, button icon visibility suffers. */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Edge, & Safari */
    }
  `,
};

export const euiCollapsibleNavFooterStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCollapsibleNav__footer: css`
      background-color: ${euiTheme.colors.emptyShade};
      ${logicalCSS('border-top', euiTheme.border.thin)}
    `,
  };
};
