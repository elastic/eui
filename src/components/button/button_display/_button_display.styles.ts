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
  logicalCSS,
  logicalTextAlignStyle,
} from '../../../global_styling';

// Provides a solid reset and base for handling sizing layout
// Does not include any visual styles
export const euiButtonBaseCSS = () => {
  return `
    display: inline-block;
    appearance: none;
    cursor: pointer;
    ${logicalTextAlignStyle('center')};
    white-space: nowrap;
    ${logicalCSS('max-width', '100%')};
    vertical-align: middle;
  `;
};

const _buttonSize = (size: string) => {
  return `
    ${logicalCSS('height', size)};
    // prevents descenders from getting cut off
    line-height: ${size};
  `;
};

export const euiButtonDisplayStyles = (
  euiThemeContext: UseEuiTheme,
  minWidth: string
) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiButtonDisplay: css`
      ${euiButtonBaseCSS()};
      ${minWidth && logicalCSS('min-width', minWidth)};
    `,
    // States
    isDisabled: css`
      cursor: not-allowed;
    `,
    fullWidth: css`
      display: block;
      width: 100%;
    `,
    // Sizes
    xs: css(_buttonSize(euiTheme.size.l), euiFontSize(euiThemeContext, 'xs')),
    s: css(_buttonSize(euiTheme.size.xl), euiFontSize(euiThemeContext, 's')),
    m: css(_buttonSize(euiTheme.size.xxl), euiFontSize(euiThemeContext, 's')),
  };
};
