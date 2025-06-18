/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import {
  euiFontSize,
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';

export const euiDataGridVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    cellPadding: {
      s: euiTheme.size.xs,
      m: mathWithUnits(euiTheme.size.m, (x) => x / 2),
      l: euiTheme.size.s,
    },
    lineHeight: {
      s: euiFontSize(euiThemeContext, 'xs').lineHeight,
      m: euiFontSize(euiThemeContext, 'm').lineHeight,
    },
    fontSize: {
      s: euiFontSize(euiThemeContext, 'xs').fontSize,
      m: euiFontSize(euiThemeContext, 's').fontSize,
    },
    levels: {
      cellPopover: Number(euiTheme.levels.header), // Same z-index as EuiFlyout mask overlays - cell popovers should be under both modal and flyout overlays
      get stickyHeader() {
        return this.cellPopover - 1; // Needs to sit above the content + cell focus outlines/actions, but below actual popovers
      },
    },
  };
};

export const euiDataGridStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const { cellPadding, lineHeight, fontSize } =
    euiDataGridVariables(euiThemeContext);

  const borderColors = {
    default: highContrastMode
      ? euiTheme.border.color
      : euiTheme.components.dataGridBorderColor,
    vertical: highContrastMode
      ? euiTheme.border.color
      : euiTheme.components.dataGridVerticalLineBorderColor,
  };
  const border = `${euiTheme.border.width.thin} solid ${borderColors.default}`;

  return {
    euiDataGrid: css`
      display: flex;
      flex-direction: column;
      align-items: stretch;
      ${logicalCSS('height', '100%')}
      overflow: hidden;

      /* Note: Several Kibana custom renderers are using the .euiDataGridRow classes
       * directly for styles, hence why we're defining it here as opposed to applying
       * it directly on the row element via Emotion. However, we also need to use
       * :where to reduce specificity / allow easier overrides via rowClasses */

      *:where(& .euiDataGridRow) {
        background-color: ${euiTheme.components.dataGridRowBackground};
      }

      *:where(&.euiDataGrid--rowHoverHighlight .euiDataGridRow:hover) {
        background-color: ${euiTheme.components.dataGridRowBackgroundHover};
      }

      /* The euiDataGridRow--selected class is not used internally,
       * it's there for convenience, to be used by consumers */

      *:where(& .euiDataGridRow--selected) {
        background-color: ${euiTheme.components.dataGridRowBackgroundSelect};
      }

      *:where(
          &.euiDataGrid--rowHoverHighlight .euiDataGridRow--selected:hover
        ) {
        background-color: ${euiTheme.components
          .dataGridRowBackgroundSelectHover};
      }

      /* Stripes */

      *:where(&.euiDataGrid--stripes .euiDataGridRow) {
        background-color: ${euiTheme.components.dataGridRowStripesBackground};
      }

      *:where(&.euiDataGrid--stripes .euiDataGridRow--striped) {
        background-color: ${euiTheme.components
          .dataGridRowStripesBackgroundStriped};
      }

      *:where(
          &.euiDataGrid--stripes.euiDataGrid--rowHoverHighlight
            .euiDataGridRow:hover
        ) {
        background-color: ${euiTheme.components
          .dataGridRowStripesBackgroundHover};
      }

      *:where(
          &.euiDataGrid--stripes.euiDataGrid--rowHoverHighlight
            .euiDataGridRow--striped:hover
        ) {
        background-color: ${euiTheme.components
          .dataGridRowStripesBackgroundStripedHover};
      }

      *:where(&.euiDataGrid--stripes .euiDataGridRow--selected) {
        background-color: ${euiTheme.components
          .dataGridRowStripesBackgroundSelect};
      }

      *:where(
          &.euiDataGrid--stripes.euiDataGrid--rowHoverHighlight
            .euiDataGridRow--selected:hover
        ) {
        background-color: ${euiTheme.components
          .dataGridRowStripesBackgroundSelectHover};
      }

      /* Hover colors are semitransparent and .euiDataGrid__content has
       * no background color anymore (see https://github.com/elastic/eui/pull/8220),
       * so we add this "safety" background to the row to ensure 
       * hover colors display as expected */

      *:where(&.euiDataGrid--rowHoverHighlight .euiDataGridRow)::before {
        content: '';
        position: absolute;
        z-index: -1;
        pointer-events: none;
        inset: 0;
        background-color: ${euiTheme.components.dataGridRowBackground};
      }
    `,
    cellPadding: {
      cellPadding: (size: 's' | 'm' | 'l') => css`
        .euiDataGridHeaderCell,
        .euiDataGridRowCell__content {
          padding: ${cellPadding[size]};
        }

        .euiDataGridRowCell__content--lineCountHeight,
        .euiDataGridRowCell__content--autoBelowLineCountHeight {
          ${highContrastModeStyles(euiThemeContext, {
            // Workaround to trim line-clamp and padding - @see https://github.com/elastic/eui/issues/7780
            none: `
              ${logicalCSS('padding-bottom', 0)}
              ${logicalCSS(
                'border-bottom',
                `${cellPadding[size]} solid transparent`
              )}
            `,
            // Unfortunately this workaround backfires in Windows high contrast themes, which force
            // border-color, so we can't use it. We'll use a clip-path workaround instead.
            get forced() {
              const bottomY = `calc(100% - ${cellPadding[size]})`;
              return `clip-path: polygon(0 0, 100% 0, 100% ${bottomY}, 0 ${bottomY});`;
            },
          })}
        }

        /* Ensure the column actions button maintains its size for accessible click/tap targeting
         * (see https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
         * while not increasing the height of the header row at compact sizes. */
        .euiDataGridHeaderCell__button {
          margin-block: -${cellPadding[size]};
        }
      `,
      get s() {
        return css(this.cellPadding('s'));
      },
      get m() {
        return css(this.cellPadding('m'));
      },
      get l() {
        return css(this.cellPadding('l'));
      },
    },
    fontSize: {
      fontSize: (size: 's' | 'm') => css`
        .euiDataGridHeaderCell,
        .euiDataGridRowCell {
          font-size: ${fontSize[size]};
          line-height: ${lineHeight[size]};
        }
      `,
      get s() {
        return css(this.fontSize('s'));
      },
      get m() {
        return css(this.fontSize('m'));
      },
      get l() {
        // On the Amsterdam theme, the l fontSize is the same as m
        return css(this.fontSize('m'));
      },
    },
    borders: {
      none: null,
      horizontal: css`
        label: borders;

        .euiDataGridRowCell:not(.euiDataGridFooterCell),
        .euiDataGridFooter,
        &:not(.euiDataGrid--headerUnderline) .euiDataGridHeader {
          ${logicalCSS('border-bottom', border)}
        }

        &:not(.euiDataGrid--footerOverline) .euiDataGridFooter {
          ${logicalCSS('border-top', border)}
          ${logicalCSS('margin-top', `-${euiTheme.border.width.thin}`)}
        }

        .euiDataGridHeader {
          ${logicalCSS('border-top', border)}
        }
      `,
      all: css`
        label: borders;

        .euiDataGridRowCell {
          &:not(.euiDataGridFooterCell) {
            ${logicalCSS('border-bottom', border)}
            ${logicalCSS(
              'border-right',
              // Visually lighten vertical borders
              `${euiTheme.border.width.thin} solid ${borderColors.vertical}`
            )}
          }

          &--firstColumn {
            ${logicalCSS('border-left', border)}
          }

          &--lastColumn {
            ${logicalCSS(
              'border-right-color',
              euiTheme.components.dataGridBorderColor
            )}
          }
        }

        .euiDataGridFooterCell,
        .euiDataGridHeaderCell {
          ${logicalCSS('border-right', border)}

          &:first-of-type {
            ${logicalCSS('border-left', border)}
          }
        }

        .euiDataGridFooter {
          ${logicalCSS('border-bottom', border)}
        }

        &:not(.euiDataGrid--footerOverline) .euiDataGridFooter {
          ${logicalCSS('border-top', border)}
          ${logicalCSS('margin-top', `-${euiTheme.border.width.thin}`)}
        }

        &:not(.euiDataGrid--headerUnderline) .euiDataGridHeader {
          ${logicalCSS('border-bottom', border)}
        }

        &:is(.euiDataGrid--noControls) .euiDataGridHeader {
          ${logicalCSS('border-top', border)}
        }

        .euiDataGrid__controls {
          border: ${border};
          background-color: ${euiTheme.colors.body};
        }
      `,
    },
    // Sits below the controls above it and pagination below it
    euiDataGrid__content: css`
      z-index: 1;
      position: relative;
      flex-grow: 1;
      ${logicalSizeCSS('100%')}
      ${logicalCSS('max-width', '100%')}
      overflow: hidden;
      font-feature-settings: 'tnum' 1; /* Tabular numbers */
    `,
    // Wrapper around EuiDataGrid
    euiDataGrid__focusWrap: css`
      ${logicalCSS('height', '100%')}
    `,
  };
};
