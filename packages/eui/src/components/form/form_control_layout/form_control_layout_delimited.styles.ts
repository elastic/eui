/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';
import {
  euiFormControlDisabledStyles,
  euiFormControlReadOnlyStyles,
  euiFormControlDefaultShadow,
  euiFormControlInvalidStyles,
} from '../form.styles';

export const euiFormControlLayoutDelimitedStyles = (
  euiThemeContext: UseEuiTheme
) => {
  return {
    // Appended onto existing `euiFormControlLayout` styles
    delimited: css(
      // Transition smoothly between disabled/readOnly background color changes
      euiFormControlDefaultShadow(euiThemeContext, {
        withBorder: false,
        withBackground: false,
        withBackgroundAnimation: true,
      })
    ),
    disabled: css(euiFormControlDisabledStyles(euiThemeContext)),
    readOnly: css(euiFormControlReadOnlyStyles(euiThemeContext)),

    // Appended onto existing `euiFormControlLayout__childrenWrapper` styles
    childrenWrapper: {
      delimited: css`
        display: flex;
      `,
      invalid: css(
        euiFormControlDefaultShadow(euiThemeContext, {
          withBorder: false,
          withBackgroundColor: false,
          withBackgroundAnimation: false,
        }),
        euiFormControlInvalidStyles(euiThemeContext)
      ),
    },
  };
};

export const euiFormControlLayoutDelimited__delimiter = css`
  align-self: stretch;
  flex-grow: 0;
  display: flex;
  align-items: center;
  line-height: 1; /* Override EuiText line-height */
`;

export const euiFormControlLayoutDelimited__input = css`
  box-shadow: none;
  border: none; /* Account for high contrast mode borders */
  border-radius: 0;
  text-align: center;
  ${logicalCSS('height', '100%')}
`;
