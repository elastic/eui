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
  euiCanAnimate,
  logicalCSS,
} from '../../../global_styling';

// Provides a solid reset and base for handling sizing layout
// Does not include any visual styles
export const euiButtonBaseCSS = () => {
  return `
    display: inline-block;
    appearance: none;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    ${logicalCSS('max-width', '100%')};
    vertical-align: middle;
  `;
};

export const euiButtonDisplayStyles = (
  { euiTheme }: UseEuiTheme,
  minWidth: string
) => {
  return {
    // Base
    euiButtonDisplay: css`
      ${euiButtonBaseCSS()};
      ${euiFontSize('s', euiTheme)};
      ${minWidth && `min-width: ${minWidth}`};

      ${euiCanAnimate} {
        transition: transform ${euiTheme.animation.fast} ease-in;
      }
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
    s: css`
      ${logicalCSS('height', euiTheme.size.xl)};
      // prevents descenders from getting cut off
      line-height: ${euiTheme.size.xl};
    `,
    m: css`
      ${logicalCSS('height', euiTheme.size.xxl)};
      // prevents descenders from getting cut off
      line-height: ${euiTheme.size.xxl};
    `,
  };
};
