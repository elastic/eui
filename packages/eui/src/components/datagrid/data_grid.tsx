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
  useMemo,
  useRef,
  useState,
  memo,
  useCallback,
} from 'react';
import {
  VariableSizeGrid as Grid,
  GridOnItemsRenderedProps,
} from 'react-window';
import {
  useGeneratedHtmlId,
  useEuiMemoizedStyles,
  OverrideCopiedTabularContent,
} from '../../services';
import { useEuiTablePaginationDefaults } from '../table/table_pagination';
import { EuiFocusTrap } from '../focus_trap';
import { EuiI18n, useEuiI18n } from '../i18n';
import { useMutationObserver } from '../observer/mutation_observer';
import { useResizeObserver } from '../observer/resize_observer';
import { EuiDataGridBody } from './body';
import {
  useDataGridColumnSelector,
  useDataGridColumnSorting,
  useDataGridDisplaySelector,
  startingStyles,
  useDataGridFullScreenSelector,
  useDataGridKeyboardShortcuts,
  checkOrDefaultToolBarDisplayOptions,
  EuiDataGridToolbar,
} from './controls';
import { EuiDataGridPagination, shouldRenderPagination } from './pagination';
import { DataGridSortedContext, useSorting } from './utils/sorting';
import {
  DataGridFocusContext,
  useFocus,
  createKeyDownHandler,
  preventTabbing,
} from './utils/focus';
import {
  useInMemoryValues,
  EuiDataGridInMemoryRenderer,
} from './utils/in_memory';
import { DataGridCellPopoverContext, useCellPopover } from './body/cell';
import { computeVisibleRows } from './utils/row_count';
import {
  schemaDetectors as providedSchemaDetectors,
  useMergedSchema,
} from './utils/data_grid_schema';
import { useImperativeGridRef } from './utils/ref';
import {
  emptyControlColumns,
  EuiDataGridColumn,
  EuiDataGridProps,
  EuiDataGridRefProps,
  EuiDataGridStyleBorders,
  EuiDataGridStyleCellPaddings,
  EuiDataGridStyleFontSizes,
  EuiDataGridStyleFooter,
  EuiDataGridStyleHeader,
  EuiDataGridStyleRowHover,
} from './data_grid_types';
import { euiDataGridStyles } from './data_grid.styles';

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

const emptyVirtualizationOptions = {};

export const EuiDataGrid = memo(
  forwardRef<EuiDataGridRefProps, EuiDataGridProps>((props, ref) => {
    const {
      leadingControlColumns = emptyControlColumns,
      trailingControlColumns = emptyControlColumns,
      columns,
      columnVisibility,
      schemaDetectors,
      rowCount,
      renderCellValue,
      cellContext,
      renderCellPopover,
      renderFooterCellValue,
      className,
      gridStyle,
      toolbarVisibility = true,
      pagination: _pagination,
      sorting,
      inMemory,
      onColumnResize,
      minSizeForControls,
      height,
      width,
      rowHeightsOptions: _rowHeightsOptions,
      virtualizationOptions,
      renderCustomGridBody,
      renderCustomToolbar,
      ...rest
    } = props;

    /**
     * Merge consumer settings with defaults
     */
    const paginationDefaults = useEuiTablePaginationDefaults();
    const pagination = useMemo(() => {
      return _pagination
        ? {
            pageSize: paginationDefaults.itemsPerPage,
            pageSizeOptions: paginationDefaults.itemsPerPageOptions,
            ..._pagination,
          }
        : _pagination;
    }, [_pagination, paginationDefaults]);
    const showPagination =
      pagination && shouldRenderPagination(rowCount, pagination);

    const gridStyleWithDefaults = useMemo(
      () => ({ ...startingStyles, ...gridStyle }),
      [gridStyle]
    );

    const [inMemoryValues, onCellRender] = useInMemoryValues(
      inMemory,
      rowCount
    );

    const allSchemaDetectors = useMemo(
      () => [...providedSchemaDetectors, ...(schemaDetectors || [])],
      [schemaDetectors]
    );

    const mergedSchema = useMergedSchema({
      columns,
      inMemory,
      inMemoryValues,
      schemaDetectors: allSchemaDetectors,
      autoDetectSchema: inMemory != null,
    });

    /**
     * Grid refs & observers
     */
    // Outermost wrapper div
    // this ref needs to be managed by a state, to cause a re-render after mount
    // and passing the mounted element to the resize observer
    const [resizeRef, setResizeRef] = useState<HTMLDivElement | null>(null);
    const { width: gridWidth } = useResizeObserver(resizeRef, 'width');

    // Wrapper div around EuiDataGridBody
    const contentRef = useRef<HTMLDivElement | null>(null);
    useMutationObserver(contentRef.current, preventTabbing, {
      subtree: true,
      childList: true,
    });

    // Imperative handler passed back by react-window - we're setting this at
    // the top datagrid level to make passing it to other children & utils easier
    const gridRef = useRef<Grid | null>(null);
    const gridItemsRendered = useRef<GridOnItemsRenderedProps | null>(null);

    /**
     * Display
     */
    const displayValues: { [key: string]: string } = useMemo(() => {
      return columns.reduce(
        (acc: { [key: string]: string }, column: EuiDataGridColumn) => ({
          ...acc,
          [column.id]: column.displayAsText || column.id,
        }),
        {}
      );
    }, [columns]);

    const [displaySelector, gridStyles, rowHeightsOptions] =
      useDataGridDisplaySelector(
        checkOrDefaultToolBarDisplayOptions(
          toolbarVisibility,
          'showDisplaySelector'
        ),
        gridStyleWithDefaults,
        _rowHeightsOptions
      );

    /**
     * Column order & visibility
     */
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

    /**
     * Sorting
     */
    const columnSorting = useDataGridColumnSorting({
      sorting,
      columns: orderedVisibleColumns,
      displayValues,
      schema: mergedSchema,
      schemaDetectors: allSchemaDetectors,
    });

    const sortedContext = useSorting({
      sorting,
      inMemory,
      inMemoryValues,
      schema: mergedSchema,
      schemaDetectors: allSchemaDetectors,
      startRow: visibleRows.startRow,
    });

    /**
     * Focus
     */
    const {
      focusProps: wrappingDivFocusProps,
      onFocusUpdate,
      focusedCell,
      setFocusedCell,
      setIsFocusedCellInView,
      focusFirstVisibleInteractiveCell,
    } = useFocus();

    const focusContext = useMemo(() => {
      return {
        onFocusUpdate,
        focusedCell,
        setFocusedCell,
        setIsFocusedCellInView,
        focusFirstVisibleInteractiveCell,
      };
    }, [
      onFocusUpdate,
      focusedCell,
      setFocusedCell,
      setIsFocusedCellInView,
      focusFirstVisibleInteractiveCell,
    ]);

    /**
     * Cell popover
     */
    const { cellPopoverContext, cellPopover } = useCellPopover();

    /**
     * Toolbar, keyboard shortcuts, & fullscreen
     */
    const showToolbar = !!toolbarVisibility;

    const { keyboardShortcuts } = useDataGridKeyboardShortcuts();

    const {
      isFullScreen,
      setIsFullScreen,
      fullScreenSelector,
      handleGridKeyDown,
      fullScreenStyles,
    } = useDataGridFullScreenSelector();

    /**
     * Expose certain internal APIs as ref to consumer
     */
    useImperativeGridRef({
      ref,
      gridRef,
      setIsFullScreen,
      focusContext,
      cellPopoverContext,
      sortedContext,
      pagination,
      rowCount,
      visibleColCount,
    });

    /**
     * Classes
     */
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
        'euiDataGrid--stickyFooter':
          gridStyles.footer && gridStyles.stickyFooter,
      },
      {
        'euiDataGrid--fullScreen': isFullScreen,
        [fullScreenStyles]: isFullScreen,
      },
      {
        'euiDataGrid--noControls': !toolbarVisibility,
      },
      className
    );

    /**
     * Accessibility
     */
    const gridId = useGeneratedHtmlId();
    const interactiveCellId = useGeneratedHtmlId();
    const ariaLabelledById = useGeneratedHtmlId();

    const ariaPage = pagination ? pagination.pageIndex + 1 : 1;
    const ariaPageCount = pagination?.pageSize
      ? Math.ceil(rowCount / pagination.pageSize)
      : 1;
    const ariaLabel = useEuiI18n(
      'euiDataGrid.ariaLabel',
      '{label}; Page {page} of {pageCount}.',
      { label: rest['aria-label'], page: ariaPage, pageCount: ariaPageCount }
    );
    const ariaLabelledBy = useEuiI18n(
      'euiDataGrid.ariaLabelledBy',
      'Page {page} of {pageCount}.',
      { page: ariaPage, pageCount: ariaPageCount }
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

    const onKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        createKeyDownHandler({
          gridElement: contentRef.current,
          visibleColCount,
          visibleRowCount,
          visibleRowStartIndex:
            gridItemsRendered.current?.visibleRowStartIndex || 0,
          rowCount,
          pagination,
          hasFooter: !!renderFooterCellValue,
          focusContext,
        })(event);
      },
      [
        focusContext,
        visibleColCount,
        visibleRowCount,
        rowCount,
        pagination,
        renderFooterCellValue,
      ]
    );

    const styles = useEuiMemoizedStyles(euiDataGridStyles);
    const cssStyles = [
      styles.euiDataGrid,
      styles.cellPadding[gridStyles.cellPadding!],
      styles.fontSize[gridStyles.fontSize!],
      styles.borders[gridStyles.border!],
    ];

    return (
      <DataGridFocusContext.Provider value={focusContext}>
        <DataGridCellPopoverContext.Provider value={cellPopoverContext}>
          <DataGridSortedContext.Provider value={sortedContext}>
            <EuiFocusTrap
              disabled={!isFullScreen}
              className="euiDataGrid__focusWrap"
              css={styles.euiDataGrid__focusWrap}
            >
              <div
                css={cssStyles}
                className={classes}
                onKeyDown={handleGridKeyDown}
                style={isFullScreen ? undefined : { width, height }}
                ref={setResizeRef}
                {...rest}
              >
                {showToolbar && (
                  <EuiDataGridToolbar
                    gridWidth={gridWidth}
                    minSizeForControls={minSizeForControls}
                    toolbarVisibility={toolbarVisibility}
                    isFullScreen={isFullScreen}
                    fullScreenSelector={fullScreenSelector}
                    keyboardShortcuts={keyboardShortcuts}
                    displaySelector={displaySelector}
                    columnSelector={columnSelector}
                    columnSorting={columnSorting}
                    renderCustomToolbar={renderCustomToolbar}
                  />
                )}
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
                <div // eslint-disable-line jsx-a11y/interactive-supports-focus
                  ref={contentRef}
                  onKeyDown={onKeyDown}
                  data-test-subj="euiDataGridBody"
                  css={styles.euiDataGrid__content}
                  className="euiDataGrid__content"
                  role="grid"
                  aria-rowcount={rowCount}
                  id={gridId}
                  {...wrappingDivFocusProps} // re: above jsx-a11y - tabIndex is handled by these props, but the linter isn't smart enough to know that
                  {...gridAriaProps}
                >
                  <OverrideCopiedTabularContent>
                    <EuiDataGridBody
                      columns={orderedVisibleColumns}
                      visibleColCount={visibleColCount}
                      leadingControlColumns={leadingControlColumns}
                      schema={mergedSchema}
                      trailingControlColumns={trailingControlColumns}
                      setVisibleColumns={setVisibleColumns}
                      switchColumnPos={switchColumnPos}
                      onColumnResize={onColumnResize}
                      schemaDetectors={allSchemaDetectors}
                      sorting={sorting}
                      pagination={pagination}
                      renderCellValue={renderCellValue}
                      cellContext={cellContext}
                      renderCellPopover={renderCellPopover}
                      renderFooterCellValue={renderFooterCellValue}
                      rowCount={rowCount}
                      visibleRows={visibleRows}
                      interactiveCellId={interactiveCellId}
                      rowHeightsOptions={rowHeightsOptions}
                      virtualizationOptions={
                        virtualizationOptions || emptyVirtualizationOptions
                      }
                      isFullScreen={isFullScreen}
                      gridStyles={gridStyles}
                      gridWidth={gridWidth}
                      gridRef={gridRef}
                      gridItemsRendered={gridItemsRendered}
                      wrapperRef={contentRef}
                      renderCustomGridBody={renderCustomGridBody}
                      canDragAndDropColumns={
                        columnVisibility.canDragAndDropColumns
                      }
                    />
                  </OverrideCopiedTabularContent>
                </div>
                {showPagination && props['aria-labelledby'] && (
                  <p id={ariaLabelledById} hidden>
                    {ariaLabelledBy}
                  </p>
                )}
                {showPagination && (
                  <EuiDataGridPagination
                    {...pagination}
                    rowCount={rowCount}
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
              </div>
            </EuiFocusTrap>
          </DataGridSortedContext.Provider>
          {cellPopover}
        </DataGridCellPopoverContext.Provider>
      </DataGridFocusContext.Provider>
    );
  })
);

EuiDataGrid.displayName = 'EuiDataGrid';
