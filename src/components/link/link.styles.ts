/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiLinkCSS } from '../../global_styling';

const colorStyles = (color: string) => {
  return css`
    color: ${color};

    &:hover,
    &:focus,
    &:target {
      text-decoration: underline;
    }

    &:target {
      color: darken(${color}, 10%);
    }
  `;
};

export const euiLinkStyles = (_theme: UseEuiTheme) => {
  const { euiTheme } = _theme;

  return {
    euiLink: css`
      ${euiLinkCSS(_theme)}

      &[target='_blank'] {
        position: relative;
      }
    `,
    disabled: css`
      font-weight: inherit;

      &:hover {
        cursor: auto;
      }

      &:hover,
      &:focus,
      &:target {
        text-decoration: none;
      }
    `,
    button: css`
      user-select: text;
    `,
    // Color styles
    primary: css`
      ${colorStyles(euiTheme.colors.primaryText)}
    `,
    subdued: css`
      ${colorStyles(euiTheme.colors.subdued)}
    `,
    success: css`
      ${colorStyles(euiTheme.colors.successText)}
    `,
    accent: css`
      ${colorStyles(euiTheme.colors.accentText)}
    `,
    danger: css`
      ${colorStyles(euiTheme.colors.dangerText)}
    `,
    warning: css`
      ${colorStyles(euiTheme.colors.warningText)}
    `,
    ghost: css`
      ${colorStyles(euiTheme.colors.ghost)}
    `,
    text: css`
      ${colorStyles(euiTheme.colors.text)}
    `,
    euiLink__screenReaderText: css`
      left: 0;
    `,
    euiLink__externalIcon: css`
      margin-inline-start: ${euiTheme.size.xs};
    `,
  };
};
