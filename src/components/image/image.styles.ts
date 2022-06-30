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

export const euiImageStyles = (euiThemeContext: UseEuiTheme) => ({
  euiImage: css``,
  // image modes
  allowFullScreen: css`
    vertical-align: middle;
    max-width: 100%;

    &,
  // Required for common usage of nesting within EuiText
  [class*='euiText'] & {
      ${logicalCSS('margin-bottom', 0)};
    }
  `,
  isFullScreen: css`
    position: relative;
    max-height: 80vh;
    max-width: 80vw;
  `,
  hasShadow: css`
    ${euiShadow(euiThemeContext, 's')};
  `,
  // Sizes
  // These sizes are mostly suggestions. Don't look too hard for meaning in their values.
  // Size is applied to the image, rather than the wrapper figure to work better with floats
  s: css`
    width: 100px;
  `,
  m: css`
    width: 200px;
  `,
  l: css`
    width: 360px;
  `,
  xl: css`
    width: 600px;
  `,
  original: css`
    width: auto;
  `,

  fullWidth: css`
    width: 100%;
  `,
  customSize: css`
    // A custom max-width and max-height is set in the style tag
    // We set the width back to auto to ensure aspect ratio is kept
    width: auto;
  `,
});
