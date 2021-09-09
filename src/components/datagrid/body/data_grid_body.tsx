/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  forwardRef,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
  VariableSizeGridProps,
} from 'react-window';
import tabbable from 'tabbable';
import {
  EuiMutationObserver,
  useMutationObserver,
} from '../../observer/mutation_observer';
import { useResizeObserver } from '../../observer/resize_observer';
import { EuiDataGridCell } from './data_grid_cell';
import {
  DataGridSortingContext,
  DataGridWrapperRowsContext,
} from '../data_grid_context';
import { defaultComparator } from '../data_grid_schema';
import { EuiDataGridFooterRow } from './data_grid_footer_row';
import { EuiDataGridHeaderRow } from './header';
import {
  DefaultColumnFormatter,
  providedPopoverContents,
} from './popover_utils';
import {
  EuiDataGridBodyProps,
  EuiDataGridInMemoryValues,
  EuiDataGridSchemaDetector,
} from '../data_grid_types';

export const VIRTUALIZED_CONTAINER_CLASS = 'euiDataGrid__virtualized';

const Cell: FunctionComponent<GridChildComponentProps> = ({
  columnIndex,
  rowIndex: visibleRowIndex,
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
    setRowHeight,
    schemaDetectors,
    rowHeightsOptions,
    getRowHeight,
  } = data;

  const { headerRowHeight } = useContext(DataGridWrapperRowsContext);

  const offsetRowIndex = visibleRowIndex + rowOffset;

  const rowIndex = rowMap.hasOwnProperty(offsetRowIndex)
    ? rowMap[offsetRowIndex]
    : offsetRowIndex;

  let cellContent;

  const isFirstColumn = columnIndex === 0;
  const isLastColumn =
    columnIndex ===
    columns.length +
      leadingControlColumns.length +
      trailingControlColumns.length -
      1;
  const isStripableRow = rowIndex % 2 !== 0;

  const isLeadingControlColumn = columnIndex < leadingControlColumns.length;
  const isTrailingControlColumn =
    columnIndex >= leadingControlColumns.length + columns.length;

  const dataColumnIndex = columnIndex - leadingControlColumns.length;
  const column = columns[dataColumnIndex];
  const columnId = column?.id;

  const transformClass = schemaDetectors.filter(
    (row: EuiDataGridSchemaDetector) => {
      return column?.schema
        ? column?.schema === row.type
        : columnId === row.type;
    }
  )[0];
  const textTransform = transformClass?.textTransform;

  const classes = classNames({
    'euiDataGridRowCell--stripe': isStripableRow,
    'euiDataGridRowCell--firstColumn': isFirstColumn,
    'euiDataGridRowCell--lastColumn': isLastColumn,
    'euiDataGridRowCell--controlColumn':
      isLeadingControlColumn || isTrailingControlColumn,
    [`euiDataGridRowCell--${textTransform}`]: textTransform,
  });

  if (isLeadingControlColumn) {
    const leadingColumn = leadingControlColumns[columnIndex];
    const { id, rowCellRender } = leadingColumn;

    cellContent = (
      <EuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={visibleRowIndex}
        colIndex={columnIndex}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={leadingColumn.width}
        renderCellValue={rowCellRender}
        interactiveCellId={interactiveCellId}
        isExpandable={false}
        className={classes}
        setRowHeight={setRowHeight}
        getRowHeight={getRowHeight}
        rowHeightsOptions={rowHeightsOptions}
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + headerRowHeight}px`,
        }}
      />
    );
  } else if (isTrailingControlColumn) {
    const columnOffset = columns.length + leadingControlColumns.length;
    const trailingColumnIndex = columnIndex - columnOffset;
    const trailingColumn = trailingControlColumns[trailingColumnIndex];
    const { id, rowCellRender } = trailingColumn;

    cellContent = (
      <EuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={visibleRowIndex}
        colIndex={columnIndex}
        columnId={id}
        popoverContent={DefaultColumnFormatter}
        width={trailingColumn.width}
        renderCellValue={rowCellRender}
        interactiveCellId={interactiveCellId}
        isExpandable={false}
        className={classes}
        rowHeightsOptions={rowHeightsOptions}
        getRowHeight={getRowHeight}
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + headerRowHeight}px`,
        }}
      />
    );
  } else {
    // this is a normal data cell

    // offset the column index by the leading control columns
    const columnType = schema[columnId] ? schema[columnId].columnType : null;

    const isExpandable =
      column.isExpandable !== undefined ? column.isExpandable : true;

    const popoverContent =
      popoverContents[columnType as string] || DefaultColumnFormatter;

    const width = columnWidths[columnId] || defaultColumnWidth;

    cellContent = (
      <EuiDataGridCell
        rowIndex={rowIndex}
        visibleRowIndex={visibleRowIndex}
        colIndex={columnIndex}
        columnId={columnId}
        column={column}
        columnType={columnType}
        popoverContent={popoverContent}
        width={width || undefined}
        renderCellValue={renderCellValue}
        interactiveCellId={interactiveCellId}
        isExpandable={isExpandable}
        className={classes}
        rowHeightsOptions={rowHeightsOptions}
        getRowHeight={getRowHeight}
        style={{
          ...style,
          top: `${parseFloat(style.top as string) + headerRowHeight}px`,
        }}
      />
    );
  }

  return cellContent;
};

const InnerElement: VariableSizeGridProps['innerElementType'] = forwardRef<
  HTMLDivElement,
  { style: { height: number } }
>(({ children, style, ...rest }, ref) => {
  const { headerRowHeight, headerRow, footerRow } = useContext(
    DataGridWrapperRowsContext
  );
  return (
    <>
      <div
        ref={ref}
        style={{
          ...style,
          height: style.height + headerRowHeight,
        }}
        {...rest}
      >
        {headerRow}
        {children}
      </div>
      {footerRow}
    </>
  );
});
InnerElement.displayName = 'EuiDataGridInnerElement';

const INITIAL_ROW_HEIGHT = 34;
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

/**
 * getParentCellContent is called by the grid body's mutation observer,
 * which exists to pick up DOM changes in cells and remove interactive elements
 * from the page's tab index, as we want to move between cells via arrow keys
 * instead of tabbing.
 *
 * So we start with a Node or HTMLElement returned by a mutation record
 * and search its ancestors for a div[data-datagrid-cellcontent], if any,
 * which is a valid target for disabling tabbing within
 */
function getParentCellContent(_element: Node | HTMLElement) {
  let element: HTMLElement | null =
    _element.nodeType === document.ELEMENT_NODE
      ? (_element as HTMLElement)
      : _element.parentElement;

  while (
    element &&
    element.nodeName !== 'div' &&
    element.hasAttribute('data-datagrid-cellcontent')
  ) {
    element = element.parentElement;
  }
  return element;
}

export const EuiDataGridBody: FunctionComponent<EuiDataGridBodyProps> = (
  props
) => {
  const {
    isFullScreen,
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
    toolbarHeight,
    rowHeightsOptions,
    rowHeightUtils,
    gridStyles,
  } = props;

  const [headerRowRef, setHeaderRowRef] = useState<HTMLDivElement | null>(null);
  const [footerRowRef, setFooterRowRef] = useState<HTMLDivElement | null>(null);

  useMutationObserver(headerRowRef, handleHeaderMutation, {
    subtree: true,
    childList: true,
  });
  const { height: headerRowHeight } = useResizeObserver(headerRowRef, 'height');
  const { height: footerRowHeight } = useResizeObserver(footerRowRef, 'height');

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
  const sortingColumns = sorting?.columns;

  const rowMap = useMemo(() => {
    const rowMap: { [key: number]: number } = {};

    if (
      inMemory?.level === 'sorting' &&
      sortingColumns != null &&
      sortingColumns.length > 0
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
        for (let i = 0; i < sortingColumns.length; i++) {
          const column = sortingColumns[i];
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
  }, [
    sortingColumns,
    inMemoryValues,
    schema,
    schemaDetectors,
    inMemory?.level,
  ]);

  const mergedPopoverContents = useMemo(
    () => ({
      ...providedPopoverContents,
      ...popoverContents,
    }),
    [popoverContents]
  );

  const headerRow = useMemo(() => {
    return (
      <EuiDataGridHeaderRow
        ref={setHeaderRowRef}
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
    );
  }, [
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
        ref={setFooterRowRef}
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

  const paginationOffset = pagination
    ? pagination.pageIndex * pagination.pageSize
    : 0;
  const getCorrectRowIndex = useCallback(
    (rowIndex: number) => {
      let rowIndexWithOffset = rowIndex;

      if (rowIndex - paginationOffset <= 0) {
        rowIndexWithOffset = rowIndex + paginationOffset;
      }

      const correctRowIndex = rowMap.hasOwnProperty(rowIndexWithOffset)
        ? rowMap[rowIndexWithOffset]
        : rowIndexWithOffset;

      return correctRowIndex;
    },
    [paginationOffset, rowMap]
  );

  const gridRef = useRef<Grid>(null);
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterColumnIndex(0);
    }
  }, [columns, columnWidths, defaultColumnWidth]);

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

  const [minRowHeight, setRowHeight] = useState(INITIAL_ROW_HEIGHT);
  const defaultHeight = useMemo(
    () =>
      rowHeightsOptions?.defaultHeight
        ? rowHeightUtils.getCalculatedHeight(
            rowHeightsOptions.defaultHeight,
            minRowHeight
          )
        : minRowHeight,
    [rowHeightsOptions, minRowHeight, rowHeightUtils]
  );

  const getRowHeight = useCallback(
    (rowIndex) => {
      const correctRowIndex = getCorrectRowIndex(rowIndex);
      let height = defaultHeight;

      if (rowHeightsOptions) {
        if (rowHeightsOptions.rowHeights) {
          const initialHeight = rowHeightsOptions.rowHeights[correctRowIndex];

          if (initialHeight) {
            height = rowHeightUtils.getCalculatedHeight(
              initialHeight,
              minRowHeight
            );
          }
        }
      }

      return height;
    },
    [
      minRowHeight,
      rowHeightsOptions,
      getCorrectRowIndex,
      rowHeightUtils,
      defaultHeight,
    ]
  );

  useEffect(() => {
    if (gridRef.current && rowHeightsOptions) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [pagination?.pageIndex, rowHeightsOptions, gridStyles]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.resetAfterRowIndex(0);
    }
  }, [getRowHeight]);

  const rowCountToAffordFor = pagination
    ? pagination.pageSize
    : visibleRowIndices.length;
  const unconstrainedHeight =
    defaultHeight * rowCountToAffordFor + headerRowHeight + footerRowHeight;

  // unable to determine this until the container's size is known anyway
  const unconstrainedWidth = 0;

  const [height, setHeight] = useState<number | undefined>(undefined);
  const [width, setWidth] = useState<number | undefined>(undefined);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperDimensions = useResizeObserver(wrapperRef.current);

  // reset height constraint when rowCount changes
  useEffect(() => {
    setHeight(wrapperRef.current!.getBoundingClientRect().height);
  }, [rowCount]);

  useEffect(() => {
    const boundingRect = wrapperRef.current!.getBoundingClientRect();

    if (boundingRect.height !== unconstrainedHeight && !isFullScreen) {
      setHeight(boundingRect.height);
    }
    if (boundingRect.width !== unconstrainedWidth) {
      setWidth(boundingRect.width);
    }
  }, [unconstrainedHeight, wrapperDimensions, isFullScreen]);

  const preventTabbing = useCallback((records: MutationRecord[]) => {
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      // find the cell content owning this mutation
      const cell = getParentCellContent(record.target);

      if (cell) {
        // if we found it, disable tabbable elements
        const tabbables = tabbable(cell);
        for (let i = 0; i < tabbables.length; i++) {
          const element = tabbables[i];
          if (
            element.getAttribute('role') !== 'gridcell' &&
            !element.dataset['euigrid-tab-managed']
          ) {
            element.setAttribute('tabIndex', '-1');
            element.setAttribute('data-datagrid-interactable', 'true');
          }
        }
      }
    }
  }, []);

  let finalHeight = IS_JEST_ENVIRONMENT
    ? Number.MAX_SAFE_INTEGER
    : height || unconstrainedHeight;
  let finalWidth = IS_JEST_ENVIRONMENT
    ? Number.MAX_SAFE_INTEGER
    : width || unconstrainedWidth;
  if (isFullScreen) {
    finalHeight =
      window.innerHeight - toolbarHeight - headerRowHeight - footerRowHeight;
    finalWidth = window.innerWidth;
  }

  return (
    <EuiMutationObserver
      observerOptions={{ subtree: true, childList: true }}
      onMutation={preventTabbing}
    >
      {(mutationRef) => (
        <div
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          ref={(el) => {
            wrapperRef.current = el;
            mutationRef(el);
          }}
        >
          {(IS_JEST_ENVIRONMENT || finalWidth > 0) && (
            <DataGridWrapperRowsContext.Provider
              value={{ headerRowHeight, headerRow, footerRow }}
            >
              <Grid
                ref={gridRef}
                innerElementType={InnerElement}
                className={VIRTUALIZED_CONTAINER_CLASS}
                columnCount={
                  leadingControlColumns.length +
                  columns.length +
                  trailingControlColumns.length
                }
                width={finalWidth}
                columnWidth={getWidth}
                height={finalHeight}
                rowHeight={getRowHeight}
                itemData={{
                  schemaDetectors,
                  setRowHeight,
                  getRowHeight,
                  getCorrectRowIndex,
                  rowMap,
                  rowOffset: pagination
                    ? pagination.pageIndex * pagination.pageSize
                    : 0,
                  leadingControlColumns,
                  trailingControlColumns,
                  columns,
                  schema,
                  popoverContents: mergedPopoverContents,
                  columnWidths,
                  defaultColumnWidth,
                  renderCellValue,
                  interactiveCellId,
                  rowHeightsOptions,
                }}
                rowCount={
                  IS_JEST_ENVIRONMENT || headerRowHeight > 0
                    ? visibleRowIndices.length
                    : 0
                }
              >
                {Cell}
              </Grid>
            </DataGridWrapperRowsContext.Provider>
          )}
        </div>
      )}
    </EuiMutationObserver>
  );
};
