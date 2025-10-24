/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, mathWithUnits } from '../../../global_styling';
import {
  euiFormControlDisabledStyles,
  euiFormControlReadOnlyStyles,
  euiFormControlDefaultShadow,
  euiFormControlInvalidStyles,
  euiFormControlHoverStyles,
  euiFormVariables,
} from '../form.styles';

export const euiFormControlLayoutDelimitedStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { highContrastMode } = euiThemeContext;

  const form = euiFormVariables(euiThemeContext);

  const delimitedStyles = `
      /* Transition smoothly between disabled/readOnly background color changes */
      ${euiFormControlDefaultShadow(euiThemeContext, {
        withBorder: !highContrastMode ? true : false,
        withBackground: false,
      })}
    `.trim();

  return {
    // Appended onto existing `euiFormControlLayout` styles
    delimited: css(delimitedStyles),
    disabled: css(euiFormControlDisabledStyles(euiThemeContext)),
    readOnly: css`
      ${euiFormControlReadOnlyStyles(euiThemeContext)}

      & .euiFormControlLayoutDelimited__input {
        --euiFormControlStateColor: transparent;

        outline: none;
        box-shadow: none;
      }
    `,

    // Appended onto existing `euiFormControlLayout__childrenWrapper` styles
    childrenWrapper: {
      delimited: css`
        display: flex;

        ${euiFormControlDefaultShadow(euiThemeContext, {
          withBorder: !highContrastMode,
          withBackground: false,
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

        /* adjust for delimited behavior differing from default form layout */
        > :first-child {
          ${logicalCSS('border-top-left-radius', 'inherit')}
          ${logicalCSS('border-bottom-left-radius', 'inherit')}
        }

        > :last-child {
          ${logicalCSS('border-top-right-radius', 'inherit')}
          ${logicalCSS('border-bottom-right-radius', 'inherit')}
        }
      `,
      invalid: css(
        euiFormControlDefaultShadow(euiThemeContext, {
          withBorder: false,
          withBackgroundColor: false,
        }),
        `
          :not(.euiFormControlLayoutDelimited__input, .euiFormControlLayoutDelimited__delimiter) {
            ${euiFormControlInvalidStyles(euiThemeContext)}
          }

          &:focus-within {
            --euiFormControlStateColor: ${form.borderColor};
            --euiFormControlStateHoverColor: ${form.borderHovered};
          }

          .euiFormControlLayoutDelimited__input {
            background-color: transparent;
          }
        `
      ),
      readOnly: css``,
    },
  };
};

export const euiFormControlLayoutDelimited__delimiter = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return css`
    display: flex;
    align-self: stretch;
    flex-grow: 0;
    align-items: center;
    line-height: 1; /* Override EuiText line-height */

    ${logicalCSS(
      'padding-horizontal',
      mathWithUnits([euiTheme.size.xs, euiTheme.size.xxs], (x, y) => x + y)
    )}
  `;
};

export const euiFormControlLayoutDelimited__input = css`
  box-shadow: none;
  border: none; /* Account for high contrast mode borders */
  text-align: center;
  ${logicalCSS('height', '100%')}
`;
