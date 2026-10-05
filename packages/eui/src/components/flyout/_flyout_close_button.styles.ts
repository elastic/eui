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
  euiMaxBreakpoint,
  euiMinBreakpoint,
  logicalCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

import { FLYOUT_BREAKPOINT } from './flyout.styles';

export const euiFlyoutCloseButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiFlyout__closeButton: css`
      position: absolute;
      ${logicalCSS('right', euiTheme.size.s)}
      ${logicalCSS('top', euiTheme.size.s)}
      z-index: 3;
    `,
    inside: css`
      background-color: transparent;
    `,
    outside: css`
      /* Match dropshadow */
      ${euiShadowXLarge(euiThemeContext, { borderAllInHighContrastMode: true })}
      /* Override the hover and focus transitions of buttons */
      animation: none !important; /* stylelint-disable-line declaration-no-important */
    `,
    outsideSide: {
      // `transforms` pull in close buttons a little
      // `!important` is necessary here to override the hover/focus transitions of buttons
      right: css`
        /* stylelint-disable declaration-no-important */
        ${logicalCSS('left', 0)}

        ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
          transform: translateX(calc(-100% - ${euiTheme.size.xs})) !important;
        }
        ${euiMinBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
          transform: translateX(calc(-100% - ${euiTheme.size.l})) !important;
        }
        /* stylelint-enable declaration-no-important */
      `,
      left: css`
        /* stylelint-disable declaration-no-important */
        ${logicalCSS('right', 0)}

        ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
          transform: translateX(calc(100% + ${euiTheme.size.xs})) !important;
        }
        ${euiMinBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
          transform: translateX(calc(100% + ${euiTheme.size.l})) !important;
        }
        /* stylelint-enable declaration-no-important */
      `,
    },
  };
};
