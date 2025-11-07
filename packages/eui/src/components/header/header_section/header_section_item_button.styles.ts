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
  logicalSizeCSS,
  mathWithUnits,
  euiMaxBreakpoint,
} from '../../../global_styling';

import { euiHeaderVariables } from '../header.styles';

export const euiHeaderSectionItemButtonStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { childHeight } = euiHeaderVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;

  const dotSize = euiTheme.size.base;
  const dotOffset = mathWithUnits(dotSize, (x) => x * -0.5);
  const badgeOffset = mathWithUnits(euiTheme.size.s, (x) => x * -0.5);

  return {
    euiHeaderSectionItemButton: css`
      position: relative; /* For positioning the notification */
      ${logicalCSS('height', childHeight)}
      ${logicalCSS('min-width', childHeight)}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      text-align: center;
      font-size: 0; /* Aligns icons better vertically */

      ${euiMaxBreakpoint(euiThemeContext, 's')} {
        ${logicalCSS(
          'min-width',
          mathWithUnits(childHeight, (x) => x * 0.75)
        )}
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
        ${logicalCSS('top', 0)}
        ${logicalCSS('right', dotOffset)}
        stroke: ${euiTheme.colors.emptyShade};

        ${euiMaxBreakpoint(euiThemeContext, 's')} {
          ${logicalSizeCSS(dotSize)}
          ${logicalCSS('top', '9%')}
        }
      `,
      badge: css`
        ${logicalCSS('top', '9%')}
        ${logicalCSS('right', badgeOffset)}
        box-shadow: 0 0 0 ${euiTheme.border.width.thin} ${euiTheme.colors
          .emptyShade};
      `,
    },
  };
};
