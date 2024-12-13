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
  logicalSizeCSS,
  euiFocusRing,
  euiFontSizeFromScale,
  euiTextTruncate,
  mathWithUnits,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';
import { euiBadgeColors } from '../color_utils';

export const euiBetaBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;
  const badgeColors = euiBadgeColors(euiThemeContext);

  const sizes = {
    m: {
      height: euiTheme.size.l,
      padding: euiTheme.size.base,
    },
    s: {
      height: mathWithUnits(euiTheme.size.xs, (x) => x + euiTheme.base),
      padding: euiTheme.size.m,
    },
  };
  // Line height is needed over inline-flex centering for text `vertical-align`ment
  const getLineHeight = (height: string) =>
    mathWithUnits([height, euiTheme.border.width.thin], (x, y) => x - y * 2);

  return {
    euiBetaBadge: css`
      display: inline-block;
      border-radius: ${euiTheme.size.l};
      border: ${euiTheme.border.width.thin} solid transparent;
      cursor: default;

      font-weight: ${euiTheme.font.weight.bold};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: center;
      ${euiTextTruncate()}

      &:focus {
        ${euiFocusRing(euiThemeContext, 'outset', {
          color:
            colorMode === 'DARK' ? euiTheme.colors.ghost : euiTheme.colors.ink,
        })}
      }
    `,
    // Colors
    accent: css(badgeColors.accentText),
    subdued: css(badgeColors.subdued),
    hollow: css`
      color: ${badgeColors.hollow.color};
      background-color: ${badgeColors.hollow.backgroundColor};
      border-color: ${badgeColors.hollow.borderColor};
    `,
    warning: css(badgeColors.warning),
    // Font sizes
    m: css`
      font-size: ${euiFontSizeFromScale('xs', euiTheme)};
      line-height: ${getLineHeight(sizes.m.height)};
    `,
    s: css`
      font-size: ${euiFontSizeFromScale('xxxs', euiTheme)};
      line-height: ${getLineHeight(sizes.s.height)};
    `,
    badgeSizes: {
      default: {
        m: logicalCSS('padding-horizontal', sizes.m.padding),
        s: logicalCSS('padding-horizontal', sizes.s.padding),
      },
      // When it's just an icon or a single letter, make the badge a circle
      circle: {
        m: logicalSizeCSS(sizes.m.height),
        s: logicalSizeCSS(sizes.s.height),
      },
    },
    euiBetaBadge__icon: css`
      position: relative;
      transform: translate(0, -1px);
    `,
    // Alignments
    baseline: css`
      vertical-align: baseline;
    `,
    middle: css`
      vertical-align: middle;
    `,
  };
};
