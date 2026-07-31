/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { highContrastModeStyles } from '../../global_styling';
import { euiScreenReaderOnly } from '../accessibility';

export const euiFlyoutMenuStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFlyoutMenu__container: css`
      block-size: calc(${euiTheme.size.m} * 3.5);
      flex-shrink: 0;
      /* Keep block padding symmetric so the control row shares a center line
         with the close button, which is absolutely positioned against the
         flyout at this same offset rather than flowing in the row. */
      padding-block: ${euiTheme.size.s};
      padding-inline: ${euiTheme.size.s};
      border-block-end: ${euiTheme.border.width.thin} solid
        ${euiTheme.border.color};

      .euiTitle {
        padding-inline: ${euiTheme.size.s};
      }
    `,
    // The control row is only as tall as its tallest control by default, which
    // is all the centered layout needs. High contrast mode additionally relies
    // on it filling the container so the full-height dividers below can bleed
    // out to the container's edges.
    euiFlyoutMenu__controls: css`
      ${highContrastModeStyles(euiThemeContext, {
        preferred: 'block-size: 100%;',
      })}
    `,
    euiFlyoutMenu__spacer: css`
      padding-inline: ${euiTheme.size.m};
    `,
    // Let the wrapper hug its button so the row's `align-items: center` lines
    // actions up with the other menu bar controls. A fixed block-size here
    // would center the wrapper instead of the button it contains.
    euiFlyoutMenu__actions: css`
      align-self: center;
    `,
    euiFlyoutMenu__hiddenTitle: css`
      ${euiScreenReaderOnly()}
    `,
    euiFlyoutMenu__paginationCounter: css`
      color: ${euiTheme.colors.textSubdued};
      white-space: nowrap;
    `,
    // Compact vertical line separating control groups in the menu bar, e.g.
    // built-in controls from leading/trailing actions. Uses a border rather
    // than a background so the line stays visible in Windows high contrast
    // themes. `align-self` keeps the shortened line centered regardless of the
    // containing flex group's alignment. The inline margin matches the
    // container's inline padding so the space a group has against a divider
    // reads the same as the space it has against the menu bar's outer edge.
    euiFlyoutMenu__divider: css`
      align-self: center;
      inline-size: 0;
      block-size: ${euiTheme.size.l};
      margin-inline: ${euiTheme.size.s};
      border-inline-start: ${euiTheme.border.thin};
      pointer-events: none;

      ${highContrastModeStyles(euiThemeContext, {
        // High contrast themes lean on stronger group boundaries, so the line
        // runs the full height of the menu bar instead of being shortened.
        // Stretching to the control row and bleeding back over the container's
        // block padding takes it from the top edge to the bottom border.
        preferred: `
          align-self: stretch;
          block-size: auto;
          margin-block: -${euiTheme.size.s};
        `,
      })}
    `,
  };
};
