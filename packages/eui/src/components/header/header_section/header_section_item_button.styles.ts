/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
  euiMaxBreakpoint,
} from '../../../global_styling';

export const euiHeaderSectionItemButtonStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  const dotSize = euiTheme.size.base;
  const dotOffset = isRefreshVariant
    ? mathWithUnits(dotSize, (x) => x * -0.3)
    : '-15%';
  const badgeOffset = isRefreshVariant
    ? mathWithUnits(euiTheme.size.s, (x) => x * 0.06)
    : '0';

  return {
    euiHeaderSectionItemButton: css`
      position: relative; /* For positioning the notification */
      ${logicalSizeCSS(
        euiTheme.size.xl
      )} /* Same size as EUI small icon buttons (32x32px) */
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0;
      font-size: 0; /* Aligns icons better vertically */

      ${euiMaxBreakpoint(euiThemeContext, 's')} {
        ${logicalSizeCSS(euiTheme.size.xl)}/* Keep consistent size on mobile */
      }
    `,
    euiHeaderSectionItemButton__content: css`
      /* This element is a span and we're changing the display because inline elements can’t take a transform */
      display: inline-block;
    `,
    notification: {
      euiHeaderSectionItemButton__notification: css`
        position: absolute;
      `,
      dot: css`
        ${logicalCSS('top', dotOffset)}
        ${logicalCSS('right', dotOffset)}
        stroke: ${euiTheme.colors.emptyShade};

        ${euiMaxBreakpoint(euiThemeContext, 's')} {
          ${logicalSizeCSS(dotSize)}
          ${logicalCSS('top', '-4%')}
          ${logicalCSS('right', '-4%')}
        }
      `,
      badge: css`
        ${logicalCSS('top', badgeOffset)}
        ${logicalCSS('right', badgeOffset)}
        box-shadow: 0 0 0 ${euiTheme.border.width.thin} ${euiTheme.colors
          .emptyShade};
      `,
    },
  };
};
