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

  return {
    euiBetaBadge: css`
      display: inline-block;
      border-radius: ${euiTheme.size.l};
      cursor: default;

      font-weight: ${euiTheme.font.weight.semiBold};
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
      box-shadow: inset 0 0 0 ${euiTheme.border.width.thin}
        ${badgeColors.hollow.borderColor};
    `,
    warning: css(badgeColors.warning),
    // Font sizes (line height + padding-block-start = height of the badge)
    m: css`
      font-size: ${euiFontSizeFromScale('xs', euiTheme)};
      line-height: ${mathWithUnits(euiTheme.size.l, (x) => x * 0.96)};
    `,
    s: css`
      font-size: 0.7rem;
      line-height: ${mathWithUnits('20px', (x) => x * 0.98)};
    `,
    // Padding/width sizes
    badgeSizes: {
      default: {
        m: `
        ${logicalCSS('height', euiTheme.size.l)}
        ${logicalCSS('padding-horizontal', euiTheme.size.base)}
        padding-block-start: ${mathWithUnits(euiTheme.size.l, (x) => x * 0.04)}
        `,
        s: `
        ${logicalCSS('height', '20px')}
        ${logicalCSS('padding-horizontal', euiTheme.size.m)}
        padding-block-start: ${mathWithUnits('20px', (x) => x * 0.02)};
        `,
      },
      // When it's just an icon or a single letter, make the badge a circle
      circle: {
        m: `
          ${logicalCSS('width', euiTheme.size.l)}
        `,
        s: `
          ${logicalCSS(
            'width',
            mathWithUnits(euiTheme.size.xs, (x) => x + euiTheme.base)
          )}
        `,
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
