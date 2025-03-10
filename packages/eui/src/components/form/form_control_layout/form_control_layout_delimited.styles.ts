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
  euiFormControlHoverStyles,
} from '../form.styles';

export const euiFormControlLayoutDelimitedStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.formVariant === 'experimental';

  const invalidStyles =
    isExperimental &&
    `
    :not(.euiFormControlLayoutDelimited__input, .euiFormControlLayoutDelimited__delimiter) {
      ${euiFormControlInvalidStyles(euiThemeContext)}
    }

    .euiFormControlLayoutDelimited__input {
      background-color: transparent;
    }
  `;

  const readOnlyStyles =
    isExperimental &&
    `
      & .euiFormControlLayoutDelimited__input {
        outline: none;  
        box-shadow: none;
      }
    `;

  const delimitedStyles =
    !isExperimental &&
    `
    /* Transition smoothly between disabled/readOnly background color changes */
    ${euiFormControlDefaultShadow(euiThemeContext, {
      withBorder: false,
      withBackground: false,
      withBackgroundAnimation: true,
    })}
  `.trim();

  const delimitedWrapperStyles = (euiThemeContext: UseEuiTheme) => {
    return (
      isExperimental &&
      `
        ${euiFormControlDefaultShadow(euiThemeContext, {
          withBorder: true,
          withBackground: false,
          withBackgroundAnimation: true,
        })}

        &:hover {
          ${euiFormControlHoverStyles(euiThemeContext)}
          box-shadow: none;

          /* using hover styling on wrapper instead of the children inputs */
          .euiFormControlLayoutDelimited__input:not(:focus) {
            outline: none;
            background-color: transparent;
          }
        }
      `.trim()
    );
  };

  return {
    // Appended onto existing `euiFormControlLayout` styles
    delimited: css(delimitedStyles),
    disabled: css(euiFormControlDisabledStyles(euiThemeContext)),
    readOnly: css`
      ${euiFormControlReadOnlyStyles(euiThemeContext)}
      ${readOnlyStyles}
    `,

    // Appended onto existing `euiFormControlLayout__childrenWrapper` styles
    childrenWrapper: {
      delimited: css`
        display: flex;

        ${delimitedWrapperStyles(euiThemeContext)}
      `,
      invalid: css(
        euiFormControlDefaultShadow(euiThemeContext, {
          withBorder: false,
          withBackgroundColor: false,
          withBackgroundAnimation: false,
        }),
        `
          ${invalidStyles}
        `
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
