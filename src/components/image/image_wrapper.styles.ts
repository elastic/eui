/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  euiFocusRing,
  euiFontSize,
  logicalCSS,
  euiCanAnimate,
} from '../../global_styling';
import { UseEuiTheme, transparentize } from '../../services';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';

const _imageMargins = ({
  size,
  hasFloatLeft,
  hasFloatRight,
  isSmallScreen,
}: {
  size: string;
  hasFloatLeft: boolean | undefined;
  hasFloatRight: boolean | undefined;
  isSmallScreen: boolean;
}) => {
  const hasFloat = hasFloatLeft || hasFloatRight;

  let mainStyles;

  if (hasFloat && isSmallScreen) {
    mainStyles = `
      ${logicalCSS('margin-horizontal', 'inherit')};
      ${logicalCSS('margin-vertical', 'inherit')};
    `;
  } else {
    mainStyles = `
      ${logicalCSS('margin-horizontal', size)};
      ${logicalCSS('margin-vertical', size)};
    `;
  }

  const floatLeftStyles = `
    ${logicalCSS('margin-left', '0')};
    ${logicalCSS('margin-top', '0')};
  `;

  const floatRightStyles = `
    ${logicalCSS('margin-right', '0')};
    ${logicalCSS('margin-top', '0')};
  `;

  return `
    ${mainStyles}
    ${hasFloatLeft && floatLeftStyles};
    ${hasFloatRight && floatRightStyles};
  `;
};

export const euiImageWrapperStyles = (
  euiThemeContext: UseEuiTheme,
  hasShadow: boolean | undefined,
  hasFloatLeft: boolean | undefined,
  hasFloatRight: boolean | undefined,
  isSmallScreen: boolean
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageWrapper: css`
      display: inline-block;
      max-width: 100%;
      position: relative;
      line-height: 0; // Fixes cropping when image is resized by forcing its height to be determined by the image not line-height
      flex-shrink: 0; // Don't ever let this shrink in height if direct descendent of flex
    `,
    allowFullScreen: css`
      &:hover .euiImageWrapper__caption {
        text-decoration: underline;
      }

      &[class*='-fullWidth'] {
        width: 100%;
      }

      ${hasShadow
        ? `
          [class*='euiImageWrapper__button']:hover,
          [class*='euiImageWrapper__button']:focus {
            ${euiShadow(euiThemeContext, 'm')};
          }`
        : `
          [class*='euiImageWrapper__button']:hover,
          [class*='euiImageWrapper__button']:focus {
            ${euiShadow(euiThemeContext, 's')};
          }`}
    `,
    isFullScreen: css`
      position: relative;
      max-height: 80vh;
      max-width: 80vw;
      ${euiCanAnimate} {
        animation: ${euiImageFullScreen(euiTheme.size.xxxxl)}
          ${euiTheme.animation.extraSlow} ${euiTheme.animation.bounce};
      }

      [class*='euiImageWrapper__caption'] {
        color: ${euiTheme.colors.ghost};
        text-shadow: 0 1px 2px ${transparentize(euiTheme.colors.ink, 0.6)};
      }

      &:hover {
        [class*='euiImageWrapper__button'] {
          ${euiShadow(euiThemeContext, 's')};
        }

        [class*='euiImageWrapper__caption'] {
          text-decoration: underline;
        }
      }
    `,
    // margins
    s: css(
      _imageMargins({
        size: euiTheme.size.s,
        hasFloatLeft,
        hasFloatRight,
        isSmallScreen,
      })
    ),
    m: css(
      _imageMargins({
        size: euiTheme.size.base,
        hasFloatLeft,
        hasFloatRight,
        isSmallScreen,
      })
    ),
    l: css(
      _imageMargins({
        size: euiTheme.size.l,
        hasFloatLeft,
        hasFloatRight,
        isSmallScreen,
      })
    ),
    xl: css(
      _imageMargins({
        size: euiTheme.size.xl,
        hasFloatLeft,
        hasFloatRight,
        isSmallScreen,
      })
    ),
    // floats
    left: css`
      ${isSmallScreen
        ? `
          float: none;
        `
        : `
          float: left;
        `}
    `,
    right: css`
      ${isSmallScreen
        ? `
          float: none;
        `
        : `
          float: right;
        `}
    `,
  };
};

export const euiImageWrapperButtonStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiImageWrapper__button: css`
    position: relative;
    cursor: pointer;
    line-height: 0;

    // transition the shadow
    transition: all ${euiTheme.animation.fast} ${euiTheme.animation.resistance};

    &:focus {
      ${euiFocusRing(euiTheme, 'outset')}
    }

    &:hover [class*='euiImageWrapper__icon'] {
      visibility: visible;
      fill-opacity: 1;
    }
  `,
  fullWidth: css`
    width: 100%;
  `,
});

export const euiImageWrapperCaptionStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageWrapper__caption: css`
      ${euiFontSize(euiThemeContext, 's')};
      ${logicalCSS('margin-top', euiTheme.size.xs)};
      text-align: center;
    `,
  };
};

export const euiImageWrapperIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiImageWrapper__icon: css`
    visibility: hidden;
    fill-opacity: 0;
    position: absolute;
    ${logicalCSS('top', euiTheme.size.base)};
    ${logicalCSS('right', euiTheme.size.base)};
    cursor: pointer;
    transition: fill-opacity ${euiTheme.animation.slow}
      ${euiTheme.animation.resistance};
  `,
});

export const euiImageWrapperFullScreenCloseIconStyles = ({
  euiTheme,
}: UseEuiTheme) => ({
  // Base
  euiImageWrapper__fullScreenCloseIcon: css`
    position: absolute;
    ${logicalCSS('top', euiTheme.size.base)};
    ${logicalCSS('right', euiTheme.size.base)};
    pointer-events: none;
    fill: ${euiTheme.colors.ghost} !important;
  `,
});

const euiImageFullScreen = (size: string) => keyframes`
  0% {
    opacity: 0;
    transform: translateY(${size});
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
