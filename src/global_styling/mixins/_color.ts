/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { shade, tint, UseEuiTheme } from '../../services';

// TODO Make into a hook
export const BACKGROUND_COLORS = [
  'transparent',
  'plain',
  'subdued',
  'accent',
  'primary',
  'success',
  'warning',
  'danger',
] as const;

export const euiBackgroundColorStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => {
  function tintOrShade(color: string) {
    return colorMode === 'DARK' ? shade(color, 0.7) : tint(color, 0.9);
  }

  return {
    transparent: css`
      background-color: transparent;
    `,
    plain: css`
      background-color: ${euiTheme.colors.emptyShade};
    `,
    subdued: css`
      background-color: ${euiTheme.colors.body};
    `,
    accent: css`
      background-color: ${tintOrShade(euiTheme.colors.accent)};
    `,
    primary: css`
      background-color: ${tintOrShade(euiTheme.colors.primary)};
    `,
    success: css`
      background-color: ${tintOrShade(euiTheme.colors.success)};
    `,
    warning: css`
      background-color: ${tintOrShade(euiTheme.colors.warning)};
    `,
    danger: css`
      background-color: ${tintOrShade(euiTheme.colors.danger)};
    `,
  };
};
