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
  euiMinBreakpoint,
  euiYScroll,
  euiYScrollWithShadows,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiShadowLarge } from '../../../themes';

export const euiDataGridColumnSortingStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const maxStaticHeight = mathWithUnits(euiTheme.size.m, (x) => x * 25);
  const maxResponsiveHeight = `min(${maxStaticHeight}, 75vh)`;

  return {
    /**
     * Sorted fields
     */
    euiDataGridColumnSorting: css`
      ${logicalCSS('max-height', maxResponsiveHeight)}
      ${logicalCSS('padding-vertical', euiTheme.size.s)}

      /* Make scrollbar flush against popover panel */
      margin: -${euiTheme.size.s};
      ${euiYScrollWithShadows(euiThemeContext)}
    `,
    euiDataGridColumnSorting__item: css`
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}

      &.euiDataGridColumnSorting__item-isDragging {
        ${euiShadowLarge(euiThemeContext)}
        background-color: ${euiTheme.colors.emptyShade};
      }
    `,
    euiDataGridColumnSorting__name: css`
      ${logicalCSS('padding-right', euiTheme.size.xs)}
      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        ${logicalCSS('padding-right', euiTheme.size.l)}
      }
    `,
    euiDataGridColumnSorting__order: css`
      ${euiMinBreakpoint(euiThemeContext, 'm')} {
        ${logicalCSS(
          'min-width',
          mathWithUnits(euiTheme.size.xxl, (x) => x * 5)
        )}
      }

      .euiButtonGroup__buttons {
        border: none;
      }

      .euiButtonGroupButton {
        font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      }
    `,
    euiDataGridColumnSorting__dragHandle: css`
      ${logicalCSS('padding-right', euiTheme.size.xs)}
    `,

    /**
     * 'Pick fields to sort by' popover
     */
    euiDataGridColumnSorting__fieldList: css`
      display: flex;
      flex-direction: column;
      padding-block: ${euiTheme.size.xs};
      ${logicalCSS('max-height', maxResponsiveHeight)}
      ${euiYScroll(euiThemeContext)}
    `,
    euiDataGridColumnSorting__field: css`
      padding-block: ${euiTheme.size.xs};
      padding-inline: ${euiTheme.size.s};
      outline-offset: -${euiTheme.focus.width};
    `,
  };
};
