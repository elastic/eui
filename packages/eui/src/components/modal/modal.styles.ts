/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadowXLarge } from '@elastic/eui-theme-common';

import {
  euiCanAnimate,
  euiMaxBreakpoint,
  euiAnimSlideInUp,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiFormVariables } from '../form/form.styles';

export const euiModalStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiModal: css`
      ${euiShadowXLarge(euiThemeContext, { borderAllInHighContrastMode: true })}
      display: flex;
      flex-direction: column;
      max-block-size: 75vh; /* We overflow the modal body based off this */
      position: relative;
      background-color: ${euiTheme.colors.emptyShade};
      border-radius: ${euiTheme.border.radius.medium};
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBaseFloating};
      z-index: ${euiTheme.levels.modal};
      min-inline-size: ${euiFormVariables(euiThemeContext).maxWidth};
      max-inline-size: calc(100vw - ${euiTheme.size.base});
      overflow: hidden; /* Ensure long, non-breaking text doesn't expand beyond the modal bounds */

      ${euiCanAnimate} {
        animation: ${euiAnimSlideInUp(euiTheme.size.xxl)}
          ${euiTheme.animation.slow} ${euiTheme.animation.bounce};
      }

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        position: fixed;
        inset: 0;
        border-radius: 0;

        /* The below importants are required to override any
           inline width/heights that consumers set via {style} */
        /* stylelint-disable declaration-no-important */
        inline-size: 100vw !important;
        min-inline-size: 0 !important;
        max-inline-size: none !important;
        max-block-size: 100vh !important;
        /* stylelint-enable declaration-no-important */
      }

      /* Remove the outline from the focusable container */
      &:focus {
        outline: none;
      }
    `,
    // Variants
    defaultMaxWidth: css`
      max-inline-size: min(
        ${euiTheme.breakpoint.m}px,
        calc(100vw - ${euiTheme.size.base})
      );
    `,
    confirmation: css`
      min-inline-size: ${euiFormVariables(euiThemeContext).maxWidth};

      ${euiMaxBreakpoint(euiThemeContext, 'm')} {
        ${euiShadowXLarge(euiThemeContext, {
          reverse: true,
          borderAllInHighContrastMode: true,
        })}
        inset-block-start: auto;
      }
    `,
    euiModal__closeIcon: css`
      position: absolute;
      inset-inline-end: ${euiTheme.size.xs};
      inset-block-start: ${euiTheme.size.xs};
      z-index: 3;
    `,
  };
};
