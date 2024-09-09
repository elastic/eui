/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';
import {
  euiRangeThumbPerBrowser,
  euiRangeThumbStyle,
  euiRangeThumbFocusBoxShadow,
} from '../form/range/range.styles';

export const euiHueStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const height = euiTheme.size.m;
  const thumbSize = euiTheme.size.l;
  const thumbBorder = mathWithUnits(
    euiTheme.border.width.thick,
    (x) => x * 1.5
  );
  const thumbBoxShadow = `
    0 2px 2px -1px ${transparentize(euiTheme.colors.shadow, 0.2)},
    0 1px 5px -2px ${transparentize(euiTheme.colors.shadow, 0.2)}`;

  return {
    // This wraps the range and sets a rainbow gradient,
    // which allows the range thumb to be larger than the visible track
    euiHue: css`
      ${logicalCSS('height', height)}
      border-radius: ${height};
      /* stylelint-disable color-no-hex */
      background: linear-gradient(
        to right,
        #ff3232 0%,
        #fff130 20%,
        #45ff30 35%,
        #28fff0 52%,
        #282cff 71%,
        #ff28fb 88%,
        #ff0094 100%
      );
      /* stylelint-enable color-no-hex */
    `,

    euiHue__range: css`
      ${logicalCSS('height', thumbSize)}
      /* Allow for overlap */
      ${logicalCSS('width', `calc(100% + 2px)`)}
      /* Use ^ overlap to allow thumb to fully cover gradient ends */
      ${logicalCSS('margin-horizontal', '-1px')}
      ${logicalCSS(
        'margin-top',
        mathWithUnits(height, (x) => x / -2)
      )}

      /* Resets for the range */
      appearance: none;
      background: transparent;

      /* stylelint-disable property-no-vendor-prefix */
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
      }
      /* stylelint-enable property-no-vendor-prefix */

      /* Indicator styles - for some incredibly bizarre reason, stylelint is unhappy about
         the semicolons here and can't be stylelint-disabled, hence the syntax workaround */
      ${euiRangeThumbPerBrowser(
        [
          euiRangeThumbStyle(euiThemeContext),
          'background-color: inherit',
          `border-width: ${thumbBorder}`,
          'border-radius: 100%',
          `box-shadow: ${thumbBoxShadow}`,
        ].join(';\n')
      )}

      /* Remove wrapping outline and show focus on thumb only */
      &:focus {
        outline: none;
      }

      &:focus-visible {
        ${euiRangeThumbPerBrowser(euiRangeThumbFocusBoxShadow(euiThemeContext))}
      }
    `,
  };
};
