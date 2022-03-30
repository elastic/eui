/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

const _avatarSize = (size: string) => {
  return css`
    width: ${size};
    height: ${size};
    line-height: ${size};
  `;
};

export const euiAvatarStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiAvatar: css`
    // Ensures it never scales down below its intended size
    flex-shrink: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    // Explicitly state weight so it doesn't get overridden by inheritance
    font-weight: ${euiTheme.font.weight.medium};
  `,
  // Variants
  plain: css`
    background-color: ${euiTheme.colors.emptyShade};
  `,
  user: css`
    border-radius: 50%;
  `,
  space: css`
    border-radius: ${euiTheme.border.radius.medium};
  `,
  // States
  isDisabled: css`
    cursor: not-allowed;
    filter: grayscale(100%);
  `,
  // Sizes
  s: css`
    ${_avatarSize(euiTheme.size.l)};
    font-size: ${euiTheme.size.m};
  `,
  m: css`
    ${_avatarSize(euiTheme.size.xl)};
    font-size: calc(${euiTheme.size.base} * 0.9);
  `,
  l: css`
    ${_avatarSize(euiTheme.size.xxl)};
    font-size: calc(${euiTheme.size.l} * 0.8);
  `,
  xl: css`
    ${_avatarSize(`calc(${euiTheme.size.base} * 4)`)};
    font-size: calc(${euiTheme.size.xl} * 0.8);
  `,
});
