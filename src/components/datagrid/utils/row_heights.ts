/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
  CSSProperties,
} from 'react';
import type { VariableSizeGrid as Grid } from 'react-window';
import { isObject, isNumber } from '../../../services/predicate';
import {
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyle,
  EuiDataGridRowHeightOption,
  EuiDataGridRowHeightsOptions,
  EuiDataGridColumn,
} from '../data_grid_types';
import { DataGridSortingContext } from './sorting';

// TODO: Once JS variables are available, use them here instead of hard-coded maps
export const cellPaddingsMap: Record<EuiDataGridStyleCellPaddings, number> = {
  s: 4,
  m: 6,
  l: 8,
};

export const AUTO_HEIGHT = 'auto';
export const DEFAULT_ROW_HEIGHT = 34;

export class RowHeightUtils {
  getRowHeightOption(
    rowIndex: number,
    rowHeightsOptions?: EuiDataGridRowHeightsOptions
  ): EuiDataGridRowHeightOption | undefined {
    return (
      rowHeightsOptions?.rowHeights?.[rowIndex] ??
      rowHeightsOptions?.defaultHeight
    );
  }

  isRowHeightOverride(
    rowIndex: number,
    rowHeightsOptions?: EuiDataGridRowHeightsOptions
  ): boolean {
    return rowHeightsOptions?.rowHeights?.[rowIndex] != null;
  }

  getCalculatedHeight(
    heightOption: EuiDataGridRowHeightOption,
    defaultHeight: number,
    rowIndex?: number,
    isRowHeightOverride?: boolean
  ) {
    if (isObject(heightOption) && heightOption.height) {
      return Math.max(heightOption.height, defaultHeight);
    }

    if (heightOption && isNumber(heightOption)) {
      return Math.max(heightOption, defaultHeight);
    }

    if (isObject(heightOption) && heightOption.lineCount) {
      if (isRowHeightOverride) {
        return this.getRowHeight(rowIndex!) || defaultHeight; // lineCount overrides are stored in the heights cache
      } else {
        return defaultHeight; // default lineCount height is set in minRowHeight state in grid_row_body
      }
    }

    if (heightOption === AUTO_HEIGHT && rowIndex != null) {
      return this.getRowHeight(rowIndex);
    }

    return defaultHeight;
  }

  /**
   * Styles utils
   */

  private styles: {
    paddingTop: number;
    paddingBottom: number;
  } = {
    paddingTop: 0,
    paddingBottom: 0,
  };

  cacheStyles(gridStyles: EuiDataGridStyle) {
    this.styles = {
      paddingTop: cellPaddingsMap[gridStyles.cellPadding!],
      paddingBottom: cellPaddingsMap[gridStyles.cellPadding!],
    };
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

  /**
   * Line count utils
   */

  getLineCount(option?: EuiDataGridRowHeightOption) {
    return isObject(option) ? option.lineCount : undefined;
  }

  calculateHeightForLineCount(
    cellRef: HTMLElement,
    lineCount: number,
    excludePadding?: boolean
  ) {
    const computedStyles = window.getComputedStyle(cellRef, null);
    const lineHeight = parseInt(computedStyles.lineHeight, 10);
    const contentHeight = Math.ceil(lineCount * lineHeight);

    return excludePadding
      ? contentHeight
      : contentHeight + this.styles.paddingTop + this.styles.paddingBottom;
  }

  /**
   * Auto height utils
   */

  private heightsCache = new Map<number, Map<string, number>>();
  private timerId?: number;
  private grid?: Grid;
  private lastUpdatedRow: number = Infinity;
  private rerenderGridBody: Function = () => {};

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

  getRowHeight(rowIndex: number) {
    const rowHeights = this.heightsCache.get(rowIndex);
    if (rowHeights == null) return 0;

    const rowHeightValues = Array.from(rowHeights.values());
    if (!rowHeightValues.length) return 0;

    return Math.max(...rowHeightValues);
  }

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
    this.rerenderGridBody();
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
    this.timerId = window.setTimeout(() => this.resetGrid(), 0);
  }

  resetGrid() {
    this.grid?.resetAfterRowIndex(this.lastUpdatedRow);
    this.lastUpdatedRow = Infinity;
  }

  setGrid(grid: Grid) {
    this.grid = grid;
  }

  setRerenderGridBody(rerenderGridBody: Function) {
    this.rerenderGridBody = rerenderGridBody;
  }
}

/**
 * Hook for instantiating RowHeightUtils, and also updating
 * internal vars from outside props via useEffects
 */
export const useRowHeightUtils = ({
  gridRef,
  gridStyles,
  columns,
}: {
  gridRef: Grid | null;
  gridStyles: EuiDataGridStyle;
  columns: EuiDataGridColumn[];
}) => {
  const rowHeightUtils = useMemo(() => new RowHeightUtils(), []);

  // Update rowHeightUtils with grid ref
  useEffect(() => {
    if (gridRef) rowHeightUtils.setGrid(gridRef);
  }, [gridRef, rowHeightUtils]);

  // Re-cache styles whenever grid density changes
  useEffect(() => {
    rowHeightUtils.cacheStyles({
      cellPadding: gridStyles.cellPadding,
    });
  }, [gridStyles.cellPadding, rowHeightUtils]);

  // Update row heights map to remove hidden columns whenever orderedVisibleColumns change
  useEffect(() => {
    rowHeightUtils.pruneHiddenColumnHeights(columns);
  }, [rowHeightUtils, columns]);

  return rowHeightUtils;
};

export const useDefaultRowHeight = ({
  rowHeightsOptions,
  rowHeightUtils,
}: {
  rowHeightsOptions?: EuiDataGridRowHeightsOptions;
  rowHeightUtils: RowHeightUtils;
}) => {
  const { getCorrectRowIndex } = useContext(DataGridSortingContext);

  // `minRowHeight` is primarily used by undefined & lineCount heights
  // and ignored by auto & static heights (unless the static height is < the min)
  const [minRowHeight, setRowHeight] = useState(DEFAULT_ROW_HEIGHT);

  // Default/fallback height for all rows
  const defaultRowHeight = useMemo(() => {
    return rowHeightsOptions?.defaultHeight
      ? rowHeightUtils.getCalculatedHeight(
          rowHeightsOptions.defaultHeight,
          minRowHeight
        )
      : minRowHeight;
  }, [rowHeightsOptions, minRowHeight, rowHeightUtils]);

  // Used by react-window's Grid component to determine actual row heights
  const getRowHeight = useCallback(
    (rowIndex: number) => {
      const correctRowIndex = getCorrectRowIndex(rowIndex);
      let rowHeight;

      // Account for row-specific height overrides
      const rowHeightOption = rowHeightUtils.getRowHeightOption(
        correctRowIndex,
        rowHeightsOptions
      );
      if (rowHeightOption) {
        rowHeight = rowHeightUtils.getCalculatedHeight(
          rowHeightOption,
          minRowHeight,
          correctRowIndex,
          rowHeightUtils.isRowHeightOverride(correctRowIndex, rowHeightsOptions)
        );
      }

      // Use the row-specific height if it exists, if not, fall back to the default
      return rowHeight || defaultRowHeight;
    },
    [
      minRowHeight,
      rowHeightsOptions,
      getCorrectRowIndex,
      rowHeightUtils,
      defaultRowHeight,
    ]
  );

  return { defaultRowHeight, setRowHeight, getRowHeight };
};
