/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import {
  logicalCSS,
  logicalSizeCSS,
  euiCanAnimate,
  euiFontSize,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';
import { euiScreenReaderOnly } from '../accessibility';

import { euiKeyPadMenuVariables } from './key_pad_menu.styles';

export const euiKeyPadMenuItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { euiKeyPadMenuSize } = euiKeyPadMenuVariables(euiThemeContext);

  return {
    euiKeyPadMenuItem: css`
      display: block;
      padding: ${euiTheme.size.xs};
      ${logicalSizeCSS(euiKeyPadMenuSize)}
      border-radius: ${euiTheme.border.radius.medium};
      color: ${euiTheme.colors.text}; /* Override possible link color */

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.fast} ease-in,
          box-shadow ${euiTheme.animation.fast} ease-in;
      }
    `,
    enabled: css`
      &:is(:hover, :focus, :focus-within) {
        cursor: pointer;
        text-decoration: underline;

        ${highContrastModeStyles(euiThemeContext, {
          none: euiShadow(euiThemeContext, 's'),
          // Use `outline` instead of border to avoid affecting absolutely positioned children
          preferred: `
            outline: ${euiTheme.border.width.thin} solid ${euiTheme.colors.primary};
          `,
        })}

        ${euiCanAnimate} {
          .euiKeyPadMenuItem__icon {
            transform: translateY(0);
          }
        }
      }

      &:focus {
        background-color: ${euiTheme.focus.backgroundColor};
        box-shadow: none;
      }
    `,
    selected: css`
      color: ${euiTheme.colors.title};
      background-color: ${euiTheme.focus.backgroundColor};

      &:is(*, :hover, :focus, :focus-within) {
        color: ${euiTheme.colors.primaryText};

        ${highContrastModeStyles(euiThemeContext, {
          // Skip checkable items (which render a <label> instead of <button>/<a>),
          // as they already have sufficient indication of state (checkbox or radio)
          preferred: `
            &:not(label) {
              outline: ${euiTheme.border.width.thick} solid ${euiTheme.colors.primary};
              outline-offset: 0;
            }
          `,
        })}
      }
    `,
    disabled: {
      disabled: css`
        cursor: not-allowed;
        color: ${euiTheme.colors.disabledText};

        ${highContrastModeStyles(euiThemeContext, {
          none: `
            .euiKeyPadMenuItem__icon {
              filter: grayscale(100%);

              svg * {
                fill: ${euiTheme.colors.disabledText};
              }
            }
          `,
          forced: 'opacity: 0.5;',
        })}
      `,
      selected: css`
        background-color: ${transparentize(
          euiTheme.colors.disabled,
          euiTheme.focus.transparency
        )};
        ${highContrastModeStyles(euiThemeContext, {
          preferred: `
            &:not(label) {
              outline: ${euiTheme.border.width.thick} solid ${euiTheme.colors.disabledText};
            }
          `,
        })}
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
      position: absolute;
      ${topRightChildren}
      transform: scale(.75);
      transform-origin: top right;
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
