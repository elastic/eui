/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadow } from '@elastic/eui-theme-common';

import { euiFocusRing, logicalCSS, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiImageButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageButton: css`
      position: relative;
      cursor: pointer;
      text-align: match-parent;
      line-height: 0;

      /* Shadow on hover - use a pseudo element & opacity for maximum animation performance */
      &::before {
        opacity: 0;
        content: '';
        pointer-events: none; /* Prevent interacting with this element, it's for visual effect only */
        position: absolute;
        inset: 0;

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
        ${euiFocusRing(euiThemeContext, 'outset')}
      }
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}
    `,
    shadowHover: css`
      &::before {
        ${euiShadow(euiThemeContext, 's', {
          borderAllInHighContrastMode: true,
        })}
      }
    `,
    hasShadowHover: css`
      &::before {
        ${euiShadow(euiThemeContext, 'm', {
          borderAllInHighContrastMode: true,
        })}
      }
    `,
  };
};

export const euiImageButtonIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiImageButton__icon: css`
    position: absolute;
    ${logicalCSS('top', euiTheme.size.base)}
    ${logicalCSS('right', euiTheme.size.base)}
  `,
  openFullScreen: css`
    opacity: 0;
    cursor: pointer;

    ${euiCanAnimate} {
      transition: opacity ${euiTheme.animation.slow}
        ${euiTheme.animation.resistance};
    }
  `,
  closeFullScreen: css`
    /* Fullscreen close event handled by EuiOverlayMask */
    pointer-events: none;
  `,
});
