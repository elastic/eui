/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiShadow } from '../../themes/amsterdam/global_styling/mixins';
import { euiCanAnimate, euiBreakpoint } from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiFormVariables } from '../form/form.styles';

const euiModalAppear = keyframes`
 0% {
    opacity: 0;
    transform: translateY(40px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const euiModalStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiModal: css`
      // This mixin overwrites some of the border above
      ${euiShadow(euiThemeContext, 'l')}
      display: flex;
      flex-direction: column;
      max-block-size: 75vh; // We overflow the modal body based off this
      overflow: hidden; // Ensure long, non-breaking text doesn't expand beyond the modal bounds

      position: relative;
      background-color: ${euiTheme.colors.emptyShade};
      border-radius: ${euiTheme.border.radius.medium};
      z-index: ${euiTheme.levels.modal};
      min-inline-size: ${euiFormVariables(euiThemeContext).maxWidth};
      max-inline-size: calc(100vw - ${euiTheme.size.base});

      ${euiCanAnimate} {
        animation: ${euiModalAppear} ${euiTheme.animation.slow}
          ${euiTheme.animation.bounce};
      }

      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        position: fixed;
        inline-size: 100vw !important;
        max-inline-size: none !important;
        min-inline-size: 0 !important;
        max-block-size: 100vh;
        inset-inline-start: 0;
        inset-inline-end: 0;
        inset-block-end: 0;
        inset-block-start: 0;
        border-radius: 0;
      }

      // Remove the outline from the focusable container
      &:focus {
        outline: none;
      }
    `,
    // Variants
    maxWidth: css`
      max-inline-size: min(
        ${euiTheme.breakpoint.m},
        calc(100vw - ${euiTheme.size.base})
      );
    `,
    confirmation: css`
      min-inline-size: ${euiFormVariables(euiThemeContext).maxWidth};

      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        ${euiShadow(euiThemeContext, 'l')}
        inset-block-start: auto;
      }
    `,
    euiModal__closeIcon: css`
      background-color: transparentize(${euiTheme.colors.emptyShade}, 0.1);
      position: absolute;
      inset-inline-end: ${euiTheme.size.xs};
      inset-block-start: ${euiTheme.size.xs};
      z-index: 3;
    `,
  };
};
