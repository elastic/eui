/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

export const euiAvatarStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiAvatar: css`
    flex-shrink: 0; // Ensures it never scales down below its intended size
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    text-align: center;
    vertical-align: middle;
    overflow-x: hidden;
    font-weight: ${euiTheme.font.weight
      .medium}; // Explicitly state so it doesn't get overridden by inheritance
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
    width: ${euiTheme.size.l};
    height: ${euiTheme.size.l};
    line-height: ${euiTheme.size.l};
    font-size: ${euiTheme.size.m};
  `,
  m: css`
    width: ${euiTheme.size.xl};
    height: ${euiTheme.size.xl};
    line-height: ${euiTheme.size.xl};
    font-size: calc(${euiTheme.size.base} * 0.9);
  `,
  l: css`
    width: ${euiTheme.size.xxl};
    height: ${euiTheme.size.xxl};
    line-height: ${euiTheme.size.xxl};
    font-size: calc(${euiTheme.size.l} * 0.8);
  `,
  xl: css`
    width: calc(${euiTheme.size.base} * 4);
    height: calc(${euiTheme.size.base} * 4);
    line-height: calc(${euiTheme.size.base} * 4);
    font-size: calc(${euiTheme.size.xl} * 0.8);
  `,
});
