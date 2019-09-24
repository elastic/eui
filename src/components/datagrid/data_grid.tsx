import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
  Fragment,
  ReactChild,
} from 'react';
import classNames from 'classnames';
import { EuiI18n } from '../i18n';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { CommonProps, Omit } from '../common';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridInMemory,
  EuiDataGridPaginationProps,
  EuiDataGridInMemoryValues,
  EuiDataGridSorting,
  EuiDataGridStyle,
  EuiDataGridStyleBorders,
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyleHeader,
  EuiDataGridStyleRowHover,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
// @ts-ignore-next-line
import { EuiButtonEmpty } from '../button';
import { keyCodes, htmlIdGenerator } from '../../services';
import { EuiDataGridBody } from './data_grid_body';
import { useColumnSelector } from './column_selector';
import { useStyleSelector, startingStyles } from './style_selector';
// @ts-ignore-next-line
import { EuiTablePagination } from '../table/table_pagination';
// @ts-ignore-next-line
import { EuiFocusTrap } from '../focus_trap';
import { EuiResizeObserver } from '../observer/resize_observer';
import { CELL_CONTENTS_ATTR } from './utils';
import { EuiDataGridInMemoryRenderer } from './data_grid_inmemory_renderer';
import {
  getMergedSchema,
  SchemaDetector,
  useDetectSchema,
} from './data_grid_schema';

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    schemaDetectors?: SchemaDetector[];
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    gridStyle?: EuiDataGridStyle;
    inMemory?: EuiDataGridInMemory;
    /**
     * Set to `null` to disable pagination
     */
    pagination?: EuiDataGridPaginationProps;
    /**
     * Set to `null` to disable sorting
     */
    sorting?: EuiDataGridSorting;
  };

// This structure forces either aria-label or aria-labelledby to be defined
// making some type of label a requirement
type EuiDataGridProps = Omit<
  CommonGridProps,
  'aria-label' | 'aria-labelledby'
> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

// Each gridStyle object above sets a specific CSS select to .euiGrid
const fontSizesToClassMap: { [size in EuiDataGridStyleFontSizes]: string } = {
  s: 'euiDataGrid--fontSizeSmall',
  m: '',
  l: 'euiDataGrid--fontSizeLarge',
};

const headerToClassMap: { [header in EuiDataGridStyleHeader]: string } = {
  shade: 'euiDataGrid--headerShade',
  underline: 'euiDataGrid--headerUnderline',
};

const rowHoverToClassMap: {
  [rowHighlight in EuiDataGridStyleRowHover]: string
} = {
  highlight: 'euiDataGrid--rowHoverHighlight',
  none: '',
};

const bordersToClassMap: { [border in EuiDataGridStyleBorders]: string } = {
  all: 'euiDataGrid--bordersAll',
  horizontal: 'euiDataGrid--bordersHorizontal',
  none: 'euiDataGrid--bordersNone',
};

const cellPaddingsToClassMap: {
  [cellPaddings in EuiDataGridStyleCellPaddings]: string
} = {
  s: 'euiDataGrid--paddingSmall',
  m: '',
  l: 'euiDataGrid--paddingLarge',
};
const ORIGIN: [number, number] = [0, 0];

// returns whether or not this element is a gridcell with CELL_CONTENTS_ATTR
const isInteractiveCell = (element: HTMLElement) => {
  if (element.getAttribute('role') !== 'gridcell') {
    return false;
  }
  return Boolean(element.querySelector(`[${CELL_CONTENTS_ATTR}="true"]`));
};

function computeVisibleRows(props: EuiDataGridProps) {
  const { pagination, rowCount } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  return endRow - startRow;
}

function renderPagination(props: EuiDataGridProps) {
  const { pagination } = props;

  if (pagination == null) {
    return null;
  }

  const {
    pageIndex,
    pageSize,
    pageSizeOptions,
    onChangePage,
    onChangeItemsPerPage,
  } = pagination;
  const pageCount = Math.ceil(props.rowCount / pageSize);

  return (
    <div className="euiDataGrid__pagination">
      <EuiTablePagination
        activePage={pageIndex}
        itemsPerPage={pageSize}
        itemsPerPageOptions={pageSizeOptions}
        pageCount={pageCount}
        onChangePage={onChangePage}
        onChangeItemsPerPage={onChangeItemsPerPage}
      />
    </div>
  );
}

function renderSorting(props: EuiDataGridProps) {
  const { columns, sorting } = props;

  if (sorting == null) return null;

  const sortedColumns = sorting.columns.reduce<{
    [key: string]: 'asc' | 'desc';
  }>((sortedColumns, { id, direction }) => {
    sortedColumns[id] = direction;
    return sortedColumns;
  }, {});

  return (
    <div>
      {columns.map(column => {
        let sortIcon = '☐';
        let nextSortDir: 'asc' | 'desc' | null = 'asc';
        if (sortedColumns.hasOwnProperty(column.id)) {
          sortIcon = sortedColumns[column.id] === 'asc' ? '⬆️' : '⬇️';
          nextSortDir = sortedColumns[column.id] === 'asc' ? 'desc' : null;
        }

        return (
          <div
            key={column.id}
            data-test-subj={`dataGrid-sortColumn-${column.id}-${
              sortedColumns.hasOwnProperty(column.id)
                ? sortedColumns[column.id]
                : 'off'
            }`}
            onClick={() => {
              const nextColumnOrder = [...sorting.columns];
              let foundColumn = false;

              for (let i = 0; i < nextColumnOrder.length; i++) {
                if (nextColumnOrder[i].id === column.id) {
                  foundColumn = true;

                  if (nextSortDir === null) {
                    nextColumnOrder.splice(i--, 1);
                  } else {
                    nextColumnOrder[i] = {
                      id: column.id,
                      direction: nextSortDir,
                    };
                  }
                }
              }

              if (foundColumn === false) {
                nextColumnOrder.push({
                  id: column.id,
                  direction: 'asc',
                });
              }

              sorting.onSort(nextColumnOrder);
            }}>
            {sortIcon}
            {column.id}
          </div>
        );
      })}
    </div>
  );
}

function useDefaultColumnWidth(
  container: HTMLElement | null,
  columns: EuiDataGridProps['columns']
): number | null {
  const [defaultColumnWidth, setDefaultColumnWidth] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (container != null) {
      const gridWidth = container.clientWidth;
      const columnWidth = Math.max(gridWidth / columns.length, 100);
      setDefaultColumnWidth(columnWidth);
    }
  }, [container, columns]);

  return defaultColumnWidth;
}

function useColumnWidths(): [
  EuiDataGridColumnWidths,
  (columnId: string, width: number) => void
] {
  const [columnWidths, setColumnWidths] = useState<EuiDataGridColumnWidths>({});
  const setColumnWidth = (columnId: string, width: number) => {
    setColumnWidths({ ...columnWidths, [columnId]: width });
  };
  return [columnWidths, setColumnWidth];
}

function useOnResize(
  setShowGridControls: (showGridControls: boolean) => void,
  isFullScreen: boolean
) {
  return useCallback(
    ({ width }: { width: number }) => {
      setShowGridControls(
        width > MINIMUM_WIDTH_FOR_GRID_CONTROLS || isFullScreen
      );
    },
    [setShowGridControls, isFullScreen]
  );
}

function useInMemoryValues(
  inMemory?: EuiDataGridInMemory
): [
  EuiDataGridInMemoryValues,
  (rowIndex: number, column: EuiDataGridColumn, value: string) => void
] {
  const [inMemoryValues, setInMemoryValues] = useState<
    EuiDataGridInMemoryValues
  >({});

  const onCellRender = useCallback(
    (rowIndex, column, value) => {
      setInMemoryValues(inMemoryValues => {
        const nextInMemoryVaues = { ...inMemoryValues };
        nextInMemoryVaues[rowIndex] = nextInMemoryVaues[rowIndex] || {};
        nextInMemoryVaues[rowIndex][column.id] = value;
        return nextInMemoryVaues;
      });
    },
    [setInMemoryValues]
  );

  useEffect(() => {
    if (inMemory == null) {
      setInMemoryValues({});
    }
  }, [inMemory]);

  return [inMemoryValues, onCellRender];
}

function createKeyDownHandler(
  props: EuiDataGridProps,
  visibleColumns: EuiDataGridProps['columns'],
  focusedCell: [number, number],
  setFocusedCell: (focusedCell: [number, number]) => void,
  isGridNavigationEnabled: boolean,
  setIsGridNavigationEnabled: (isGridNavigationEnabled: boolean) => void
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    const colCount = visibleColumns.length - 1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { keyCode, target } = event;

    if (
      target instanceof HTMLElement &&
      isInteractiveCell(target) &&
      isGridNavigationEnabled &&
      (keyCode === keyCodes.ENTER || keyCode === keyCodes.F2)
    ) {
      setIsGridNavigationEnabled(false);
    } else if (
      !isGridNavigationEnabled &&
      (keyCode === keyCodes.ESCAPE || keyCode === keyCodes.F2)
    ) {
      setIsGridNavigationEnabled(true);
    }

    if (isGridNavigationEnabled) {
      switch (keyCode) {
        case keyCodes.DOWN:
          event.preventDefault();
          if (y < rowCount - 1) {
            setFocusedCell([x, y + 1]);
          }
          break;
        case keyCodes.LEFT:
          event.preventDefault();
          if (x > 0) {
            setFocusedCell([x - 1, y]);
          }
          break;
        case keyCodes.UP:
          event.preventDefault();
          // TODO sort out when a user can arrow up into the column headers
          if (y > 0) {
            setFocusedCell([x, y - 1]);
          }
          break;
        case keyCodes.RIGHT:
          event.preventDefault();
          if (x < colCount) {
            setFocusedCell([x + 1, y]);
          }
          break;
      }
    }
  };
}

export const EuiDataGrid: FunctionComponent<EuiDataGridProps> = props => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showGridControls, setShowGridControls] = useState(true);
  const [focusedCell, setFocusedCell] = useState<[number, number]>(ORIGIN);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [interactiveCellId] = useState(htmlIdGenerator()());

  const [columnWidths, setColumnWidth] = useColumnWidths();

  // enables/disables grid controls based on available width
  const onResize = useOnResize(setShowGridControls, isFullScreen);

  const [isGridNavigationEnabled, setIsGridNavigationEnabled] = useState<
    boolean
  >(true);

  const handleGridKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case keyCodes.ESCAPE:
        if (isFullScreen) {
          e.preventDefault();
          setIsFullScreen(false);
        }
        break;
    }
  };

  const {
    columns,
    schemaDetectors,
    rowCount,
    renderCellValue,
    className,
    gridStyle,
    pagination,
    sorting,
    inMemory,
    ...rest
  } = props;

  // apply style props on top of defaults
  const gridStyleWithDefaults = { ...startingStyles, ...gridStyle };

  const [columnSelector, visibleColumns] = useColumnSelector(columns);
  const [styleSelector, gridStyles] = useStyleSelector(gridStyleWithDefaults);

  // compute the default column width from the container's clientWidth and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    containerRef,
    visibleColumns
  );

  const classes = classNames(
    'euiDataGrid',
    fontSizesToClassMap[gridStyles.fontSize!],
    bordersToClassMap[gridStyles.border!],
    headerToClassMap[gridStyles.header!],
    rowHoverToClassMap[gridStyles.rowHover!],
    cellPaddingsToClassMap[gridStyles.cellPadding!],
    {
      'euiDataGrid--stripes': gridStyles.stripes!,
    },
    {
      'euiDataGrid--fullScreen': isFullScreen,
    },
    className
  );

  const controlBtnClasses = classNames(
    'euiDataGrid__controlBtn',
    {
      'euiDataGrid__controlBtn--active': isFullScreen,
    },
    className
  );

  const [inMemoryValues, onCellRender] = useInMemoryValues(inMemory);

  const detectedSchema = useDetectSchema(
    inMemoryValues,
    schemaDetectors,
    inMemory != null
  );
  const mergedSchema = getMergedSchema(detectedSchema, columns);

  // These grid controls will only show when there is room. Check the resize observer callback
  const gridControls = (
    <Fragment>
      {columnSelector}
      {styleSelector}
    </Fragment>
  );

  // When data grid is full screen, we add a class to the body to remove the extra scrollbar
  if (isFullScreen) {
    document.body.classList.add('euiDataGrid__restrictBody');
  } else {
    document.body.classList.remove('euiDataGrid__restrictBody');
  }

  // extract aria-label and/or aria-labelledby from `rest`
  const gridAriaProps: {
    'aria-label'?: string;
    'aria-labelledby'?: string;
  } = {};
  if ('aria-label' in rest) {
    gridAriaProps['aria-label'] = rest['aria-label'];
    delete rest['aria-label'];
  }
  if ('aria-labelledby' in rest) {
    gridAriaProps['aria-labelledby'] = rest['aria-labelledby'];
    delete rest['aria-labelledby'];
  }

  return (
    <EuiFocusTrap disabled={!isFullScreen} style={{ height: '100%' }}>
      <div
        className={classes}
        onKeyDown={handleGridKeyDown}
        ref={setContainerRef}>
        <div className="euiDataGrid__controls">
          {showGridControls ? gridControls : null}
          <EuiI18n
            tokens={[
              'euiDataGrid.fullScreenButton',
              'euiDataGrid.fullScreenButtonActive',
            ]}
            defaults={['Full screen', 'Exit full screen']}>
            {([fullScreenButton, fullScreenButtonActive]: ReactChild[]) => (
              <EuiButtonEmpty
                size="xs"
                iconType="fullScreen"
                color="text"
                className={controlBtnClasses}
                onClick={() => setIsFullScreen(!isFullScreen)}
                onKeyDown={() => handleGridKeyDown}>
                {isFullScreen ? fullScreenButtonActive : fullScreenButton}
              </EuiButtonEmpty>
            )}
          </EuiI18n>
        </div>
        {/* Unsure why this element causes errors as focus follows spec */}
        {/* eslint-disable jsx-a11y/interactive-supports-focus */}
        <EuiResizeObserver onResize={onResize}>
          {resizeRef => (
            <div
              onKeyDown={createKeyDownHandler(
                props,
                visibleColumns,
                focusedCell,
                setFocusedCell,
                isGridNavigationEnabled,
                setIsGridNavigationEnabled
              )}
              className="euiDataGrid__verticalScroll"
              ref={resizeRef}
              {...rest}>
              <div className="euiDataGrid__overflow">
                {inMemory ? (
                  <EuiDataGridInMemoryRenderer
                    inMemory={inMemory}
                    renderCellValue={renderCellValue}
                    columns={columns}
                    rowCount={
                      inMemory.level === 'enhancements'
                        ? // if `inMemory.level === enhancements` then we can only be sure the pagination's pageSize is available in memory
                          (pagination && pagination.pageSize) || rowCount
                        : // otherwise, all of the data is present and usable
                          rowCount
                    }
                    onCellRender={onCellRender}
                  />
                ) : null}
                <div
                  className="euiDataGrid__content"
                  role="grid"
                  {...gridAriaProps}>
                  <EuiDataGridHeaderRow
                    columns={visibleColumns}
                    columnWidths={columnWidths}
                    defaultColumnWidth={defaultColumnWidth}
                    setColumnWidth={setColumnWidth}
                    schema={mergedSchema}
                  />
                  <EuiDataGridBody
                    columnWidths={columnWidths}
                    defaultColumnWidth={defaultColumnWidth}
                    inMemoryValues={inMemoryValues}
                    inMemory={inMemory}
                    columns={visibleColumns}
                    schema={mergedSchema}
                    focusedCell={focusedCell}
                    onCellFocus={setFocusedCell}
                    pagination={pagination}
                    sorting={sorting}
                    renderCellValue={renderCellValue}
                    rowCount={rowCount}
                    isGridNavigationEnabled={isGridNavigationEnabled}
                    interactiveCellId={interactiveCellId}
                  />
                </div>
              </div>
            </div>
          )}
        </EuiResizeObserver>

        {renderPagination(props)}
        {renderSorting(props)}
        <p id={interactiveCellId} hidden>
          <EuiI18n
            token="euiDataGrid.screenReaderNotice"
            default="Cell contains interactive content."
          />
          {/* TODO: if no keyboard shortcuts panel gets built, add keyboard shortcut info here */}
        </p>
      </div>
    </EuiFocusTrap>
  );
};
