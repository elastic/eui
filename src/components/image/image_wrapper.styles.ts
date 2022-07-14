/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS, logicalSide } from '../../global_styling';
import { UseEuiTheme } from '../../services';

const _imageMargins = ({
  size,
  hasFloatLeft,
  hasFloatRight,
  euiTheme,
}: {
  size: string;
  hasFloatLeft: boolean | undefined;
  hasFloatRight: boolean | undefined;
  euiTheme: UseEuiTheme['euiTheme'];
}) => {
  const hasFloat = hasFloatLeft || hasFloatRight;

  const mainStyles = `
  ${logicalCSS('margin-horizontal', size)};
  ${logicalCSS('margin-vertical', size)};

  ${
    hasFloat &&
    `@media only screen and (max-width: ${euiTheme.breakpoint.m}px) {
      ${logicalCSS('margin-horizontal', 'inherit')};
      ${logicalCSS('margin-vertical', 'inherit')};
    }`
  }
`;

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
  hasFloatRight: boolean | undefined
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiImageWrapper: css`
      display: inline-block;
      ${logicalCSS('max-width', '100%')}
      position: relative;
      line-height: 0; // Fixes cropping when image is resized by forcing its height to be determined by the image not line-height
      flex-shrink: 0; // Don't ever let this shrink in height if direct descendent of flex
    `,
    allowFullScreen: css`
      &:hover [class*='euiImageCaption'] {
        text-decoration: underline;
      }
    `,
    // Margins
    s: css(
      _imageMargins({
        size: euiTheme.size.s,
        hasFloatLeft,
        hasFloatRight,
        euiTheme,
      })
    ),
    m: css(
      _imageMargins({
        size: euiTheme.size.base,
        hasFloatLeft,
        hasFloatRight,
        euiTheme,
      })
    ),
    l: css(
      _imageMargins({
        size: euiTheme.size.l,
        hasFloatLeft,
        hasFloatRight,
        euiTheme,
      })
    ),
    xl: css(
      _imageMargins({
        size: euiTheme.size.xl,
        hasFloatLeft,
        hasFloatRight,
        euiTheme,
      })
    ),
    // Floats
    left: css`
      float: ${logicalSide.left};

      @media only screen and (max-width: ${euiTheme.breakpoint.m}px) {
        float: none;
      }
    `,
    right: css`
      float: ${logicalSide.right};

      @media only screen and (max-width: ${euiTheme.breakpoint.m}px) {
        float: none;
      }
    `,
    // Sizes
    fullWidth: css`
      ${logicalCSS('width', '100%')}
    `,
  };
};
