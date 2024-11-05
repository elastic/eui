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
  logicals,
  logicalTextAlignCSS,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiButtonColor } from '../../global_styling/mixins';

import { EuiCardProps } from './card';
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
  const cardPaddingAmount = paddingAmount
    ? mathWithUnits(
        [paddingAmount, euiTheme.border.width.thin],
        (x, y) => x + y
      )
    : '0';
  const spacing = euiPaddingSize(euiThemeContext, paddingKey);
  const halfSpacing = euiPaddingSize(euiThemeContext, halfPaddingKey);

  return {
    card: {
      euiCard: css`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;

        /* Apply the outline to the whole card when the internal text button has focus */
        &:has(
            [class*='euiCard__text'][class*='-interactive']:focus:focus-visible
          ) {
          outline: ${euiTheme.focus.width} solid currentColor;
        }
      `,
      aligned: {
        center: css`
          ${logicalTextAlignCSS('center')}
          align-items: center;
        `,
        left: css`
          ${logicalTextAlignCSS('left')}
          align-items: flex-start;
        `,
        right: css`
          ${logicalTextAlignCSS('right')}
          align-items: flex-end;
        `,
      },
      disabled: css`
        cursor: not-allowed; /* Duplicate property due to Chrome bug */
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
          /* 4 */
          ${logicalCSS('width', '100%')}
        `,
        horizontal: css`
          /* Makes sure the top shrinks and the content grows */
          ${logicalCSS('width', 'auto')}
        `,
      },
    },

    euiCard__children: css`
      ${logicalCSS('margin-top', halfSpacing)}
    `,

    euiCard__description: css`
      ${logicalCSS('margin-top', halfSpacing)}
    `,

    euiCard__footer: css`
      flex-grow: 0; /* 1 */
      ${logicalCSS('width', '100%')} /* 4 */
      ${logicalCSS('margin-top', spacing)}
    `,

    top: {
      euiCard__top: css`
        flex-grow: 0; /* 1 */
        font-size: 0;
        position: relative;
        ${logicalCSS('margin-bottom', spacing)}
      `,

      layout: {
        vertical: css`
          /* 4 */
          ${logicalCSS('width', '100%')}
        `,
        horizontal: css`
          /* Makes sure the top shrinks and the content grows */
          ${logicalCSS('width', 'auto')}
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

        /* Padding based sizing & negative margins */
        ${logicalCSS('width', `calc(100% + (${cardPaddingAmount} * 2))`)}
        ${logicalCSS('left', `-${cardPaddingAmount}`)}
        ${logicalCSS('top', `-${cardPaddingAmount}`)}
        /* Ensure the parent is only as tall as the image */
        ${logicalCSS('margin-bottom', `-${paddingAmount}`)}

        /* Match border radius, minus border width */
        ${logicalCSS(
          'border-top-left-radius',
          `calc(${euiTheme.border.radius.medium} - ${euiTheme.border.width.thin})`
        )}
        ${logicals['border-top-right-radius']}: calc(${euiTheme.border.radius
          .medium} - ${euiTheme.border.width.thin});

        img {
          ${logicalCSS('width', '100%')}/* 4 */
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
        ${logicalCSS('top', '50%')}
        ${logicalCSS('left', '50%')}
        /* Important needed to override current Sass styles on .euiIcon */
        transform: translate(
          -50%,
          calc(-50% + -${paddingAmount})
        ) !important; /* stylelint-disable-line declaration-no-important */
      `,

      layout: {
        vertical: css`
          ${logicalCSS('margin-top', halfSpacing)}
        `,
        horizontal: css`
          ${logicalCSS('margin-right', spacing)}
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
    `,

    aligned: {
      center: css`
        ${logicalTextAlignCSS('center')}
      `,
      left: css`
        ${logicalTextAlignCSS('left')}
      `,
      right: css`
        ${logicalTextAlignCSS('right')}
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
      /* Ensure badges are visible outside of the whole card */
      overflow: visible;
      /* Increase top padding to make room */
      ${logicalCSS('padding-top', `calc(${padding} + ${euiTheme.size.s})`)}
    `,

    euiCard__betaBadgeAnchor: css`
      /* Ensure there's no extra inherited height for proper translate value */
      line-height: 0;
      position: absolute;
      ${logicalCSS('top', '0')}
      ${logicalCSS('left', '50%')}
      transform: translateX(-50%) translateY(-50%);
      /* Get above absolutely positioned image */
      z-index: 3;
      /* Extend beta badges to at least 30% of the container's width or 112px (whichever is smaller) */
      ${logicalCSS('min-width', `min(30%, ${euiTheme.base * 7}px)`)}
      ${logicalCSS('max-width', `calc(100% - (${padding} * 2))`)}
    `,

    euiCard__betaBadge: css`
      ${logicalCSS('width', '100%')}
    `,
  };
};
