/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadowFlat } from '@elastic/eui-theme-common';
import { UseEuiTheme } from '../../services';
import { logicalCSS } from '../../global_styling';
import { euiHeaderVariables } from '../header/header.styles';

import { hideScrollbars } from './collapsible_nav_body_footer.styles';

export const euiCollapsibleNavBetaStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // At least for serverless, EuiCollapsibleNav is only going to be used with 1
  // fixed header. For those scenarios, we can prevent a minor layout jump on
  // page load by setting the CSS var fallback to the height of a single header
  const defaultHeaderHeight = euiHeaderVariables(euiThemeContext).height;
  const fixedHeaderOffset = `var(--euiFixedHeadersOffset, ${defaultHeaderHeight})`;

  return {
    euiCollapsibleNavBeta: css`
      /* Fixed header affordance */
      ${logicalCSS('top', fixedHeaderOffset)}

      /* This extra padding is needed for EuiPopovers to have enough
         space to render with the right anchorPosition */
      ${logicalCSS('padding-bottom', euiTheme.size.xs)}
    `,
    left: css`
      ${logicalCSS('border-right', euiTheme.border.thin)}
    `,
    right: css`
      ${logicalCSS('border-left', euiTheme.border.thin)}
    `,
    isPush: css`
      ${euiShadowFlat(euiThemeContext, { border: 'none' })}
    `,
    isPushCollapsed: css`
      ${hideScrollbars}
    `,
    isOverlayFullWidth: css`
      /* Override EuiFlyout's max-width */
      &.euiFlyout {
        ${logicalCSS('max-width', '100% !important')}
      }
    `,
  };
};
