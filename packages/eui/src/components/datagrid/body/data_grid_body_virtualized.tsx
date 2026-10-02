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
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useMemo,
  MutableRefObject,
  PropsWithChildren,
  UIEvent,
  UIEventHandler,
  memo,
} from 'react';
import {
  GridChildComponentProps,
  VariableSizeGrid as Grid,
  VariableSizeGridProps,
  GridOnItemsRenderedProps,
  GridOnScrollProps,
} from 'react-window';
import { useDeepEqual } from '../../../services';
import { useResizeObserver } from '../../observer/resize_observer';
import { useDataGridHeader } from './header';
import { useDataGridFooter } from './footer';
import { CellWrapper } from './cell';
import {
  EuiDataGridBodyProps,
  DataGridWrapperRowsContentsShape,
} from '../data_grid_types';
import { useRowManager } from './data_grid_row_manager';
import {
  useFinalGridDimensions,
  useUnconstrainedHeight,
  useVirtualizeContainerWidth,
} from '../utils/grid_height_width';
import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';
import { useScrollBars, useScroll } from '../utils/scrolling';
import { IS_JEST_ENVIRONMENT } from '../../../utils';

export const Cell: FunctionComponent<GridChildComponentProps> = memo(
  ({ columnIndex, rowIndex, style, data }) => {
    const memoizedStyles = useDeepEqual(style);
    const cellStyles = useMemo(() => {
      const { headerRowHeight, showHeader } = data;
      const headerOffset = showHeader !== false ? headerRowHeight : 0;
      return {
        ...memoizedStyles,
        top: `${parseFloat(memoizedStyles.top as string) + headerOffset}px`,
      };
    }, [memoizedStyles, data]);

    return (
      <CellWrapper
        colIndex={columnIndex}
        visibleRowIndex={rowIndex}
        style={cellStyles}
        {...data}
      />
    );
  }
);
Cell.displayName = 'Cell';

// Context is required to pass props to react-window's innerElementType
// @see https://github.com/bvaughn/react-window/issues/404
export const DataGridWrapperRowsContext =
  createContext<DataGridWrapperRowsContentsShape>({
    headerRow: <div />,
    headerRowHeight: 0,
    footerRow: null,
  });

type InnerElementProps = PropsWithChildren & {
  style: {
    height: number;
  };
};

const InnerElement: VariableSizeGridProps['innerElementType'] = memo(
  forwardRef<HTMLDivElement, InnerElementProps>(
    ({ children, style, ...rest }, ref) => {
      const { headerRowHeight, headerRow, footerRow } = useContext(
        DataGridWrapperRowsContext
      );
      const memoizedStyles = useDeepEqual(style);
      const innerElementStyles = useMemo(() => {
        return {
          ...memoizedStyles,
          height: memoizedStyles.height + headerRowHeight,
        };
      }, [memoizedStyles, headerRowHeight]);

      return (
        <>
          <div ref={ref} style={innerElementStyles} {...rest}>
            {headerRow}
            {children}
          </div>
          {footerRow}
        </>
      );
    }
  )
);
InnerElement.displayName = 'EuiDataGridInnerElement';

type ScrollPosition = Pick<GridOnScrollProps, 'scrollTop' | 'scrollLeft'>;

type DataGridOuterElementContextShape = {
  outerElementType?: VariableSizeGridProps['outerElementType'];
  direction?: VariableSizeGridProps['direction'];
  scrollPositionRef: MutableRefObject<ScrollPosition | null>;
};

const DataGridOuterElementContext =
  createContext<DataGridOuterElementContextShape>({
    scrollPositionRef: { current: null },
  });

type OuterElementProps = PropsWithChildren & {
  onScroll: UIEventHandler<HTMLDivElement>;
};

const clampScrollOffset = (offset: number, max: number) =>
  Math.max(0, Math.min(offset, max));

const OuterElement = forwardRef<HTMLDivElement, OuterElementProps>(
  ({ onScroll, ...rest }, ref) => {
    const {
      outerElementType: Element = 'div',
      direction,
      scrollPositionRef,
    } = useContext(DataGridOuterElementContext);

    // react-window compares the raw scroll offsets against its own clamped
    // offsets, and flags the grid as scrolling (setting `pointer-events: none`
    // on the inner element) whenever they differ. Firefox can report a
    // `scrollTop` above the maximum at fractional device pixel ratios, which
    // makes every scroll event at the bottom of the grid look like a scroll,
    // so hovered cells lose the pointer and tooltips repeatedly open and close.
    const onScrollIfMoved = useCallback(
      (event: UIEvent<HTMLDivElement>) => {
        if (direction !== 'rtl') {
          const {
            scrollTop,
            scrollLeft,
            scrollHeight,
            scrollWidth,
            clientHeight,
            clientWidth,
          } = event.currentTarget;
          const scrollPosition = {
            scrollTop: clampScrollOffset(
              scrollTop,
              scrollHeight - clientHeight
            ),
            scrollLeft: clampScrollOffset(
              scrollLeft,
              scrollWidth - clientWidth
            ),
          };
          const previousScrollPosition = scrollPositionRef.current;
          if (
            previousScrollPosition &&
            scrollPosition.scrollTop === previousScrollPosition.scrollTop &&
            scrollPosition.scrollLeft === previousScrollPosition.scrollLeft
          ) {
            return;
          }
          // react-window may not have rendered the previous event's position
          // yet, so the ref must reflect every forwarded event, not only the
          // positions react-window reports back through its `onScroll` prop.
          scrollPositionRef.current = scrollPosition;
        }
        onScroll(event);
      },
      [onScroll, direction, scrollPositionRef]
    );

    return <Element ref={ref} onScroll={onScrollIfMoved} {...rest} />;
  }
);
OuterElement.displayName = 'EuiDataGridOuterElement';

export const EuiDataGridBodyVirtualized: FunctionComponent<EuiDataGridBodyProps> =
  memo(
    ({
      leadingControlColumns,
      trailingControlColumns,
      columns,
      visibleColCount,
      schema,
      schemaDetectors,
      rowCount,
      visibleRows: { startRow, endRow, visibleRowCount },
      renderCellValue,
      cellContext,
      renderCellPopover,
      renderFooterCellValue,
      interactiveCellId,
      pagination,
      sorting,
      setVisibleColumns,
      switchColumnPos,
      onColumnResize,
      rowHeightsOptions,
      virtualizationOptions,
      isFullScreen,
      gridStyles,
      gridWidth,
      gridRef,
      gridItemsRendered,
      wrapperRef,
      className,
      canDragAndDropColumns,
      showHeader = true,
    }) => {
      /**
       * Grid refs & observers
       */
      const wrapperDimensions = useResizeObserver(wrapperRef.current);
      const outerGridRef = useRef<HTMLDivElement | null>(null); // container that becomes scrollable
      const innerGridRef = useRef<HTMLDivElement | null>(null); // container sized to fit all content

      /**
       * Scroll bars
       */
      const {
        scrollBarHeight,
        hasVerticalScroll,
        hasHorizontalScroll,
        scrollBorderOverlay,
      } = useScrollBars(outerGridRef, gridStyles.border);

      /**
       * Widths
       */
      const virtualizeContainerWidth = useVirtualizeContainerWidth(
        outerGridRef.current,
        gridWidth,
        pagination?.pageSize
      );

      // compute the default column width from the container's width and count of visible columns
      const defaultColumnWidth = useDefaultColumnWidth(
        virtualizeContainerWidth,
        leadingControlColumns,
        trailingControlColumns,
        columns
      );

      const { columnWidths, setColumnWidth, getColumnWidth } = useColumnWidths({
        columns,
        leadingControlColumns,
        trailingControlColumns,
        defaultColumnWidth,
        onColumnResize,
      });

      /**
       * Header & footer
       */
      const { headerRow, headerRowHeight } = useDataGridHeader({
        leadingControlColumns,
        trailingControlColumns,
        columns,
        columnWidths,
        defaultColumnWidth,
        setColumnWidth,
        visibleColCount,
        setVisibleColumns,
        switchColumnPos,
        sorting,
        schema,
        schemaDetectors,
        gridStyles,
        canDragAndDropColumns,
      });

      const { footerRow, footerRowHeight } = useDataGridFooter({
        renderFooterCellValue,
        renderCellPopover,
        rowIndex: visibleRowCount,
        visibleRowIndex: visibleRowCount,
        visibleColCount,
        interactiveCellId,
        leadingControlColumns,
        trailingControlColumns,
        columns,
        columnWidths,
        defaultColumnWidth,
        schema,
        gridStyles,
      });

      /**
       * Handle scrolling cells fully into view
       */
      useScroll({
        gridRef,
        outerGridRef,
        hasGridScrolling: hasVerticalScroll || hasHorizontalScroll,
        headerRowHeight,
        footerRowHeight,
        visibleRowCount,
        hasStickyFooter: !!(renderFooterCellValue && gridStyles.stickyFooter),
        canDragAndDropColumns,
      });

      /**
       * Row manager
       */
      const rowManager = useRowManager({
        innerGridRef,
        rowClasses: gridStyles.rowClasses,
      });

      /**
       * Heights
       */
      const rowHeightUtils = useRowHeightUtils({
        virtualization: {
          gridRef,
          outerGridElementRef: outerGridRef,
          gridItemsRenderedRef: gridItemsRendered,
        },
        rowHeightsOptions,
        columns,
      });

      const { defaultRowHeight, setRowHeight, getRowHeight } =
        useDefaultRowHeight({
          rowHeightsOptions,
          rowHeightUtils,
        });

      const unconstrainedHeight = useUnconstrainedHeight({
        rowHeightUtils,
        startRow,
        endRow,
        rowHeightsOptions,
        defaultRowHeight,
        headerRowHeight,
        footerRowHeight,
        scrollBarHeight,
        innerGridRef,
      });

      /**
       * Final grid height & width
       */
      const { finalWidth, finalHeight } = useFinalGridDimensions({
        unconstrainedHeight,
        unconstrainedWidth: 0, // unable to determine this until the container's size is known
        wrapperDimensions,
        wrapperRef,
        isFullScreen,
        rowCount,
      });

      /**
       * Grid resets
       */
      useEffect(() => {
        if (gridRef.current) {
          gridRef.current.resetAfterColumnIndex(0);
        }
      }, [gridRef, columns, columnWidths, defaultColumnWidth]);

      useEffect(() => {
        if (gridRef.current && rowHeightsOptions) {
          gridRef.current.resetAfterRowIndex(0);
        }
      }, [
        gridRef,
        pagination?.pageIndex,
        rowHeightsOptions,
        gridStyles?.cellPadding,
        gridStyles?.fontSize,
      ]);

      useEffect(() => {
        if (gridRef.current) {
          gridRef.current.resetAfterRowIndex(0);
        }
      }, [gridRef, getRowHeight]);

      const onItemsRendered = useCallback(
        (itemsRendered: GridOnItemsRenderedProps) => {
          gridItemsRendered.current = itemsRendered;
          virtualizationOptions?.onItemsRendered?.(itemsRendered);
        },
        [gridItemsRendered, virtualizationOptions]
      );

      const itemData = useMemo(() => {
        return {
          schemaDetectors,
          setRowHeight,
          leadingControlColumns,
          trailingControlColumns,
          columns,
          visibleColCount,
          schema,
          columnWidths,
          defaultColumnWidth,
          renderCellValue,
          cellContext,
          renderCellPopover,
          interactiveCellId,
          rowHeightsOptions,
          rowHeightUtils,
          rowManager,
          pagination,
          headerRowHeight,
          gridStyles,
          showHeader,
        };
      }, [
        schemaDetectors,
        setRowHeight,
        leadingControlColumns,
        trailingControlColumns,
        columns,
        visibleColCount,
        schema,
        columnWidths,
        defaultColumnWidth,
        renderCellValue,
        cellContext,
        renderCellPopover,
        interactiveCellId,
        rowHeightsOptions,
        rowHeightUtils,
        rowManager,
        pagination,
        headerRowHeight,
        gridStyles,
        showHeader,
      ]);

      const rowWrapperContextValue = useMemo(() => {
        return {
          headerRowHeight: showHeader ? headerRowHeight : 0,
          headerRow: showHeader ? headerRow : null,
          footerRow,
        };
      }, [headerRowHeight, headerRow, footerRow, showHeader]);

      const scrollPositionRef = useRef<ScrollPosition | null>(null);
      const outerElementContextValue = useMemo(() => {
        return {
          outerElementType: virtualizationOptions?.outerElementType,
          direction: virtualizationOptions?.direction,
          scrollPositionRef,
        };
      }, [
        virtualizationOptions?.outerElementType,
        virtualizationOptions?.direction,
      ]);

      const onScroll = useCallback(
        (args: GridOnScrollProps) => {
          const element = outerGridRef.current;
          // `scrollTo` reports the requested offset, which can sit past the
          // end. Storing that would replace the clamped position already
          // taken from the DOM. Leave the ref unchanged instead of writing
          // the clamped value: a scroll event that has not arrived yet still
          // differs from the previous position and is forwarded.
          const topInRange =
            element == null ||
            args.scrollTop ===
              clampScrollOffset(
                args.scrollTop,
                element.scrollHeight - element.clientHeight
              );
          const leftInRange =
            element == null ||
            args.scrollLeft ===
              clampScrollOffset(
                args.scrollLeft,
                element.scrollWidth - element.clientWidth
              );
          if (topInRange && leftInRange) {
            scrollPositionRef.current = {
              scrollTop: args.scrollTop,
              scrollLeft: args.scrollLeft,
            };
          }

          // check only if a callback is passed
          if (typeof virtualizationOptions?.onScroll !== 'function') return;

          let enhancedArgs = {
            ...args,
            scrollHeight: 0,
            scrollWidth: 0,
            clientHeight: 0,
            clientWidth: 0,
            isScrolledToBlockStart: args.scrollTop === 0,
            isScrolledToBlockEnd: false,
            isScrolledToInlineStart: args.scrollLeft === 0,
            isScrolledToInlineEnd: false,
          };

          if (outerGridRef.current) {
            const {
              scrollTop,
              scrollLeft,
              scrollHeight,
              scrollWidth,
              clientHeight,
              clientWidth,
            } = outerGridRef.current;

            const isScrollableVertical = scrollHeight > clientHeight;
            const isScrolledToBlockStart = scrollTop === 0;

            const isScrollableHorizontal = scrollWidth > clientWidth;
            const isScrolledToInlineStart = scrollLeft === 0;

            const isScrolledToBlockEnd =
              isScrollableVertical &&
              !isScrolledToBlockStart &&
              scrollHeight - scrollTop <= clientHeight;
            const isScrolledToInlineEnd =
              isScrollableHorizontal &&
              !isScrolledToInlineStart &&
              scrollWidth - scrollLeft <= clientWidth;

            enhancedArgs = {
              ...enhancedArgs,
              scrollTop,
              scrollLeft,
              scrollHeight,
              scrollWidth,
              clientHeight,
              clientWidth,
              isScrolledToBlockStart,
              isScrolledToBlockEnd,
              isScrolledToInlineStart,
              isScrolledToInlineEnd,
            };
          }

          return virtualizationOptions?.onScroll(enhancedArgs);
        },
        [outerGridRef, virtualizationOptions]
      );

      return IS_JEST_ENVIRONMENT || finalWidth > 0 ? (
        <DataGridWrapperRowsContext.Provider value={rowWrapperContextValue}>
          <DataGridOuterElementContext.Provider
            value={outerElementContextValue}
          >
            <Grid
              {...virtualizationOptions}
              ref={gridRef}
              className={classNames(
                'euiDataGrid__virtualized',
                className,
                virtualizationOptions?.className
              )}
              onItemsRendered={onItemsRendered}
              outerElementType={OuterElement}
              innerElementType={InnerElement}
              outerRef={outerGridRef}
              innerRef={innerGridRef}
              columnCount={visibleColCount}
              width={finalWidth}
              columnWidth={getColumnWidth}
              height={finalHeight}
              rowHeight={getRowHeight}
              itemData={itemData}
              rowCount={
                IS_JEST_ENVIRONMENT ||
                headerRowHeight > 0 ||
                (showHeader === false && innerGridRef.current)
                  ? visibleRowCount
                  : 0
              }
              onScroll={onScroll}
            >
              {Cell}
            </Grid>
          </DataGridOuterElementContext.Provider>
          {scrollBorderOverlay}
        </DataGridWrapperRowsContext.Provider>
      ) : null;
    }
  );
EuiDataGridBodyVirtualized.displayName = 'EuiDataGridBodyVirtualized';
