/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

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
      &:hover [class*='euiImageCaption'] {
        text-decoration: underline;
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
    // sizes
    fullWidth: css`
      width: 100%;
    `,
  };
};
