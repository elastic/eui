/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  logicalCSS,
  euiCanAnimate,
  euiFontSizeFromScale,
  euiNumberFormat,
  mathWithUnits,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';
import { euiBadgeColors } from '../color_utils';

export const euiNotificationBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const badgeColors = euiBadgeColors(euiThemeContext);
  const borderWidth = euiTheme.border.width.thin;

  return {
    euiNotificationBadge: css`
      flex-shrink: 0; /* Ensures it never scales down below its intended size */
      display: inline-flex;
      justify-content: center;
      align-items: center;
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
      border-radius: ${euiTheme.border.radius.small};
      border: ${borderWidth} solid transparent;
      overflow: hidden; /* This fixes border shenanigans in Windows high contrast themes */
      cursor: default;

      font-size: ${euiFontSizeFromScale('xs', euiTheme)};
      font-weight: ${euiTheme.font.weight.medium};
      ${euiNumberFormat(euiThemeContext)}
      text-align: center;

      ${euiCanAnimate} {
        transition: all ${euiTheme.animation.fast} ease-in;
      }
    `,
    // Sizes
    s: css`
      ${logicalCSS('height', euiTheme.size.base)}
      ${logicalCSS('min-width', euiTheme.size.base)}
    `,
    m: css`
      ${logicalCSS(
        'height',
        mathWithUnits(euiTheme.size.xs, (x) => x + euiTheme.base)
      )}
      ${logicalCSS('min-width', euiTheme.size.l)}
    `,
    // Colors
    accent: css(badgeColors.accentText),
    success: css(badgeColors.success),
    subdued: css(badgeColors.subdued),
  };
};
