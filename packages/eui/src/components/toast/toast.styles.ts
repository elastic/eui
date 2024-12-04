/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiTextBreakWord,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import {
  highContrastAffordance,
  overrideForcedColors,
} from '../../global_styling/functions/high_contrast';
import { UseEuiTheme } from '../../services';
import { euiShadowLarge } from '../../themes/amsterdam';
import { euiTitle } from '../title/title.styles';

export const euiToastStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  return {
    // Base
    euiToast: css`
      border-radius: ${euiTheme.border.radius.medium};
      ${euiShadowLarge(euiThemeContext, { borderAllInHighContrastMode: true })}

      position: relative;
      ${logicalCSS('padding-horizontal', euiTheme.size.base)}
      ${logicalCSS('padding-vertical', euiTheme.size.base)}
      background-color: ${euiTheme.colors.emptyShade};
      ${logicalCSS('width', '100%')}
      ${euiTextBreakWord()} /* Prevent long lines from overflowing */

      &:hover,
      &:focus {
        [class*='euiToast__closeButton'] {
          opacity: 1;
        }
      }
    `,
    // Elements
    euiToast__closeButton: css`
      position: absolute;
      ${logicalCSS('top', euiTheme.size.base)}
      ${logicalCSS('right', euiTheme.size.base)}
    `,
    // Variants
    colors: {
      _getStyles: (color: string) => {
        // Increase color/border thickness for all high contrast modes
        const borderWidth = highContrastMode
          ? mathWithUnits(euiTheme.border.width.thick, (x) => x * 2)
          : euiTheme.border.width.thick;

        return highContrastAffordance(euiThemeContext, {
          default: logicalCSS('border-top', `${borderWidth} solid ${color}`),

          // Windows high contrast mode ignores/overrides border colors, which have semantic meaning here. To get around this, we'll use a pseudo element that ignores forced colors
          forced: `
            overflow: hidden;

            &::before {
              content: '';
              position: absolute;
              ${logicalCSS('top', 0)}
              ${logicalCSS('horizontal', 0)}
              ${logicalCSS('height', borderWidth)}
              background-color: ${color};
              ${overrideForcedColors(euiThemeContext)}
            }
          `,
        });
      },
      get primary() {
        return css(this._getStyles(euiTheme.colors.primary));
      },
      get success() {
        return css(this._getStyles(euiTheme.colors.success));
      },
      get warning() {
        return css(this._getStyles(euiTheme.colors.warning));
      },
      get danger() {
        return css(this._getStyles(euiTheme.colors.danger));
      },
    },
  };
};

export const euiToastHeaderStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base
    euiToastHeader: css`
      display: flex;
      /* Align icon with first line of title text if it wraps */
      align-items: baseline;
      /* Account for close button */
      ${logicalCSS('padding-right', euiTheme.size.l)}

      > * + * {
        /* Apply margin to all but last item in the flex */
        ${logicalCSS('margin-left', euiTheme.size.s)}
      }
    `,
    // Elements
    euiToastHeader__icon: css`
      flex: 0 0 auto;
      fill: ${euiTheme.colors.title};

      /* Vertically center icon with first line of title */
      transform: translateY(2px);
    `,
    euiToastHeader__title: css`
      ${euiTitle(euiThemeContext, 'xs')}
      font-weight: ${euiTheme.font.weight.bold};
    `,
    // Variants
    withBody: css`
      ${logicalCSS('margin-bottom', euiTheme.size.s)}
    `,
  };
};
