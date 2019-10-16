import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
  Fragment,
  ReactChild,
  useMemo,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';
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
  EuiDataGridExpansionFormatters,
  EuiDataGridColumnVisibility,
  EuiDataGridTooBarDisplayOptions,
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
import { EuiDataGridInMemoryRenderer } from './data_grid_inmemory_renderer';
import {
  getMergedSchema,
  SchemaDetector,
  useDetectSchema,
  schemaDetectors as providedSchemaDetectors,
} from './data_grid_schema';
import { useColumnSorting } from './column_sorting';
import { EuiMutationObserver } from '../observer/mutation_observer';

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    columns: EuiDataGridColumn[];
    columnVisibility: EuiDataGridColumnVisibility;
    schemaDetectors?: SchemaDetector[];
    expansionFormatters?: EuiDataGridExpansionFormatters;
    rowCount: number;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    gridStyle?: EuiDataGridStyle;
    toolbarDisplay?: boolean | EuiDataGridTooBarDisplayOptions;
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
  setHasRoomForGridControls: (hasRoomForGridControls: boolean) => void,
  isFullScreen: boolean
) {
  return useCallback(
    ({ width }: { width: number }) => {
      setHasRoomForGridControls(
        width > MINIMUM_WIDTH_FOR_GRID_CONTROLS || isFullScreen
      );
    },
    [setHasRoomForGridControls, isFullScreen]
  );
}

function useInMemoryValues(
  inMemory: EuiDataGridInMemory | undefined,
  rowCount: number
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
        const nextInMemoryValues = { ...inMemoryValues };
        nextInMemoryValues[rowIndex] = nextInMemoryValues[rowIndex] || {};
        nextInMemoryValues[rowIndex][column.id] = value;
        return nextInMemoryValues;
      });
    },
    [setInMemoryValues]
  );

  // if `inMemory.level` or `rowCount` changes reset the values
  const inMemoryLevel = inMemory && inMemory.level;
  useEffect(() => {
    setInMemoryValues({});
  }, [inMemoryLevel, rowCount]);

  return [inMemoryValues, onCellRender];
}

function createKeyDownHandler(
  props: EuiDataGridProps,
  visibleColumns: EuiDataGridProps['columns'],
  focusedCell: [number, number],
  headerIsInteractive: boolean,
  setFocusedCell: (focusedCell: [number, number]) => void
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    const colCount = visibleColumns.length - 1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { keyCode } = event;

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
        const minimumIndex = headerIsInteractive ? -1 : 0;
        if (y > minimumIndex) {
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
  };
}

export const EuiDataGrid: FunctionComponent<EuiDataGridProps> = props => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hasRoomForGridControls, setHasRoomForGridControls] = useState(true);
  const [focusedCell, setFocusedCell] = useState<[number, number] | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [interactiveCellId] = useState(htmlIdGenerator()());

  const [headerIsInteractive, setHeaderIsInteractive] = useState(false);
  const handleHeaderChange = useCallback<MutationCallback>(
    records => {
      const [{ target }] = records;

      // find the wrapping header div
      let headerRow = target.parentElement;
      while (
        headerRow &&
        (headerRow.getAttribute('data-test-subj') || '').indexOf(
          'dataGridHeader'
        ) === -1
      ) {
        headerRow = headerRow.parentElement;
      }

      if (headerRow) {
        const tabbables = tabbable(headerRow);
        const managed = headerRow.querySelectorAll(
          '[data-euigrid-tab-managed]'
        );
        const hasInteractives = tabbables.length > 0 || managed.length > 0;
        if (hasInteractives !== headerIsInteractive) {
          setHeaderIsInteractive(hasInteractives);

          // if the focus is on the header, and the header is no longer interactive
          // move the focus down to the first row
          if (
            hasInteractives === false &&
            focusedCell &&
            focusedCell[1] === -1
          ) {
            setFocusedCell([focusedCell[0], 0]);
          }
        }
      }
    },
    [headerIsInteractive, setHeaderIsInteractive, focusedCell, setFocusedCell]
  );

  const [columnWidths, setColumnWidth] = useColumnWidths();

  // enables/disables grid controls based on available width
  const onResize = useOnResize(nextHasRoomForGridControls => {
    if (nextHasRoomForGridControls !== hasRoomForGridControls) {
      setHasRoomForGridControls(nextHasRoomForGridControls);
    }
  }, isFullScreen);

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
    columnVisibility,
    schemaDetectors,
    rowCount,
    renderCellValue,
    className,
    gridStyle,
    toolbarDisplay = true,
    pagination,
    sorting,
    inMemory,
    expansionFormatters,
    ...rest
  } = props;

  // apply style props on top of defaults
  const gridStyleWithDefaults = { ...startingStyles, ...gridStyle };

  const [inMemoryValues, onCellRender] = useInMemoryValues(inMemory, rowCount);

  const allSchemaDetetors = useMemo(
    () => [...providedSchemaDetectors, ...(schemaDetectors || [])],
    [schemaDetectors]
  );
  const detectedSchema = useDetectSchema(
    inMemoryValues,
    allSchemaDetetors,
    inMemory != null
  );
  const mergedSchema = getMergedSchema(detectedSchema, columns);

  const [columnSelector, orderedVisibleColumns] = useColumnSelector(
    columns,
    columnVisibility
  );
  const columnSorting = useColumnSorting(
    orderedVisibleColumns,
    sorting,
    detectedSchema
  );
  const [styleSelector, gridStyles] = useStyleSelector(gridStyleWithDefaults);

  // compute the default column width from the container's clientWidth and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    containerRef,
    orderedVisibleColumns
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

  // By default the toolbar appears
  const showToolbar = !!toolbarDisplay;

  // Typegaurd to see if toolbarDisplay has a certain boolean property assigned
  // If not, just set it to true and assume it's OK to show
  function checkOrDefaultToolBarDiplayOptions(
    arg: EuiDataGridProps['toolbarDisplay'],
    option: keyof EuiDataGridTooBarDisplayOptions
  ): boolean {
    if (arg === undefined) {
      return true;
    } else if (typeof arg === 'boolean') {
      return arg as boolean;
    } else if (
      (arg as EuiDataGridTooBarDisplayOptions).hasOwnProperty(option)
    ) {
      return arg[option]!;
    } else {
      return true;
    }
  }

  // These grid controls will only show when there is room. Check the resize observer callback
  // They can also be optionally turned off individually by using toolbarDisplay
  const gridControls = (
    <Fragment>
      {checkOrDefaultToolBarDiplayOptions(toolbarDisplay, 'showColumnSelector')
        ? columnSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(toolbarDisplay, 'showStyleSelector')
        ? styleSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(toolbarDisplay, 'showSortSelector')
        ? columnSorting
        : null}
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

  const realizedFocusedCell: [number, number] =
    focusedCell || (headerIsInteractive ? [0, -1] : [0, 0]);

  const fullScreenSelector = (
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
          data-test-subj="dataGridFullScrenButton"
          onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? fullScreenButtonActive : fullScreenButton}
        </EuiButtonEmpty>
      )}
    </EuiI18n>
  );

  return (
    <EuiFocusTrap disabled={!isFullScreen} style={{ height: '100%' }}>
      <div
        className={classes}
        onKeyDown={handleGridKeyDown}
        ref={setContainerRef}>
        {showToolbar ? (
          <div
            className="euiDataGrid__controls"
            data-test-sub="dataGridControls">
            {hasRoomForGridControls ? gridControls : null}
            {checkOrDefaultToolBarDiplayOptions(
              toolbarDisplay,
              'showFullscrenSelector'
            )
              ? fullScreenSelector
              : null}
          </div>
        ) : null}
        <EuiResizeObserver onResize={onResize}>
          {resizeRef => (
            <div
              onKeyDown={createKeyDownHandler(
                props,
                orderedVisibleColumns,
                realizedFocusedCell,
                headerIsInteractive,
                setFocusedCell
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
                  <EuiMutationObserver
                    observerOptions={{
                      subtree: true,
                      childList: true,
                    }}
                    onMutation={handleHeaderChange}>
                    {ref => (
                      <EuiDataGridHeaderRow
                        ref={ref}
                        columns={orderedVisibleColumns}
                        columnWidths={columnWidths}
                        defaultColumnWidth={defaultColumnWidth}
                        setColumnWidth={setColumnWidth}
                        schema={mergedSchema}
                        sorting={sorting}
                        headerIsInteractive={headerIsInteractive}
                        focusedCell={realizedFocusedCell}
                        setFocusedCell={setFocusedCell}
                      />
                    )}
                  </EuiMutationObserver>
                  <EuiDataGridBody
                    columnWidths={columnWidths}
                    defaultColumnWidth={defaultColumnWidth}
                    inMemoryValues={inMemoryValues}
                    inMemory={inMemory}
                    columns={orderedVisibleColumns}
                    schema={mergedSchema}
                    schemaDetectors={allSchemaDetetors}
                    expansionFormatters={expansionFormatters}
                    focusedCell={realizedFocusedCell}
                    onCellFocus={setFocusedCell}
                    pagination={pagination}
                    sorting={sorting}
                    renderCellValue={renderCellValue}
                    rowCount={rowCount}
                    interactiveCellId={interactiveCellId}
                  />
                </div>
              </div>
            </div>
          )}
        </EuiResizeObserver>

        {renderPagination(props)}
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
