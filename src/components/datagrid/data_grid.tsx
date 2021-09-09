/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import tabbable from 'tabbable';
import { useGeneratedHtmlId, keys } from '../../services';
import { EuiFocusTrap } from '../focus_trap';
import { EuiI18n, useEuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiDataGridBody, VIRTUALIZED_CONTAINER_CLASS } from './body';
import { useDataGridColumnSelector } from './column_selector';
import { useDataGridColumnSorting } from './column_sorting';
import {
  DataGridFocusContext,
  DataGridSortingContext,
} from './data_grid_context';
import { EuiDataGridInMemoryRenderer } from './data_grid_inmemory_renderer';
import { EuiDataGridPaginationRenderer } from './data_grid_pagination';
import {
  schemaDetectors as providedSchemaDetectors,
  useDetectSchema,
  useMergedSchema,
} from './data_grid_schema';
import {
  checkOrDefaultToolBarDisplayOptions,
  EuiDataGridToolbar,
} from './data_grid_toolbar';
import {
  DataGridFocusContextShape,
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridControlColumn,
  EuiDataGridFocusedCell,
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridOnColumnResizeHandler,
  EuiDataGridProps,
  EuiDataGridStyleBorders,
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyleFooter,
  EuiDataGridStyleHeader,
  EuiDataGridStyleRowHover,
} from './data_grid_types';
import { RowHeightUtils } from './row_height_utils';
import { startingStyles, useDataGridStyleSelector } from './style_selector';

// Used to short-circuit some async browser behaviour that is difficult to account for in tests
const IS_JEST_ENVIRONMENT = global.hasOwnProperty('_isJest');

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

const footerToClassMap: { [footer in EuiDataGridStyleFooter]: string } = {
  shade: 'euiDataGrid--footerShade',
  overline: 'euiDataGrid--footerOverline',
  striped: '',
};

const rowHoverToClassMap: {
  [rowHighlight in EuiDataGridStyleRowHover]: string;
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
  [cellPaddings in EuiDataGridStyleCellPaddings]: string;
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

/**
 * Returns the size of the cell container minus the scroll bar width.
 * To do so, this hook is listening for size changes of the container itself,
 * as well as pagination changes to make sure every update is caught.
 *
 * This is necessary because there is no callback/event fired by the browser
 * indicating the scroll bar state has changed.
 * @param resizeRef the wrapper element containging the data grid
 * @param pageSize the currently applied page size
 */
function useVirtualizeContainerWidth(
  resizeRef: HTMLDivElement | null,
  pageSize: number | undefined
) {
  const [virtualizeContainerWidth, setVirtualizeContainerWidth] = useState(0);
  const virtualizeContainer = resizeRef?.getElementsByClassName(
    VIRTUALIZED_CONTAINER_CLASS
  )[0] as HTMLDivElement | null;

  // re-render data grid on size changes
  useResizeObserver(virtualizeContainer);

  useEffect(() => {
    if (virtualizeContainer?.clientWidth) {
      setVirtualizeContainerWidth(virtualizeContainer.clientWidth);
    }
  }, [virtualizeContainer?.clientWidth]);

  useEffect(() => {
    // wait for layout to settle, then measure virtualize container
    setTimeout(() => {
      if (virtualizeContainer?.clientWidth) {
        const containerWidth = virtualizeContainer.clientWidth;
        setVirtualizeContainerWidth(containerWidth);
      }
    }, 100);
  }, [pageSize, virtualizeContainer]);

  return virtualizeContainerWidth;
}

function useDefaultColumnWidth(
  gridWidth: number,
  leadingControlColumns: EuiDataGridControlColumn[],
  trailingControlColumns: EuiDataGridControlColumn[],
  columns: EuiDataGridProps['columns']
): number | null {
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
    if (unsizedColumnCount === 0) {
      return 100;
    }
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

  const setColumnWidth = useCallback(
    (columnId: string, width: number) => {
      setColumnWidths({ ...columnWidths, [columnId]: width });

      if (onColumnResize) {
        onColumnResize({ columnId, width });
      }
    },
    [columnWidths, onColumnResize]
  );

  return [columnWidths, setColumnWidth];
}

function useInMemoryValues(
  inMemory: EuiDataGridInMemory | undefined,
  rowCount: number
): [
  EuiDataGridInMemoryValues,
  (rowIndex: number, columnId: string, value: string) => void
] {
  /**
   * For performance, `onCellRender` below mutates the inMemoryValues object
   * instead of cloning. If this operation were done in a setState call
   * React would ignore the update as the object itself has not changed.
   * So, we keep a dual record: the in-memory values themselves and a "version" counter.
   * When the object is mutated, the version is incremented triggering a re-render, and
   * the returned `inMemoryValues` object is re-created (cloned) from the mutated version.
   * The version updates are batched, so only one clone happens per batch.
   **/
  const _inMemoryValues = useRef<EuiDataGridInMemoryValues>({});
  const [inMemoryValuesVersion, setInMemoryValuesVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inMemoryValues = useMemo(() => ({ ..._inMemoryValues.current }), [
    inMemoryValuesVersion,
  ]);

  const onCellRender = useCallback((rowIndex, columnId, value) => {
    const nextInMemoryValues = _inMemoryValues.current;
    nextInMemoryValues[rowIndex] = nextInMemoryValues[rowIndex] || {};
    if (nextInMemoryValues[rowIndex][columnId] !== value) {
      nextInMemoryValues[rowIndex][columnId] = value;
      setInMemoryValuesVersion((version) => version + 1);
    }
  }, []);

  // if `inMemory.level` or `rowCount` changes reset the values
  const inMemoryLevel = inMemory && inMemory.level;
  const resetRunCount = useRef(0);
  useEffect(() => {
    if (resetRunCount.current++ > 0) {
      // this has to delete "overflow" keys from the object instead of resetting to an empty one,
      // as the internal inmemoryrenderer component's useEffect which sets the values
      // executes before this outer, wrapping useEffect
      const existingRowKeyCount = Object.keys(_inMemoryValues.current).length;
      for (let i = rowCount; i < existingRowKeyCount; i++) {
        delete _inMemoryValues.current[i];
      }
      setInMemoryValuesVersion((version) => version + 1);
    }
  }, [inMemoryLevel, rowCount]);

  return [inMemoryValues, onCellRender];
}

function createKeyDownHandler(
  props: EuiDataGridProps,
  contentElement: HTMLDivElement | null,
  visibleColumns: EuiDataGridProps['columns'],
  leadingControlColumns: EuiDataGridControlColumn[],
  trailingControlColumns: EuiDataGridControlColumn[],
  focusedCell: EuiDataGridFocusedCell | undefined,
  headerIsInteractive: boolean,
  setFocusedCell: (focusedCell: EuiDataGridFocusedCell) => void
) {
  return (event: KeyboardEvent<HTMLDivElement>) => {
    if (focusedCell == null) return;

    if (
      contentElement == null ||
      !contentElement.contains(document.activeElement)
    ) {
      // if the `contentElement` does not contain the focused element, don't handle the event
      // this happens when React bubbles the key event through a portal
      return;
    }

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
      if (props.renderFooterCellValue ? y < rowCount : y < rowCount - 1) {
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
      }
    } else if (key === keys.PAGE_UP) {
      if (props.pagination) {
        event.preventDefault();
        const pageIndex = props.pagination.pageIndex;
        if (pageIndex > 0) {
          props.pagination.onChangePage(pageIndex - 1);
        }
        setFocusedCell([focusedCell[0], props.pagination.pageSize - 1]);
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

type FocusProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onFocus'>;
const useFocus = (
  headerIsInteractive: boolean,
  cellsUpdateFocus: MutableRefObject<Map<string, Function>>
): [
  FocusProps,
  EuiDataGridFocusedCell | undefined,
  (focusedCell: EuiDataGridFocusedCell) => void
] => {
  const [focusedCell, setFocusedCell] = useState<
    EuiDataGridFocusedCell | undefined
  >(undefined);

  const previousCell = useRef<EuiDataGridFocusedCell | undefined>(undefined);
  useEffect(() => {
    if (previousCell.current) {
      notifyCellOfFocusState(
        cellsUpdateFocus.current,
        previousCell.current,
        false
      );
    }
    previousCell.current = focusedCell;

    if (focusedCell) {
      notifyCellOfFocusState(cellsUpdateFocus.current, focusedCell, true);
    }
  }, [cellsUpdateFocus, focusedCell]);

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
            onFocus: (e) => {
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

function notifyCellOfFocusState(
  cellsUpdateFocus: Map<string, Function>,
  cell: EuiDataGridFocusedCell,
  isFocused: boolean
) {
  const key = `${cell[0]}-${cell[1]}`;
  const onFocus = cellsUpdateFocus.get(key);
  if (onFocus) {
    onFocus(isFocused);
  }
}

const emptyArrayDefault: EuiDataGridControlColumn[] = [];
export const EuiDataGrid: FunctionComponent<EuiDataGridProps> = (props) => {
  const {
    leadingControlColumns = emptyArrayDefault,
    trailingControlColumns = emptyArrayDefault,
    columns,
    columnVisibility,
    schemaDetectors,
    rowCount,
    renderCellValue,
    renderFooterCellValue,
    className,
    gridStyle,
    toolbarVisibility = true,
    pagination,
    sorting,
    inMemory,
    popoverContents,
    onColumnResize,
    minSizeForControls,
    height,
    width,
    rowHeightsOptions,
    ...rest
  } = props;

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);

  const interactiveCellId = useGeneratedHtmlId();
  const [headerIsInteractive, setHeaderIsInteractive] = useState(false);

  const cellsUpdateFocus = useRef<Map<string, Function>>(new Map());

  const [wrappingDivFocusProps, focusedCell, setFocusedCell] = useFocus(
    headerIsInteractive,
    cellsUpdateFocus
  );

  // maintain a statically-referenced copy of `focusedCell`
  // so it can be looked up when needed without causing a re-render
  const focusedCellReference = useRef<
    EuiDataGridFocusedCell | null | undefined
  >(focusedCell);
  useEffect(() => {
    focusedCellReference.current = focusedCell;
  }, [focusedCell]);

  const handleHeaderChange = useCallback<(headerRow: HTMLElement) => void>(
    (headerRow) => {
      const tabbables = tabbable(headerRow);
      const managed = headerRow.querySelectorAll('[data-euigrid-tab-managed]');
      const hasInteractives = tabbables.length > 0 || managed.length > 0;
      if (hasInteractives !== headerIsInteractive) {
        setHeaderIsInteractive(hasInteractives);

        // if the focus is on the header, and the header is no longer interactive
        // move the focus down to the first row
        const focusedCell = focusedCellReference.current;
        if (hasInteractives === false && focusedCell && focusedCell[1] === -1) {
          setFocusedCell([focusedCell[0], 0]);
        }
      }
    },
    [headerIsInteractive, setHeaderIsInteractive, setFocusedCell]
  );

  const handleHeaderMutation = useCallback<MutationCallback>(
    (records) => {
      const [{ target }] = records;

      // find the wrapping header div
      let headerRow = target.parentElement;
      while (
        headerRow &&
        (headerRow.getAttribute('data-test-subj') || '')
          .split(/\s+/)
          .indexOf('dataGridHeader') === -1
      ) {
        headerRow = headerRow.parentElement;
      }

      if (headerRow) handleHeaderChange(headerRow);
    },
    [handleHeaderChange]
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

  // enables/disables grid controls based on available width
  const [resizeRef, setResizeRef] = useState<HTMLDivElement | null>(null);
  const [toolbarRef, setToolbarRef] = useState<HTMLDivElement | null>(null);
  const gridDimensions = useResizeObserver(resizeRef, 'width');
  const toolbarDemensions = useResizeObserver(toolbarRef, 'height');
  useEffect(() => {
    if (resizeRef) {
      const { width } = gridDimensions;
      setGridWidth(width);
    } else {
      setGridWidth(0);
    }
  }, [resizeRef, gridDimensions]);

  const virtualizeContainerWidth = useVirtualizeContainerWidth(
    resizeRef,
    pagination?.pageSize
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

  const [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ] = useDataGridColumnSelector(
    columns,
    columnVisibility,
    checkOrDefaultToolBarDisplayOptions(
      toolbarVisibility,
      'showColumnSelector'
    ),
    displayValues
  );
  const columnSorting = useDataGridColumnSorting(
    orderedVisibleColumns,
    sorting,
    mergedSchema,
    allSchemaDetectors,
    displayValues
  );
  const [styleSelector, gridStyles] = useDataGridStyleSelector(
    gridStyleWithDefaults
  );

  // compute the default column width from the container's clientWidth and count of visible columns
  const defaultColumnWidth = useDefaultColumnWidth(
    // use clientWidth of the virtualization container to take scroll bar into account
    // if that's not possible fall back to the size of the wrapper element
    virtualizeContainerWidth || gridDimensions.width,
    leadingControlColumns,
    trailingControlColumns,
    orderedVisibleColumns
  );

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef) {
      const headerElement = contentRef.querySelector(
        '[data-test-subj~=dataGridHeader]'
      );
      if (headerElement) {
        handleHeaderChange(headerElement as HTMLElement);
      }
    }
  }, [contentRef, handleHeaderChange]);

  // Because of a weird Chrome bug with position:sticky css items and focus, we force scrolling to the top
  // if the item is in the first row. This prevents the cell from ever being under the sticky header.
  useEffect(() => {
    if (focusedCell !== undefined && focusedCell[1] === 0) {
      if (contentRef != null) {
        contentRef.scrollTop = 0;
      }
    }
  }, [focusedCell, contentRef]);

  const [rowHeightUtils] = useState(new RowHeightUtils());

  useEffect(() => {
    rowHeightUtils.computeStylesForGridCell(gridStyles);
  }, [gridStyles, rowHeightUtils]);

  const classes = classNames(
    'euiDataGrid',
    fontSizesToClassMap[gridStyles.fontSize!],
    bordersToClassMap[gridStyles.border!],
    headerToClassMap[gridStyles.header!],
    footerToClassMap[gridStyles.footer!],
    rowHoverToClassMap[gridStyles.rowHover!],
    cellPaddingsToClassMap[gridStyles.cellPadding!],
    {
      'euiDataGrid--stripes': gridStyles.stripes!,
    },
    {
      'euiDataGrid--stickyFooter': gridStyles.footer && gridStyles.stickyFooter,
    },
    {
      'euiDataGrid--fullScreen': isFullScreen,
    },
    {
      'euiDataGrid--noControls': !toolbarVisibility,
    },
    className
  );

  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': isFullScreen,
  });

  // By default the toolbar appears
  const showToolbar = !!toolbarVisibility;

  const onFocusUpdate = useCallback(
    (cell: EuiDataGridFocusedCell, updateFocus: Function) => {
      const key = `${cell[0]}-${cell[1]}`;
      cellsUpdateFocus.current.set(key, updateFocus);
      return () => {
        cellsUpdateFocus.current.delete(key);
      };
    },
    []
  );
  const datagridFocusContext = useMemo<DataGridFocusContextShape>(() => {
    return {
      setFocusedCell,
      onFocusUpdate,
    };
  }, [setFocusedCell, onFocusUpdate]);

  const gridId = useGeneratedHtmlId();
  const ariaLabelledById = useGeneratedHtmlId();

  const ariaLabel = useEuiI18n(
    'euiDataGrid.ariaLabel',
    '{label}; Page {page} of {pageCount}.',
    {
      label: rest['aria-label'],
      page: pagination ? pagination.pageIndex + 1 : 0,
      pageCount: pagination
        ? Math.ceil(props.rowCount / pagination.pageSize)
        : 0,
    }
  );

  const ariaLabelledBy = useEuiI18n(
    'euiDataGrid.ariaLabelledBy',
    'Page {page} of {pageCount}.',
    {
      page: pagination ? pagination.pageIndex + 1 : 0,
      pageCount: pagination
        ? Math.ceil(props.rowCount / pagination.pageSize)
        : 0,
    }
  );

  // extract aria-label and/or aria-labelledby from `rest`
  const gridAriaProps: {
    'aria-label'?: string;
    'aria-labelledby'?: string;
  } = {};
  if ('aria-label' in rest) {
    gridAriaProps['aria-label'] = pagination ? ariaLabel : rest['aria-label'];
    delete rest['aria-label'];
  }
  if ('aria-labelledby' in rest) {
    gridAriaProps['aria-labelledby'] = `${rest['aria-labelledby']} ${
      pagination ? ariaLabelledById : ''
    }`;
    delete rest['aria-labelledby'];
  }

  return (
    <DataGridFocusContext.Provider value={datagridFocusContext}>
      <DataGridSortingContext.Provider value={sorting}>
        <EuiFocusTrap
          disabled={!isFullScreen}
          className="euiDataGrid__focusWrap"
        >
          <div
            className={classes}
            onKeyDown={handleGridKeyDown}
            style={isFullScreen ? undefined : { width, height }}
            ref={setResizeRef}
            {...rest}
          >
            {(IS_JEST_ENVIRONMENT || defaultColumnWidth) && (
              <>
                {showToolbar && (
                  <EuiDataGridToolbar
                    setRef={setToolbarRef}
                    gridWidth={gridWidth}
                    minSizeForControls={minSizeForControls}
                    toolbarVisibility={toolbarVisibility}
                    styleSelector={styleSelector}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                    controlBtnClasses={controlBtnClasses}
                    columnSelector={columnSelector}
                    columnSorting={columnSorting}
                  />
                )}
                <div
                  onKeyDown={createKeyDownHandler(
                    props,
                    contentRef,
                    orderedVisibleColumns,
                    leadingControlColumns,
                    trailingControlColumns,
                    focusedCell,
                    headerIsInteractive,
                    setFocusedCell
                  )}
                  className="euiDataGrid__verticalScroll"
                >
                  <div className="euiDataGrid__overflow">
                    {inMemory ? (
                      <EuiDataGridInMemoryRenderer
                        inMemory={inMemory}
                        renderCellValue={renderCellValue}
                        columns={columns}
                        rowCount={
                          inMemory.level === 'enhancements'
                            ? // if `inMemory.level === enhancements` then we can only be sure the pagination's pageSize is available in memory
                              pagination?.pageSize || rowCount
                            : // otherwise, all of the data is present and usable
                              rowCount
                        }
                        onCellRender={onCellRender}
                      />
                    ) : null}
                    <div
                      ref={setContentRef}
                      data-test-subj="dataGridWrapper"
                      className="euiDataGrid__content"
                      role="grid"
                      id={gridId}
                      {...wrappingDivFocusProps}
                      {...gridAriaProps}
                    >
                      <EuiDataGridBody
                        isFullScreen={isFullScreen}
                        columns={orderedVisibleColumns}
                        columnWidths={columnWidths}
                        defaultColumnWidth={defaultColumnWidth}
                        toolbarHeight={toolbarDemensions.height}
                        leadingControlColumns={leadingControlColumns}
                        schema={mergedSchema}
                        trailingControlColumns={trailingControlColumns}
                        setVisibleColumns={setVisibleColumns}
                        switchColumnPos={switchColumnPos}
                        setColumnWidth={setColumnWidth}
                        headerIsInteractive={headerIsInteractive}
                        handleHeaderMutation={handleHeaderMutation}
                        inMemoryValues={inMemoryValues}
                        inMemory={inMemory}
                        schemaDetectors={allSchemaDetectors}
                        popoverContents={popoverContents}
                        pagination={pagination}
                        renderCellValue={renderCellValue}
                        renderFooterCellValue={renderFooterCellValue}
                        rowCount={rowCount}
                        interactiveCellId={interactiveCellId}
                        rowHeightsOptions={rowHeightsOptions}
                        rowHeightUtils={rowHeightUtils}
                        gridStyles={gridStyles}
                      />
                    </div>
                  </div>
                </div>
                {props.pagination && props['aria-labelledby'] && (
                  <p id={ariaLabelledById} hidden>
                    {ariaLabelledBy}
                  </p>
                )}
                {props.pagination && (
                  <EuiDataGridPaginationRenderer
                    {...props.pagination}
                    rowCount={props.rowCount}
                    controls={gridId}
                    aria-label={props['aria-label']}
                  />
                )}
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
      </DataGridSortingContext.Provider>
    </DataGridFocusContext.Provider>
  );
};
