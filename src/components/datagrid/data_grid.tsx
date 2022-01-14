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
  KeyboardEvent,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import {
  VariableSizeGrid as Grid,
  GridOnItemsRenderedProps,
} from 'react-window';
import { useGeneratedHtmlId, keys } from '../../services';
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
  checkOrDefaultToolBarDisplayOptions,
  EuiDataGridToolbar,
} from './controls';
import { DataGridSortingContext, useSorting } from './utils/sorting';
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
import { useHeaderIsInteractive } from './body/header/header_is_interactive';
import {
  DataGridCellPopoverContext,
  useCellPopover,
} from './body/data_grid_cell_popover';
import { providedPopoverContents } from './body/popover_utils';
import { computeVisibleRows } from './utils/row_count';
import { EuiDataGridPaginationRenderer } from './utils/data_grid_pagination';
import {
  schemaDetectors as providedSchemaDetectors,
  useMergedSchema,
} from './utils/data_grid_schema';
import {
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

export const EuiDataGrid = forwardRef<EuiDataGridRefProps, EuiDataGridProps>(
  (props, ref) => {
    const {
      leadingControlColumns = [],
      trailingControlColumns = [],
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

    /**
     * Merge consumer settings with defaults
     */
    const gridStyleWithDefaults = useMemo(
      () => ({ ...startingStyles, ...gridStyle }),
      [gridStyle]
    );

    const mergedPopoverContents = useMemo(
      () => ({
        ...providedPopoverContents,
        ...popoverContents,
      }),
      [popoverContents]
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
    const resizeRef = useRef<HTMLDivElement | null>(null);
    const { width: gridWidth } = useResizeObserver(resizeRef.current, 'width');

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
    const columnSorting = useDataGridColumnSorting(
      orderedVisibleColumns,
      sorting,
      mergedSchema,
      allSchemaDetectors,
      displayValues
    );

    const sortingContext = useSorting({
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
      headerIsInteractive,
      handleHeaderMutation,
    } = useHeaderIsInteractive(contentRef.current);
    const { focusProps: wrappingDivFocusProps, ...focusContext } = useFocus({
      headerIsInteractive,
      gridItemsRendered,
    });

    /**
     * Cell popover
     */
    const { cellPopoverContext } = useCellPopover();

    /**
     * Toolbar & full-screen
     */
    const showToolbar = !!toolbarVisibility;
    const [toolbarRef, setToolbarRef] = useState<HTMLDivElement | null>(null);
    const { height: toolbarHeight } = useResizeObserver(toolbarRef, 'height');

    const [isFullScreen, setIsFullScreen] = useState(false);
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

    /**
     * Expose internal APIs as ref to consumer
     */
    useImperativeHandle(
      ref,
      () => ({
        setIsFullScreen,
        setFocusedCell: ({ rowIndex, colIndex }) => {
          focusContext.setFocusedCell([colIndex, rowIndex]);
        },
        openCellPopover: cellPopoverContext.openCellPopover,
        closeCellPopover: cellPopoverContext.closeCellPopover,
      }),
      [focusContext, cellPopoverContext]
    );

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
      },
      {
        'euiDataGrid--noControls': !toolbarVisibility,
      },
      className
    );

    const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
      'euiDataGrid__controlBtn--active': isFullScreen,
    });

    /**
     * Accessibility
     */
    const gridId = useGeneratedHtmlId();
    const interactiveCellId = useGeneratedHtmlId();
    const ariaLabelledById = useGeneratedHtmlId();

    const ariaLabel = useEuiI18n(
      'euiDataGrid.ariaLabel',
      '{label}; Page {page} of {pageCount}.',
      {
        label: rest['aria-label'],
        page: pagination ? pagination.pageIndex + 1 : 0,
        pageCount: pagination ? Math.ceil(rowCount / pagination.pageSize) : 0,
      }
    );

    const ariaLabelledBy = useEuiI18n(
      'euiDataGrid.ariaLabelledBy',
      'Page {page} of {pageCount}.',
      {
        page: pagination ? pagination.pageIndex + 1 : 0,
        pageCount: pagination ? Math.ceil(rowCount / pagination.pageSize) : 0,
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
        <DataGridCellPopoverContext.Provider value={cellPopoverContext}>
          <DataGridSortingContext.Provider value={sortingContext}>
            <EuiFocusTrap
              disabled={!isFullScreen}
              className="euiDataGrid__focusWrap"
            >
              <div
                className={classes}
                onKeyDown={handleGridKeyDown}
                style={isFullScreen ? undefined : { width, height }}
                ref={resizeRef}
                {...rest}
              >
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
                  onKeyDown={createKeyDownHandler({
                    gridElement: contentRef.current,
                    visibleColCount,
                    visibleRowCount,
                    visibleRowStartIndex:
                      gridItemsRendered.current?.visibleRowStartIndex || 0,
                    rowCount,
                    pagination,
                    hasFooter: !!renderFooterCellValue,
                    headerIsInteractive,
                    focusContext,
                  })}
                  data-test-subj="euiDataGridBody"
                  className="euiDataGrid__content"
                  role="grid"
                  id={gridId}
                  {...wrappingDivFocusProps} // re: above jsx-a11y - tabIndex is handled by these props, but the linter isn't smart enough to know that
                  {...gridAriaProps}
                >
                  <EuiDataGridBody
                    isFullScreen={isFullScreen}
                    columns={orderedVisibleColumns}
                    visibleColCount={visibleColCount}
                    toolbarHeight={toolbarHeight}
                    leadingControlColumns={leadingControlColumns}
                    schema={mergedSchema}
                    trailingControlColumns={trailingControlColumns}
                    setVisibleColumns={setVisibleColumns}
                    switchColumnPos={switchColumnPos}
                    onColumnResize={onColumnResize}
                    headerIsInteractive={headerIsInteractive}
                    handleHeaderMutation={handleHeaderMutation}
                    schemaDetectors={allSchemaDetectors}
                    popoverContents={mergedPopoverContents}
                    pagination={pagination}
                    renderCellValue={renderCellValue}
                    renderFooterCellValue={renderFooterCellValue}
                    rowCount={rowCount}
                    visibleRows={visibleRows}
                    interactiveCellId={interactiveCellId}
                    rowHeightsOptions={rowHeightsOptions}
                    virtualizationOptions={virtualizationOptions || {}}
                    gridStyles={gridStyles}
                    gridWidth={gridWidth}
                    gridRef={gridRef}
                    gridItemsRendered={gridItemsRendered}
                    wrapperRef={contentRef}
                  />
                </div>
                {pagination && props['aria-labelledby'] && (
                  <p id={ariaLabelledById} hidden>
                    {ariaLabelledBy}
                  </p>
                )}
                {pagination && (
                  <EuiDataGridPaginationRenderer
                    {...pagination}
                    rowCount={rowCount}
                    controls={gridId}
                    aria-label={props['aria-label']}
                    gridRef={gridRef}
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
          </DataGridSortingContext.Provider>
        </DataGridCellPopoverContext.Provider>
      </DataGridFocusContext.Provider>
    );
  }
);

EuiDataGrid.displayName = 'EuiDataGrid';
