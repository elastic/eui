/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme, shade, tint } from '../../services';
import { logicalCSS } from '../../global_styling';

export const _tourFooterBgColor = ({ colorMode, euiTheme }: UseEuiTheme) =>
  colorMode === 'DARK'
    ? shade(euiTheme.colors.lightestShade, 0.45)
    : tint(euiTheme.colors.lightestShade, 0.5);

export const euiTourFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    // Base
    euiTourFooter: css`
      background-color: ${_tourFooterBgColor(euiThemeContext)};
      ${logicalCSS('border-bottom-left-radius', euiTheme.border.radius.medium)}
      ${logicalCSS('border-bottom-right-radius', euiTheme.border.radius.medium)}
    `,
  };
};
