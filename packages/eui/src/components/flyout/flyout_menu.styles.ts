/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiScreenReaderOnly } from '../accessibility';

export const euiFlyoutMenuStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  return {
    euiFlyoutMenu__container: css`
      block-size: calc(${euiTheme.size.m} * 3.5);
      flex-shrink: 0;
      padding-block: ${euiTheme.size.s};
      padding-inline: ${euiTheme.size.s};
      border-block-end: ${euiTheme.border.width.thin} solid
        ${euiTheme.border.color};
      padding-block-start: calc(${euiTheme.size.m} * 0.8);

      .euiTitle {
        padding-inline: ${euiTheme.size.s};
      }
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
    // containing flex group's alignment.
    euiFlyoutMenu__divider: css`
      align-self: center;
      inline-size: 0;
      block-size: ${euiTheme.size.l};
      margin-inline: ${euiTheme.size.xs};
      border-inline-start: ${euiTheme.border.thin};
      pointer-events: none;
    `,
  };
};
