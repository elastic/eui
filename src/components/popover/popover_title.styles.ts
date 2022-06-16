/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  EuiPaddingSize,
  euiPaddingSize,
  logicalCSS,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiTitle } from '../title/title.styles';

export const euiPopoverTitleStyles = (
  euiThemeContext: UseEuiTheme,
  panelPadding: EuiPaddingSize
) => {
  const { euiTheme } = euiThemeContext;
  // If the popover's containing panel has padding applied,
  // ensure the title expands to cover that padding and
  const panelPaddingSize = euiPaddingSize(euiThemeContext, panelPadding);

  return {
    // Base
    euiPopoverTitle: css`
      ${euiTitle(euiThemeContext, 'xxs')};
      ${logicalCSS('border-bottom', euiTheme.border.thin)};
      // Negative margins for panel padding
      margin: -${panelPaddingSize} -${panelPaddingSize} ${panelPaddingSize};
    `,
  };
};
