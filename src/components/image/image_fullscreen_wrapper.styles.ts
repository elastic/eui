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
  logicalTextAlignCSS,
  euiCanAnimate,
  euiAnimSlideInUp,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiImageFullscreenWrapperStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageFullscreenWrapper: css`
      ${logicalCSS('max-height', '80vh')};
      ${logicalCSS('max-width', '80vw')};
      ${logicalTextAlignCSS('center')}; // Aligns both caption and image
      line-height: 0; // Fixes cropping when image is resized by forcing its height to be determined by the image not line-height

      ${euiCanAnimate} {
        animation: ${euiAnimSlideInUp(euiTheme.size.xxxxl)}
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
