/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, mathWithUnits, euiBreakpoint } from '../../global_styling';
import { euiFormVariables } from '../form/form.styles';

import { euiFilterButtonDisplay } from './filter_button.styles';

export const euiFilterGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const { backgroundColor, controlHeight, controlCompressedHeight } =
    euiFormVariables(euiThemeContext);

  const borderRadius = euiTheme.border.radius.small;

  const borderRadiusCompressed = euiTheme.border.radius.small;

  return {
    euiFilterGroup: css`
      position: relative;
      display: inline-flex;
      ${logicalCSS('max-width', '100%')}
      overflow: hidden;

      background-color: ${backgroundColor};

      /* Adds the border on a pseudo element to prevent height differences between wrapper and buttons.
      Uses ::after to ensure overlap and prevents blocking by setting pointer-events: none */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border: ${euiTheme.border.width.thin} solid
          ${euiTheme.colors.borderBasePlain};
        border-radius: inherit;
        pointer-events: none;
      }

      /* Account for popover or tooltip wrappers around EuiFilterButtons */
      > *:not(.euiFilterButton__wrapper, .euiFilterButton) {
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

        .euiPopover:focus-within {
          z-index: 1;
        }

        .euiFilterButton__wrapper {
          flex-grow: 1;
        }
      }
    `,
    fullWidth: css`
      display: flex;
    `,
    uncompressed: css`
      border-radius: ${borderRadius};

      .euiFilterButton__wrapper {
        ${logicalCSS('height', controlHeight)}
      }

      .euiFilterButton {
        ${logicalCSS('height', controlHeight)}
      }

      .euiFilterButton-isToggle {
        ${logicalCSS(
          'height',
          mathWithUnits([controlHeight, euiTheme.size.xxs], (x, y) => x - 3 * y)
        )}
      }
    `,
    compressed: css`
      border-radius: ${borderRadiusCompressed};

      .euiFilterButton {
        ${logicalCSS(
          'height',
          mathWithUnits(
            [controlCompressedHeight, euiTheme.border.width.thin],
            (x, y) => x - 2 * y
          )
        )}
      }

      .euiFilterButton-isToggle {
        ${logicalCSS(
          'height',
          mathWithUnits(
            [controlCompressedHeight, euiTheme.size.xxs],
            (x, y) => x - 3 * y
          )
        )}
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
