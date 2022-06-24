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
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';
import type { EuiImageSize } from './image';

const _imageWidth = (euiTheme: UseEuiTheme['euiTheme'], size: number) => {
  const width = `${size / euiTheme.base}rem`;

  return `
    &,
    // Required for common usage of nesting within EuiText
    [class*='euiText'] & {
      width: ${width};
    }
  `;
};

export const euiImageStyles = (
  euiThemeContext: UseEuiTheme,
  size: EuiImageSize | number | string
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // The image itself is full width within the container.
    euiImage: css`
      width: 100%;
      vertical-align: middle;
      max-width: 100%;

      &,
       // Required for common usage of nesting within EuiText
      [class*='euiText'] & {
        ${logicalCSS('margin-bottom', 0)};
      }
    `,
    hasShadow: css`
      ${euiShadow(euiThemeContext, 's')};
    `,
    // Sizes
    // These sizes are mostly suggestions. Don't look too hard for meaning in their values.
    // Size is applied to the image, rather than the figure to work better with floats
    s: css(_imageWidth(euiTheme, 120)),
    m: css(_imageWidth(euiTheme, 200)),
    l: css(_imageWidth(euiTheme, 360)),
    xl: css(_imageWidth(euiTheme, 600)),
    original: css`
      width: auto;
      max-width: 100%;
    `,

    fullWidth: css``,
    customSize: css`
      max-width: ${typeof size === 'string' ? size : `${size}px`};
      max-height: ${typeof size === 'string' ? size : `${size}px`};
      // Set width back to auto to ensure aspect ratio is kept
      width: auto;
    `,
    fullScreen: css`
      position: relative;
      max-height: 80vh;
      max-width: 80vw;
    `,
  };
};
