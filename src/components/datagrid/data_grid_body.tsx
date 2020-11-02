/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  forwardRef,
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
} from 'react-window';
import { EuiCodeBlock } from '../code';
import {
  EuiDataGridControlColumn,
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridPopoverContents,
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridPaginationProps,
  EuiDataGridPopoverContent,
} from './data_grid_types';
import { EuiDataGridCell, EuiDataGridCellProps } from './data_grid_cell';
import {
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
} from './data_grid_schema';
import { EuiDataGridFooterRow } from './data_grid_footer_row';
import {
  EuiDataGridHeaderRow,
  EuiDataGridHeaderRowProps,
} from './data_grid_header_row';
import { EuiMutationObserver } from '../observer/mutation_observer';
import { EuiText } from '../text';
import { DataGridSortingContext } from './data_grid_context';

export interface EuiDataGridBodyProps {
  gridWidth: number;
  columnWidths: EuiDataGridColumnWidths;
  defaultColumnWidth?: number | null;
  leadingControlColumns?: EuiDataGridControlColumn[];
  trailingControlColumns?: EuiDataGridControlColumn[];
  columns: EuiDataGridColumn[];
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  popoverContents?: EuiDataGridPopoverContents;
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  renderFooterCellValue?: EuiDataGridCellProps['renderCellValue'];
  inMemory?: EuiDataGridInMemory;
  inMemoryValues: EuiDataGridInMemoryValues;
  interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
  pagination?: EuiDataGridPaginationProps;
  setColumnWidth: (columnId: string, width: number) => void;
  headerIsInteractive: boolean;
  handleHeaderMutation: MutationCallback;
  setVisibleColumns: EuiDataGridHeaderRowProps['setVisibleColumns'];
  switchColumnPos: EuiDataGridHeaderRowProps['switchColumnPos'];
}

const defaultComparator: NonNullable<
  EuiDataGridSchemaDetector['comparator']
> = (a, b, direction) => {
  if (a < b) return direction === 'asc' ? -1 : 1;
  if (a > b) return direction === 'asc' ? 1 : -1;
  return 0;
};

const providedPopoverContents: EuiDataGridPopoverContents = {
  json: ({ cellContentsElement }) => {
    let formattedText = cellContentsElement.innerText;

    // attempt to pretty-print the json
    try {
      formattedText = JSON.stringify(JSON.parse(formattedText), null, 2);
    } catch (e) {} // eslint-disable-line no-empty

    return (
      <EuiCodeBlock
        isCopyable
        transparentBackground
        paddingSize="none"
        language="json">
        {formattedText}
      </EuiCodeBlock>
    );
  },
};

const HEADER_ROW_HEIGHT = 34;
const FOOTER_ROW_HEIGHT = 34;

const DefaultColumnFormatter: EuiDataGridPopoverContent = ({ children }) => {
  return <EuiText>{children}</EuiText>;
};

const Cell: FunctionComponent<GridChildComponentProps> = ({
  columnIndex,
  rowIndex: _rowIndex,
  style,
  data,
}) => {
  const {
    rowMap,
    rowOffset,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    schema,
    popoverContents,
    columnWidths,
    defaultColumnWidth,
    renderCellValue,
    interactiveCellId,
  } = data;

  _rowIndex += rowOffset;
  const rowIndex = rowMap.hasOwnProperty(_rowIndex)
    ? rowMap[_rowIndex]
    : _rowIndex;

  let cellContent;

  if (columnIndex < leadingControlColumns.length) {
    // this is a leading control column
    const leadingColumn = leadingControlColumns[columnIndex];
    const { id, rowCellRender } = leadingColumn;

    cellContent = (
      <EuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={_rowIndex}
        colIndex={columnIndex}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={leadingColumn.width}
        renderCellValue={rowCellRender}
        interactiveCellId={interactiveCellId}
        isExpandable={false}
        className="euiDataGridRowCell--controlColumn"
      />
    );
  } else if (columnIndex >= leadingControlColumns.length + columns.length) {
    // this is a trailing control column
    const columnOffset = columns.length + leadingControlColumns.length;
    const adjustedColumnIndex = columnIndex - columnOffset;
    const trailingColumn = trailingControlColumns[adjustedColumnIndex];
    const { id, rowCellRender } = trailingColumn;

    cellContent = (
      <EuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={_rowIndex}
        colIndex={adjustedColumnIndex}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={trailingColumn.width}
        renderCellValue={rowCellRender}
        interactiveCellId={interactiveCellId}
        isExpandable={false}
        className="euiDataGridRowCell--controlColumn"
      />
    );
  } else {
    // this is a normal data cell

    // offset the column index by the leading control columns
    columnIndex -= leadingControlColumns.length;
    const column = columns[columnIndex];
    const columnId = column.id;
    const columnType = schema[columnId] ? schema[columnId].columnType : null;

    const isExpandable =
      column.isExpandable !== undefined ? column.isExpandable : true;

    const popoverContent =
      popoverContents[columnType as string] || DefaultColumnFormatter;

    const width = columnWidths[columnId] || defaultColumnWidth;

    cellContent = (
      <EuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={_rowIndex}
        colIndex={columnIndex}
        columnId={columnId}
        column={column}
        columnType={columnType}
        popoverContent={popoverContent}
        width={width || undefined}
        renderCellValue={renderCellValue}
        interactiveCellId={interactiveCellId}
        isExpandable={isExpandable}
      />
    );
  }

  return (
    <div
      style={{
        ...style,
        top: `${parseFloat(style.top as string) + HEADER_ROW_HEIGHT}px`,
      }}>
      {cellContent}
    </div>
  );
};

export const EuiDataGridBody: FunctionComponent<EuiDataGridBodyProps> = (
  props
) => {
  const {
    gridWidth,
    columnWidths,
    defaultColumnWidth,
    leadingControlColumns = [],
    trailingControlColumns = [],
    columns,
    schema,
    schemaDetectors,
    popoverContents,
    rowCount,
    renderCellValue,
    renderFooterCellValue,
    inMemory,
    inMemoryValues,
    interactiveCellId,
    pagination,
    setColumnWidth,
    headerIsInteractive,
    handleHeaderMutation,
    setVisibleColumns,
    switchColumnPos,
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

  const sorting = useContext(DataGridSortingContext);

  const rowMap = useMemo(() => {
    const rowMap: { [key: number]: number } = {};

    if (
      inMemory?.level === 'sorting' &&
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

          // get the comparator, based on schema
          let comparator = defaultComparator;
          if (schema.hasOwnProperty(column.id)) {
            const columnType = schema[column.id].columnType;
            for (let i = 0; i < schemaDetectors.length; i++) {
              const detector = schemaDetectors[i];
              if (
                detector.type === columnType &&
                detector.hasOwnProperty('comparator')
              ) {
                comparator = detector.comparator!;
              }
            }
          }

          const result = comparator(aValue, bValue, column.direction);
          // only return if the columns are unequal, otherwise allow the next sort-by column to run
          if (result !== 0) return result;
        }

        return 0;
      });

      for (let i = 0; i < wrappedValues.length; i++) {
        rowMap[i] = wrappedValues[i].index;
      }
    }

    return rowMap;
  }, [sorting, inMemory, inMemoryValues, schema, schemaDetectors]);

  const mergedPopoverContents = useMemo(
    () => ({
      ...providedPopoverContents,
      ...popoverContents,
    }),
    [popoverContents]
  );

  const headerRow = useMemo(() => {
    return (
      <>
        <EuiMutationObserver
          observerOptions={{
            subtree: true,
            childList: true,
          }}
          onMutation={handleHeaderMutation}>
          {(ref) => (
            <EuiDataGridHeaderRow
              ref={ref}
              switchColumnPos={switchColumnPos}
              setVisibleColumns={setVisibleColumns}
              leadingControlColumns={leadingControlColumns}
              trailingControlColumns={trailingControlColumns}
              columns={columns}
              columnWidths={columnWidths}
              defaultColumnWidth={defaultColumnWidth}
              setColumnWidth={setColumnWidth}
              schema={schema}
              schemaDetectors={schemaDetectors}
              headerIsInteractive={headerIsInteractive}
            />
          )}
        </EuiMutationObserver>
      </>
    );
  }, [
    handleHeaderMutation,
    switchColumnPos,
    setVisibleColumns,
    leadingControlColumns,
    trailingControlColumns,
    columns,
    columnWidths,
    defaultColumnWidth,
    setColumnWidth,
    schema,
    schemaDetectors,
    headerIsInteractive,
  ]);

  const footerRow = useMemo(() => {
    if (renderFooterCellValue == null) return null;
    return (
      <EuiDataGridFooterRow
        key="footerRow"
        leadingControlColumns={leadingControlColumns}
        trailingControlColumns={trailingControlColumns}
        columns={columns}
        schema={schema}
        popoverContents={mergedPopoverContents}
        columnWidths={columnWidths}
        defaultColumnWidth={defaultColumnWidth}
        renderCellValue={renderFooterCellValue}
        rowIndex={visibleRowIndices.length}
        visibleRowIndex={visibleRowIndices.length}
        interactiveCellId={interactiveCellId}
      />
    );
  }, [
    columnWidths,
    columns,
    defaultColumnWidth,
    interactiveCellId,
    leadingControlColumns,
    mergedPopoverContents,
    renderFooterCellValue,
    schema,
    trailingControlColumns,
    visibleRowIndices.length,
  ]);

  const InnerElement = useMemo(
    () =>
      forwardRef<HTMLDivElement, { style: { height: number } }>(
        ({ children, style, ...rest }, ref) => {
          return (
            <>
              <div
                ref={ref}
                style={{
                  ...style,
                  height: style.height + HEADER_ROW_HEIGHT,
                }}
                {...rest}>
                {headerRow}
                {children}
              </div>
              {footerRow}
            </>
          );
        }
      ),
    [headerRow, footerRow]
  );

  const gridRef = useRef<Grid>(null);
  useEffect(() => {
    gridRef.current!.resetAfterColumnIndex(0);
  }, [columns, columnWidths]);

  const ROW_HEIGHT = 34;
  const SCROLLBAR_HEIGHT = 15;

  const getWidth = useCallback(
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
      return (
        columnWidths[columns[index - leadingControlColumns.length].id] ||
        defaultColumnWidth ||
        100
      );
    },
    [
      leadingControlColumns,
      columns,
      columnWidths,
      defaultColumnWidth,
      trailingControlColumns,
    ]
  );
  const getRowHeight = useRef(() => ROW_HEIGHT);

  return (
    <Grid
      ref={gridRef}
      innerElementType={InnerElement}
      columnCount={
        leadingControlColumns.length +
        columns.length +
        trailingControlColumns.length
      }
      width={gridWidth}
      columnWidth={getWidth}
      // columnWidth={(index) => {
      //   if (index < leadingControlColumns.length) {
      //     // this is a leading control column
      //     return leadingControlColumns[index].width;
      //   } else if (index >= leadingControlColumns.length + columns.length) {
      //     // this is a trailing control column
      //     return trailingControlColumns[
      //       index - leadingControlColumns.length - columns.length
      //     ].width;
      //   }
      //   // normal data column
      //   return (
      //     columnWidths[columns[index - leadingControlColumns.length].id] ||
      //     defaultColumnWidth ||
      //     100
      //   );
      // }}
      height={
        ROW_HEIGHT * visibleRowIndices.length +
        SCROLLBAR_HEIGHT +
        HEADER_ROW_HEIGHT +
        (footerRow ? FOOTER_ROW_HEIGHT : 0)
      }
      rowHeight={getRowHeight.current}
      itemData={{
        rowMap,
        rowOffset: pagination ? pagination.pageIndex * pagination.pageSize : 0,
        leadingControlColumns,
        trailingControlColumns,
        columns,
        schema,
        popoverContents: mergedPopoverContents,
        columnWidths,
        defaultColumnWidth,
        renderCellValue,
        interactiveCellId,
      }}
      rowCount={visibleRowIndices.length}>
      {Cell}
    </Grid>
  );

  // const rows = useMemo(() => {
  //   const rowsToRender = visibleRowIndices.map((rowIndex, i) => {
  //     rowIndex = rowMap.hasOwnProperty(rowIndex) ? rowMap[rowIndex] : rowIndex;
  //     return (
  //       <EuiDataGridDataRow
  //         key={rowIndex}
  //         leadingControlColumns={leadingControlColumns}
  //         trailingControlColumns={trailingControlColumns}
  //         columns={columns}
  //         schema={schema}
  //         popoverContents={mergedPopoverContents}
  //         columnWidths={columnWidths}
  //         defaultColumnWidth={defaultColumnWidth}
  //         focusedCellPositionInTheRow={
  //           focusedCell != null && i === focusedCell[1] ? focusedCell[0] : null
  //         }
  //         onCellFocus={onCellFocus}
  //         renderCellValue={renderCellValue}
  //         rowIndex={rowIndex}
  //         visibleRowIndex={i}
  //         interactiveCellId={interactiveCellId}
  //       />
  //     );
  //   });
  //
  //   if (renderFooterCellValue) {
  //     rowsToRender.push(
  //       <EuiDataGridFooterRow
  //         key="footerRow"
  //         leadingControlColumns={leadingControlColumns}
  //         trailingControlColumns={trailingControlColumns}
  //         columns={columns}
  //         schema={schema}
  //         popoverContents={mergedPopoverContents}
  //         columnWidths={columnWidths}
  //         defaultColumnWidth={defaultColumnWidth}
  //         focusedCellPositionInTheRow={
  //           focusedCell != null && visibleRowIndices.length === focusedCell[1]
  //             ? focusedCell[0]
  //             : null
  //         }
  //         onCellFocus={onCellFocus}
  //         renderCellValue={renderFooterCellValue}
  //         rowIndex={visibleRowIndices.length}
  //         visibleRowIndex={visibleRowIndices.length}
  //         interactiveCellId={interactiveCellId}
  //       />
  //     );
  //   }
  //
  //   return rowsToRender;
  // }, [
  //   leadingControlColumns,
  //   trailingControlColumns,
  //   defaultColumnWidth,
  //   setColumnWidth,
  //   schema,
  //   sorting,
  //   headerIsInteractive,
  //   columnWidths,
  //   columns,
  //   schema,
  //   mergedPopoverContents,
  //   columnWidths,
  //   defaultColumnWidth,
  //   focusedCell,
  //   onCellFocus,
  //   renderCellValue,
  //   renderFooterCellValue,
  //   interactiveCellId,
  // ]);
  //
  // return <Fragment>{rows}</Fragment>;
};
