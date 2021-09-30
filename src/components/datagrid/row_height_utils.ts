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
} from './data_grid_types';

const cellPaddingsToClassMap: Record<EuiDataGridStyleCellPaddings, string> = {
  s: 'euiDataGridRowCell--paddingSmall',
  m: '',
  l: 'euiDataGridRowCell--paddingLarge',
};

const fontSizesToClassMap: Record<EuiDataGridStyleFontSizes, string> = {
  s: 'euiDataGridRowCell--fontSizeSmall',
  m: '',
  l: 'euiDataGridRowCell--fontSizeLarge',
};

function getNumberFromPx(style?: string) {
  return style ? parseInt(style.replace('px', ''), 10) : 0;
}

export const AUTO_HEIGHT = 'auto';
const DEFAULT_HEIGHT = 32;

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
  private fakeCell = document.createElement('div');
  private heightsCache = new Map<number, Record<number, number>>();
  private timerId: any;
  private grid?: Grid;
  private lastUpdatedRow: number = Infinity;

  setRowHeight(
    rowIndex: number,
    colIndex: number,
    height: number = DEFAULT_HEIGHT,
    visibleRowIndex: number
  ) {
    const rowHeights = this.heightsCache.get(rowIndex) || {};
    const adaptedHeight = Math.ceil(
      height + this.styles.paddingTop + this.styles.paddingBottom
    );

    if (rowHeights[colIndex] === adaptedHeight) {
      return;
    }

    rowHeights[colIndex] = adaptedHeight;
    this.heightsCache.set(rowIndex, rowHeights);
    // save the first row index of batch, reassigning it only
    // if this visible row index less than lastUpdatedRow
    this.lastUpdatedRow = Math.min(this.lastUpdatedRow, visibleRowIndex);
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => this.resetGrid(), 0);
  }

  getRowHeight(rowIndex: number) {
    const rowHeights = this.heightsCache.get(rowIndex) || {};
    const rowHeightValues = Object.values(rowHeights);

    if (rowHeightValues.length) {
      return Math.max(...rowHeightValues);
    }

    return 0;
  }

  compareHeights(currentRowHeight: number, cachedRowHeight: number) {
    return currentRowHeight === cachedRowHeight;
  }

  resetGrid() {
    this.grid?.resetAfterRowIndex(this.lastUpdatedRow);
    this.lastUpdatedRow = Infinity;
  }

  setGrid(grid: Grid) {
    this.grid = grid;
  }

  clearHeightsCache() {
    this.lastUpdatedRow = 0;
    this.heightsCache.clear();
  }

  isAutoHeight(
    rowIndex: number,
    rowHeightsOptions: EuiDataGridRowHeightsOptions
  ) {
    if (rowHeightsOptions.rowHeights?.[rowIndex] === AUTO_HEIGHT) {
      return true;
    }

    if (rowHeightsOptions.defaultHeight === AUTO_HEIGHT) {
      return true;
    }

    return false;
  }

  isDefinedHeight(
    rowIndex: number,
    rowHeightsOptions: EuiDataGridRowHeightsOptions
  ) {
    if (
      rowHeightsOptions.rowHeights?.[rowIndex] ||
      rowHeightsOptions.defaultHeight
    ) {
      return true;
    }

    return false;
  }

  computeStylesForGridCell(
    gridStyles: EuiDataGridStyle,
    lineHeight: string | undefined
  ) {
    this.fakeCell.className = `
      euiDataGridRowCell
      ${cellPaddingsToClassMap[gridStyles.cellPadding!]}
      ${fontSizesToClassMap[gridStyles.fontSize!]}
    `;

    // @ts-ignore it is valid to set `lineHeight` to undefined
    this.fakeCell.style.lineHeight = lineHeight;

    document.body.appendChild(this.fakeCell);
    const allStyles = getComputedStyle(this.fakeCell);
    this.styles = {
      paddingTop: getNumberFromPx(allStyles.paddingTop),
      paddingBottom: getNumberFromPx(allStyles.paddingBottom),
      lineHeight: getNumberFromPx(allStyles.lineHeight),
    };
    document.body.removeChild(this.fakeCell);
    // we need clear the height cache so that it recalculates heights for new styles
    this.clearHeightsCache();
  }

  getComputedCellStyles() {
    return this.styles;
  }

  calculateHeightForLineCount(lineCount: number) {
    return Math.ceil(
      lineCount * this.styles.lineHeight +
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
        return this.calculateHeightForLineCount(heightOption.lineCount);
      }

      if (heightOption.height) {
        return Math.max(heightOption.height, defaultHeight);
      }
    }

    if (heightOption && isNumber(heightOption)) {
      return Math.max(heightOption, defaultHeight);
    }

    if (heightOption === AUTO_HEIGHT && rowIndex) {
      return this.getRowHeight(rowIndex);
    }

    return defaultHeight;
  }

  getStylesForCell = (
    rowHeightsOptions: EuiDataGridRowHeightsOptions,
    rowIndex: number
  ): CSSProperties => {
    if (this.isAutoHeight(rowIndex, rowHeightsOptions)) {
      return {};
    }

    let initialHeight =
      rowHeightsOptions.rowHeights && rowHeightsOptions.rowHeights[rowIndex];

    if (!initialHeight) {
      initialHeight = rowHeightsOptions.defaultHeight;
    }

    if (isObject(initialHeight) && initialHeight.lineCount) {
      return {
        WebkitLineClamp: initialHeight.lineCount,
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
