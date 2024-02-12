/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiFontSize,
  euiPaddingSize,
  EuiPaddingSize,
  logicalCSS,
  logicalShorthandCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiPopoverFooterStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPopoverFooter: css`
      ${euiFontSize(euiThemeContext, 's')}
      ${logicalCSS('border-top', euiTheme.border.thin)}
    `,
    // If the popover's containing panel has padding applied,
    // ensure the title expands to cover that padding via negative margins
    panelPaddingSizes: {
      none: css``,
      xs: css`
        ${panelPaddingOffset(euiThemeContext, 'xs')}
      `,
      s: css`
        ${panelPaddingOffset(euiThemeContext, 's')}
      `,
      m: css`
        ${panelPaddingOffset(euiThemeContext, 'm')}
      `,
      l: css`
        ${panelPaddingOffset(euiThemeContext, 'l')}
      `,
      xl: css`
        ${panelPaddingOffset(euiThemeContext, 'xl')}
      `,
    },
  };
};

export const panelPaddingOffset = (
  euiThemeContext: UseEuiTheme,
  size: EuiPaddingSize
) => {
  const panelPaddingSize = euiPaddingSize(euiThemeContext, size);

  return logicalShorthandCSS(
    'margin',
    `${panelPaddingSize} -${panelPaddingSize} -${panelPaddingSize}`
  );
};
