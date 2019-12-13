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
import { CommonProps } from '../common';
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
  EuiDataGridPopoverContents,
  EuiDataGridColumnVisibility,
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridFocusedCell,
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
  useMergedSchema,
  EuiDataGridSchemaDetector,
  useDetectSchema,
  schemaDetectors as providedSchemaDetectors,
} from './data_grid_schema';
import { useColumnSorting } from './column_sorting';
import { EuiMutationObserver } from '../observer/mutation_observer';
import { DataGridContext } from './data_grid_context';

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of #EuiDataGridColumn objects. Lists the columns available and the schema and settings tied to it.
     */
    columns: EuiDataGridColumn[];
    /**
     * An array of #EuiDataGridColumnVisibility objects. Defines which columns are visible in the grid and the order they are displayed.
     */
    columnVisibility: EuiDataGridColumnVisibility;
    /**
     * An array of custom #EuiDataGridSchemaDetector objects. You can inject custom schemas to the grid to define the classnames applied
     */
    schemaDetectors?: EuiDataGridSchemaDetector[];
    /**
     * An object mapping #EuiDataGridColumn `schema`s to a custom popover formatting component which receives #EuiDataGridPopoverContent props
     */
    popoverContents?: EuiDataGridPopoverContents;
    /**
     * The total number of rows in the dataset (used by e.g. pagination to know how many pages to list)
     */
    rowCount: number;
    /**
     * A function called to render a cell's value. Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives a #CellValueElement
     * as its only argument.
     */
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    /**
     * Defines the look and feel for the grid. Accepts a partial #EuiDataGridStyle object. Settings provided may be overwritten or merged with user defined preferences if toolbarVisibility density controls are available.
     */
    gridStyle?: EuiDataGridStyle;
    /**
     * Accepts either a boolean or #EuiDataGridToolbarVisibilityOptions object. When used as a boolean, defines the display of the toolbar entire. WHen passed an object allows you to turn off individual controls within the toolbar as well as add additional buttons.
     */
    toolbarVisibility?: boolean | EuiDataGridToolBarVisibilityOptions;
    /**
     * A #EuiDataGridInMemory object to definite the level of high order schema-detection and sorting logic to use on your data. *Try to set when possible*. When ommited, disables all enhancements and assumes content is flat strings.
     */
    inMemory?: EuiDataGridInMemory;
    /**
     * A #EuiDataGridPagination object. Omit to disable pagination completely.
     */
    pagination?: EuiDataGridPaginationProps;
    /**
     * A #EuiDataGridSorting oject that provides the sorted columns along with their direction. Omit to disable, but you'll likely want to also turn off the user sorting controls through the `toolbarVisibility` prop.
     */
    sorting?: EuiDataGridSorting;
  };

// This structure forces either aria-label or aria-labelledby to be defined
// making some type of label a requirement
export type EuiDataGridProps = Omit<
  CommonGridProps,
  'aria-label' | 'aria-labelledby'
> &
  (
    | {
        /**
         * must provide either aria-label OR aria-labelledby as a title for the grid
         */
        'aria-label': string;
      }
    | {
        /**
         * must provide either aria-label OR aria-labelledby as a title for the grid
         */
        'aria-labelledby': string;
      });

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

function computeVisibleRows(
  props: Pick<EuiDataGridProps, 'pagination' | 'rowCount'>
) {
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

  if (pageCount === 1) {
    return null;
  }

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
  focusedCell: EuiDataGridFocusedCell,
  headerIsInteractive: boolean,
  setFocusedCell: (focusedCell: EuiDataGridFocusedCell) => void,
  updateFocus: Function
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    const colCount = visibleColumns.length - 1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { keyCode, ctrlKey } = event;

    if (keyCode === keyCodes.DOWN) {
      event.preventDefault();
      if (y < rowCount - 1) {
        setFocusedCell([x, y + 1]);
      }
    } else if (keyCode === keyCodes.LEFT) {
      event.preventDefault();
      if (x > 0) {
        setFocusedCell([x - 1, y]);
      }
    } else if (keyCode === keyCodes.UP) {
      event.preventDefault();
      const minimumIndex = headerIsInteractive ? -1 : 0;
      if (y > minimumIndex) {
        setFocusedCell([x, y - 1]);
      }
    } else if (keyCode === keyCodes.RIGHT) {
      event.preventDefault();
      if (x < colCount) {
        setFocusedCell([x + 1, y]);
      }
    } else if (keyCode === keyCodes.PAGE_DOWN) {
      if (props.pagination) {
        event.preventDefault();
        const rowCount = props.rowCount;
        const pageIndex = props.pagination.pageIndex;
        const pageSize = props.pagination.pageSize;
        const pageCount = Math.ceil(rowCount / pageSize);
        if (pageIndex < pageCount - 1) {
          props.pagination.onChangePage(pageIndex + 1);
          const newPageRowCount = computeVisibleRows({
            rowCount,
            pagination: {
              ...props.pagination,
              pageIndex: pageIndex + 1,
            },
          });
          const rowIndex =
            focusedCell[1] < newPageRowCount
              ? focusedCell[1]
              : newPageRowCount - 1;
          setFocusedCell([focusedCell[0], rowIndex]);
          updateFocus();
        }
      }
    } else if (keyCode === keyCodes.PAGE_UP) {
      if (props.pagination) {
        event.preventDefault();
        const pageIndex = props.pagination.pageIndex;
        if (pageIndex > 0) {
          props.pagination.onChangePage(pageIndex - 1);
          updateFocus();
        }
      }
    } else if (keyCode === (ctrlKey && keyCodes.END)) {
      event.preventDefault();
      setFocusedCell([colCount, rowCount - 1]);
    } else if (keyCode === (ctrlKey && keyCodes.HOME)) {
      event.preventDefault();
      setFocusedCell([0, 0]);
    } else if (keyCode === keyCodes.END) {
      event.preventDefault();
      setFocusedCell([colCount, y]);
    } else if (keyCode === keyCodes.HOME) {
      event.preventDefault();
      setFocusedCell([0, y]);
    }
  };
}

function useAfterRender(fn: Function): Function {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [needsExecution, setNeedsExecution] = useState(false);

  // first useEffect waits for the parent & children to render & flush to dom
  useEffect(() => {
    if (isSubscribed) {
      setIsSubscribed(false);
      setNeedsExecution(true);
    }
  }, [isSubscribed, setIsSubscribed, setNeedsExecution]);

  // second useEffect allows for a new `fn` to have been created
  // with any state updates before being called
  useEffect(() => {
    if (needsExecution) {
      setNeedsExecution(false);
      fn();
    }
  }, [needsExecution, setNeedsExecution, fn]);

  return () => {
    setIsSubscribed(true);
  };
}

export const EuiDataGrid: FunctionComponent<EuiDataGridProps> = props => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hasRoomForGridControls, setHasRoomForGridControls] = useState(true);
  const [focusedCell, setFocusedCell] = useState<EuiDataGridFocusedCell | null>(
    null
  );
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
    toolbarVisibility = true,
    pagination,
    sorting,
    inMemory,
    popoverContents,
    ...rest
  } = props;

  // apply style props on top of defaults
  const gridStyleWithDefaults = { ...startingStyles, ...gridStyle };

  const [inMemoryValues, onCellRender] = useInMemoryValues(inMemory, rowCount);

  const definedColumnSchemas = useMemo(() => {
    return columns.reduce<{ [key: string]: string }>(
      (definedColumnSchemas, { id, schema }) => {
        if (schema != null) {
          definedColumnSchemas[id] = schema;
        }
        return definedColumnSchemas;
      },
      {}
    );
  }, [columns]);

  const allSchemaDetectors = useMemo(
    () => [...providedSchemaDetectors, ...(schemaDetectors || [])],
    [schemaDetectors]
  );
  const detectedSchema = useDetectSchema(
    inMemory,
    inMemoryValues,
    allSchemaDetectors,
    definedColumnSchemas,
    inMemory != null
  );
  const mergedSchema = useMergedSchema(detectedSchema, columns);

  const [columnSelector, orderedVisibleColumns] = useColumnSelector(
    columns,
    columnVisibility
  );
  const columnSorting = useColumnSorting(
    orderedVisibleColumns,
    sorting,
    mergedSchema,
    allSchemaDetectors
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
  const showToolbar = !!toolbarVisibility;

  // Typeguards to see if toolbarVisibility has a certain boolean property assigned
  // If not, just set it to true and assume it's OK to show
  function objectHasKey<
    O extends Record<string, any>,
    ObjectKey extends keyof O
  >(object: O, key: ObjectKey): object is Required<O> {
    return object.hasOwnProperty(key);
  }
  function checkOrDefaultToolBarDiplayOptions<
    OptionKey extends keyof EuiDataGridToolBarVisibilityOptions
  >(
    arg: EuiDataGridProps['toolbarVisibility'],
    option: OptionKey
  ): Required<EuiDataGridToolBarVisibilityOptions>[OptionKey] {
    if (arg === undefined) {
      return true;
    } else if (typeof arg === 'boolean') {
      return arg as boolean;
    } else if (objectHasKey(arg, option)) {
      return arg[option];
    } else {
      return true;
    }
  }

  // These grid controls will only show when there is room. Check the resize observer callback
  // They can also be optionally turned off individually by using toolbarVisibility
  const gridControls = (
    <Fragment>
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'showColumnSelector'
      )
        ? columnSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'showStyleSelector'
      )
        ? styleSelector
        : null}
      {checkOrDefaultToolBarDiplayOptions(toolbarVisibility, 'showSortSelector')
        ? columnSorting
        : null}
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'additionalControls'
      ) && typeof toolbarVisibility !== 'boolean'
        ? toolbarVisibility.additionalControls
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

  const realizedFocusedCell: EuiDataGridFocusedCell =
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

  const [cellsUpdateFocus, setCellsUpdateFocus] = useState<
    Map<string, Function>
  >(new Map());

  const focusAfterRender = useAfterRender(() => {
    if (focusedCell) {
      const key = `${focusedCell[0]}-${focusedCell[1]}`;

      if (cellsUpdateFocus.has(key)) {
        cellsUpdateFocus.get(key)!();
      }
    }
  });

  const datagridContext = useMemo(
    () => ({
      onFocusUpdate: (cell: EuiDataGridFocusedCell, updateFocus: Function) => {
        if (pagination) {
          const key = `${cell[0]}-${cell[1]}`;

          setCellsUpdateFocus(cellsUpdateFocus => {
            const nextCellsUpdateFocus = new Map(cellsUpdateFocus);
            nextCellsUpdateFocus.set(key, updateFocus);
            return nextCellsUpdateFocus;
          });

          return () => {
            setCellsUpdateFocus(cellsUpdateFocus => {
              const nextCellsUpdateFocus = new Map(cellsUpdateFocus);
              nextCellsUpdateFocus.delete(key);
              return nextCellsUpdateFocus;
            });
          };
        }
      },
    }),
    [pagination]
  );

  return (
    <DataGridContext.Provider value={datagridContext}>
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
                toolbarVisibility,
                'showFullScreenSelector'
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
                  setFocusedCell,
                  focusAfterRender
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
                      schemaDetectors={allSchemaDetectors}
                      popoverContents={popoverContents}
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
    </DataGridContext.Provider>
  );
};
