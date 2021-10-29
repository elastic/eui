/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import { isObject, isNumber } from '../../services/predicate';
import {
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyle,
  EuiDataGridRowHeightOption,
  EuiDataGridRowHeightsOptions,
  EuiDataGridColumn,
} from './data_grid_types';

// TODO: Once JS variables are available, use them here instead of hard-coded maps
const cellPaddingsMap: Record<EuiDataGridStyleCellPaddings, string> = {
  s: '4px',
  m: '6px',
  l: '8px',
};
const fontSizesMap: Record<EuiDataGridStyleFontSizes, string> = {
  s: '12px',
  m: '14px',
  l: '16px',
};
const lineHeightsMap: Record<EuiDataGridStyleFontSizes, string> = {
  s: '1.14286rem',
  m: '1.71429rem',
  l: '1.71429rem',
};

function getNumberFromPx(style?: string) {
  return style ? parseInt(style.replace('px', ''), 10) : 0;
}

export const AUTO_HEIGHT = 'auto';
export const DEFAULT_ROW_HEIGHT = 34;

// So that we use lineCount options we should know exactly row height which allow to show defined line count.
// For this we should know paddings and line height. Because of this we should compute styles for cell with grid styles
export class RowHeightUtils {
  private styles: {
    paddingTop: number;
    paddingBottom: number;
    lineHeight: number;
  } = {
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 1,
  };
  private heightsCache = new Map<number, Map<string, number>>();
  private timerId: any;
  private grid?: Grid;
  private lastUpdatedRow: number = Infinity;

  setRowHeight(
    rowIndex: number,
    colId: string,
    height: number = DEFAULT_ROW_HEIGHT,
    visibleRowIndex: number
  ) {
    const rowHeights =
      this.heightsCache.get(rowIndex) || new Map<string, number>();
    const adaptedHeight = Math.ceil(
      height + this.styles.paddingTop + this.styles.paddingBottom
    );

    if (rowHeights.get(colId) === adaptedHeight) {
      return;
    }

    rowHeights.set(colId, adaptedHeight);
    this.heightsCache.set(rowIndex, rowHeights);
    this.resetRow(visibleRowIndex);
  }

  pruneHiddenColumnHeights(visibleColumns: EuiDataGridColumn[]) {
    const visibleColumnIds = new Set(visibleColumns.map(({ id }) => id));
    let didModify = false;

    this.heightsCache.forEach((rowHeights) => {
      const existingColumnIds = Array.from(rowHeights.keys());
      existingColumnIds.forEach((existingColumnId) => {
        if (visibleColumnIds.has(existingColumnId) === false) {
          didModify = true;
          rowHeights.delete(existingColumnId);
        }
      });
    });

    if (didModify) {
      this.resetRow(0);
    }
  }

  resetRow(visibleRowIndex: number) {
    // save the first row index of batch, reassigning it only
    // if this visible row index less than lastUpdatedRow
    this.lastUpdatedRow = Math.min(this.lastUpdatedRow, visibleRowIndex);
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => this.resetGrid(), 0);
  }

  getRowHeight(rowIndex: number) {
    const rowHeights = this.heightsCache.get(rowIndex);
    if (rowHeights == null) return 0;

    const rowHeightValues = Array.from(rowHeights.values());

    if (rowHeightValues.length) {
      return Math.max(...rowHeightValues);
    }

    return 0;
  }

  resetGrid() {
    this.grid?.resetAfterRowIndex(this.lastUpdatedRow);
    this.lastUpdatedRow = Infinity;
  }

  setGrid(grid: Grid) {
    this.grid = grid;
  }

  isAutoHeight(
    rowIndex: number,
    rowHeightsOptions?: EuiDataGridRowHeightsOptions
  ) {
    const height = this.getRowHeightOption(rowIndex, rowHeightsOptions);

    if (height === AUTO_HEIGHT) {
      return true;
    }
    return false;
  }

  computeStylesForGridCell(
    gridStyles: EuiDataGridStyle,
    lineHeight: string | undefined
  ) {
    const fakeCell = document.createElement('div');
    fakeCell.style.padding = cellPaddingsMap[gridStyles.cellPadding!];
    fakeCell.style.fontSize = fontSizesMap[gridStyles.fontSize!];
    fakeCell.style.lineHeight =
      lineHeight || lineHeightsMap[gridStyles.fontSize!];

    document.body.appendChild(fakeCell);
    const allStyles = getComputedStyle(fakeCell);
    this.styles = {
      paddingTop: getNumberFromPx(allStyles.paddingTop),
      paddingBottom: getNumberFromPx(allStyles.paddingBottom),
      lineHeight: getNumberFromPx(allStyles.lineHeight),
    };
    document.body.removeChild(fakeCell);
  }

  getComputedCellStyles() {
    return this.styles;
  }

  getRowHeightOption(
    rowIndex: number,
    rowHeightsOptions?: EuiDataGridRowHeightsOptions
  ) {
    return (
      rowHeightsOptions?.rowHeights?.[rowIndex] ??
      rowHeightsOptions?.defaultHeight
    );
  }

  getLineCount(option?: EuiDataGridRowHeightOption) {
    return isObject(option) ? option.lineCount : undefined;
  }

  calculateHeightForLineCount(cellRef: HTMLElement, lineCount: number) {
    const computedStyles = window.getComputedStyle(cellRef, null);
    const lineHeight = parseInt(computedStyles.lineHeight, 10) || 24;

    return Math.ceil(
      lineCount * lineHeight +
        this.styles.paddingTop +
        this.styles.paddingBottom
    );
  }

  getCalculatedHeight(
    heightOption: EuiDataGridRowHeightOption,
    defaultHeight: number,
    rowIndex?: number
  ) {
    if (isObject(heightOption)) {
      if (heightOption.lineCount) {
        return defaultHeight; // lineCount height is set in minRowHeight state in grid_row_body
      }
      if (heightOption.height) {
        return Math.max(heightOption.height, defaultHeight);
      }
    }

    if (heightOption && isNumber(heightOption)) {
      return Math.max(heightOption, defaultHeight);
    }

    if (heightOption === AUTO_HEIGHT && rowIndex != null) {
      return this.getRowHeight(rowIndex);
    }

    return defaultHeight;
  }

  getStylesForCell = (
    rowHeightsOptions: EuiDataGridRowHeightsOptions,
    rowIndex: number
  ): CSSProperties => {
    const height = this.getRowHeightOption(rowIndex, rowHeightsOptions);

    if (height === AUTO_HEIGHT) {
      return {};
    }

    const lineCount = this.getLineCount(height);
    if (lineCount) {
      return {
        WebkitLineClamp: lineCount,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        height: '100%',
        overflow: 'hidden',
      };
    }

    return {
      height: '100%',
      overflow: 'hidden',
    };
  };
}
