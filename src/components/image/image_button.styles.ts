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

export const euiImageButtonStyles = (
  euiThemeContext: UseEuiTheme,
  hasShadow: boolean | undefined
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageButton: css`
      position: relative;
      cursor: pointer;
      line-height: 0;

      &:hover,
      &:focus {
        ${hasShadow
          ? `${euiShadow(euiThemeContext, 'm')};`
          : `${euiShadow(euiThemeContext, 's')};`}
      }

      ${euiCanAnimate} {
        transition: box-shadow ${euiTheme.animation.fast}
          ${euiTheme.animation.resistance};
      }

      &:focus {
        ${euiFocusRing(euiTheme, 'outset')}
      }

      &:hover [class*='euiImageButton__icon'] {
        visibility: visible;
        fill-opacity: 1;
      }
    `,
    fullWidth: css`
      ${logicalCSS('width', '100%')}
    `,
  };
};

export const euiImageButtonIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiImageButton__icon: css`
    visibility: hidden;
    fill-opacity: 0;
    position: absolute;
    ${logicalCSS('top', euiTheme.size.base)};
    ${logicalCSS('right', euiTheme.size.base)};
    cursor: pointer;

    ${euiCanAnimate} {
      transition: fill-opacity ${euiTheme.animation.slow}
        ${euiTheme.animation.resistance};
    }
  `,
});
