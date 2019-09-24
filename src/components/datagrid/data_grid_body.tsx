import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useMemo,
} from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import {
  EuiDataGridDataRow,
  EuiDataGridDataRowProps,
} from './data_grid_data_row';
import { EuiDataGridSchema } from './data_grid_schema';

interface EuiDataGridBodyProps {
  columnWidths: EuiDataGridColumnWidths;
  defaultColumnWidth?: number | null;
  columns: EuiDataGridColumn[];
  schema: EuiDataGridSchema;
  focusedCell: EuiDataGridDataRowProps['focusedCell'];
  onCellFocus: EuiDataGridDataRowProps['onCellFocus'];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  inMemory?: EuiDataGridInMemory;
  inMemoryValues: EuiDataGridInMemoryValues;
  isGridNavigationEnabled: EuiDataGridCellProps['isGridNavigationEnabled'];
  interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
  pagination?: EuiDataGridPaginationProps;
  sorting?: EuiDataGridSorting;
}

export const EuiDataGridBody: FunctionComponent<
  EuiDataGridBodyProps
> = props => {
  const {
    columnWidths,
    defaultColumnWidth,
    columns,
    schema,
    focusedCell,
    onCellFocus,
    rowCount,
    renderCellValue,
    inMemory,
    inMemoryValues,
    isGridNavigationEnabled,
    interactiveCellId,
    pagination,
    sorting,
  } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  const visibleRowIndices = useMemo(() => {
    const visibleRowIndices = [];
    for (let i = startRow; i < endRow; i++) {
      visibleRowIndices.push(i);
    }
    return visibleRowIndices;
  }, [startRow, endRow]);

  const rowMap = useMemo(() => {
    const rowMap: { [key: number]: number } = {};

    if (
      inMemory &&
      inMemory.level === 'sorting' &&
      sorting != null &&
      sorting.columns.length > 0
    ) {
      const inMemoryRowIndices = Object.keys(inMemoryValues);
      const wrappedValues: Array<{
        index: number;
        values: EuiDataGridInMemoryValues[number];
      }> = [];
      for (let i = 0; i < inMemoryRowIndices.length; i++) {
        const inMemoryRow = inMemoryValues[inMemoryRowIndices[i]];
        wrappedValues.push({ index: i, values: inMemoryRow });
      }

      wrappedValues.sort((a, b) => {
        for (let i = 0; i < sorting.columns.length; i++) {
          const column = sorting.columns[i];
          const aValue = a.values[column.id];
          const bValue = b.values[column.id];

          if (aValue < bValue) return column.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return column.direction === 'asc' ? 1 : -1;
        }

        return 0;
      });

      for (let i = 0; i < wrappedValues.length; i++) {
        rowMap[i] = wrappedValues[i].index;
      }
    }

    return rowMap;
  }, [sorting, inMemory, inMemoryValues]);

  const setCellFocus = useCallback(
    ([colIndex, rowIndex]) => {
      // If the rows in the grid have been mapped in some way (e.g. sorting)
      // then this callback must unmap the reported rowIndex
      const mappedRowIndicies = Object.keys(rowMap);
      let reverseMappedIndex = rowIndex;
      for (let i = 0; i < mappedRowIndicies.length; i++) {
        const mappedRowIndex = mappedRowIndicies[i];
        const rowMappedToIndex = rowMap[(mappedRowIndex as any) as number];
        if (`${rowMappedToIndex}` === `${rowIndex}`) {
          reverseMappedIndex = parseInt(mappedRowIndex);
          break;
        }
      }

      // map the row into the visible rows
      if (pagination) {
        reverseMappedIndex -= pagination.pageIndex * pagination.pageSize;
      }
      onCellFocus([colIndex, reverseMappedIndex]);
    },
    [onCellFocus, rowMap, pagination]
  );

  const rows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < visibleRowIndices.length; i++) {
      let rowIndex = visibleRowIndices[i];
      if (rowMap.hasOwnProperty(rowIndex)) {
        rowIndex = rowMap[rowIndex];
      }

      rows.push(
        <EuiDataGridDataRow
          key={rowIndex}
          columns={columns}
          schema={schema}
          columnWidths={columnWidths}
          defaultColumnWidth={defaultColumnWidth}
          focusedCell={focusedCell}
          onCellFocus={setCellFocus}
          renderCellValue={renderCellValue}
          rowIndex={rowIndex}
          visibleRowIndex={i}
          isGridNavigationEnabled={isGridNavigationEnabled}
          interactiveCellId={interactiveCellId}
        />
      );
    }

    return rows;
  }, [
    columns,
    columnWidths,
    defaultColumnWidth,
    focusedCell,
    onCellFocus,
    renderCellValue,
    rowMap,
    visibleRowIndices,
    startRow,
    isGridNavigationEnabled,
    interactiveCellId,
  ]);

  return <Fragment>{rows}</Fragment>;
};
