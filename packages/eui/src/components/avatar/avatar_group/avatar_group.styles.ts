/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import {
  euiCanAnimate,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';
import type { EuiAvatarSize } from '../avatar';

/**
 * Avatar diameters, kept in sync with `euiAvatarStyles`.
 */
const avatarSizeTokens = ({ euiTheme }: UseEuiTheme) => ({
  s: euiTheme.size.l,
  m: euiTheme.size.xl,
  l: euiTheme.size.xxl,
  xl: euiTheme.size.xxxxl,
});

const OVERLAP_RATIO = 0.3;

export const euiAvatarGroupAvatarSize = (
  euiThemeContext: UseEuiTheme,
  size: EuiAvatarSize
) => avatarSizeTokens(euiThemeContext)[size];

export const euiAvatarGroupOverlapAmount = (
  euiThemeContext: UseEuiTheme,
  size: EuiAvatarSize
) => {
  const diameter = euiAvatarGroupAvatarSize(euiThemeContext, size);

  return mathWithUnits(diameter, (x) => x * OVERLAP_RATIO);
};

export const euiAvatarGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const ringWidth = euiTheme.size.xxs;
  const collapsedWidth =
    'calc(var(--euiAvatarGroup-size) + (var(--euiAvatarGroup-count) - 1) * (var(--euiAvatarGroup-size) - var(--euiAvatarGroup-overlap)))';

  return {
    euiAvatarGroup: css`
      display: inline-block;
      position: relative;
      vertical-align: middle;
      flex-shrink: 0;
      isolation: isolate;
      ${logicalCSS('height', 'var(--euiAvatarGroup-size)')}
      ${logicalCSS('width', collapsedWidth)}
      ${logicalCSS('min-width', collapsedWidth)}
    `,
    overlapped: css`
      /* Ring so overlapping faces stay distinct on panel backgrounds */
      .euiAvatar {
        box-shadow: 0 0 0 ${ringWidth} ${euiTheme.colors.backgroundBasePlain};
      }
    `,
    expandOnHover: css`
      /* Raise the stack above siblings while the absolute body is expanded */
      &:hover,
      &:focus-within {
        z-index: ${euiTheme.levels.content};
      }

      .euiAvatarGroup__body {
        position: absolute;
        ${logicalCSS('left', 0)}
        ${logicalCSS('top', 0)}
      }

      ${euiCanAnimate} {
        .euiAvatarGroup__item {
          transition: margin-inline-start ${euiTheme.animation.fast} ease-in-out;
        }
      }

      &:hover,
      &:focus-within {
        --euiAvatarGroup-overlap: 0px;

        .euiAvatarGroup__item:not(:first-child) {
          ${logicalCSS('margin-left', euiTheme.size.xxs)}
        }
      }
    `,
    euiAvatarGroup__body: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: nowrap;
    `,
    euiAvatarGroup__item: css`
      display: inline-flex;
      position: relative;
      /* Stack order is fixed from DOM index. Hover must not raise an item. */
      z-index: calc(var(--euiAvatarGroup-count) - var(--euiAvatarGroup-index));

      &:not(:first-child) {
        ${logicalCSS(
          'margin-left',
          'calc(-1 * var(--euiAvatarGroup-overlap, 0px))'
        )}
      }
    `,
    euiAvatarGroup__surplus: css`
      padding-inline: ${euiTheme.size.xxs};
      font-variant-numeric: tabular-nums;
    `,
  };
};
