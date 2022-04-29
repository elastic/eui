/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { euiLinkMixin } from '../../global_styling';
import { EuiLinkColor } from './';

const colorStyles = (color: string) => {
  return css`
    color: ${color};

    &:target {
      color: darken(${color}, 10%);
    }
  `;
};

//fix broken disabled styles
export const euiLinkStyles = (color: EuiLinkColor, _theme: UseEuiTheme) => {
  const { euiTheme } = _theme;

  return {
    euiLink: css`
      ${euiLinkMixin()}

      &[target='_blank'] {
        position: relative;
      }
    `,
    screenReaderOnly: css`
      left: 0;
    `,
    externalIcon: css`
      margin-left: ${euiTheme.size.xs};
    `,
    disabled: css`
      cursor: default;
      font-weight: inherit;
      text-decoration: none;
    `,
    buttonText: css`
      user-select: text;
    `,
    // Colors
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
  };
};
