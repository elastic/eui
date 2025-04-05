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
  logicalTextAlignCSS,
} from '../../../global_styling';
import { euiButtonSizeMap } from '../../../global_styling/mixins';
import { EuiButtonDisplaySizes } from './_button_display';

// Provides a solid reset and base for handling sizing layout
// Does not include any visual styles
export const euiButtonBaseCSS = () => {
  return `
    display: inline-block;
    appearance: none;
    cursor: pointer;
    ${logicalTextAlignCSS('center')};
    white-space: nowrap;
    ${logicalCSS('max-width', '100%')};
    vertical-align: middle;
  `;
};

export const euiButtonDisplayStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';
  const sizes = euiButtonSizeMap(euiThemeContext);

  const _buttonSize = (sizeKey: EuiButtonDisplaySizes) => {
    const size = sizes[sizeKey];
    return css`
      ${logicalCSS('height', size.height)}
      line-height: ${size.height}; /* Prevents descenders from getting cut off */
      ${euiFontSize(euiThemeContext, size.fontScale)}
      border-radius: ${isExperimental
        ? euiTheme.border.radius.small
        : size.radius};
    `;
  };

  const defaultStyles =
    !isExperimental &&
    `
      &:hover:not(:disabled),
      &:focus {
        text-decoration: underline;
      }
  `;

  return {
    // Base
    euiButtonDisplay: css`
      ${euiButtonBaseCSS()}
      font-weight: ${euiTheme.font.weight.medium};
      ${logicalShorthandCSS('padding', `0 ${euiTheme.size.m}`)}
      ${defaultStyles}
    `,
    // States
    isDisabled: css`
      cursor: not-allowed;
    `,
    fullWidth: css`
      display: block;
      ${logicalCSS('width', '100%')}
    `,
    defaultMinWidth: {
      defaultMinWidth: css``,
      xs: css`
        ${logicalCSS('min-width', `${sizes.xs.minWidth}px`)}
      `,
      s: css`
        ${logicalCSS('min-width', `${sizes.s.minWidth}px`)}
      `,
      m: css`
        ${logicalCSS('min-width', `${sizes.m.minWidth}px`)}
      `,
    },
    // Sizes
    xs: css(_buttonSize('xs')),
    s: css(_buttonSize('s')),
    m: css(_buttonSize('m')),
  };
};
