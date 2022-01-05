/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { IS_JEST_ENVIRONMENT } from '../../../test';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridControlColumn,
  EuiDataGridOnColumnResizeHandler,
  EuiDataGridProps,
} from '../data_grid_types';

const DEFAULT_COLUMN_WIDTH = 100;

export const useDefaultColumnWidth = (
  gridWidth: number,
  leadingControlColumns: EuiDataGridControlColumn[],
  trailingControlColumns: EuiDataGridControlColumn[],
  columns: EuiDataGridProps['columns']
): number | null => {
  const computeDefaultWidth = useCallback((): number | null => {
    if (IS_JEST_ENVIRONMENT) return DEFAULT_COLUMN_WIDTH;
    if (gridWidth === 0) return null; // we can't tell what size to compute yet

    const controlColumnWidths = [
      ...leadingControlColumns,
      ...trailingControlColumns,
    ].reduce<number>(
      (claimedWidth, controlColumn: EuiDataGridControlColumn) =>
        claimedWidth + controlColumn.width,
      0
    );

    const columnsWithWidths = columns.filter<
      EuiDataGridColumn & { initialWidth: number }
    >(doesColumnHaveAnInitialWidth);

    const definedColumnsWidth = columnsWithWidths.reduce(
      (claimedWidth, column) => claimedWidth + column.initialWidth,
      0
    );

    const claimedWidth = controlColumnWidths + definedColumnsWidth;

    const widthToFill = gridWidth - claimedWidth;
    const unsizedColumnCount = columns.length - columnsWithWidths.length;
    if (unsizedColumnCount === 0) {
      return DEFAULT_COLUMN_WIDTH;
    }
    return Math.max(widthToFill / unsizedColumnCount, DEFAULT_COLUMN_WIDTH);
  }, [gridWidth, columns, leadingControlColumns, trailingControlColumns]);

  const [defaultColumnWidth, setDefaultColumnWidth] = useState<number | null>(
    computeDefaultWidth
  );

  useEffect(() => {
    const columnWidth = computeDefaultWidth();
    setDefaultColumnWidth(columnWidth);
  }, [computeDefaultWidth]);

  return defaultColumnWidth;
};

export const doesColumnHaveAnInitialWidth = (
  column: EuiDataGridColumn
): column is EuiDataGridColumn & { initialWidth: number } => {
  return column.hasOwnProperty('initialWidth');
};

export const useColumnWidths = ({
  columns,
  leadingControlColumns,
  trailingControlColumns,
  defaultColumnWidth,
  onColumnResize,
}: {
  columns: EuiDataGridColumn[];
  leadingControlColumns: EuiDataGridControlColumn[];
  trailingControlColumns: EuiDataGridControlColumn[];
  defaultColumnWidth?: number | null;
  onColumnResize?: EuiDataGridOnColumnResizeHandler;
}): {
  columnWidths: EuiDataGridColumnWidths;
  setColumnWidth: (columnId: string, width: number) => void;
  getColumnWidth: (index: number) => number;
} => {
  const hasMounted = useRef(false);

  const computeColumnWidths = useCallback(() => {
    return columns
      .filter<EuiDataGridColumn & { initialWidth: number }>(
        doesColumnHaveAnInitialWidth
      )
      .reduce<EuiDataGridColumnWidths>((initialWidths, column) => {
        initialWidths[column.id] = column.initialWidth;
        return initialWidths;
      }, {});
  }, [columns]);

  const [columnWidths, setColumnWidths] = useState<EuiDataGridColumnWidths>(
    computeColumnWidths
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setColumnWidths(computeColumnWidths());
  }, [computeColumnWidths]);

  const setColumnWidth = useCallback(
    (columnId: string, width: number) => {
      setColumnWidths({ ...columnWidths, [columnId]: width });

      if (onColumnResize) {
        onColumnResize({ columnId, width });
      }
    },
    [columnWidths, onColumnResize]
  );

  // Used by react-window to determine actual column widths
  const getColumnWidth = useCallback(
    (index: number) => {
      if (index < leadingControlColumns.length) {
        // this is a leading control column
        return leadingControlColumns[index].width;
      } else if (index >= leadingControlColumns.length + columns.length) {
        // this is a trailing control column
        return trailingControlColumns[
          index - leadingControlColumns.length - columns.length
        ].width;
      }
      // normal data column
      const columnId = columns[index - leadingControlColumns.length].id;
      return (
        columnWidths[columnId] || defaultColumnWidth || DEFAULT_COLUMN_WIDTH
      );
    },
    [
      columns,
      leadingControlColumns,
      trailingControlColumns,
      columnWidths,
      defaultColumnWidth,
    ]
  );

  return { columnWidths, setColumnWidth, getColumnWidth };
};
