/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

const _iconSize = (size: string) => {
  return `
    ${logicalCSS('width', size)};
    ${logicalCSS('height', size)};
  `;
};

const _iconLoadingOpacity = 0.05;

const _iconLoading = keyframes`
  0% {
    opacity:_iconLoadingOpacity;
  }

  100% {
    opacity: 1;
  }
`;

export const euiIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiIcon: css`
    flex-shrink: 0; // Ensures it never scales down below its intended size
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    transform: translate(0, 0); // Hack to fix Firefox "softness"

    &:focus {
      opacity: 1; // We often hide icons on hover. Make sure they appear on focus.
      background: $euiFocusBackgroundColor;
    }
  `,
  // Colors
  accent: css``,
  danger: css``,
  ghost: css``,
  primary: css``,
  success: css``,
  subdued: css``,
  text: css``,
  warning: css``,
  inherit: css``,
  // Sizes
  s: css(_iconSize(euiTheme.size.m)),
  m: css(_iconSize(euiTheme.size.base)),
  l: css(_iconSize(euiTheme.size.l)),
  xl: css(_iconSize(euiTheme.size.xl)),
  xxl: css(_iconSize(euiTheme.size.xxl)),
  // Variants
  app: css``,
  logo: css`
    /* // Really force all paths to inherit when the color is ghost/text (specifically for logos)
    .euiIcon--ghost:not([data-type='logoElastic']),
    .euiIcon--text:not([data-type='logoElastic']) {
      *[fill],
      .euiIcon__fillNegative {
        fill: currentColor !important; // sass-lint:disable-line no-important
      }
    }

    // Elastic logo specific colors
    .euiIcon--ghost[data-type='logoElastic'],
    .euiIcon--text[data-type='logoElastic'] {
      *[fill] {
        fill: none !important; // sass-lint:disable-line no-important
      }

      .outline {
        fill: currentColor !important; // sass-lint:disable-line no-important
      }
    } */
  `,
  isLoading: css`
    opacity: _iconLoadingOpacity;
    background-color: currentColor;
    border-radius: ${euiTheme.border.radius.medium};
  `,
  isLoaded: css`
    // animation: _iconLoading $euiAnimSpeedNormal ease-in 0s 1 forwards;
  `,
});

export const euiIconFillNegativeStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiIconFillNegative: css`
    // animation: _iconLoading $euiAnimSpeedNormal ease-in 0s 1 forwards;
  `,
});
