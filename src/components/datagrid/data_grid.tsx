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
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useGeneratedHtmlId, keys } from '../../services';
import { EuiFocusTrap } from '../focus_trap';
import { EuiI18n, useEuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiDataGridBody, VIRTUALIZED_CONTAINER_CLASS } from './body';
import {
  useDataGridColumnSelector,
  useDataGridColumnSorting,
  useDataGridDisplaySelector,
  startingStyles,
  checkOrDefaultToolBarDisplayOptions,
  EuiDataGridToolbar,
} from './controls';
import { DataGridSortingContext } from './data_grid_context';
import {
  DataGridFocusContext,
  useFocus,
  createKeyDownHandler,
  useHeaderFocusWorkaround,
} from './utils/focus';
import {
  useInMemoryValues,
  EuiDataGridInMemoryRenderer,
} from './utils/in_memory';
import { useHeaderIsInteractive } from './body/header/header_is_interactive';
import { computeVisibleRows } from './utils/row_count';
import { EuiDataGridPaginationRenderer } from './data_grid_pagination';
import {
  schemaDetectors as providedSchemaDetectors,
  useDetectSchema,
  useMergedSchema,
} from './data_grid_schema';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridControlColumn,
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
import { IS_JEST_ENVIRONMENT } from '../../test';

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
    rowHeightsOptions: _rowHeightsOptions,
    virtualizationOptions,
    ...rest
  } = props;

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);

  const interactiveCellId = useGeneratedHtmlId();

  const { headerIsInteractive, handleHeaderMutation } = useHeaderIsInteractive(
    contentRef
  );
  const { focusProps: wrappingDivFocusProps, ...focusContext } = useFocus(
    headerIsInteractive
  );
  useHeaderFocusWorkaround(headerIsInteractive);

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
  const [
    displaySelector,
    gridStyles,
    rowHeightsOptions,
  ] = useDataGridDisplaySelector(
    checkOrDefaultToolBarDisplayOptions(
      toolbarVisibility,
      'showDisplaySelector'
    ),
    gridStyleWithDefaults,
    _rowHeightsOptions
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

  const rowHeightUtils = useMemo(() => new RowHeightUtils(), []);

  useEffect(() => {
    rowHeightUtils.pruneHiddenColumnHeights(orderedVisibleColumns);
  }, [rowHeightUtils, orderedVisibleColumns]);

  useEffect(() => {
    rowHeightUtils.cacheStyles({
      cellPadding: gridStyles.cellPadding,
    });
  }, [gridStyles.cellPadding, rowHeightUtils]);

  const visibleColCount = useMemo(() => {
    return (
      orderedVisibleColumns.length +
      leadingControlColumns.length +
      trailingControlColumns.length
    );
  }, [orderedVisibleColumns, leadingControlColumns, trailingControlColumns]);

  const visibleRows = useMemo(
    () => computeVisibleRows({ pagination, rowCount }),
    [pagination, rowCount]
  );
  const { visibleRowCount } = visibleRows;

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
    <DataGridFocusContext.Provider value={focusContext}>
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
                    displaySelector={displaySelector}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                    controlBtnClasses={controlBtnClasses}
                    columnSelector={columnSelector}
                    columnSorting={columnSorting}
                  />
                )}
                <div
                  onKeyDown={createKeyDownHandler({
                    gridElement: contentRef,
                    visibleColCount,
                    visibleRowCount,
                    rowCount,
                    pagination,
                    hasFooter: !!renderFooterCellValue,
                    headerIsInteractive,
                    focusContext,
                  })}
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
                        visibleColCount={visibleColCount}
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
                        visibleRows={visibleRows}
                        interactiveCellId={interactiveCellId}
                        rowHeightsOptions={rowHeightsOptions}
                        rowHeightUtils={rowHeightUtils}
                        virtualizationOptions={virtualizationOptions || {}}
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
