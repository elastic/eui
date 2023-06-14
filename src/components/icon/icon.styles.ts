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

const iconSize = (size: string) => {
  return `
    ${logicalCSS('width', size)};
    ${logicalCSS('height', size)};
  `;
};

export const iconLoadingOpacity = 0.05;

const iconLoading = keyframes`
  0% {
    opacity: ${iconLoadingOpacity};
  }

  100% {
    opacity: 1;
  }
`;

export const euiIconStyles = ({ euiTheme }: UseEuiTheme) => ({
  // Base
  euiIcon: css`
    flex-shrink: 0; /* Ensures it never scales down below its intended size */
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    transform: translate(0, 0); /* Hack to fix Firefox "softness" */

    /* Note: This className is hard-coded into our SVGs and cannot be converted to Emotion */
    .euiIcon__fillNegative {
      /* Use the negative fill on SVG elements that need to flip portions
         of the icon to light and dark compatible modes. You can see this
         in use on the Elastic logo icons. */
      fill: ${euiTheme.colors.darkestShade};
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

    /* Really force all paths to inherit (specifically for logos) */
    *[fill],
    .euiIcon__fillNegative {
      fill: currentColor !important; /* stylelint-disable-line declaration-no-important */
    }
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

    /* Really force all paths to inherit (specifically for logos) */
    *[fill],
    .euiIcon__fillNegative {
      fill: currentColor !important; /* stylelint-disable-line declaration-no-important */
    }
  `,
  warning: css`
    color: ${euiTheme.colors.warningText};
  `,
  inherit: css`
    color: inherit;
  `,
  default: css``,
  customColor: css``,
  logoElasticOutline: css`
    /* Elastic logo specific colors */
    *[fill] {
      fill: none !important; /* stylelint-disable-line declaration-no-important */
    }

    .outline {
      fill: currentColor !important; /* stylelint-disable-line declaration-no-important */
    }
  `,
  // Sizes
  original: css``,
  s: css(iconSize(euiTheme.size.m)),
  m: css(iconSize(euiTheme.size.base)),
  l: css(iconSize(euiTheme.size.l)),
  xl: css(iconSize(euiTheme.size.xl)),
  xxl: css(iconSize(euiTheme.size.xxl)),
  // Variants
  // App icons are two-toned. This provides the base color.
  app: css`
    fill: ${euiTheme.colors.text};

    /* Note: This className is hard-coded into our SVGs and cannot be converted to Emotion */
    .euiIcon__fillSecondary {
      /* This provides the default secondary color */
      fill: ${euiTheme.colors.successText};
    }
  `,
  logo: css``,
  // Loading states
  isLoading: css`
    opacity: ${iconLoadingOpacity};
    background-color: currentColor;
    border-radius: ${euiTheme.border.radius.small};
  `,
  isLoaded: css`
    ${euiCanAnimate} {
      animation: ${iconLoading} ${euiTheme.animation.normal} ease-in 0s 1
        forwards;
    }
  `,
});
