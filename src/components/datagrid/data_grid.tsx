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
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  useCallback,
  useState,
  useEffect,
  Fragment,
  ReactChild,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';
import { EuiI18n } from '../i18n';
import { EuiDataGridHeaderRow } from './data_grid_header_row';
import { CommonProps, OneOf } from '../common';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridInMemory,
  EuiDataGridPaginationProps,
  EuiDataGridInMemoryValues,
  EuiDataGridControlColumn,
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
  EuiDataGridOnColumnResizeHandler,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import { EuiButtonEmpty } from '../button';
import { keys, htmlIdGenerator } from '../../services';
import { EuiDataGridBody } from './data_grid_body';
import { useColumnSelector } from './column_selector';
import { useStyleSelector, startingStyles } from './style_selector';
import { EuiTablePagination } from '../table/table_pagination';
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
import { useResizeObserver } from '../observer/resize_observer/resize_observer';

// Used to short-circuit some async browser behaviour that is difficult to account for in tests
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

// When below this number the grid only shows the full screen button
const MINIMUM_WIDTH_FOR_GRID_CONTROLS = 479;

type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of #EuiDataGridControlColumn objects. Used to define ancillary columns on the left side of the data grid.
     */
    leadingControlColumns?: EuiDataGridControlColumn[];
    /**
     * An array of #EuiDataGridControlColumn objects. Used to define ancillary columns on the right side of the data grid.
     */
    trailingControlColumns?: EuiDataGridControlColumn[];
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
    /**
     * A callback for when a column's size changes. Callback receives `{ columnId: string, width: number }`.
     */
    onColumnResize?: EuiDataGridOnColumnResizeHandler;
    /**
     * Defines a minimum width for the grid to show all controls in its header.
     */
    minSizeForControls?: number;
  };

// Force either aria-label or aria-labelledby to be defined
export type EuiDataGridProps = OneOf<
  CommonGridProps,
  'aria-label' | 'aria-labelledby'
>;

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

function renderPagination(props: EuiDataGridProps, controls: string) {
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

  if (props.rowCount < pageSizeOptions[0]) {
    return null;
  }

  return (
    <EuiI18n
      token="euiDataGrid.ariaLabelGridPagination"
      default="Pagination for preceding grid: {label}"
      values={{ label: props['aria-label'] }}>
      {(ariaLabelGridPagination: string) => {
        return (
          <EuiI18n
            token="euiDataGrid.ariaLabelledByGridPagination"
            default="Pagination for preceding grid">
            {(ariaLabelledByGridPagination: string) => {
              const accessibleName = {
                ...(props['aria-label'] && {
                  'aria-label': ariaLabelGridPagination,
                }),
                ...(props['aria-labelledby'] && {
                  'aria-labelledby': ariaLabelledByGridPagination,
                }),
              };

              return (
                <div className="euiDataGrid__pagination">
                  <EuiTablePagination
                    aria-controls={controls}
                    activePage={pageIndex}
                    itemsPerPage={pageSize}
                    itemsPerPageOptions={pageSizeOptions}
                    pageCount={pageCount}
                    onChangePage={onChangePage}
                    onChangeItemsPerPage={onChangeItemsPerPage}
                    {...accessibleName}
                  />
                </div>
              );
            }}
          </EuiI18n>
        );
      }}
    </EuiI18n>
  );
}

function useDefaultColumnWidth(
  container: HTMLElement | null,
  leadingControlColumns: EuiDataGridControlColumn[],
  trailingControlColumns: EuiDataGridControlColumn[],
  columns: EuiDataGridProps['columns']
): number | null {
  const containerSize = useResizeObserver(container, 'width');
  const gridWidth = containerSize.width;

  const computeDefaultWidth = useCallback((): number | null => {
    if (IS_JEST_ENVIRONMENT) return 100;
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
    return Math.max(widthToFill / unsizedColumnCount, 100);
  }, [gridWidth, columns, leadingControlColumns, trailingControlColumns]);

  const [defaultColumnWidth, setDefaultColumnWidth] = useState<number | null>(
    computeDefaultWidth
  );

  useEffect(() => {
    const columnWidth = computeDefaultWidth();
    setDefaultColumnWidth(columnWidth);
  }, [computeDefaultWidth]);

  return defaultColumnWidth;
}

function doesColumnHaveAnInitialWidth(
  column: EuiDataGridColumn
): column is EuiDataGridColumn & { initialWidth: number } {
  return column.hasOwnProperty('initialWidth');
}

function useColumnWidths(
  columns: EuiDataGridColumn[],
  onColumnResize?: EuiDataGridOnColumnResizeHandler
): [EuiDataGridColumnWidths, (columnId: string, width: number) => void] {
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

  const setColumnWidth = (columnId: string, width: number) => {
    setColumnWidths({ ...columnWidths, [columnId]: width });

    if (onColumnResize) {
      onColumnResize({ columnId, width });
    }
  };

  return [columnWidths, setColumnWidth];
}

function useOnResize(
  setHasRoomForGridControls: (hasRoomForGridControls: boolean) => void,
  isFullScreen: boolean,
  minSizeForControls: number
) {
  return useCallback(
    ({ width }: { width: number }) => {
      setHasRoomForGridControls(width > minSizeForControls || isFullScreen);
    },
    [setHasRoomForGridControls, isFullScreen, minSizeForControls]
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
  leadingControlColumns: EuiDataGridControlColumn[],
  trailingControlColumns: EuiDataGridControlColumn[],
  focusedCell: EuiDataGridFocusedCell | undefined,
  headerIsInteractive: boolean,
  setFocusedCell: (focusedCell: EuiDataGridFocusedCell) => void,
  updateFocus: Function
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (focusedCell == null) return;

    const colCount =
      visibleColumns.length +
      leadingControlColumns.length +
      trailingControlColumns.length -
      1;
    const [x, y] = focusedCell;
    const rowCount = computeVisibleRows(props);
    const { key, ctrlKey } = event;

    if (key === keys.ARROW_DOWN) {
      event.preventDefault();
      if (y < rowCount - 1) {
        setFocusedCell([x, y + 1]);
      }
    } else if (key === keys.ARROW_LEFT) {
      event.preventDefault();
      if (x > 0) {
        setFocusedCell([x - 1, y]);
      }
    } else if (key === keys.ARROW_UP) {
      event.preventDefault();
      const minimumIndex = headerIsInteractive ? -1 : 0;
      if (y > minimumIndex) {
        setFocusedCell([x, y - 1]);
      }
    } else if (key === keys.ARROW_RIGHT) {
      event.preventDefault();
      if (x < colCount) {
        setFocusedCell([x + 1, y]);
      }
    } else if (key === keys.PAGE_DOWN) {
      if (props.pagination) {
        event.preventDefault();
        const rowCount = props.rowCount;
        const pageIndex = props.pagination.pageIndex;
        const pageSize = props.pagination.pageSize;
        const pageCount = Math.ceil(rowCount / pageSize);
        if (pageIndex < pageCount - 1) {
          props.pagination.onChangePage(pageIndex + 1);
        }
        setFocusedCell([focusedCell[0], 0]);
        updateFocus();
      }
    } else if (key === keys.PAGE_UP) {
      if (props.pagination) {
        event.preventDefault();
        const pageIndex = props.pagination.pageIndex;
        if (pageIndex > 0) {
          props.pagination.onChangePage(pageIndex - 1);
        }
        setFocusedCell([focusedCell[0], props.pagination.pageSize - 1]);
        updateFocus();
      }
    } else if (key === (ctrlKey && keys.END)) {
      event.preventDefault();
      setFocusedCell([colCount, rowCount - 1]);
    } else if (key === (ctrlKey && keys.HOME)) {
      event.preventDefault();
      setFocusedCell([0, 0]);
    } else if (key === keys.END) {
      event.preventDefault();
      setFocusedCell([colCount, y]);
    } else if (key === keys.HOME) {
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

type FocusProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onFocus'>;
const useFocus = (
  headerIsInteractive: boolean
): [
  FocusProps,
  EuiDataGridFocusedCell | undefined,
  Dispatch<SetStateAction<EuiDataGridFocusedCell | undefined>>
] => {
  const [focusedCell, setFocusedCell] = useState<
    EuiDataGridFocusedCell | undefined
  >(undefined);

  const hasHadFocus = useMemo(() => focusedCell != null, [focusedCell]);

  const focusProps = useMemo<FocusProps>(
    () =>
      hasHadFocus
        ? {
            // FireFox allows tabbing to a div that is scrollable, while Chrome does not
            tabIndex: -1,
          }
        : {
            tabIndex: 0,
            onFocus: e => {
              // if e.target (the source element of the `focus event`
              // matches e.currentTarget (always the div with this onFocus listener)
              // then the user has focused directly on the data grid wrapper (almost definitely by tabbing)
              // so shift focus to the first interactive cell within the grid
              if (e.target === e.currentTarget) {
                setFocusedCell(headerIsInteractive ? [0, -1] : [0, 0]);
              }
            },
          },
    [hasHadFocus, setFocusedCell, headerIsInteractive]
  );

  return [focusProps, focusedCell, setFocusedCell];
};

// Typeguards to see if toolbarVisibility has a certain boolean property assigned
// If not, just set it to true and assume it's OK to show
function objectHasKey<O extends Record<string, any>, ObjectKey extends keyof O>(
  object: O,
  key: ObjectKey
): object is Required<O> {
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

const emptyArrayDefault: EuiDataGridControlColumn[] = [];
export const EuiDataGrid: FunctionComponent<EuiDataGridProps> = props => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [hasRoomForGridControls, setHasRoomForGridControls] = useState(true);
  const [containerRef, _setContainerRef] = useState<HTMLDivElement | null>(
    null
  );
  const [interactiveCellId] = useState(htmlIdGenerator()());
  const [headerIsInteractive, setHeaderIsInteractive] = useState(false);

  const setContainerRef = useCallback(ref => _setContainerRef(ref), []);

  const [wrappingDivFocusProps, focusedCell, setFocusedCell] = useFocus(
    headerIsInteractive
  );

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

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        if (isFullScreen) {
          event.preventDefault();
          setIsFullScreen(false);
        }
        break;
    }
  };

  const {
    leadingControlColumns = emptyArrayDefault,
    trailingControlColumns = emptyArrayDefault,
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
    onColumnResize,
    minSizeForControls = MINIMUM_WIDTH_FOR_GRID_CONTROLS,
    ...rest
  } = props;

  // enables/disables grid controls based on available width
  const onResize = useOnResize(
    nextHasRoomForGridControls => {
      if (nextHasRoomForGridControls !== hasRoomForGridControls) {
        setHasRoomForGridControls(nextHasRoomForGridControls);
      }
    },
    isFullScreen,
    minSizeForControls
  );

  const [columnWidths, setColumnWidth] = useColumnWidths(
    columns,
    onColumnResize
  );

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

  const displayValues: { [key: string]: string } = columns.reduce(
    (acc: { [key: string]: string }, column: EuiDataGridColumn) => ({
      ...acc,
      [column.id]: column.displayAsText || column.id,
    }),
    {}
  );

  const [columnSelector, orderedVisibleColumns] = useColumnSelector(
    columns,
    columnVisibility,
    checkOrDefaultToolBarDiplayOptions(toolbarVisibility, 'showColumnSelector'),
    displayValues
  );
  const columnSorting = useColumnSorting(
    orderedVisibleColumns,
    sorting,
    mergedSchema,
    allSchemaDetectors,
    displayValues
  );
  const [styleSelector, gridStyles] = useStyleSelector(gridStyleWithDefaults);

  // compute the default column width from the container's clientWidth and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    containerRef,
    leadingControlColumns,
    trailingControlColumns,
    orderedVisibleColumns
  );

  const contentRef = useRef<HTMLDivElement>(null);

  // Because of a weird Chrome bug with position:sticky css items and focus, we force scrolling to the top
  // if the item is in the first row. This prevents the cell from ever being under the sticky header.
  useEffect(() => {
    if (focusedCell !== undefined && focusedCell[1] === 0) {
      if (contentRef.current != null) {
        contentRef.current.scrollTop = 0;
      }
    }
  }, [focusedCell]);

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
    {
      'euiDataGrid--noControls': !toolbarVisibility,
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

  // These grid controls will only show when there is room. Check the resize observer callback
  // They can also be optionally turned off individually by using toolbarVisibility
  const gridControls = (
    <Fragment>
      {checkOrDefaultToolBarDiplayOptions(
        toolbarVisibility,
        'additionalControls'
      ) && typeof toolbarVisibility !== 'boolean'
        ? toolbarVisibility.additionalControls
        : null}
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
    </Fragment>
  );

  // When data grid is full screen, we add a class to the body to remove the extra scrollbar
  if (isFullScreen) {
    document.body.classList.add('euiDataGrid__restrictBody');
  } else {
    document.body.classList.remove('euiDataGrid__restrictBody');
  }

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

  const cellsUpdateFocus = useRef<Map<string, Function>>(new Map());

  const focusAfterRender = useAfterRender(() => {
    if (focusedCell) {
      const key = `${focusedCell[0]}-${focusedCell[1]}`;

      if (cellsUpdateFocus.current.has(key)) {
        cellsUpdateFocus.current.get(key)!();
      }
    }
  });

  const datagridContext = useMemo(
    () => ({
      onFocusUpdate: (cell: EuiDataGridFocusedCell, updateFocus: Function) => {
        if (pagination) {
          const key = `${cell[0]}-${cell[1]}`;
          cellsUpdateFocus.current.set(key, updateFocus);

          return () => {
            cellsUpdateFocus.current.delete(key);
          };
        }
      },
    }),
    [pagination]
  );

  const gridIds = htmlIdGenerator();
  const gridId = gridIds();
  const ariaLabelledById = gridIds();

  return (
    <EuiI18n
      token="euiDataGrid.ariaLabel"
      default="{label}; Page {page} of {pageCount}."
      values={{
        label: rest['aria-label'],
        page: pagination ? pagination.pageIndex + 1 : 0,
        pageCount: pagination
          ? Math.ceil(props.rowCount / pagination.pageSize)
          : 0,
      }}>
      {(ariaLabel: string) => {
        return (
          <EuiI18n
            token="euiDataGrid.ariaLabelledBy"
            default="Page {page} of {pageCount}."
            values={{
              page: pagination ? pagination.pageIndex + 1 : 0,
              pageCount: pagination
                ? Math.ceil(props.rowCount / pagination.pageSize)
                : 0,
            }}>
            {(ariaLabelledBy: string) => {
              // extract aria-label and/or aria-labelledby from `rest`
              const gridAriaProps: {
                'aria-label'?: string;
                'aria-labelledby'?: string;
              } = {};
              if ('aria-label' in rest) {
                gridAriaProps['aria-label'] = pagination
                  ? ariaLabel
                  : rest['aria-label'];
                delete rest['aria-label'];
              }
              if ('aria-labelledby' in rest) {
                gridAriaProps['aria-labelledby'] = `${
                  rest['aria-labelledby']
                } ${pagination ? ariaLabelledById : ''}`;
                delete rest['aria-labelledby'];
              }

              return (
                <DataGridContext.Provider value={datagridContext}>
                  <EuiFocusTrap
                    disabled={!isFullScreen}
                    style={{ height: '100%' }}>
                    <div
                      className={classes}
                      onKeyDown={handleGridKeyDown}
                      ref={setContainerRef}>
                      {(IS_JEST_ENVIRONMENT || defaultColumnWidth) && (
                        <>
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
                                  leadingControlColumns,
                                  trailingControlColumns,
                                  focusedCell,
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
                                            (pagination &&
                                              pagination.pageSize) ||
                                            rowCount
                                          : // otherwise, all of the data is present and usable
                                            rowCount
                                      }
                                      onCellRender={onCellRender}
                                    />
                                  ) : null}
                                  <div
                                    ref={contentRef}
                                    data-test-subj="dataGridWrapper"
                                    className="euiDataGrid__content"
                                    role="grid"
                                    id={gridId}
                                    {...wrappingDivFocusProps}
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
                                          leadingControlColumns={
                                            leadingControlColumns
                                          }
                                          trailingControlColumns={
                                            trailingControlColumns
                                          }
                                          columns={orderedVisibleColumns}
                                          columnWidths={columnWidths}
                                          defaultColumnWidth={
                                            defaultColumnWidth
                                          }
                                          setColumnWidth={setColumnWidth}
                                          schema={mergedSchema}
                                          sorting={sorting}
                                          headerIsInteractive={
                                            headerIsInteractive
                                          }
                                          focusedCell={focusedCell}
                                          setFocusedCell={setFocusedCell}
                                        />
                                      )}
                                    </EuiMutationObserver>
                                    <EuiDataGridBody
                                      columnWidths={columnWidths}
                                      defaultColumnWidth={defaultColumnWidth}
                                      inMemoryValues={inMemoryValues}
                                      inMemory={inMemory}
                                      leadingControlColumns={
                                        leadingControlColumns
                                      }
                                      trailingControlColumns={
                                        trailingControlColumns
                                      }
                                      columns={orderedVisibleColumns}
                                      schema={mergedSchema}
                                      schemaDetectors={allSchemaDetectors}
                                      popoverContents={popoverContents}
                                      focusedCell={focusedCell}
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
                          {props.pagination && props['aria-labelledby'] && (
                            <p id={ariaLabelledBy} hidden>
                              {ariaLabelledBy}
                            </p>
                          )}
                          {renderPagination(props, gridId)}
                          <p id={interactiveCellId} hidden>
                            <EuiI18n
                              token="euiDataGrid.screenReaderNotice"
                              default="Cell contains interactive content."
                            />
                            {/* TODO: if no keyboard shortcuts panel gets built, add keyboard shortcut info here */}
                          </p>
                        </>
                      )}
                    </div>
                  </EuiFocusTrap>
                </DataGridContext.Provider>
              );
            }}
          </EuiI18n>
        );
      }}
    </EuiI18n>
  );
};
