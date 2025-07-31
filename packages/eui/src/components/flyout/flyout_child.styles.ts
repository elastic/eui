/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiYScroll,
  highContrastModeStyles,
  logicalCSS,
  logicalCSSWithFallback,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiFormMaxWidth } from '../form/form.styles';
import { composeFlyoutSizing, maxedFlyoutWidth } from './flyout.styles';

export const euiFlyoutChildStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);
  return {
    // Base styles for the child flyout
    euiFlyoutChild: css`
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;
      block-size: 100%;
      display: flex;
      flex-direction: column;
      ${logicalCSSWithFallback('overflow-y', 'hidden')}
      ${logicalCSS('height', '100%')}
      z-index: ${Number(euiTheme.levels.flyout) + 1};
      border-inline-start: ${euiTheme.border.thin};
      border-inline-end: ${euiTheme.border.thin};

      ${maxedFlyoutWidth(euiThemeContext)}
    `,

    noMaxWidth: css`
      ${logicalCSS('max-width', 'none')}
    `,

    backgroundDefault: css`
      background: ${euiTheme.colors.backgroundBasePlain};
    `,
    backgroundShaded: css`
      background: ${euiTheme.colors.backgroundBaseSubdued};
    `,

    // Position variants based on screen size
    sidePosition: css`
      transform: translateX(-100%);
    `,
    // FIXME: should be positioned directly over the parent flyout, without changing its width
    stackedPosition: css`
      transform: translateX(-100%);
    `,

    s: css`
      ${composeFlyoutSizing(euiThemeContext, 's')}
    `,

    m: css`
      ${composeFlyoutSizing(euiThemeContext, 'm')}
    `,

    fillWithParent: {
      s: css`
        max-inline-size: 90vw;
        ${logicalCSSWithFallback(
          'width',
          `calc(90vw - max(25vw, ${Math.round(euiTheme.breakpoint.m * 0.5)}px))`
        )};
      `,
      m: css`
        max-inline-size: 90vw;
        ${logicalCSSWithFallback(
          'width',
          `calc(90vw - max(50vw, ${mathWithUnits(
            formMaxWidth,
            (x) => x + 24
          )}))`
        )};
      `,
    },

    overflow: {
      base: css`
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        ${euiYScroll(euiThemeContext)}
      `,
      wrapper: css`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        ${logicalCSS('overflow-x', 'auto')}
      `,
    },
    banner: css`
      ${logicalCSSWithFallback('overflow-x', 'hidden')}
      ${highContrastModeStyles(euiThemeContext, {
        preferred: logicalCSS('border-bottom', euiTheme.border.thin),
      })}
    `,
  };
};
