/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { EuiCardProps } from '..';
import {
  euiPaddingSize,
  logicalCSS,
  logicals,
  logicalTextAlignCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiButtonColor } from '../../themes/amsterdam/global_styling/mixins';

const paddingKey = 'm';
const halfPaddingKey = 's';

/**
 * 1. Footer is always at the bottom.
 * 2. Fix for IE where the image correctly resizes in width but doesn't collapse its height
      (https://github.com/philipwalton/flexbugs/issues/75#issuecomment-134702421)
 * 3. Horizontal layouts should always top left align no matter the textAlign prop
 * 4. Ensures the contents always stretch no matter the flex layout
 */

export const euiCardStyles = (
  euiThemeContext: UseEuiTheme,
  paddingSize: EuiCardProps['paddingSize'],
  color: EuiCardProps['display']
) => {
  const { euiTheme } = euiThemeContext;
  const paddingAmount = euiPaddingSize(euiThemeContext, paddingSize!);
  const spacing = euiPaddingSize(euiThemeContext, paddingKey);
  const halfSpacing = euiPaddingSize(euiThemeContext, halfPaddingKey);

  return {
    euiCard: css`
      display: flex;
      flex-direction: column;
      // ${logicalCSS('min-height', '1px')}; /* 2 */
    `,

    aligned: {
      center: css`
        ${logicalTextAlignCSS('center')};
        align-items: center;
      `,
      left: css`
        ${logicalTextAlignCSS('left')};
        align-items: flex-start;
      `,
      right: css`
        ${logicalTextAlignCSS('right')};
        align-items: flex-end;
      `,
    },

    disabled: css`
      cursor: not-allowed; // duplicate property due to Chrome bug
      background-color: ${euiButtonColor(
        'disabled',
        euiThemeContext
      )} !important;
      color: ${euiTheme.colors.disabledText};
    `,

    euiCard__content: css`
      width: 100%; /* 4 */
      flex-grow: 1;
    `,

    euiCard__children: css`
      ${logicalCSS('margin-top', halfSpacing)};
    `,

    euiCard__description: css`
      ${logicalCSS('margin-top', halfSpacing)};
    `,

    euiCard__footer: css`
      width: 100%; /* 4 */
      flex-grow: 0; /* 1 */
      ${logicalCSS('margin-top', spacing)};
    `,

    euiCard__top: css`
      width: 100%; /* 4 */
      flex-grow: 0; /* 1 */
      position: relative;
      min-height: 1px; /* 2 */
      font-size: 0;
      ${logicalCSS('margin-bottom', spacing)};
    `,

    euiCard__image: css`
      position: relative;
      overflow: hidden;

      // Padding based sizing & negative margins
      width: calc(100% + (${paddingAmount} * 2));
      left: -${paddingAmount};
      top: -${paddingAmount};
      // ensure the parent is only as tall as the image
      margin-bottom: -${paddingAmount};

      // match border radius, minus 1px because it's inside a border
      ${logicals['border-top-left-radius']}: calc(${euiTheme.border.radius
        .medium} - 1px);
      ${logicals['border-top-right-radius']}: calc(${euiTheme.border.radius
        .medium} - 1px);

      ${color === 'transparent'
        ? `border-radius: ${euiTheme.border.radius.medium};`
        : undefined}

      img {
        width: 100%;
      }
    `,

    icon: {
      euiCard__icon: css`
        ${logicalCSS('margin-top', halfSpacing)};
      `,

      withImage: css`
        position: absolute;
        top: 50%;
        left: 50%;
        // Important needed to override current Sass styles on .euiIcon
        transform: translate(-50%, calc(-50% + -${paddingAmount})) !important;
      `,
    },
  };
};

export const euiCardTextStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiCard__text: css`
      font: inherit;
      color: inherit;
      cursor: inherit;
    `,

    interactive: css`
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    `,

    aligned: {
      center: css`
        ${logicalTextAlignCSS('center')};
      `,
      left: css`
        ${logicalTextAlignCSS('left')};
      `,
      right: css`
        ${logicalTextAlignCSS('right')};
      `,
    },

    disabled: css`
      color: ${euiTheme.colors.disabledText};
    `,
  };
};

export const euiCardBetaBadgeStyles = (euiThemeContext: UseEuiTheme) => {
  const padding = euiPaddingSize(euiThemeContext, paddingKey);

  return {
    hasBetaBadge: css`
      position: relative;
      // Ensure badges are visible outside of the whole card
      overflow: visible;
    `,

    euiCard__betaBadgeAnchor: css`
      // Ensure there's no extra inherited height for proper translate value
      line-height: 0;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      // Get above abs positioned image
      z-index: 3;
      // Todo: $euiButtonMinWidth
      // Extend beta badges to at least 30% of the container's width or 112px (whichever is smaller)
      min-width: min(30%, 112px);
      max-width: calc(100% - (${padding} * 2));
    `,

    euiCard__betaBadge: css`
      width: 100%;
    `,
  };
};
