/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../services';
import { logicalCSS, mathWithUnits } from '../../global_styling';
import {
  highContrastModeStyles,
  preventForcedColors,
} from '../../global_styling/functions/high_contrast';
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

      ${highContrastModeStyles(euiThemeContext, {
        preferred: `border: ${euiTheme.border.thin};`,
        forced: preventForcedColors(euiThemeContext),
      })}
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

      ${euiRangeThumbPerBrowser(`
        ${euiRangeThumbStyle(euiThemeContext)}
        border-width: ${thumbBorder};

        ${highContrastModeStyles(euiThemeContext, {
          none: `
            background-color: transparent;
            box-shadow: ${thumbBoxShadow};
          `,
          preferred: `
            background-color: ${euiTheme.colors.ghost};
            border: ${thumbBorder} solid ${euiTheme.colors.ink};
            box-shadow: none;
          `,
        })}
      `)}

      /* Remove wrapping outline and show focus on thumb only */
      &:focus {
        outline: none;
      }

      ${highContrastModeStyles(euiThemeContext, {
        none: `
          &:focus-visible {
            ${euiRangeThumbPerBrowser(
              euiRangeThumbFocusBoxShadow(euiThemeContext)
            )}
          }
        `,
        preferred: `
          &:focus {
            ${euiRangeThumbPerBrowser(`
              outline: ${euiTheme.border.width.thin} solid ${euiTheme.colors.ink};
              outline-offset: 0;
            `)}
          }
        `,
      })}
    `,
  };
};
