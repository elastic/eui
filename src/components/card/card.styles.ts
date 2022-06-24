/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiPaddingSize,
  logicalCSS,
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

export const euiCardStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const padding = euiPaddingSize(euiThemeContext, paddingKey);
  const halfPadding = euiPaddingSize(euiThemeContext, halfPaddingKey);

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

    euiCard__children: css`
      ${logicalCSS('margin-top', halfPadding)};
    `,

    euiCard__description: css`
      ${logicalCSS('margin-top', halfPadding)};
    `,

    euiCard__footer: css`
      width: 100%; /* 4 */
      flex-grow: 0; /* 1 */
      ${logicalCSS('margin-top', padding)};
    `,
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
