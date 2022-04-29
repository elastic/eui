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

//split out as named objects like caroline and docs suggest
const colorStyles = (color: EuiLinkColor, { euiTheme }: UseEuiTheme) => {
  const colorsToVarMap: { [color in EuiLinkColor]: string } = {
    primary: euiTheme.colors.primaryText,
    subdued: euiTheme.colors.subdued,
    success: euiTheme.colors.successText,
    accent: euiTheme.colors.accentText,
    danger: euiTheme.colors.dangerText,
    warning: euiTheme.colors.warningText,
    ghost: euiTheme.colors.ghost,
    text: euiTheme.colors.text,
  };

  return css`
    color: ${colorsToVarMap[color]};

    &:target {
      color: darken(${colorsToVarMap[color]}, 10%);
    }
  `;
};

//fix broken disabled styles
export const euiLinkStyles = (color: EuiLinkColor, _theme: UseEuiTheme) => {
  const { euiTheme } = _theme;

  return {
    euiLink: css`
      ${euiLinkMixin()}
      ${colorStyles(color, _theme)}

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
  };
};
