/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';

export const euiColorPickerStyles = (euiThemeContext: UseEuiTheme) => {
  const euiTheme = euiThemeContext.euiTheme;

  // 5 columns of swatches + margins + border
  const colorPickerWidth = mathWithUnits(
    [euiTheme.size.l, euiTheme.size.s],
    (x, y) => x * 5 + y * 4
  );

  return {
    euiColorPicker: css`
      position: relative;
      ${logicalCSS('width', colorPickerWidth)}

      /* Using flex and gap allows us to easily handle spacing between multiple modes + showAlpha */
      display: flex;
      flex-direction: column;
      gap: ${euiTheme.size.s};
    `,

    euiColorPicker__swatches: css`
      display: flex;
      flex-wrap: wrap;
      gap: ${euiTheme.size.s};
    `,

    euiColorPicker__alphaRange: css`
      .euiRangeInput {
        ${logicalCSS('min-width', 0)}
      }
    `,

    // Adds a stroke color for the swatchInput icon. Unlike most EuiIcons it has a stroke in the SVG
    // Targets a custom className applied directly to the <svg> icon
    euiColorPicker__swatchInputIcon: css`
      .euiSwatchInput__stroke {
        fill: none;
        stroke: ${euiTheme.colors.borderBaseFormsColorSwatch};
      }
    `,
  };
};
