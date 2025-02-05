/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiCallOutStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCallOut: css`
      position: relative;
    `,
    hasDismissButton: {
      // Ensure that only the top-most (first-child) title or child text
      // has a padding-right on it (to account for the dismiss button)
      hasDimissButton: css`
        & > :first-child:is(.euiTitle),
        & > :first-child:is(.euiText) > :first-child {
          ${logicalCSS('padding-right', euiTheme.size.base)}
        }
      `,
      // Ensure the callout always has enough height for the button
      s: css`
        ${logicalCSS('min-height', euiTheme.size.xl)}
      `,
      m: css`
        ${logicalCSS('min-height', euiTheme.size.xxl)}
      `,
    },
    dismissButton: {
      euiCallOut__dismissButton: css`
        position: absolute;
      `,
      s: css`
        ${logicalCSS('top', euiTheme.size.xs)}
        ${logicalCSS('right', euiTheme.size.xs)}
      `,
      m: css`
        ${logicalCSS('top', euiTheme.size.s)}
        ${logicalCSS('right', euiTheme.size.s)}
      `,
    },
  };
};

export const euiCallOutHeaderStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCallOutHeader: css`
      font-weight: ${euiTheme.font.weight.medium};
      ${logicalCSS(
        'margin-bottom',
        '0 !important'
        // In case it's nested inside EuiText
      )}
    `,
    primary: css`
      color: ${euiTheme.colors.primaryText};
    `,
    success: css`
      color: ${euiTheme.colors.successText};
    `,
    warning: css`
      color: ${euiTheme.colors.warningText};
    `,
    danger: css`
      color: ${euiTheme.colors.dangerText};
    `,
    accent: css`
      color: ${euiTheme.colors.accentText};
    `,
    euiCallOut__icon: css`
      position: relative;
      ${logicalCSS('top', '-1px')}
      ${logicalCSS('margin-right', euiTheme.size.s)}
    `,
  };
};
