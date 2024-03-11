/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  Component,
  ContextType,
  createRef,
  FunctionComponent,
  JSXElementConstructor,
  KeyboardEvent,
  memo,
  MutableRefObject,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { IS_JEST_ENVIRONMENT } from '../../../../utils';
import { keys } from '../../../../services';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiI18n } from '../../../i18n';
import { EuiTextBlockTruncate } from '../../../text_truncate';
import { hasResizeObserver } from '../../../observer/resize_observer/resize_observer';

import { DataGridFocusContext } from '../../utils/focus';
import { RowHeightVirtualizationUtils } from '../../utils/row_heights';
import {
  EuiDataGridCellProps,
  EuiDataGridCellState,
  EuiDataGridSetCellProps,
  EuiDataGridCellValueElementProps,
  EuiDataGridCellValueProps,
  EuiDataGridCellPopoverElementProps,
  EuiDataGridRowHeightOption,
} from '../../data_grid_types';
import {
  EuiDataGridCellActions,
  EuiDataGridCellPopoverActions,
} from './data_grid_cell_actions';
import { DefaultCellPopover } from './data_grid_cell_popover';
import { HandleInteractiveChildren } from './focus_utils';

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: EuiDataGridCellValueElementProps['setCellProps'];
    setCellContentsRef: EuiDataGridCell['setCellContentsRef'];
    isExpanded: boolean;
    isControlColumn: boolean;
    isFocused: boolean;
    ariaRowIndex: number;
    rowHeight?: EuiDataGridRowHeightOption;
    cellActions?: ReactNode;
  }
> = memo(
  ({
    renderCellValue,
    cellContext,
    column,
    setCellContentsRef,
    rowIndex,
    colIndex,
    ariaRowIndex,
    rowHeight,
    rowHeightUtils,
    isControlColumn,
    isFocused,
    cellActions,
    ...rest
  }) => {
    // React is more permissible than the TS types indicate
    const CellElement =
      renderCellValue as JSXElementConstructor<EuiDataGridCellValueElementProps>;

    const cellHeightType =
      rowHeightUtils?.getHeightType(rowHeight) || 'default';

    const classes = classNames(
      'euiDataGridRowCell__content',
      `euiDataGridRowCell__content--${cellHeightType}Height`,
      !isControlColumn && {
        'eui-textBreakWord': cellHeightType !== 'default',
        'eui-textTruncate': cellHeightType === 'default',
      }
    );

    let cellContent = (
      <div
        ref={setCellContentsRef}
        data-datagrid-cellcontent
        className={classes}
      >
        <CellElement
          isDetails={false}
          data-test-subj="cell-content"
          rowIndex={rowIndex}
          colIndex={colIndex}
          schema={column?.schema || rest.columnType}
          {...cellContext}
          {...rest}
        />
      </div>
    );
    if (cellHeightType === 'lineCount' && !isControlColumn) {
      const lines = rowHeightUtils!.getLineCount(rowHeight)!;
      cellContent = (
        <EuiTextBlockTruncate lines={lines} cloneElement>
          {cellContent}
        </EuiTextBlockTruncate>
      );
    }

    const screenReaderText = (
      <EuiScreenReaderOnly>
        <p hidden={!isFocused}>
          {'- '}
          <EuiI18n
            token="euiDataGridCell.position"
            default="{columnId}, column {col}, row {row}"
            values={{
              columnId: column?.displayAsText || rest.columnId,
              col: colIndex + 1,
              row: ariaRowIndex,
            }}
          />
          {cellActions && (
            <>
              {'. '}
              <EuiI18n
                token="euiDataGridCell.expansionEnterPrompt"
                default="Press the Enter key to expand this cell."
              />
            </>
          )}
        </p>
      </EuiScreenReaderOnly>
    );

    return (
      <>
        {cellContent}
        {screenReaderText}
        {cellActions}
      </>
    );
  }
);
EuiDataGridCellContent.displayName = 'EuiDataGridCellContent';

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  cellRef = createRef() as MutableRefObject<HTMLDivElement | null>;
  contentObserver!: any; // Cell Content ResizeObserver
  popoverAnchorRef = createRef() as MutableRefObject<HTMLDivElement | null>;
  cellContentsRef: HTMLDivElement | null = null;
  state: EuiDataGridCellState = {
    cellProps: {},
    isFocused: false,
    isHovered: false,
    cellTextAlign: 'Left',
  };
  unsubscribeCell?: Function;
  style = null;

  static contextType = DataGridFocusContext;
  declare context: ContextType<typeof DataGridFocusContext>;

  updateCellFocusContext = () => {
    this.context.setFocusedCell([
      this.props.colIndex,
      this.props.visibleRowIndex,
    ]);
  };

  takeFocus = (preventScroll: boolean) => {
    const cell = this.cellRef.current;
    // Only focus the cell if not already focused on something in the cell
    if (cell && !cell.contains(document.activeElement)) {
      cell.focus({ preventScroll });
    }
  };

  recalculateAutoHeight = () => {
    const { rowHeightUtils, rowHeightsOptions, rowIndex } = this.props;
    if (
      this.cellContentsRef &&
      rowHeightUtils &&
      rowHeightUtils.isAutoHeight(rowIndex, rowHeightsOptions)
    ) {
      const { columnId, visibleRowIndex } = this.props;
      const rowHeight = this.cellContentsRef.offsetHeight;

      rowHeightUtils.setRowHeight(
        rowIndex,
        columnId,
        rowHeight,
        visibleRowIndex
      );
    }
  };

  recalculateLineHeight = () => {
    if (!this.props.setRowHeight) return; // setRowHeight is only passed by data_grid_body into one cell per row
    if (!this.cellContentsRef) return;

    const { rowHeightUtils, rowHeightsOptions, rowIndex } = this.props;
    const rowHeightOption = rowHeightUtils?.getRowHeightOption(
      rowIndex,
      rowHeightsOptions
    );
    const isSingleLine = rowHeightOption == null; // Undefined rowHeightsOptions default to a single line
    const lineCount = isSingleLine
      ? 1
      : rowHeightUtils?.getLineCount(rowHeightOption);

    if (lineCount) {
      const shouldUseHeightsCache = rowHeightUtils?.isRowHeightOverride(
        rowIndex,
        rowHeightsOptions
      );

      const height = rowHeightUtils!.calculateHeightForLineCount(
        this.cellContentsRef,
        lineCount,
        shouldUseHeightsCache
      );

      if (shouldUseHeightsCache) {
        const { columnId, visibleRowIndex } = this.props;
        rowHeightUtils?.setRowHeight(
          rowIndex,
          columnId,
          height,
          visibleRowIndex
        );
      } else {
        this.props.setRowHeight(height);
      }
    }
  };

  componentDidMount() {
    const { colIndex, visibleRowIndex } = this.props;

    this.unsubscribeCell = this.context.onFocusUpdate(
      [colIndex, visibleRowIndex],
      this.onFocusUpdate
    );

    // Account for virtualization - when a cell unmounts when scrolled out of view
    // and then remounts when scrolled back into view, it should retain focus state
    if (this.isFocusedCell()) {
      // The second flag sets preventScroll: true as a focus option, which prevents
      // hijacking the user's scroll behavior when the cell re-mounts on scroll
      this.onFocusUpdate(true, true);
      this.context.setIsFocusedCellInView(true);
    }

    // Check if popover should be open on mount (typically only occurs if
    // openCellPopover() is manually called on a location that's out of view)
    this.handleCellPopover();
  }

  isFocusedCell = () => {
    return (
      this.context.focusedCell?.[0] === this.props.colIndex &&
      this.context.focusedCell?.[1] === this.props.visibleRowIndex
    );
  };

  onFocusUpdate = (isFocused: boolean, preventScroll = false) => {
    this.setState({ isFocused }, () => {
      if (isFocused) {
        this.takeFocus(preventScroll);
      }
    });
  };

  componentWillUnmount() {
    if (this.unsubscribeCell) {
      this.unsubscribeCell();
    }

    if (this.isFocusedCell()) {
      this.context.setIsFocusedCellInView(false);
    }

    if (this.isPopoverOpen()) {
      this.props.popoverContext.closeCellPopover();
    }
  }

  componentDidUpdate(prevProps: EuiDataGridCellProps) {
    this.recalculateAutoHeight();

    if (
      this.props.rowHeightsOptions?.defaultHeight !==
      prevProps.rowHeightsOptions?.defaultHeight
    ) {
      this.recalculateLineHeight();
    }

    if (
      (this.props.rowHeightUtils as RowHeightVirtualizationUtils)
        ?.compensateForLayoutShift &&
      this.props.rowHeightsOptions?.scrollAnchorRow &&
      this.props.colIndex === 0 && // once per row
      this.props.columnId === prevProps.columnId && // if this is still the same column
      this.props.rowIndex === prevProps.rowIndex && // if this is still the same row
      this.props.style?.top !== prevProps.style?.top // if the top position has changed
    ) {
      const previousTop = parseFloat(prevProps.style?.top as string);
      const currentTop = parseFloat(this.props.style?.top as string);

      // @ts-ignore We've already checked that this virtualization util is available above
      this.props.rowHeightUtils.compensateForLayoutShift(
        this.props.rowIndex,
        currentTop - previousTop,
        this.props.rowHeightsOptions?.scrollAnchorRow
      );
    }

    if (
      this.props.popoverContext.popoverIsOpen !==
        prevProps.popoverContext.popoverIsOpen ||
      this.props.popoverContext.cellLocation !==
        prevProps.popoverContext.cellLocation ||
      this.props.renderCellPopover !== prevProps.renderCellPopover
    ) {
      this.handleCellPopover();
    }

    if (
      this.props.columnId !== prevProps.columnId ||
      this.props.rowIndex !== prevProps.rowIndex
    ) {
      this.setCellProps({});
    }
  }

  shouldComponentUpdate(
    nextProps: EuiDataGridCellProps,
    nextState: EuiDataGridCellState
  ) {
    if (nextProps.rowIndex !== this.props.rowIndex) return true;
    if (nextProps.visibleRowIndex !== this.props.visibleRowIndex) return true;
    if (nextProps.colIndex !== this.props.colIndex) return true;
    if (nextProps.columnId !== this.props.columnId) return true;
    if (nextProps.columnType !== this.props.columnType) return true;
    if (nextProps.width !== this.props.width) return true;
    if (nextProps.rowHeightsOptions !== this.props.rowHeightsOptions)
      return true;
    if (nextProps.renderCellValue !== this.props.renderCellValue) return true;
    if (nextProps.renderCellPopover !== this.props.renderCellPopover)
      return true;
    if (nextProps.interactiveCellId !== this.props.interactiveCellId)
      return true;
    if (
      nextProps.popoverContext.popoverIsOpen !==
        this.props.popoverContext.popoverIsOpen ||
      nextProps.popoverContext.cellLocation !==
        this.props.popoverContext.cellLocation
    )
      return true;

    // respond to adjusted position & dimensions
    if (nextProps.style) {
      if (!this.props.style) return true;
      if (nextProps.style.top !== this.props.style.top) {
        return true;
      }
      if (nextProps.style.left !== this.props.style.left) return true;
      if (nextProps.style.height !== this.props.style.height) return true;
      if (nextProps.style.width !== this.props.style.width) return true;
    }

    if (nextState.cellProps !== this.state.cellProps) return true;
    if (nextState.isFocused !== this.state.isFocused) return true;
    if (nextState.isHovered !== this.state.isHovered) return true;

    return false;
  }

  setCellProps = (cellProps: EuiDataGridSetCellProps) => {
    this.setState({ cellProps });
  };

  setCellContentsRef = (ref: HTMLDivElement | null) => {
    this.cellContentsRef = ref;
    if (ref && hasResizeObserver) {
      this.contentObserver = new (window as any).ResizeObserver(() => {
        this.recalculateAutoHeight();
        this.recalculateLineHeight();
      });
      this.contentObserver.observe(ref);
    } else if (this.contentObserver) {
      this.contentObserver.disconnect();
    }
    this.setCellTextAlign();
  };

  setCellTextAlign = () => {
    if (this.cellContentsRef) {
      const { columnType } = this.props;
      if (!columnType) {
        // If no schema was set, this is likely a left aligned column
        this.setState({ cellTextAlign: 'Left' });
      } else if (columnType === 'numeric' || columnType === 'currency') {
        // Default EUI schemas that we know set right text align
        this.setState({ cellTextAlign: 'Right' });
      } else {
        // If the consumer is using a custom schema, it may have custom text alignment
        const textAlign = window
          .getComputedStyle(this.cellContentsRef)
          .getPropertyValue('text-align');

        this.setState({
          cellTextAlign:
            textAlign === 'right' || textAlign === 'end' ? 'Right' : 'Left',
        });
      }
    }
  };

  isExpandable = () => {
    // A cell must always show an expansion popover if it has cell actions,
    // otherwise keyboard and screen reader users have no way of accessing them
    if (this.props.column?.cellActions?.length) return true;

    // props.isExpandable inherits from column.isExpandable
    // state.cellProps allows consuming applications to override isExpandable on a per-cell basis
    return this.state.cellProps.isExpandable ?? this.props.isExpandable;
  };

  isPopoverOpen = () => {
    const { popoverIsOpen, cellLocation } = this.props.popoverContext;

    return (
      this.isExpandable() &&
      popoverIsOpen &&
      cellLocation.colIndex === this.props.colIndex &&
      cellLocation.rowIndex === this.props.visibleRowIndex
    );
  };

  handleCellPopover = () => {
    if (this.isPopoverOpen()) {
      const {
        setPopoverAnchor,
        setPopoverAnchorPosition,
        setPopoverContent,
        setCellPopoverProps,
      } = this.props.popoverContext;

      // Set popover anchor
      const cellAnchorEl = this.popoverAnchorRef.current!;
      setPopoverAnchor(cellAnchorEl);
      setPopoverAnchorPosition(`down${this.state.cellTextAlign}`);

      // Set popover contents with cell content
      const {
        renderCellPopover,
        renderCellValue,
        cellContext,
        rowIndex,
        colIndex,
        column,
        columnId,
        columnType,
      } = this.props;
      const PopoverElement = (renderCellPopover ||
        DefaultCellPopover) as JSXElementConstructor<EuiDataGridCellPopoverElementProps>;
      const CellElement =
        renderCellValue as JSXElementConstructor<EuiDataGridCellValueElementProps>;
      const sharedProps = {
        rowIndex,
        colIndex,
        columnId,
        schema: column?.schema || columnType,
      };
      const popoverContent = (
        <PopoverElement
          {...sharedProps}
          cellContentsElement={this.cellContentsRef!}
          cellActions={
            <EuiDataGridCellPopoverActions {...sharedProps} column={column} />
          }
          DefaultCellPopover={DefaultCellPopover}
          setCellPopoverProps={setCellPopoverProps}
        >
          <CellElement
            {...cellContext}
            {...sharedProps}
            setCellProps={this.setCellProps}
            isExpandable={true}
            isExpanded={true}
            isDetails={true}
          />
        </PopoverElement>
      );
      setPopoverContent(popoverContent);
    }
  };

  handleCellKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (this.isExpandable()) {
      if (this.isPopoverOpen()) return;
      const {
        popoverContext: { openCellPopover },
        visibleRowIndex,
        colIndex,
      } = this.props;

      switch (event.key) {
        case keys.ENTER:
        case keys.F2:
          event.preventDefault();
          openCellPopover({ rowIndex: visibleRowIndex, colIndex });
          break;
      }
    }
  };

  handleCellExpansionClick = () => {
    const {
      popoverContext: { openCellPopover, closeCellPopover },
      visibleRowIndex,
      colIndex,
    } = this.props;

    if (this.isPopoverOpen()) {
      closeCellPopover();
    } else {
      openCellPopover({ rowIndex: visibleRowIndex, colIndex });
    }
  };

  onMouseEnter = () => this.setState({ isHovered: true });
  onMouseLeave = () => this.setState({ isHovered: false });

  render() {
    const {
      width,
      popoverContext,
      interactiveCellId,
      columnType,
      className,
      column,
      style,
      rowHeightUtils,
      rowHeightsOptions,
      rowManager,
      pagination,
      ...rest
    } = this.props;
    const { rowIndex, visibleRowIndex, colIndex } = rest;

    const isExpandable = this.isExpandable();
    const popoverIsOpen = this.isPopoverOpen();
    const showCellActions =
      isExpandable &&
      (popoverIsOpen || this.state.isFocused || this.state.isHovered);

    const cellClasses = classNames(
      'euiDataGridRowCell',
      `euiDataGridRowCell--align${this.state.cellTextAlign}`,
      {
        [`euiDataGridRowCell--${columnType}`]: columnType,
        'euiDataGridRowCell--open': popoverIsOpen,
      },
      className
    );

    const ariaRowIndex = pagination
      ? visibleRowIndex + 1 + pagination.pageSize * pagination.pageIndex
      : visibleRowIndex + 1;

    const {
      isExpandable: _, // Not a valid DOM property, so needs to be destructured out
      style: cellPropsStyle,
      className: cellPropsClassName,
      'data-test-subj': cellPropsDataTestSubj,
      ...setCellProps
    } = this.state.cellProps;

    const cellProps: EuiDataGridSetCellProps = {
      ...setCellProps,
      'data-test-subj': classNames('dataGridRowCell', cellPropsDataTestSubj),
      className: classNames(cellClasses, cellPropsClassName),
    };

    cellProps.style = {
      ...style, // set by react-window or the custom renderer
      top: style?.top ? 0 : undefined, // The cell's row will handle top positioning
      width, // column width, can be undefined
      lineHeight: rowHeightsOptions?.lineHeight ?? undefined, // lineHeight configuration
      ...cellPropsStyle, // apply anything from setCellProps({ style })
    };

    const rowHeight = rowHeightUtils?.getRowHeightOption(
      rowIndex,
      rowHeightsOptions
    );

    const cellContentProps = {
      ...rest,
      setCellProps: this.setCellProps,
      column,
      columnType,
      isExpandable,
      isExpanded: popoverIsOpen,
      isDetails: false,
      isFocused: this.state.isFocused,
      setCellContentsRef: this.setCellContentsRef,
      rowHeight,
      rowHeightUtils,
      isControlColumn: cellClasses.includes(
        'euiDataGridRowCell--controlColumn'
      ),
      ariaRowIndex,
    };

    const cell = (
      <div
        role="gridcell"
        aria-rowindex={ariaRowIndex}
        tabIndex={this.state.isFocused ? 0 : -1}
        ref={this.cellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
        // Data attributes to help target specific cells by either data or current cell location
        data-gridcell-column-id={this.props.columnId} // Static column ID name, not affected by column order
        data-gridcell-column-index={this.props.colIndex} // Affected by column reordering
        data-gridcell-row-index={this.props.rowIndex} // Index from data, not affected by sorting or pagination
        data-gridcell-visible-row-index={this.props.visibleRowIndex} // Affected by sorting & pagination
        onKeyDown={this.handleCellKeyDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <HandleInteractiveChildren
          cellEl={this.cellRef.current}
          updateCellFocusContext={this.updateCellFocusContext}
          renderFocusTrap={!isExpandable}
        >
          <EuiDataGridCellContent
            {...cellContentProps}
            cellActions={
              showCellActions && (
                <>
                  <EuiDataGridCellActions
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    column={column}
                    onExpandClick={this.handleCellExpansionClick}
                  />
                  {/* Give the cell expansion popover a separate div/ref - otherwise the
                    extra popover wrappers mess up the absolute positioning and cause
                    animation stuttering */}
                  <div
                    ref={this.popoverAnchorRef}
                    data-test-subject="cellPopoverAnchor"
                  />
                </>
              )
            }
          />
        </HandleInteractiveChildren>
      </div>
    );

    return rowManager && !IS_JEST_ENVIRONMENT
      ? createPortal(
          cell,
          rowManager.getRow({
            rowIndex,
            visibleRowIndex,
            top: style!.top as string, // comes in as a `{float}px` string from react-window
            height: style!.height as number, // comes in as an integer from react-window
          })
        )
      : cell;
  }
}
