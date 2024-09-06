/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  euiFontSize,
  euiTextTruncate,
  logicalCSS,
  logicalCSSWithFallback,
  logicalTextAlignCSS,
} from '../../../global_styling';
import { euiFormControlStyles, euiFormVariables } from '../form.styles';

export const euiSuperSelectStyles = {
  euiSuperSelect__listbox: css`
    ${logicalCSS('max-height', '300px')}
    ${logicalCSSWithFallback('overflow-y', 'auto')}
    ${logicalCSSWithFallback('overflow-x', 'hidden')}
  `,
};

export const euiSuperSelectItemStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSuperSelect__item: css`
      padding: ${euiTheme.size.s};
      ${euiFontSize(euiThemeContext, 's')}
    `,
    hasDividers: css`
      &:not(:last-of-type) {
        ${logicalCSS('border-bottom', euiTheme.border.thin)}
      }
    `,
  };
};

export const euiSuperSelectControlStyles = (euiThemeContext: UseEuiTheme) => {
  const formStyles = euiFormControlStyles(euiThemeContext);
  const formVariables = euiFormVariables(euiThemeContext);

  return {
    euiSuperSelect__control: css`
      ${formStyles.shared}
      display: block; /* Makes sure the height is correct when there's no selection */
      ${logicalTextAlignCSS('left')}
      ${euiTextTruncate(
        '' // maxWidth is already set by width modifiers below
      )}

      &:focus {
        ${formStyles.focus}
      }
    `,
    // Since the control is a button and not an actual input, we have to set
    // certain state styles manually instead of relying on CSS selectors
    open: css`
      /* Also show focus indicator when the dropdown is open */
      ${formStyles.focus}
    `,
    invalid: css`
      ${formStyles.invalid}
    `,
    disabled: css`
      ${formStyles.disabled}
    `,
    readOnly: css`
      ${formStyles.readOnly}
    `,

    // Skip the css() on the default height to avoid generating a className
    uncompressed: `
      ${formStyles.uncompressed}
      /* Match line height with inputs */
      ${logicalCSS('padding-vertical', 0)}
      line-height: ${formVariables.controlHeight};
    `,
    compressed: css`
      ${formStyles.compressed}
      /* Match line height with inputs */
      ${logicalCSS('padding-vertical', 0)}
      line-height: ${formVariables.controlCompressedHeight};
    `,

    // Skip the css() on the default width to avoid generating a className
    formWidth: formStyles.formWidth,
    fullWidth: css(formStyles.fullWidth),

    // Layout modifiers
    inGroup: css(formStyles.inGroup),

    // Children
    euiSuperSelect__placeholder: css`
      color: ${formVariables.controlPlaceholderText};
    `,
  };
};
