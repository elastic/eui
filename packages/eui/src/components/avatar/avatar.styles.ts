/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalSizeCSS, mathWithUnits } from '../../global_styling';
import { UseEuiTheme } from '../../services';

const _avatarSize = ({
  size,
  fontSize,
}: {
  size: string;
  fontSize: string;
}) => {
  return `
    ${logicalSizeCSS(size)};
    font-size: ${fontSize};
  `;
};

export const euiAvatarStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiAvatar: css`
    /* Ensures it never scales down below its intended size */
    flex-shrink: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    background-size: cover;
    background-color: ${euiTheme.colors.lightShade};
    overflow: hidden;
    /* Explicitly state weight so it doesn't get overridden by inheritance */
    font-weight: ${euiTheme.font.weight.medium};
  `,
  // Variants
  plain: css`
    background-color: ${euiTheme.colors.emptyShade};
  `,
  subdued: css`
    background-color: ${euiTheme.colors.lightestShade};
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
  s: css(
    _avatarSize({
      size: euiTheme.size.l,
      fontSize: euiTheme.size.m,
    })
  ),
  m: css(
    _avatarSize({
      size: euiTheme.size.xl,
      fontSize: mathWithUnits(euiTheme.size.base, (x) => x * 0.9),
    })
  ),
  l: css(
    _avatarSize({
      size: euiTheme.size.xxl,
      fontSize: mathWithUnits(euiTheme.size.l, (x) => x * 0.8),
    })
  ),
  xl: css(
    _avatarSize({
      size: euiTheme.size.xxxxl,
      fontSize: mathWithUnits(euiTheme.size.xl, (x) => x * 0.8),
    })
  ),
  // Casing
  capitalize: css`
    text-transform: capitalize;
  `,
  uppercase: css`
    text-transform: uppercase;
  `,
  lowercase: css`
    text-transform: lowercase;
  `,
  none: css`
    text-transform: none;
  `,
});
