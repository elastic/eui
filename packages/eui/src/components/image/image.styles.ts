/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadow } from '@elastic/eui-theme-common';

import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiImageStyles = (euiThemeContext: UseEuiTheme) => ({
  euiImage: css`
    vertical-align: middle;
    ${logicalCSS('max-width', '100%')}

    &,
    /* Required for common usage of nesting within EuiText */
    [class*='euiText'] & {
      ${logicalCSS('margin-bottom', 0)}
    }
  `,
  // Variations
  isFullScreen: css`
    position: relative;
    ${logicalCSS('max-height', '80vh')}
    ${logicalCSS('max-width', '80vw')}
  `,
  hasShadow: css`
    ${euiShadow(euiThemeContext, 's')}
  `,
  // Sizes
  // These sizes are mostly suggestions. Don't look too hard for meaning in their values.
  // Size is applied to the image, rather than the wrapper figure to work better with floats
  s: css`
    ${logicalCSS('width', '100px')}
  `,
  m: css`
    ${logicalCSS('width', '200px')}
  `,
  l: css`
    ${logicalCSS('width', '360px')}
  `,
  xl: css`
    ${logicalCSS('width', '600px')}
  `,
  original: css`
    ${logicalCSS('width', 'auto')}
  `,
  fullWidth: css`
    ${logicalCSS('width', '100%')}
  `,
  customSize: css`
    /* A custom max-width and max-height is set in the style tag
       We set the width back to auto to ensure aspect ratio is kept */
    ${logicalCSS('width', 'auto')}
  `,
});
