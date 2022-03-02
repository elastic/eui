/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { size } from '../../global_styling/mixins/_size';

export const euiAvatarStyles = ({ euiTheme }: UseEuiTheme) => {
  const avatarSizing = {
    s: {
      size: euiTheme.size.l,
      fontSize: euiTheme.size.m,
    },
    m: {
      size: euiTheme.size.xl,
      fontSize: `calc(${euiTheme.size.base} * .9)`,
    },
    l: {
      size: euiTheme.size.xxl,
      fontSize: `calc(${euiTheme.size.l} * .8)`,
    },
    xl: {
      size: `calc(${euiTheme.size.base} * 4)`,
      fontSize: `calc(${euiTheme.size.xl} * .8)`,
    },
  };

  return {
    // Block
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
      ${size(avatarSizing.s.size)}
      line-height: ${avatarSizing.s.size};
      font-size: ${avatarSizing.s.fontSize};
    `,
    m: css`
      ${size(avatarSizing.m.size)}
      line-height: ${avatarSizing.m.size};
      font-size: ${avatarSizing.m.fontSize};
    `,
    l: css`
      ${size(avatarSizing.l.size)}
      line-height: ${avatarSizing.l.size};
      font-size: ${avatarSizing.l.fontSize};
    `,
    xl: css`
      ${size(avatarSizing.xl.size)}
      line-height: ${avatarSizing.xl.size};
      font-size: ${avatarSizing.xl.fontSize};
    `,
    // Elements
    euiAvatarIcon: css``,
  };
};
