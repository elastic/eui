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
  euiSupportsHas,
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
 * 3. Horizontal layouts should always top left align no matter the textAlign prop
 * 4. Ensures the contents always stretch no matter the flex layout
 */

export const euiCardStyles = (
  euiThemeContext: UseEuiTheme,
  paddingSize: EuiCardProps['paddingSize']
) => {
  const { euiTheme } = euiThemeContext;
  const paddingAmount = euiPaddingSize(euiThemeContext, paddingSize!);
  const spacing = euiPaddingSize(euiThemeContext, paddingKey);
  const halfSpacing = euiPaddingSize(euiThemeContext, halfPaddingKey);

  return {
    card: {
      euiCard: css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;

        // Apply the outline to the whole card when the internal text button has focus
        &:has([class*='euiCard__text'][class*='-interactive']:focus:focus-visible) {
          outline: ${euiTheme.focus.width} solid currentColor;
        }
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
        background-color: ${euiButtonColor(euiThemeContext, 'disabled')};
        color: ${euiTheme.colors.disabledText};
      `,
    },

    main: {
      euiCard__main: css`
        display: flex;
        inline-size: 100%;
        flex-grow: 1;
      `,
      layout: {
        vertical: css`
          flex-direction: column;
        `,
        horizontal: css`
          flex-direction: row;
          align-items: flex-start; /* 3 */
        `,
      },
    },

    content: {
      euiCard__content: css`
        flex-grow: 1;
      `,

      layout: {
        vertical: css`
          ${logicalCSS('width', '100%')}; /* 4 */
        `,
        horizontal: css`
          ${logicalCSS(
            'width',
            'auto'
          )}; // Makes sure the top shrinks and the content grows
        `,
      },
    },

    euiCard__children: css`
      ${logicalCSS('margin-top', halfSpacing)};
    `,

    euiCard__description: css`
      ${logicalCSS('margin-top', halfSpacing)};
    `,

    euiCard__footer: css`
      flex-grow: 0; /* 1 */
      ${logicalCSS('width', '100%')}; /* 4 */
      ${logicalCSS('margin-top', spacing)};
    `,

    top: {
      euiCard__top: css`
        flex-grow: 0; /* 1 */
        font-size: 0;
        position: relative;
        ${logicalCSS('margin-bottom', spacing)};
      `,

      layout: {
        vertical: css`
          ${logicalCSS('width', '100%')}; /* 4 */
        `,
        horizontal: css`
          ${logicalCSS(
            'width',
            'auto'
          )}; // Makes sure the top shrinks and the content grows
        `,
      },

      disabled: css`
        filter: grayscale(100%);
      `,
    },

    image: {
      euiCard__image: css`
        position: relative;
        overflow: hidden;

        // Padding based sizing & negative margins
        ${logicalCSS('width', `calc(100% + (${paddingAmount} * 2))`)};
        ${logicalCSS('left', `-${paddingAmount}`)};
        ${logicalCSS('top', `-${paddingAmount}`)};
        // ensure the parent is only as tall as the image
        ${logicalCSS('margin-bottom', `-${paddingAmount}`)};

        // match border radius, minus border width
        ${logicalCSS(
          'border-top-left-radius',
          `calc(${euiTheme.border.radius.medium} - ${euiTheme.border.width.thin})`
        )}
        ${logicals['border-top-right-radius']}: calc(${euiTheme.border.radius
          .medium} - ${euiTheme.border.width.thin});

        img {
          ${logicalCSS('width', '100%')}; /* 4 */
        }
      `,
      transparent: css`
        border-radius: ${euiTheme.border.radius.medium};
      `,
    },

    icon: {
      euiCard__icon: css``,

      withImage: css`
        position: absolute;
        ${logicalCSS('top', '50%')};
        ${logicalCSS('left', '50%')};
        // Important needed to override current Sass styles on .euiIcon
        transform: translate(-50%, calc(-50% + -${paddingAmount})) !important;
      `,

      layout: {
        vertical: css`
          ${logicalCSS('margin-top', halfSpacing)};
        `,
        horizontal: css`
          ${logicalCSS('margin-right', spacing)};
        `,
      },
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
      outline-offset: ${euiTheme.size.xxs};

      .euiCard:hover &,
      .euiCard:focus &,
      &:hover,
      &:focus {
        text-decoration: underline;
      }

      // Progressive enhancement where we remove focus from text as
      // it will be applied to the whole card instead
      ${euiSupportsHas} {
        outline: none !important;
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

export const euiCardBetaBadgeStyles = (
  euiThemeContext: UseEuiTheme,
  paddingSize: EuiCardProps['paddingSize']
) => {
  const { euiTheme } = euiThemeContext;
  const padding = euiPaddingSize(euiThemeContext, paddingSize!);

  return {
    hasBetaBadge: css`
      position: relative;
      // Ensure badges are visible outside of the whole card
      overflow: visible;
      // Increase top padding to make room
      ${logicalCSS('padding-top', `calc(${padding} + ${euiTheme.size.s})`)};
    `,

    euiCard__betaBadgeAnchor: css`
      // Ensure there's no extra inherited height for proper translate value
      line-height: 0;
      position: absolute;
      ${logicalCSS('top', '0')};
      ${logicalCSS('left', '50%')};
      transform: translateX(-50%) translateY(-50%);
      // Get above abs positioned image
      z-index: 3;
      // Todo: $euiButtonMinWidth
      // Extend beta badges to at least 30% of the container's width or 112px (whichever is smaller)
      ${logicalCSS('min-width', 'min(30%, 112px)')};
      ${logicalCSS('max-width', `calc(100% - (${padding} * 2))`)};
    `,

    euiCard__betaBadge: css`
      ${logicalCSS('width', '100%')};
    `,
  };
};
