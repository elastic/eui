/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo, useCallback, useState } from 'react';
import { useUpdateEffect } from '../../../services';
import { IS_JEST_ENVIRONMENT } from '../../../utils';
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
  const defaultColumnWidth = useMemo(() => {
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

    const columnsWithWidths = columns.filter(doesColumnHaveAnInitialWidth);
    const definedColumnsWidth = columnsWithWidths.reduce(
      (claimedWidth, column) => claimedWidth + column.initialWidth!,
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

  return defaultColumnWidth;
};

export const doesColumnHaveAnInitialWidth = (
  column: EuiDataGridColumn
): boolean => {
  return column.hasOwnProperty('initialWidth') && column.initialWidth != null;
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
  const getInitialWidths = useCallback(
    (prevColumnWidths?: EuiDataGridColumnWidths) => {
      const columnWidths = { ...prevColumnWidths };
      columns
        .filter(doesColumnHaveAnInitialWidth)
        .forEach(({ id, initialWidth }) => {
          if (columnWidths[id] == null) {
            columnWidths[id] = initialWidth!;
          }
        });
      return columnWidths;
    },
    [columns]
  );

  // Passes initializer function for performance, so computing only runs once on init
  // @see https://react.dev/reference/react/useState#examples-initializer
  const [columnWidths, setColumnWidths] =
    useState<EuiDataGridColumnWidths>(getInitialWidths);

  useUpdateEffect(() => {
    setColumnWidths(getInitialWidths);
  }, [columns]);

  const setColumnWidth = useCallback(
    (columnId: string, width: number) => {
      setColumnWidths((prevColumnWidths) => ({
        ...prevColumnWidths,
        [columnId]: width,
      }));
      onColumnResize?.({ columnId, width });
    },
    [onColumnResize]
  );

  // Used by react-window to determine actual column widths
  const getColumnWidth = useCallback(
    (index: number) => {
      // Leading control columns
      if (
        leadingControlColumns.length &&
        index < leadingControlColumns.length
      ) {
        return leadingControlColumns[index].width;
      }
      // Trailing control columns
      if (
        trailingControlColumns.length &&
        index >= leadingControlColumns.length + columns.length
      ) {
        return trailingControlColumns[
          index - leadingControlColumns.length - columns.length
        ].width;
      }
      // Normal data columns
      const columnId =
        columns.length > 0
          ? columns[index - leadingControlColumns.length].id
          : '';
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
