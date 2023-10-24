/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  logicalTextAlignCSS,
  mathWithUnits,
} from '../../global_styling';
import { euiTitle } from '../title/title.styles';

import { euiContextMenuVariables } from './context_menu.styles';

export const euiContextMenuPanelStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { panelWidth } = euiContextMenuVariables(euiThemeContext);

  const animations = {
    transitioning: css`
      pointer-events: none;
      animation-fill-mode: forwards;
      animation-duration: ${euiTheme.animation.normal};
      animation-timing-function: ${euiTheme.animation.resistance};
    `,
    inLeft: keyframes`
      0% { transform: translateX(${panelWidth}); }
      100% { transform: translateX(0); }
    `,
    outLeft: keyframes`
      0% { transform: translateX(0); }
      100% { transform: translateX(-${panelWidth}); }
    `,
    inRight: keyframes`
      0% { transform: translateX(-${panelWidth}); }
      100% { transform: translateX(0); }
    `,
    outRight: keyframes`
      0% { transform: translateX(0); }
      100% { transform: translateX(${panelWidth}); }
    `,
  };

  return {
    euiContextMenuPanel: css`
      ${logicalCSS('width', '100%')}
      visibility: visible;
      outline-offset: -${euiTheme.focus.width};

      &:focus {
        outline: none; /* Hide focus ring because of tabindex=-1 on Safari */
      }
    `,
    // Panel animations
    next: {
      in: css`
        ${animations.transitioning}
        animation-name: ${animations.inLeft};
      `,
      out: css`
        ${animations.transitioning}
        animation-name: ${animations.outLeft};
      `,
    },
    previous: {
      in: css`
        ${animations.transitioning}
        animation-name: ${animations.inRight};
      `,
      out: css`
        ${animations.transitioning}
        animation-name: ${animations.outRight};
      `,
    },
  };
};

export const euiContextMenuPanelTitleStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiContextMenuPanelTitle: css`
      ${euiTitle(euiThemeContext, 'xxs')}
      ${logicalCSS('width', '100%')}
      ${logicalTextAlignCSS('left')}
      ${logicalCSS('border-bottom', euiTheme.border.thin)}
      outline-offset: -${euiTheme.focus.width};

      &:enabled:hover,
      &:enabled:focus {
        text-decoration: underline;
      }
    `,
    // Sizes
    m: css`
      padding: ${euiTheme.size.m};
    `,
    s: css`
      padding-inline: ${euiTheme.size.s};
      padding-block: ${mathWithUnits(euiTheme.size.s, (x) => x * 0.75)};
    `,
  };
};
