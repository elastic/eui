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
  logicalShorthandCSS,
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

export const euiButtonDisplayStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiButtonDisplay: css`
      ${euiButtonBaseCSS()};
      font-weight: ${euiTheme.font.weight.medium};
      ${logicalShorthandCSS('padding', `0 ${euiTheme.size.m}`)}

      &:hover:not(:disabled),
      &:focus {
        text-decoration: underline;
      }
    `,
    // States
    isDisabled: css`
      cursor: not-allowed;
    `,
    fullWidth: css`
      display: block;
      ${logicalCSS('width', '100%')}
    `,
    defaultMinWidth: css`
      ${logicalCSS('min-width', `${euiTheme.base * 7}px`)}
    `,
    // Sizes
    xs: css(_buttonSize(euiTheme.size.l), euiFontSize(euiThemeContext, 'xs')),
    s: css(_buttonSize(euiTheme.size.xl), euiFontSize(euiThemeContext, 's')),
    m: css(_buttonSize(euiTheme.size.xxl), euiFontSize(euiThemeContext, 's')),
  };
};
