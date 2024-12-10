/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits, euiBreakpoint } from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
import { euiFormVariables } from '../form/form.styles';

import { euiFilterButtonDisplay } from './filter_button.styles';

export const euiFilterGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const {
    backgroundColor,
    borderColor,
    controlBorderRadius,
    controlCompressedBorderRadius,
    controlCompressedHeight,
  } = euiFormVariables(euiThemeContext);

  return {
    euiFilterGroup: css`
      display: inline-flex;
      ${logicalCSS('max-width', '100%')}
      overflow: hidden;

      background-color: ${backgroundColor};
      ${highContrastModeStyles(euiThemeContext, {
        none: `box-shadow: inset 0 0 0 ${euiTheme.border.width.thin} ${borderColor};`,
        forced: `border: ${euiTheme.border.thin};`,
      })}

      /* Account for popover or tooltip wrappers around EuiFilterButtons */
      > *:not(.euiFilterButton) {
        ${euiFilterButtonDisplay(euiThemeContext)}
      }
      /* Force popover anchors to expand */
      .euiPopover > .euiFilterButton {
        ${logicalCSS('width', '100%')}
      }

      ${euiBreakpoint(euiThemeContext, ['xs', 's'])} {
        flex-wrap: wrap;
      }
      ${euiBreakpoint(euiThemeContext, ['xs'])} {
        /* Force all tiny screens to take up the entire width */
        display: flex;

        .euiFilterButton {
          flex-grow: 1;
        }
      }
    `,
    fullWidth: css`
      display: flex;
    `,
    uncompressed: css`
      border-radius: ${controlBorderRadius};
      ${buttonChildrenBorderRadii(controlBorderRadius)}
    `,
    compressed: css`
      border-radius: ${controlCompressedBorderRadius};
      ${buttonChildrenBorderRadii(controlCompressedBorderRadius)}

      .euiFilterButton {
        ${logicalCSS('height', controlCompressedHeight)}
      }
    `,
    /**
     * Not used in EuiFilterGroup directly, but used by EuiSearchBar and consumers
     * A fixed width is required because of the shift in widths that can be caused
     * by the loading animation that precedes the results.
     */
    euiFilterGroup__popoverPanel: css`
      ${logicalCSS(
        'width',
        mathWithUnits(euiTheme.size.base, (x) => x * 18)
      )}
    `,
  };
};

/**
 * Small util for manually rounding the borders of the first and last EuiFilterButtons
 * - this makes their focus rings appear nicely instead of being cutt off.
 * 2nd selector accounts for EuiFilterButtons nested within popover/tooltip wrappers.
 *
 * NOTE: Do not use `logicalShorthandCSS()` here, as that will cause single buttons to not be rounded
 */
const buttonChildrenBorderRadii = (
  radiusSize: CSSProperties['borderRadius']
) => `
  > :first-child,
  > :first-child .euiFilterButton {
    ${logicalCSS('border-top-left-radius', radiusSize)}
    ${logicalCSS('border-bottom-left-radius', radiusSize)}
  }

  > :last-child,
  > :last-child .euiFilterButton {
    ${logicalCSS('border-top-right-radius', radiusSize)}
    ${logicalCSS('border-bottom-right-radius', radiusSize)}
  }
`;
