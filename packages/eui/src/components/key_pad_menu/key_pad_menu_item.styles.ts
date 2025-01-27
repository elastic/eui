/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalSizeCSS,
  euiCanAnimate,
  euiFontSize,
} from '../../global_styling';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';
import { euiScreenReaderOnly } from '../accessibility';

import { euiKeyPadMenuVariables } from './key_pad_menu.styles';

export const euiKeyPadMenuItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { euiKeyPadMenuSize } = euiKeyPadMenuVariables(euiThemeContext);
  const hasVisColorAdjustment = euiTheme.flags?.hasVisColorAdjustment;

  return {
    euiKeyPadMenuItem: css`
      display: block;
      padding: ${euiTheme.size.xs};
      ${logicalSizeCSS(euiKeyPadMenuSize)}
      border-radius: ${euiTheme.border.radius.medium};
      color: ${euiTheme.colors
        .textParagraph}; /* Override possible link color */

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.fast} ease-in,
          box-shadow ${euiTheme.animation.fast} ease-in;
      }
    `,
    enabled: css`
      /* stylelint-disable no-extra-semicolons */
      &:hover,
      &:focus,
      &:focus-within {
        cursor: pointer;
        text-decoration: underline;

        ${hasVisColorAdjustment
          ? `
            ${euiShadow(euiThemeContext, 's')}

            ${euiCanAnimate} {
              .euiKeyPadMenuItem__icon {
                transform: translateY(0);
              }
            }`
          : `
          background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};
        `}
      }

      &:focus {
        box-shadow: none;

        ${hasVisColorAdjustment
          ? `
            background-color: ${euiTheme.focus.backgroundColor};
          `
          : `
            background-color: ${euiTheme.colors.backgroundBaseInteractiveHover};
        `}
      }
    `,
    selected: css`
      color: ${euiTheme.colors.textHeading};

      ${hasVisColorAdjustment
        ? `
          background-color: ${euiTheme.focus.backgroundColor};
        `
        : ``}

      &,
      &:hover,
      &:focus,
      &:focus-within {
        color: ${euiTheme.colors.textPrimary};

        ${hasVisColorAdjustment
          ? ``
          : `background-color: ${euiTheme.colors.backgroundBaseInteractiveSelect};`
        }
      }
    `,
    disabled: {
      disabled: css`
        cursor: not-allowed;
        color: ${euiTheme.colors.textDisabled};

        .euiKeyPadMenuItem__icon {
          ${hasVisColorAdjustment
            ? `filter: grayscale(100%);`
            : ``}

          svg * {
            fill: ${euiTheme.colors.textDisabled};
          }
        }
      `,
      selected: hasVisColorAdjustment
        ? css`
            background-color: ${euiTheme.components
              .keyPadMenuItemBackgroundDisabledSelect};
          `
        : `
        background-color: ${euiTheme.colors.backgroundBaseDisabled};
      `,
    },
  };
};

export const euiKeyPadMenuItemChildStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const topRightChildren = `
    z-index: 3;
    position: absolute;
    ${logicalCSS('top', euiTheme.size.xs)}
    ${logicalCSS('right', euiTheme.size.xs)}
  `;

  return {
    euiKeyPadMenuItem__inner: css`
      ${logicalSizeCSS('100%')}
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    `,
    euiKeyPadMenuItem__icon: css`
      ${logicalCSS('margin-bottom', euiTheme.size.m)}
      transform: translateY(2px);

      ${euiCanAnimate} {
        transition: transform ${euiTheme.animation.normal}
          ${euiTheme.animation.bounce};
      }
    `,
    euiKeyPadMenuItem__label: css`
      ${euiFontSize(euiThemeContext, 'xs')}
      font-weight: ${euiTheme.font.weight.semiBold};
      text-align: center;
    `,

    euiKeyPadMenuItem__betaBadge: css`
      ${topRightChildren}
    `,

    euiKeyPadMenuItem__checkableInput: css`
      ${topRightChildren}
      transform: scale(.75);
      transform-origin: top right;

      /* TODO: Remove this once EuiCheckbox and EuiRadio have been converted to Emotion */
      && {
        position: absolute;
      }
    `,
    showCheckableInputOnInteraction: css`
      .euiKeyPadMenuItem:not(:hover, :focus, :focus-within) & {
        ${euiScreenReaderOnly()}
      }
    `,
    hideCheckableInput: css`
      ${euiScreenReaderOnly()}
    `,
  };
};
