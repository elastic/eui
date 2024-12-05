/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiFontSize } from '../../../global_styling';

export const euiPalettePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  return {
    euiColorPalettePicker__itemTitleGroup: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: ${euiTheme.size.xs};
    `,

    euiColorPalettePicker__itemTag: css`
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
    `,
  };
};
