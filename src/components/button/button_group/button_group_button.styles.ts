/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  UseEuiTheme,
} from '../../../services';
import {
  euiOutline,
} from '../../../global_styling';
import {
  euiButtonFillColor,
  _EuiButtonColor,
} from '../../../themes/amsterdam/global_styling/mixins/button';

/**
 * Focus utilities - made complex by the two different button styles
 * and the fact that `label`/`input` combos need :focus-within,
 * but `button` does not
 */
const _outlineSelectors = (outlineCss: string) => {
  return css`
    &:is(button) {
      &:focus-visible {
        ${outlineCss}
      }
    }

    &:is(label) {
      /* Firefox fallback for :has. Delete once FF supports :has */
      &:focus-within {
        ${outlineCss}
      }

      @supports selector(:has(*)) {
        &:focus-within {
          outline: none;
        }
        /* Once all evergreen browsers support :has, we can remove
           @supports and the outline: none reset just use this selector */
        &:has(:focus-visible) {
          ${outlineCss}
        }
      }
    }
  `;
};

export const _compressedButtonFocusColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor | 'disabled'
) => {
  const { euiTheme } = euiThemeContext;
  const { backgroundColor } = euiButtonFillColor(euiThemeContext, color);

  return _outlineSelectors(
    `outline: ${euiTheme.focus.width} solid ${backgroundColor};`
  );
};

export const _uncompressedButtonFocus = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return _outlineSelectors(
    euiOutline(euiThemeContext, 'inset', euiTheme.colors.fullShade)
  );
};
