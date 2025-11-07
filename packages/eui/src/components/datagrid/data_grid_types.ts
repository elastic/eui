/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  ComponentType,
  JSXElementConstructor,
  ReactNode,
  HTMLAttributes,
  CSSProperties,
  ReactElement,
  AriaAttributes,
  MutableRefObject,
  Ref,
  Component,
  ComponentClass,
  KeyboardEventHandler,
  JSX,
} from 'react';
import {
  VariableSizeGridProps,
  VariableSizeGrid as Grid,
  GridOnItemsRenderedProps,
  GridOnScrollProps,
} from 'react-window';
import { EuiListGroupItemProps } from '../list_group';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { ExclusiveUnion, CommonProps, OneOf } from '../common';
import { RowHeightUtilsType } from './utils/row_heights';
import { IconType } from '../icon';
import { EuiTokenProps } from '../token';
import { EuiPopoverProps } from '../popover';

// since react-window doesn't export a type with the imperative api only we can
// use this to omit the react-specific class component methods
export type ImperativeGridApi = Omit<Grid, keyof Component>;

export interface EuiDataGridToolbarProps {
  gridWidth: number;
  minSizeForControls?: number;
  toolbarVisibility: boolean | EuiDataGridToolBarVisibilityOptions;
  isFullScreen: boolean;
  fullScreenSelector: ReactNode;
  keyboardShortcuts: ReactNode;
  displaySelector: ReactNode;
  columnSelector: ReactNode;
  columnSorting: ReactNode;
  renderCustomToolbar?: (props: EuiDataGridCustomToolbarProps) => ReactElement;
}

/**
 * Props which are available for a custom toolbar rendering
 */
export interface EuiDataGridCustomToolbarProps {
  hasRoomForGridControls: boolean;
  fullScreenControl: ReactNode;
  keyboardShortcutsControl: ReactNode;
  displayControl: ReactNode;
  columnControl: ReactNode;
  columnSortingControl: ReactNode;
}

export interface EuiDataGridInMemoryRendererProps {
  inMemory: EuiDataGridInMemory;
  columns: EuiDataGridColumn[];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  onCellRender: (rowIndex: number, columnId: string, value: string) => void;
}

export interface DataGridWrapperRowsContentsShape {
  headerRowHeight: number;
  headerRow: ReactElement;
  footerRow: ReactElement | null;
}
export interface EuiDataGridSchema {
  [columnId: string]: { columnType: string | null };
}

export interface SchemaTypeScore {
  type: string;
  score: number;
}
export interface EuiDataGridSchemaDetector {
  /**
   * The name of this data type, matches {@link EuiDataGridColumn} / `schema`
   */
  type: string;
  /**
   * The function given the text value of a cell and returns a score of [0...1] of how well the value matches this data type
   */
  detector: (value: string) => number;
  /**
   * A custom comparator function when performing in-memory sorting on this data type, takes `(a: string, b: string, direction: 'asc' | 'desc', indexes: {aIndex: number, bIndex: number}) => -1 | 0 | 1`
   */
  comparator?: (
    a: string,
    b: string,
    direction: 'asc' | 'desc',
    indexes: { aIndex: number; bIndex: number }
  ) => -1 | 0 | 1;
  /**
   * The icon used to visually represent this data type. Accepts any `EuiIcon IconType`.
   */
  icon: IconType;
  /**
   * The color associated with this data type; it's used to color the icon token
   */
  color?: EuiTokenProps['color'] | string;
  /**
   * Text for how to represent an ascending sort of this data type, e.g. 'A -> Z'
   */
  sortTextAsc: ReactNode;
  /**
   * Text for how to represent a descending sort of this data type, e.g. 'Z -> A'
   */
  sortTextDesc: ReactNode;
  /**
   * Whether columns with this schema are sortable (defaults to true). Can be overridden at the individual {@link EuiDataGridColumn} level
   */
  isSortable?: boolean;
  /**
   * This property controls the capitalization of text
   */
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  /**
   * Default sort direction of columns with this schema. Can be overridden at the individual {@link EuiDataGridColumn} level
   */
  defaultSortDirection?: 'asc' | 'desc';
}

export interface EuiDataGridHeaderRowPropsSpecificProps {
  sorting?: EuiDataGridSorting;
  leadingControlColumns?: EuiDataGridControlColumn[];
  trailingControlColumns?: EuiDataGridControlColumn[];
  columns: EuiDataGridColumn[];
  columnWidths: EuiDataGridColumnWidths;
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  defaultColumnWidth?: number | null;
  setColumnWidth: (columnId: string, width: number) => void;
  visibleColCount: number;
  setVisibleColumns: (columnId: string[]) => void;
  switchColumnPos: (colFromId: string, colToId: string) => void;
  gridStyles: EuiDataGridStyle;
  canDragAndDropColumns?: boolean;
}

export type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiDataGridHeaderRowPropsSpecificProps;

export interface EuiDataGridHeaderCellProps
  extends Omit<
    EuiDataGridHeaderRowPropsSpecificProps,
    'leadingControlColumns' | 'trailingControlColumns' | 'visibleColCount'
  > {
  index: number;
  column: EuiDataGridColumn;
  isLastColumn: boolean;
}

export interface EuiDataGridControlHeaderCellProps {
  index: number;
  isLastColumn: boolean;
  controlColumn: EuiDataGridControlColumn;
}

export interface EuiDataGridHeaderCellWrapperProps {
  children: ReactNode | ((renderFocusTrap: boolean) => ReactNode);
  id: string;
  index: number;
  isLastColumn: boolean;
  width?: number | null;
  className?: string;
  'aria-label'?: AriaAttributes['aria-label'];
  'aria-labelledby'?: AriaAttributes['aria-labelledby'];
  hasColumnActions?: boolean;
  isDragging?: boolean;
  onKeyDown?: KeyboardEventHandler;
}

export type EuiDataGridFooterRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    rowIndex: number;
    leadingControlColumns: EuiDataGridControlColumn[];
    trailingControlColumns: EuiDataGridControlColumn[];
    columns: EuiDataGridColumn[];
    schema: EuiDataGridSchema;
    columnWidths: EuiDataGridColumnWidths;
    defaultColumnWidth?: number | null;
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    renderCellPopover?: EuiDataGridCellProps['renderCellPopover'];
    interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
    visibleRowIndex?: number;
    visibleColCount: number;
    gridStyles: EuiDataGridStyle;
  };

export interface EuiDataGridVisibleRows {
  startRow: number;
  endRow: number;
  visibleRowCount: number;
}

export interface DataGridSortedContextShape {
  sorting?: EuiDataGridSorting;
  sortedRowMap: number[];
  getCorrectRowIndex: (visibleRowIndex: number) => number;
}

// An array of [x,y] coordinates. Note that the `y` value expected internally is a `visibleRowIndex`
export type EuiDataGridFocusedCell = [number, number];

export interface DataGridFocusContextShape {
  focusedCell?: EuiDataGridFocusedCell;
  setFocusedCell: (cell: EuiDataGridFocusedCell, forceUpdate?: boolean) => void;
  setIsFocusedCellInView: (isFocusedCellInView: boolean) => void;
  onFocusUpdate: (
    cell: EuiDataGridFocusedCell,
    updateFocus: Function
  ) => () => void;
  focusFirstVisibleInteractiveCell: () => void;
}

export interface DataGridCellPopoverContextShape {
  popoverIsOpen: boolean;
  // Note that the rowIndex used to locate cells internally is a `visibleRowIndex`
  cellLocation: { rowIndex: number; colIndex: number };
  openCellPopover(args: { rowIndex: number; colIndex: number }): void;
  closeCellPopover(): void;
  setPopoverAnchor(anchor: HTMLElement): void;
  setPopoverAnchorPosition(position: 'downLeft' | 'upLeft'): void;
  setPopoverContent(content: ReactNode): void;
  setCellPopoverProps: EuiDataGridCellPopoverElementProps['setCellPopoverProps'];
}

export type CommonGridProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of {@link EuiDataGridColumn} objects. Lists the columns available and the schema and settings tied to it.
     */
    columns: EuiDataGridColumn[];
    /**
     * An array of {@link EuiDataGridControlColumn} objects. Used to define ancillary columns on the left side of the data grid.
     * Useful for adding items like checkboxes and buttons.
     */
    leadingControlColumns?: EuiDataGridControlColumn[];
    /**
     * An array of {@link EuiDataGridControlColumn} objects. Used to define ancillary columns on the right side of the data grid.
     * Useful for adding items like checkboxes and buttons.
     */
    trailingControlColumns?: EuiDataGridControlColumn[];
    /**
     * An array of {@link EuiDataGridColumnVisibility} objects.
     * Defines which columns are **intitially** visible in the grid and the order they are displayed.
     * Users can still turn their visibility on/off when `toolbarVisibility.showColumnSelector = true` (which is the default).
     */
    columnVisibility: EuiDataGridColumnVisibility;
    /**
     * An array of custom {@link EuiDataGridSchemaDetector} objects. You can inject custom schemas to the grid to define the classnames applied.
     */
    schemaDetectors?: EuiDataGridSchemaDetector[];
    /**
     * The total number of rows in the dataset (used by e.g. pagination to know how many pages to list).
     */
    rowCount: number;
    /**
     * A function called to render a cell's value. Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives {@link EuiDataGridCellValueElementProps}
     * as its only argument.
     */
    renderCellValue: EuiDataGridCellProps['renderCellValue'];
    /**
     * An optional object of props passed to the `renderCellValue` component.
     * This API exists to make it easier to define your `renderCellValue` function
     * component statically, and not rerender due to other dependent state.
     */
    cellContext?: EuiDataGridCellProps['cellContext'];
    /**
     * An optional function that can be used to completely customize the rendering of cell popovers.
     *
     * If not specified, defaults to an `<EuiText>` wrapper around the rendered cell value and an
     * `<EuiPopoverFooter>` around the cell actions.
     *
     * Behind the scenes it is treated as a React component allowing hooks, context, and other React concepts to be used.
     * The function receives {@link EuiDataGridCellPopoverElementProps} as its only argument.
     *
     */
    renderCellPopover?: EuiDataGridCellProps['renderCellPopover'];
    /**
     * An optional function called to render a footer cell. If not specified, no footer row is rendered.
     *
     * Behind the scenes it is treated as a React component
     * allowing hooks, context, and other React concepts to be used. The function receives {@link EuiDataGridCellValueElementProps}
     * as its only argument.
     */
    renderFooterCellValue?: EuiDataGridCellProps['renderCellValue'];
    /**
     * An optional function called to completely customize and control the rendering of
     * EuiDataGrid's body and cell placement.  This can be used to, e.g. remove EuiDataGrid's
     * virtualization library, or roll your own.
     *
     * This component is **only** meant as an escape hatch for extremely custom use cases.
     *
     * Behind the scenes, this function is treated as a React component,
     * allowing hooks, context, and other React concepts to be used.
     * It receives {@link EuiDataGridCustomBodyProps} as its only argument.
     */
    renderCustomGridBody?: (args: EuiDataGridCustomBodyProps) => ReactNode;
    /**
     * An optional function called to customize placement of controls in EuiDataGrid's toolbar.
     * This can be used to add custom buttons or reorder existing ones.
     *
     * Behind the scenes, this function is treated as a React component,
     * allowing hooks, context, and other React concepts to be used.
     * It receives {@link EuiDataGridCustomToolbarProps} as its only argument.
     */
    renderCustomToolbar?: EuiDataGridToolbarProps['renderCustomToolbar'];
    /**
     * Defines the initial style of the grid. Accepts a partial {@link EuiDataGridStyle} object.
     * Settings provided may be overwritten or merged with user defined preferences if `toolbarVisibility.showDisplaySelector.allowDensity = true` (which is the default).
     */
    gridStyle?: EuiDataGridStyle;
    /**
     * Allows you to configure what features the toolbar shows.
     *
     * Accepts either a boolean or {@link EuiDataGridToolBarVisibilityOptions} object.
     * When used as a boolean, defines the display of the entire toolbar.
     * When passed an object allows you to turn off individual controls within the toolbar as well as add additional buttons.
     */
    toolbarVisibility?: boolean | EuiDataGridToolBarVisibilityOptions;
    /**
     * A {@link EuiDataGridInMemory} object to define the level of high order schema-detection and sorting logic to use on your data.
     * **Try to set when possible**.
     * If omitted, disables all enhancements and assumes content is flat strings.
     */
    inMemory?: EuiDataGridInMemory;
    /**
     * A {@link EuiDataGridPaginationProps} object. Omit to disable pagination completely.
     */
    pagination?: EuiDataGridPaginationProps;
    /**
     * A {@link EuiDataGridSorting} object that provides the sorted columns along with their direction. Provides a callback for when it changes.
     * Optional, but required when inMemory is set.
     * Omit to disable, but you'll likely want to also turn off the user sorting controls through the `toolbarVisibility` prop.
     */
    sorting?: EuiDataGridSorting;
    /**
     * A callback for when a column's size changes. Callback receives `{ columnId: string, width: number }`.
     */
    onColumnResize?: EuiDataGridOnColumnResizeHandler;
    /**
     * Defines a minimum width for the grid to show all controls in its toolbar.
     */
    minSizeForControls?: number;
    /**
     * Sets the grid's height, forcing it to overflow in a scrollable container with cell virtualization.
     */
    height?: CSSProperties['height'];
    /**
     * Sets the grid's width, forcing it to overflow in a scrollable container with cell virtualization.
     */
    width?: CSSProperties['width'];
    /**
     * Allows customizing the underlying [react-window grid](https://react-window.vercel.app/#/api/VariableSizeGrid) props.
     */
    virtualizationOptions?: Pick<
      VariableSizeGridProps,
      | 'className'
      | 'style'
      | 'direction'
      | 'estimatedRowHeight'
      | 'estimatedColumnWidth'
      | 'overscanRowCount'
      | 'overscanColumnCount'
      | 'initialScrollTop'
      | 'initialScrollLeft'
      | 'onItemsRendered'
      | 'itemKey'
      | 'outerElementType'
    > & {
      /**
       * Called when the grid scroll positions changes, as a result of user scrolling or scroll-to method calls.
       */
      onScroll?: (
        args: GridOnScrollProps & {
          scrollHeight: number;
          scrollWidth: number;
          clientHeight: number;
          clientWidth: number;
          isScrolledToBlockStart: boolean;
          isScrolledToBlockEnd: boolean;
          isScrolledToInlineStart: boolean;
          isScrolledToInlineEnd: boolean;
        }
      ) => void;
    };
    /**
     * A {@link EuiDataGridRowHeightsOptions} object that provides row heights options.
     * Allows configuring both default and specific heights of grid rows.
     * Settings provided may be overwritten or merged with user defined preferences if `toolbarVisibility.showDisplaySelector.allowRowHeight = true` (which is the default).
     */
    rowHeightsOptions?: EuiDataGridRowHeightsOptions;
    /**
     * A callback for when the fullscreen state changes. Callback receives `isFullScreen: boolean`.
     */
    onFullScreenChange?: (isFullScreen: boolean) => void;
  };

// Force either aria-label or aria-labelledby to be defined
export type EuiDataGridProps = OneOf<
  CommonGridProps,
  'aria-label' | 'aria-labelledby'
>;

export interface EuiDataGridRefProps {
  /**
   * Allows manually controlling the fullscreen state of the grid.
   */
  setIsFullScreen: (isFullScreen: boolean) => void;
  /**
   * Allows manually focusing the specified cell in the grid.
   *
   * Using this method is an accessibility requirement if your EuiDataGrid
   * toggles a modal or flyout - focus must be restored to the grid on close
   * to prevent keyboard or screen reader users from being stranded.
   */
  setFocusedCell: (cell: { rowIndex: number; colIndex: number }) => void;
  /**
   * Allows manually opening the popover of the specified cell in the grid.
   */
  openCellPopover: (cell: { rowIndex: number; colIndex: number }) => void;
  /**
   * Closes any currently open popovers in the data grid.
   */
  closeCellPopover: () => void;
  /**
   * Scrolls to a specified top and left offset.
   */
  scrollTo?: ImperativeGridApi['scrollTo'];
  /**
   * Scrolls to a specified rowIndex.
   */
  scrollToItem?: ImperativeGridApi['scrollToItem'];
}

export interface EuiDataGridColumnResizerProps {
  columnId: string;
  columnWidth: number;
  setColumnWidth: (columnId: string, width: number) => void;
  isLastColumn: boolean;
}

export interface EuiDataGridColumnResizerState {
  initialX: number;
  offset: number;
}

export interface EuiDataGridColumnSortingDraggableProps {
  id: string;
  direction: string;
  index: number;
  sorting: EuiDataGridSorting;
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  /**
   * Value to be shown in column sorting popover.
   */
  display: string;
}

export interface EuiDataGridBodyProps {
  leadingControlColumns: EuiDataGridControlColumn[];
  trailingControlColumns: EuiDataGridControlColumn[];
  columns: EuiDataGridColumn[];
  visibleColCount: number;
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  rowCount: number;
  visibleRows: EuiDataGridVisibleRows;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  cellContext?: EuiDataGridCellProps['cellContext'];
  renderCellPopover?: EuiDataGridCellProps['renderCellPopover'];
  renderFooterCellValue?: EuiDataGridCellProps['renderCellValue'];
  renderCustomGridBody?: EuiDataGridProps['renderCustomGridBody'];
  interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
  sorting?: EuiDataGridSorting;
  pagination?: Required<EuiDataGridPaginationProps>;
  setVisibleColumns: EuiDataGridHeaderRowProps['setVisibleColumns'];
  switchColumnPos: EuiDataGridHeaderRowProps['switchColumnPos'];
  onColumnResize?: EuiDataGridOnColumnResizeHandler;
  virtualizationOptions?: EuiDataGridProps['virtualizationOptions'];
  rowHeightsOptions?: EuiDataGridRowHeightsOptions;
  isFullScreen: boolean;
  gridStyles: EuiDataGridStyle;
  gridWidth: number;
  gridRef: MutableRefObject<Grid | null>;
  gridItemsRendered: MutableRefObject<GridOnItemsRenderedProps | null>;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  className?: string;
  canDragAndDropColumns?: boolean;
}

export interface EuiDataGridCustomBodyProps {
  /**
   * When taking control of data grid rendering, the underlying `EuiDataGridCell`
   * is passed as a prop for usage. You **must** pass in a valid `colIndex`
   * and `visibleRowIndex` to this cell component.
   *
   * You may also pass in any other optional cell prop overrides
   * that `EuiDataGridCell` accepts, such as `isExpandable` or `renderCellValue`.
   */
  Cell: JSXElementConstructor<
    {
      colIndex: number;
      visibleRowIndex: number;
    } & Partial<EuiDataGridCellProps>
  >;
  /**
   * The currently visible columns are passed to your data grid renderer so that your
   * custom grid can automatically adjust to column hiding & reordering.
   */
  visibleColumns: EuiDataGridColumn[];
  /**
   * The currently visible rows are passed to your data grid renderer so that your
   * custom grid can automatically adjust to sorting and pagination.
   *
   * You will need  to manually slice your data with `startRow` and `endRow` in order to simulate pagination.
   */
  visibleRowData: {
    startRow: number;
    endRow: number;
    visibleRowCount: number;
  };
  /**
   * Callback function to set custom props & attributes on the custom grid body's wrapping `div` element.
   * It's best to wrap calls to `setCustomGridBodyProps` in a `useEffect` hook
   */
  setCustomGridBodyProps: (props: EuiDataGridSetCustomGridBodyProps) => void;

  /**
   * The width of the grid, can be used by consumer as a layout utility
   */
  gridWidth: number;
  /**
   * Header row component to render by custom renderer
   * */
  headerRow: JSX.Element;
  /**
   * Footer row component to render by custom renderer
   * */
  footerRow: JSX.Element | null;
}

export type EuiDataGridSetCustomGridBodyProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    ref?: MutableRefObject<HTMLDivElement> | Ref<HTMLDivElement>;
  };

/**
 * Props shared between renderCellValue and renderCellPopover
 */
interface SharedRenderCellElementProps {
  /**
   * Index of the row being rendered, 0 represents the first row. This index always includes
   * pagination offset, meaning the first rowIndex in a grid is `pagination.pageIndex * pagination.pageSize`
   * so take care if you need to adjust the rowIndex to fit your data
   */
  rowIndex: number;
  /**
   * Index of the column being rendered, 0 represents the first column. This index accounts
   * for columns that have been hidden or reordered by the user, so take care if you need
   * to adjust the colIndex to fit your data
   */
  colIndex: number;
  /**
   * ID of the column being rendered, the value comes from the {@link EuiDataGridColumn} `id`
   */
  columnId: string;
  /**
   * The schema type of the column being rendered
   */
  schema?: string | null;
}

export type EuiDataGridSetCellProps = CommonProps &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'role' | 'tabIndex' | 'aria-rowindex'
  > & {
    isExpandable?: boolean;
  };

export interface EuiDataGridCellValueElementProps
  extends SharedRenderCellElementProps {
  /**
   * Callback function to set custom props & attributes on the cell's wrapping `div` element;
   * it's best to wrap calls to `setCellProps` in a `useEffect` hook
   */
  setCellProps: (props: EuiDataGridSetCellProps) => void;
  /**
   * Whether or not the cell is expandable, comes from the {@link EuiDataGridColumn} `isExpandable` which defaults to `true`
   */
  isExpandable: boolean;
  /**
   * Whether or not the cell is expanded
   */
  isExpanded: boolean;
  /**
   * When rendering the cell, `isDetails` is false; when the cell is expanded, `renderCellValue` is called again to render into the details popover and `isDetails` is true
   */
  isDetails: boolean;
}

export interface EuiDataGridCellPopoverElementProps
  extends SharedRenderCellElementProps {
  /**
   * The default `children` passed to the cell popover comes from the passed `renderCellValue` prop as a ReactElement.
   *
   * Allows wrapping the rendered content: `({ children }) => <div>{children}</div>` - or leave it out to render completely custom content.
   */
  children: ReactNode;
  /**
   * References the div element the cell contents have been rendered into. Primarily useful for processing the rendered text
   */
  cellContentsElement: HTMLDivElement;
  /**
   * An `EuiPopoverFooter` containing all column `cellActions` (as `EuiEmptyButton`s).
   * Use `{cellActions}` to render the default cell action buttons, or leave it out to hide cell actions/render your own.
   */
  cellActions: ReactNode;
  /**
   * For certain columns or schemas, you may want to fall back to the standard EuiDataGrid popover display.
   * If so, that component is provided here as a passed React function component for your usage.
   */
  DefaultCellPopover: JSXElementConstructor<EuiDataGridCellPopoverElementProps>;
  /**
   * Allows passing props to the wrapping cell expansion popover and panel.
   * Accepts any props that `EuiPopover` accepts, except for `button` and `closePopover`.
   */
  setCellPopoverProps: (
    props: Omit<EuiPopoverProps, 'button' | 'closePopover'>
  ) => void;
}

type CellContext = Omit<
  Record<string, any>,
  keyof EuiDataGridCellValueElementProps
>;
type CellPropsWithContext = CellContext & EuiDataGridCellValueElementProps;

export type RenderCellValue =
  | ((props: CellPropsWithContext) => ReactNode)
  | ComponentClass<CellPropsWithContext>;

export interface EuiDataGridCellProps {
  rowIndex: number;
  visibleRowIndex: number;
  colIndex: number;
  column?: EuiDataGridColumn;
  columnId: string;
  columnType?: string | null;
  width?: number;
  interactiveCellId: string;
  isExpandable: boolean;
  className?: string;
  popoverContext: DataGridCellPopoverContextShape;
  renderCellValue: RenderCellValue;
  cellContext?: CellContext;
  renderCellPopover?:
    | JSXElementConstructor<EuiDataGridCellPopoverElementProps>
    | ((props: EuiDataGridCellPopoverElementProps) => ReactNode);
  setRowHeight?: (height: number) => void;
  getRowHeight?: (rowIndex: number) => number;
  style?: CSSProperties;
  rowHeightsOptions?: EuiDataGridRowHeightsOptions;
  rowHeightUtils?: RowHeightUtilsType;
  rowManager?: EuiDataGridRowManager;
  pagination?: Required<EuiDataGridPaginationProps>;
  gridStyles: EuiDataGridStyle;
}

export interface EuiDataGridCellState {
  cellProps: EuiDataGridSetCellProps;
  isFocused: boolean; // tracks if this cell has focus or not, used to enable tabIndex on the cell
  isHovered: boolean; // tracks if this cell is hovered, used to conditionally render cell actions
}

export type EuiDataGridCellValueProps = Omit<
  EuiDataGridCellProps,
  'width' | 'interactiveCellId' | 'popoverContext' | 'rowManager'
>;

export interface EuiDataGridControlColumn {
  /**
   * Used as the React `key` when rendering content
   */
  id: string;
  /**
   * Width of the column, users are unable to change this
   */
  width: number;
  /**
   * Component to render in the column header
   */
  headerCellRender: ComponentType;
  /**
   * Optional props to pass to the column header cell
   */
  headerCellProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * Component to render for each row in the column
   */
  rowCellRender: EuiDataGridCellProps['renderCellValue'];
  /**
   * Component to render in the optional column footer
   */
  footerCellRender?: EuiDataGridCellProps['renderCellValue'];
  /**
   * Optional props to pass to the column footer cell
   */
  footerCellProps?: HTMLAttributes<HTMLDivElement>;
}
// The empty control column array fallbacks need to be cached, or
// they'll cause rerendering/remount issues in memoized dependencies
export const emptyControlColumns: EuiDataGridControlColumn[] = [];

export interface EuiDataGridColumn {
  /**
   * The unique identifier for this column
   */
  id: string;
  /**
   * A `ReactNode` used when rendering the column header. When providing complicated content, please make sure to utilize CSS to respect truncation as space allows. Check the docs example.
   */
  display?: ReactNode;
  /**
   * Display name as text for the column.
   * This can be used to display a readable column name in column hiding/sorting, where `display` won't be used.
   * This will also be used as a `title` attribute that will display on mouseover (useful if the display text is being truncated by the column width).
   * If not passed, `id` will be shown as the column name.
   * Passing this together with `display` is useful to ensure an accessible label is added to the column.
   */
  displayAsText?: string;
  /**
   * Optional props to pass to the column header cell
   */
  displayHeaderCellProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * Initial width (in pixels) of the column
   */
  initialWidth?: number;
  /**
   * Defaults to true, always true if cellActions are defined. Defines whether or not the column's cells can be expanded with a popup onClick / keydown.
   */
  isExpandable?: boolean;
  /**
   * Whether this column's width can be changed by the user, defaults to true
   */
  isResizable?: boolean;
  /**
   * Whether this column is sortable
   */
  isSortable?: boolean;
  /**
   * Default sort direction of the column
   */
  defaultSortDirection?: 'asc' | 'desc';
  /**
   * A Schema to use for the column.
   * Built-in values are [`boolean`, `currency`, `datetime`, `numeric`, `json`] but can be expanded by defining your own {@link EuiDataGrid} `schemaDetectors` (for in-memory detection).
   * In general, it is advised to pass in a value here when you are sure of the schema ahead of time, so that you don't need to rely on the automatic detection.
   */
  schema?: string;
  /**
   * Configuration of column actions. Set to false to disable or use {@link EuiDataGridColumnActions} to configure the actions displayed in the header cell of the column.
   */
  actions?: false | EuiDataGridColumnActions;
  /**
   * Additional actions displayed as icon on hover / focus, and in the expanded view of the cell containing the value
   */
  cellActions?: EuiDataGridColumnCellAction[];
  /**
   * Configures the amount of cell action buttons immediately visible on a cell.
   * Any cell actions above this number will only display in the cell expansion popover.
   * Defaults to 2.
   */
  visibleCellActions?: number;
}

export type EuiDataGridColumnCellAction =
  ComponentType<EuiDataGridColumnCellActionProps>;

export interface EuiDataGridColumnActions {
  /**
   * Show/hide/configure the action to hide a column, provided EuiListGroupItemProps are merged
   */
  showHide?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action that switches the actual column with the column to the left side, provided EuiListGroupItemProps are merged
   */
  showMoveLeft?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action that switches the actual column with the column to the right side, provided EuiListGroupItemProps are merged
   */
  showMoveRight?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action to sort ascending by the actual column, provided EuiListGroupItemProps are merged
   */
  showSortAsc?: boolean | EuiListGroupItemProps;
  /**
   * Show/hide/configure the action to sort descending by the actual column, provided EuiListGroupItemProps are merged
   */
  showSortDesc?: boolean | EuiListGroupItemProps;
  /**
   * Append additional actions
   */
  additional?: EuiListGroupItemProps[];
}

export interface EuiDataGridColumnCellActionProps {
  /**
   * The index of the row that contains cell's data
   */
  rowIndex: number;
  /**
   * The index of the column that contains cell's data
   */
  colIndex: number;
  /**
   * The id of the column that contains the cell's data
   */
  columnId: string;
  /**
   * React component representing the action displayed in the cell.
   *
   * On cell hover/focus, an EuiButtonIcon will be displayed that cannot
   * have its size or color customized, only its icon.
   *
   * On cell expand, an EuiButtonEmpty will be displayed in the cell popover
   * that can have any sizing, color, or text.
   */
  Component: typeof EuiButtonEmpty | typeof EuiButtonIcon;
  /**
   * Determines whether the cell's action is displayed expanded (in the Popover)
   */
  isExpanded: boolean;
}

export interface EuiDataGridColumnVisibility {
  /**
   * An array of {@link EuiDataGridColumn} `id`s dictating the order and visibility of columns.
   */
  visibleColumns: string[];
  /**
   * A callback for when a column's visibility or order is modified by the user.
   */
  setVisibleColumns: (visibleColumns: string[]) => void;

  /** Enables reordering grid columns on drag and drop via the headers cells */
  canDragAndDropColumns?: boolean;
}

export interface EuiDataGridColumnWidths {
  [key: string]: number;
}
// Types for styling options, passed down through the `gridStyle` prop
export type EuiDataGridStyleFontSizes = 's' | 'm' | 'l';
export type EuiDataGridStyleBorders = 'all' | 'horizontal' | 'none';
export type EuiDataGridStyleHeader = 'shade' | 'underline';
export type EuiDataGridStyleFooter = 'shade' | 'overline' | 'striped';
export type EuiDataGridStyleRowHover = 'highlight' | 'none';
export type EuiDataGridStyleCellPaddings = 's' | 'm' | 'l';

export interface EuiDataGridStyle {
  /**
   * Size of fonts used within the row and column cells
   * @default m
   */
  fontSize?: EuiDataGridStyleFontSizes;
  /**
   * Defines the padding with the row and column cells
   * @default m
   */
  cellPadding?: EuiDataGridStyleCellPaddings;
  /**
   * Border used for the row and column cells
   * @default all
   */
  border?: EuiDataGridStyleBorders;
  /**
   * If set to true, rows will alternate zebra striping for clarity
   * @default false
   */
  stripes?: boolean;
  /**
   * Visual style for the column headers. Recommendation is to use the `underline` style in times when {@link EuiDataGrid} `toolbarVisibility` is set to `false`.
   * @default shade
   */
  header?: EuiDataGridStyleHeader;
  /**
   * Visual style for the column footers.
   * @default overline
   */
  footer?: EuiDataGridStyleFooter;
  /**
   * If set to true, the footer row will be sticky
   * @default true
   */
  stickyFooter?: boolean;
  /**
   * Will define what visual style to show on row hover
   * @default hover
   */
  rowHover?: EuiDataGridStyleRowHover;
  /**
   * Optionally pass custom classes to highlight or customize certain rows
   */
  rowClasses?: { [rowIndex: number]: string };
  /**
   * Optional callback returning the current `gridStyle` config when changes occur from user input (e.g. toolbar display controls).
   * Can be used for, e.g. storing user `gridStyle` in a local storage object.
   */
  onChange?: (gridStyle: EuiDataGridStyle) => void;
}

export interface EuiDataGridToolBarVisibilityColumnSelectorOptions {
  /**
   * When `false`, removes the ability to show & hide columns through the UI
   */
  allowHide?: boolean;
  /**
   * When `false`, removes the ability to re-order columns through the UI
   */
  allowReorder?: boolean;
}

export interface EuiDataGridToolBarVisibilityDisplaySelectorOptions {
  /**
   * When `false`, removes the ability to change density display through the UI
   */
  allowDensity?: boolean;
  /**
   * When `false`, removes the ability to change row height display through the UI
   */
  allowRowHeight?: boolean;
  /**
   * When `false`, removes the ability to reset styles to default through the UI
   */
  allowResetButton?: boolean;
  /**
   * Allows appending additional content to the bottom of the display settings popover
   */
  additionalDisplaySettings?: ReactNode;
  /**
   * Allows completely custom rendering of the display selector popover via render prop.
   * Passes back the default controls as arguments for optional rendering.
   */
  customRender?: EuiDataGridDisplaySelectorCustomRender;
}

export type EuiDataGridDisplaySelectorCustomRenderProps = {
  densityControl: ReactNode;
  rowHeightControl: ReactNode;
  additionalDisplaySettings: ReactNode;
  resetButton: ReactNode;
};

export type EuiDataGridDisplaySelectorCustomRender = (
  args: EuiDataGridDisplaySelectorCustomRenderProps
) => ReactNode;

export interface EuiDataGridToolBarVisibilityOptions {
  /**
   * Allows the ability for the user to hide fields and sort columns, boolean or a {@link EuiDataGridToolBarVisibilityColumnSelectorOptions}
   * @default true
   */
  showColumnSelector?:
    | boolean
    | EuiDataGridToolBarVisibilityColumnSelectorOptions;
  /**
   * Allows the ability for the user to customize display settings such as grid density and row heights.
   * User changes will override what is provided in {@link EuiDataGridStyle} and {@link EuiDataGridRowHeightsOptions}
   * @default true
   */
  showDisplaySelector?:
    | boolean
    | EuiDataGridToolBarVisibilityDisplaySelectorOptions;
  /**
   * Allows the ability for the user to sort rows based upon column values
   * @default true
   */
  showSortSelector?: boolean;
  /**
   * Displays a popover listing all keyboard controls and shortcuts for the data grid.
   * If set to `false`, the toggle will be visually hidden, but still focusable by keyboard and screen reader users.
   * @default true
   */
  showKeyboardShortcuts?: boolean;
  /**
   * Allows user to be able to fullscreen the data grid. If set to `false` make sure your grid fits within a large enough panel to still show the other controls.
   * @default true
   */
  showFullScreenSelector?: boolean;
  /**
   * If passed a `ReactNode`, appends the passed custom control into the left side of the toolbar, after the column & sort controls.
   * Or use {@link EuiDataGridToolBarAdditionalControlsOptions} to customize the location of your control.
   */
  additionalControls?: ReactNode | EuiDataGridToolBarAdditionalControlsOptions;
}

export interface EuiDataGridToolBarAdditionalControlsOptions {
  /**
   * If passed a `ReactNode`, appends the passed node into the left side of the toolbar, **after** the column & sort controls.
   * Or use {@link EuiDataGridToolBarAdditionalControlsLeftOptions} to customize the location of your control.
   * We recommend using `<EuiButtonEmpty size="xs" />` to match the existing controls on the left.
   */
  left?: ReactNode | EuiDataGridToolBarAdditionalControlsLeftOptions;
  /**
   * Will prepend the passed node into the right side of the toolbar, **before** the density & fullscreen controls.
   * We recommend using `<EuiButtonIcon size="xs" />` to match the existing controls on the right.
   */
  right?: ReactNode;
}

export interface EuiDataGridToolBarAdditionalControlsLeftOptions {
  /**
   * Will prepend the passed node into the left side of the toolbar, **before** the column & sort controls.
   */
  prepend?: ReactNode;
  /**
   * Will append the passed node into the left side of the toolbar, **after** the column & sort controls.
   */
  append?: ReactNode;
}

// ideally this would use a generic to enforce `pageSize` exists in `pageSizeOptions`,
// but TypeScript's default understanding of an array is number[] unless `as const` is used
// which defeats the generic's purpose & functionality as it would check for `number` in `number[]`
export interface EuiDataGridPaginationProps {
  /**
   * The index of the current page, starts at 0 for the first page
   */
  pageIndex: number;
  /**
   * How many rows should initially be shown per page.
   * Pass `0` to display the selected "Show all" option and hide the pagination.
   *
   * @default 10
   */
  pageSize?: number;
  /**
   * An array of page sizes the user can select from.
   * Pass `0` as one of the options to create a "Show all" option.
   * Pass an empty array to hide "Rows per page" select button.
   *
   * @default [10, 25, 50]
   */
  pageSizeOptions?: number[];
  /**
   * A callback for when the user changes the page size selection
   */
  onChangeItemsPerPage: (itemsPerPage: number) => void;
  /**
   * A callback for when the current page index changes
   */
  onChangePage: (pageIndex: number) => void;
}

export interface EuiDataGridColumnSortingConfig {
  id: string;
  direction: 'asc' | 'desc';
}

export interface EuiDataGridSorting {
  /**
   * A function that receives updated column sort details in response to user interactions in the toolbar controls
   */
  onSort: (columns: EuiDataGridColumnSortingConfig[]) => void;
  /**
   * An array of the column ids currently being sorted and their sort direction. The array order determines the sort order. `{ id: 'A'; direction: 'asc' }`
   */
  columns: EuiDataGridColumnSortingConfig[];
}

export interface EuiDataGridInMemory {
  /**
    Given the data flow Sorting->Pagination:
    Each step can be performed by service calls or in-memory by the grid.
    However, we cannot allow any service calls after an in-memory operation.
    E.g. if Pagination requires a service call the grid cannot perform
    in-memory Sorting. This means a single value representing the
    service / in-memory boundary can be used. Thus there are four states for in-memory's level:
    * "enhancements" - no in-memory operations, but use the available data to enhance the grid
    * "pagination" - only pagination is performed in-memory
    * "sorting" - sorting & pagination is performed in-memory
 */
  level: 'enhancements' | 'pagination' | 'sorting';
  /**
   * An array of column ids for the in-memory processing to skip
   */
  skipColumns?: string[];
}

export interface EuiDataGridInMemoryValues {
  [rowIndex: string]: { [columnId: string]: string };
}

export interface EuiDataGridOnColumnResizeData {
  columnId: string;
  width: number;
}

export type EuiDataGridOnColumnResizeHandler = (
  data: EuiDataGridOnColumnResizeData
) => void;

export type EuiDataGridScrollAnchorRow = 'start' | 'center' | undefined;

export type EuiDataGridRowHeightOption =
  | number
  | 'auto'
  | ExclusiveUnion<{ lineCount: number }, { height: number }>;

export interface EuiDataGridRowHeightsOptions {
  /**
   * Defines the default size for all rows. It can be line count or just height.
   */
  defaultHeight?: EuiDataGridRowHeightOption;
  /**
   * Feature flag for custom `lineCount` behavior, where `lineCount` acts like a
   * *max* number of lines (instead of a set number of lines for all rows).
   *
   * This functionality is in beta and has performance implications;
   * we do not yet fully recommend/support it for heavy production usage.
   */
  autoBelowLineCount?: boolean;
  /**
   * Defines the height for a specific row. It can be line count or just height.
   *
   * When using row height overrides, we strongly setting the `showDisplaySelector: allowRowHeight`
   * toolbar control to `false` in {@link EuiDataGridToolBarVisibilityOptions}
   */
  rowHeights?: Record<number, EuiDataGridRowHeightOption>;
  /**
   * Defines a global lineHeight style to apply to all cells
   */
  lineHeight?: string;
  /**
   * Optional callback returning the current `rowHeightsOptions` when changes occur from user input (e.g. toolbar display controls).
   * Can be used for, e.g. storing user `rowHeightsOptions` in a local storage object.
   */
  onChange?: (rowHeightsOptions: EuiDataGridRowHeightsOptions) => void;
  /**
   * Optional indicator of the row that should be used as an anchor for vertical layout shift compensation.
   * When set to 'start' or 'center', the topmost or middle visible row will try
   * to compensate for changes in their top offsets by adjusting the grid's scroll
   * position.
   */
  scrollAnchorRow?: EuiDataGridScrollAnchorRow;
}

export interface EuiDataGridRowManager {
  getRow(args: {
    rowIndex: number;
    visibleRowIndex: number;
    top: string;
    height: number;
  }): HTMLDivElement;
}
