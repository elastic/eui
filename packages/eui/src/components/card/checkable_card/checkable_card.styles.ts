/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiCanAnimate,
  euiPaddingSize,
  logicalCSS,
  logicals,
} from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const euiCheckableCardStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const padding = euiPaddingSize(euiThemeContext, 'm');

  return {
    euiCheckableCard: css`
      ${euiCanAnimate} {
        transition: border-color ${euiTheme.animation.normal} ease-in;
      }
    `,

    isChecked: css`
      border-color: ${euiTheme.colors.primary};
    `,

    label: {
      euiCheckableCard__label: css`
        cursor: pointer;
        /* Expand the label to cover the whole panel for easier click target */
        display: block;
        ${logicals.width}: calc(100% + (${padding} * 2));
        padding: ${padding};
        margin: -${padding};
      `,

      isDisabled: css`
        color: ${euiTheme.colors.disabledText};
        cursor: not-allowed;
      `,
    },

    euiCheckableCard__children: css`
      ${logicalCSS('margin-top', euiTheme.size.base)}
    `,
  };
};
