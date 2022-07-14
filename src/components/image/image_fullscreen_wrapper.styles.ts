/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import {
  logicalCSS,
  logicalTextAlignCSS,
  euiCanAnimate,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiImageFullscreenWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageFullscreenWrapper: css`
      display: inline-block;
      position: relative;
      line-height: 0; // Fixes cropping when image is resized by forcing its height to be determined by the image not line-height
      flex-shrink: 0; // Don't ever let this shrink in height if direct descendent of flex
      position: relative;
      ${logicalCSS('max-height', '80vh')};
      ${logicalCSS('max-width', '80vh')};
      ${logicalTextAlignCSS('center')}; // Aligns both caption and image

      ${euiCanAnimate} {
        animation: ${euiImageFullScreen(euiTheme.size.xxxxl)}
          ${euiTheme.animation.extraSlow} ${euiTheme.animation.bounce};
      }

      &:hover [class*='euiImageCaption'] {
        text-decoration: underline;
      }
    `,
    // Sizes
    fullWidth: css`
      ${logicalCSS('width', '100%')}
    `,
  };
};

export const euiImageFullscreenWrapperFullScreenCloseIconStyles = ({
  euiTheme,
}: UseEuiTheme) => ({
  // Base
  euiImageFullscreenWrapper__fullScreenCloseIcon: css`
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
