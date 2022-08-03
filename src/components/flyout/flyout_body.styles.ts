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
  euiYScrollWithShadows,
  euiOverflowShadowStyles,
  logicalCSS,
} from '../../global_styling';
import { EuiFlyoutPaddingSize } from './flyout_types';
import { getFlyoutPadding } from './flyout_helpers';

export const euiFlyoutBodyStyles = (
  paddingSize: EuiFlyoutPaddingSize,
  euiThemeContext: UseEuiTheme
) => {
  return {
    euiFlyoutBody: css`
      flex-grow: 1;
      overflow-y: hidden;
      height: 100%;
    `,
    overflow: css`
      ${euiYScrollWithShadows(euiThemeContext)};
    `,
    'overflow-bodyPadding': css`
      padding: ${getFlyoutPadding(paddingSize, euiThemeContext)};
    `,
    'overflow--hasBanner': css`
      ${euiOverflowShadowStyles(euiThemeContext, {
        direction: 'y',
        side: 'end',
      })};
    `,
    banner: css`
      overflow-x: hidden;
      .euiCallOut {
        border: none; // Remove border from callout when it is a flyout banner
        border-radius: 0; // Ensures no border-radius in all themes
        ${logicalCSS(
          'padding-horizontal',
          getFlyoutPadding(paddingSize, euiThemeContext)
        )}
      }
    `,
  };
};
