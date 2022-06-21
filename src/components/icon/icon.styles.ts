/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { logicalCSS, euiCanAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { EuiIconProps } from './icon';

const _iconSize = (size: string) => {
  return `
    ${logicalCSS('width', size)};
    ${logicalCSS('height', size)};
  `;
};

const _iconLoadingOpacity = 0.05;

const _iconLoading = keyframes`
  0% {
    opacity: ${_iconLoadingOpacity};
  }

  100% {
    opacity: 1;
  }
`;

export const euiIconStyles = (
  { euiTheme }: UseEuiTheme,
  color: EuiIconProps['color']
) => ({
  // Base
  euiIcon: css`
    flex-shrink: 0; // Ensures it never scales down below its intended size
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    transform: translate(0, 0); // Hack to fix Firefox "softness"

    // TODO find out if this is still valid
    // this focus was added 5 years ago
    &:focus {
      opacity: 1; // We often hide icons on hover. Make sure they appear on focus.
      /* background: $euiFocusBackgroundColor; */
    }

    // Use the negative fill on SVG elements that need to flip portions
    // of the icon to light and dark compatible modes. You can see this
    // in use on the Elastic logo icons.
    .euiIcon__fillNegative {
      fill: ${euiTheme.colors.darkestShade};
    }

    // Really force all paths to inherit when the color is ghost/text (specifically for logos)
    [class*='-ghost']:not([data-type='logoElastic']),
    [class*='-text']:not([data-type='logoElastic']) {
      *[fill],
      .euiIcon__fillNegative {
        fill: currentColor !important;
      }
    }

    // Elastic logo specific colors
    [class*='-ghost'][data-type='logoElastic'],
    [class*='-text'][data-type='logoElastic'] {
      *[fill] {
        fill: none !important;
      }

      .outline {
        fill: currentColor !important;
      }
    }
  `,
  // Colors
  accent: css`
    color: ${euiTheme.colors.accentText};
  `,
  danger: css`
    color: ${euiTheme.colors.dangerText};
  `,
  ghost: css`
    color: ${euiTheme.colors.ghost};
  `,
  primary: css`
    color: ${euiTheme.colors.primaryText};
  `,
  success: css`
    color: ${euiTheme.colors.successText};
  `,
  subdued: css`
    color: ${euiTheme.colors.subduedText};
  `,
  text: css`
    color: ${euiTheme.colors.title};
  `,
  warning: css`
    color: ${euiTheme.colors.warningText};
  `,
  inherit: css`
    color: inherit;
  `,
  default: css``,
  customColor: css`
    color: ${color};
  `,
  // Sizes
  original: css``,
  s: css(_iconSize(euiTheme.size.m)),
  m: css(_iconSize(euiTheme.size.base)),
  l: css(_iconSize(euiTheme.size.l)),
  xl: css(_iconSize(euiTheme.size.xl)),
  xxl: css(_iconSize(euiTheme.size.xxl)),
  // Variants
  // App icons are two-toned. This provides the base color.
  app: css`
    fill: ${euiTheme.colors.text};

    // This provides the default secondary color
    .euiIcon__fillSecondary {
      fill: ${euiTheme.colors.successText};
    }
  `,
  logo: css``,
  // Loading states
  isLoading: css`
    opacity: ${_iconLoadingOpacity};
    background-color: currentColor;
    border-radius: ${euiTheme.border.radius.small};
  `,
  isLoaded: css`
    ${euiCanAnimate} {
      animation: ${_iconLoading} ${euiTheme.animation.normal} ease-in 0s 1
        forwards;
    }
  `,
});
