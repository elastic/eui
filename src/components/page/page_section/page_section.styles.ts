/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { shade, tint, UseEuiTheme } from '../../../services';
import { _EuiPageRestrictWidth } from '../_restrict_width';

export const euiPageSectionWidth = (
  restrictWidth: _EuiPageRestrictWidth,
  alignment: typeof ALIGNMENTS[number]
) => {
  const width = alignment?.toLowerCase().includes('center') ? 'auto' : '100%';

  if (restrictWidth === true) {
    return css`
      margin-left: auto;
      margin-right: auto;
      width: ${width};
      max-width: 1200px; // TODO
    `;
  } else if (restrictWidth !== undefined) {
    return css`
      margin-left: auto;
      margin-right: auto;
      width: ${width};
      max-width: ${restrictWidth};
    `;
  }
};

// TODO Can be made a global function
export const PADDING_SIZES = ['none', 's', 'm', 'l'] as const;
export const euiPaddingStyles = ({ euiTheme }: UseEuiTheme, side: string) => {
  return {
    none: null,
    s: css`
      padding-${side}: ${euiTheme.size.s};
    `,
    m: css`
      padding-${side}: ${euiTheme.size.m};
    `,
    l: css`
      padding-${side}: ${euiTheme.size.l};
    `,
  };
};

// TODO Can be made a global function
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

export const ALIGNMENTS = ['top', 'center', 'horizontalCenter'] as const;
export const euiPageSectionStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    base: css`
      width: 100%;
      min-width: 0; // Make sure that inner flex layouts don't get larger than this container
      display: flex;
      flex-direction: column;
    `,
    grow: css`
      flex-grow: 1;
    `,
    border: css`
      border-bottom: ${euiTheme.border.thin};
    `,
    center: css`
      align-items: center;
      justify-content: center;
    `,
    horizontalCenter: css`
      align-items: center;
    `,
  };
};
