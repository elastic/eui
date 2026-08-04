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
      /* Symmetric padding aligns the control row with the absolutely-positioned close button. */
      padding-block: ${euiTheme.size.s};
      padding-inline: ${euiTheme.size.s};
      border-block-end: ${euiTheme.border.width.thin} solid
        ${euiTheme.border.color};

      .euiTitle {
        padding-inline: ${euiTheme.size.s};
      }
    `,
    // Full height in high contrast mode so dividers can bleed to the container edges.
    euiFlyoutMenu__controls: css`
      ${highContrastModeStyles(euiThemeContext, {
        preferred: 'block-size: 100%;',
      })}
    `,
    euiFlyoutMenu__spacer: css`
      padding-inline: ${euiTheme.size.m};
    `,
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
    // Border (not background) keeps the line visible in Windows high contrast themes.
    euiFlyoutMenu__divider: css`
      align-self: center;
      inline-size: 0;
      block-size: ${euiTheme.size.l};
      margin-inline: ${euiTheme.size.s};
      border-inline-start: ${euiTheme.border.thin};
      pointer-events: none;

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `
          align-self: stretch;
          block-size: auto;
          margin-block: -${euiTheme.size.s};
        `,
      })}
    `,
  };
};
