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
  logicalSide,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiImageWrapperStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageWrapper: css`
      display: inline-block;
      ${logicalCSS('max-width', '100%')}
      ${logicalTextAlignCSS('center')}; // Aligns both caption and image
      line-height: 0; // Fixes cropping when image is resized by forcing its height to be determined by the image not line-height
      flex-shrink: 0; // Don't ever let this shrink in height if direct descendent of flex
    `,
    allowFullScreen: css`
      &:hover [class*='euiImageCaption'] {
        text-decoration: underline;
      }
    `,
    // Margins
    s: css`
      margin: ${euiTheme.size.s};
    `,
    m: css`
      margin: ${euiTheme.size.base};
    `,
    l: css`
      margin: ${euiTheme.size.l};
    `,
    xl: css`
      margin: ${euiTheme.size.xl};
    `,
    // Floats
    // 1: Logical properties/values in `float` is currently not yet supported by all browsers w/o flags
    // @see https://caniuse.com/mdn-css_properties_float_flow_relative_values for when we can remove left/right fallbacks
    left: css`
      @media only screen and (min-width: ${euiTheme.breakpoint.m}px) {
        float: left; /* 1 */
        float: ${logicalSide.left};
        ${logicalCSS('margin-left', '0')};
        ${logicalCSS('margin-top', '0')};
      }
    `,
    right: css`
      @media only screen and (min-width: ${euiTheme.breakpoint.m}px) {
        float: right; /* 1 */
        float: ${logicalSide.right};
        ${logicalCSS('margin-right', '0')};
        ${logicalCSS('margin-top', '0')};
      }
    `,
    // Sizes
    fullWidth: css`
      ${logicalCSS('width', '100%')}
    `,
  };
};
