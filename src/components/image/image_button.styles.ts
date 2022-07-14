/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiFocusRing, logicalCSS, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';

export const euiImageButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageButton: css`
      position: relative;
      cursor: pointer;
      line-height: 0;

      // Shadow on hover - use a pseudo element & opacity for maximum animation performance
      &::before {
        opacity: 0;
        content: '';
        pointer-events: none; // Prevent interacting with this element, it's for visual effect only
        position: absolute; // Skip logical properties here - should all be the same
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        ${euiCanAnimate} {
          transition: opacity ${euiTheme.animation.fast}
            ${euiTheme.animation.resistance};
        }
      }

      &:hover,
      &:focus {
        &::before {
          opacity: 1;
        }

        [class*='euiImageButton__icon'] {
          opacity: 1;
        }
      }

      &:focus {
        ${euiFocusRing(euiTheme, 'outset')}
      }
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}
    `,
    shadowHover: css`
      &::before {
        ${euiShadow(euiThemeContext, 's')}
      }
    `,
    hasShadowHover: css`
      &::before {
        ${euiShadow(euiThemeContext, 'm')}
      }
    `,
  };
};

export const euiImageButtonIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiImageButton__icon: css`
    opacity: 0;
    position: absolute;
    ${logicalCSS('top', euiTheme.size.base)};
    ${logicalCSS('right', euiTheme.size.base)};
    cursor: pointer;

    ${euiCanAnimate} {
      transition: opacity ${euiTheme.animation.slow}
        ${euiTheme.animation.resistance};
    }
  `,
});
