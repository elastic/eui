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
  private heightsCache = new Map<number, number>();
  private timerId: any;
  private grid?: Grid;

  setRowHeight(rowIndex: number, height: number) {
    clearTimeout(this.timerId);
    const cachedHeight = this.heightsCache.get(rowIndex) || 0;
    const adaptedHeight =
      height + this.styles.paddingTop + this.styles.paddingBottom;
    if (cachedHeight < adaptedHeight) {
      this.heightsCache.set(rowIndex, adaptedHeight);
    }
    this.timerId = setTimeout(() => this.resetGrid(), 100);
  }

  getRowHeight(rowIndex: number) {
    return this.heightsCache.get(rowIndex) || 0;
  }

  resetGrid() {
    this.grid?.resetAfterRowIndex(0);
  }

  setGrid(grid: Grid) {
    this.grid = grid;
  }

  clearHeightsCache() {
    this.heightsCache.clear();
  }

  isAutoHeight(
    rowIndex: number,
    rowHeightsOptions: EuiDataGridRowHeightsOptions
  ) {
    if (
      rowHeightsOptions.rowHeights &&
      rowHeightsOptions.rowHeights[rowIndex]
    ) {
      return rowHeightsOptions.rowHeights[rowIndex] === AUTO_HEIGHT;
    }

    if (rowHeightsOptions.defaultHeight) {
      return rowHeightsOptions.defaultHeight === AUTO_HEIGHT;
    }

    return false;
  }

  computeStylesForGridCell(gridStyles: EuiDataGridStyle) {
    this.fakeCell.className = `
      euiDataGridRowCell
      ${cellPaddingsToClassMap[gridStyles.cellPadding!]}
      ${fontSizesToClassMap[gridStyles.fontSize!]}
    `;
    document.body.appendChild(this.fakeCell);
    const allStyles = getComputedStyle(this.fakeCell);
    this.styles = {
      paddingTop: getNumberFromPx(allStyles.paddingTop),
      paddingBottom: getNumberFromPx(allStyles.paddingBottom),
      lineHeight: getNumberFromPx(allStyles.lineHeight),
    };
    document.body.removeChild(this.fakeCell);
    // we need clear height cache so that recalculate heigths for new styles.
    this.clearHeightsCache();
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

    if (heightOption && heightOption === AUTO_HEIGHT && rowIndex) {
      return this.getRowHeight(rowIndex);
    }

    return defaultHeight;
  }

  getStylesForCell = (
    rowHeightsOptions: EuiDataGridRowHeightsOptions,
    rowIndex: number
  ): CSSProperties => {
    const styles: CSSProperties = {
      wordWrap: 'break-word',
      wordBreak: 'break-word',
      flexGrow: 1,
    };
    let initialHeight =
      rowHeightsOptions.rowHeights && rowHeightsOptions.rowHeights[rowIndex];

    if (this.isAutoHeight(rowIndex, rowHeightsOptions)) {
      return styles;
    }

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
        ...styles,
      };
    }

    return {
      height: '100%',
      overflow: 'hidden',
      ...styles,
    };
  };
}
