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
import { UseEuiTheme, tint } from '../../../services';

export const euiBetaBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, colorMode } = euiThemeContext;

  const textColor =
    colorMode === 'DARK' ? euiTheme.colors.ghost : euiTheme.colors.ink;
  const invertedTextColor =
    colorMode === 'DARK' ? euiTheme.colors.ink : euiTheme.colors.ghost;

  return {
    euiBetaBadge: css`
      display: inline-block;
      vertical-align: super; // if displayed inline with text
      border-radius: ${euiTheme.size.l};
      cursor: default;

      font-weight: ${euiTheme.font.weight.bold};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: center;
      ${euiTextTruncate()}

      &:focus {
        ${euiFocusRing(euiThemeContext, 'outset', {
          color: textColor,
        })}
      }
    `,
    // Colors
    accent: css`
      background-color: ${euiTheme.colors.accentText};
      color: ${invertedTextColor};
    `,
    subdued: css`
      background-color: ${tint(euiTheme.colors.lightShade, 0.3)};
      color: ${textColor};
    `,
    hollow: css`
      background-color: ${euiTheme.colors.emptyShade};
      color: ${textColor};
      box-shadow: inset 0 0 0 ${euiTheme.border.width.thin}
        ${euiTheme.border.color};
    `,
    // Font sizes
    m: css`
      font-size: ${euiFontSizeFromScale('xs', euiTheme)};
      line-height: ${euiTheme.size.l};
    `,
    s: css`
      font-size: 0.625rem;
      line-height: ${mathWithUnits(euiTheme.size.xs, (x) => x + euiTheme.base)};
    `,
    // Padding/width sizes
    badgeSizes: {
      default: {
        m: `
        ${logicalCSS('padding-horizontal', euiTheme.size.base)}`,
        s: `
        ${logicalCSS('padding-horizontal', euiTheme.size.m)}`,
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
  };
};
