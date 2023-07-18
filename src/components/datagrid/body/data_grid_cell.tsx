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
  FocusEvent,
  FunctionComponent,
  JSXElementConstructor,
  KeyboardEvent,
  memo,
  MutableRefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { tabbable } from 'tabbable';
import { keys } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiFocusTrap } from '../../focus_trap';
import { EuiI18n } from '../../i18n';
import { hasResizeObserver } from '../../observer/resize_observer/resize_observer';
import { DataGridFocusContext } from '../utils/focus';
import { RowHeightVirtualizationUtils } from '../utils/row_heights';
import {
  EuiDataGridCellProps,
  EuiDataGridCellState,
  EuiDataGridSetCellProps,
  EuiDataGridCellValueElementProps,
  EuiDataGridCellValueProps,
  EuiDataGridCellPopoverElementProps,
} from '../data_grid_types';
import {
  EuiDataGridCellActions,
  EuiDataGridCellPopoverActions,
} from './data_grid_cell_actions';
import { DefaultCellPopover } from './data_grid_cell_popover';
import { IS_JEST_ENVIRONMENT } from '../../../utils';

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: EuiDataGridCellValueElementProps['setCellProps'];
    setCellContentsRef: EuiDataGridCell['setCellContentsRef'];
    isExpanded: boolean;
    isDefinedHeight: boolean;
    isFocused: boolean;
    ariaRowIndex: number;
  }
> = memo(
  ({
    renderCellValue,
    column,
    setCellContentsRef,
    rowHeightsOptions,
    rowIndex,
    colIndex,
    ariaRowIndex,
    rowHeightUtils,
    isDefinedHeight,
    isFocused,
    ...rest
  }) => {
    // React is more permissible than the TS types indicate
    const CellElement =
      renderCellValue as JSXElementConstructor<EuiDataGridCellValueElementProps>;

    return (
      <>
        <div
          ref={setCellContentsRef}
          data-datagrid-cellcontent
          className={
            isDefinedHeight
              ? 'euiDataGridRowCell__definedHeight'
              : 'euiDataGridRowCell__truncate'
          }
          style={
            isDefinedHeight
              ? rowHeightUtils?.getStylesForCell(rowHeightsOptions!, rowIndex)
              : {}
          }
        >
          <CellElement
            isDetails={false}
            data-test-subj="cell-content"
            rowIndex={rowIndex}
            colIndex={colIndex}
            schema={column?.schema || rest.columnType}
            {...rest}
          />
        </div>
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
          </p>
        </EuiScreenReaderOnly>
      </>
    );
  }
);

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  // focus tracking is split between the entire grid & individual cells,
  // the parent grid owns which cell is focused,
  // but individual cells need to react to changes and also report that
  // they are focused in response to user actions like clicking on the cell
  // to avoid focus trap fighting, cells wait a tick after being clicked to allow
  // any existing traps to disconnect before the cell reports the new focus state to the parent grid
  // but because of this small delay, multiple cells could queue up focus and
  // create an infinite loop as the cells activate->deactivate->...
  // so we track the last timeout id and clear that request if superseded
  static activeFocusTimeoutId: number | undefined = undefined;

  cellRef = createRef() as MutableRefObject<HTMLDivElement | null>;
  contentObserver!: any; // Cell Content ResizeObserver
  popoverAnchorRef = createRef() as MutableRefObject<HTMLDivElement | null>;
  cellContentsRef: HTMLDivElement | null = null;
  state: EuiDataGridCellState = {
    cellProps: {},
    isFocused: false,
    isEntered: false,
    enableInteractions: false,
    disableCellTabIndex: false,
  };
  unsubscribeCell?: Function;
  focusTimeout: number | undefined;
  style = null;

  static contextType = DataGridFocusContext;
  declare context: ContextType<typeof DataGridFocusContext>;

  getInteractables = () => {
    const tabbingRef = this.cellContentsRef;

    if (tabbingRef) {
      return tabbingRef.querySelectorAll<HTMLElement>(
        '[data-datagrid-interactable=true]'
      );
    }

    return [];
  };

  takeFocus = (preventScroll: boolean) => {
    const cell = this.cellRef.current;

    if (cell) {
      // only update focus if we are not already focused on something in this cell
      let element: Element | null = document.activeElement;
      while (element != null && element !== cell) {
        element = element.parentElement;
      }
      const doFocusUpdate = element !== cell;

      if (doFocusUpdate) {
        const interactables = this.getInteractables();
        if (this.isExpandable() === false && interactables.length === 1) {
          // Only one element can be interacted with
          interactables[0].focus({ preventScroll });
        } else {
          cell.focus({ preventScroll });
        }
      }
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
    window.clearTimeout(this.focusTimeout);
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
    if (nextState.isEntered !== this.state.isEntered) return true;
    if (nextState.isFocused !== this.state.isFocused) return true;
    if (nextState.enableInteractions !== this.state.enableInteractions)
      return true;
    if (nextState.disableCellTabIndex !== this.state.disableCellTabIndex)
      return true;

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
    this.preventTabbing();
  };

  onFocus = (e: FocusEvent<HTMLDivElement>) => {
    // only perform this logic when the event's originating element (e.target) is
    // the wrapping element with the onFocus logic
    // reasons:
    //  * the outcome is only meaningful when the focus shifts to the wrapping element
    //  * if the cell children include portalled content React will bubble the focus
    //      event up, which can trigger the focus() call below, causing focus lock fighting
    if (this.cellRef.current === e.target) {
      const { colIndex, visibleRowIndex } = this.props;
      // focus in next tick to give potential focus capturing mechanisms time to release their traps
      // also clear any previous focus timeout that may still be queued
      if (EuiDataGridCell.activeFocusTimeoutId) {
        window.clearTimeout(EuiDataGridCell.activeFocusTimeoutId);
      }
      EuiDataGridCell.activeFocusTimeoutId = this.focusTimeout =
        window.setTimeout(() => {
          this.context.setFocusedCell([colIndex, visibleRowIndex]);

          const interactables = this.getInteractables();
          if (interactables.length === 1 && this.isExpandable() === false) {
            interactables[0].focus();
            this.setState({ disableCellTabIndex: true });
          }
        }, 0);
      // Close the cell popover if the popover was open and the user clicked the cell
      if (this.props.popoverContext.popoverIsOpen) {
        this.props.popoverContext.closeCellPopover();
      }
    }
  };

  onBlur = () => {
    this.setState({ disableCellTabIndex: false });
  };

  preventTabbing = () => {
    if (this.cellContentsRef) {
      const tabbables = tabbable(this.cellContentsRef);
      for (let i = 0; i < tabbables.length; i++) {
        const element = tabbables[i];
        element.setAttribute('tabIndex', '-1');
        element.setAttribute('data-datagrid-interactable', 'true');
      }
    }
  };

  enableTabbing = () => {
    if (this.cellContentsRef) {
      const interactables = this.getInteractables();
      for (let i = 0; i < interactables.length; i++) {
        const element = interactables[i];
        element.removeAttribute('tabIndex');
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
      const { setPopoverAnchor, setPopoverContent, setCellPopoverProps } =
        this.props.popoverContext;

      // Set popover anchor
      const cellAnchorEl = this.popoverAnchorRef.current!;
      setPopoverAnchor(cellAnchorEl);

      // Set popover contents with cell content
      const {
        renderCellPopover,
        renderCellValue,
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

  render() {
    const {
      width,
      popoverContext: { closeCellPopover, openCellPopover },
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
      this.state.isFocused ||
      this.state.isEntered ||
      this.state.enableInteractions ||
      popoverIsOpen;

    const cellClasses = classNames(
      'euiDataGridRowCell',
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

    const handleCellKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (isExpandable) {
        if (popoverIsOpen) {
          return;
        }
        switch (event.key) {
          case keys.ENTER:
          case keys.F2:
            event.preventDefault();
            openCellPopover({ rowIndex: visibleRowIndex, colIndex });
            break;
        }
      } else {
        if (
          event.key === keys.ENTER ||
          event.key === keys.F2 ||
          event.key === keys.ESCAPE
        ) {
          const interactables = this.getInteractables();
          if (interactables.length >= 2) {
            switch (event.key) {
              case keys.ENTER:
                // `Enter` only activates the trap
                if (this.state.isEntered === false) {
                  this.enableTabbing();
                  this.setState({ isEntered: true });

                  // result of this keypress is focus shifts to the first interactive element
                  // and then the browser fires the onClick event because that's how [Enter] works
                  // so we need to prevent that default action otherwise entering the trap triggers the first element
                  event.preventDefault();
                }
                break;
              case keys.F2:
                // toggle interactives' focus trap
                this.setState(({ isEntered }) => {
                  if (isEntered) {
                    this.preventTabbing();
                  } else {
                    this.enableTabbing();
                  }
                  return { isEntered: !isEntered };
                });
                break;
              case keys.ESCAPE:
                // `Escape` only de-activates the trap
                this.preventTabbing();
                if (this.state.isEntered === true) {
                  this.setState({ isEntered: false });
                }
                break;
            }
          }
        }
      }
    };

    const isDefinedHeight = !!rowHeightUtils?.getRowHeightOption(
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
      rowHeightsOptions,
      rowHeightUtils,
      isDefinedHeight,
      ariaRowIndex,
    };

    const anchorClass = 'euiDataGridRowCell__expandFlex';
    const expandClass = isDefinedHeight
      ? 'euiDataGridRowCell__contentByHeight'
      : 'euiDataGridRowCell__expandContent';

    let innerContent = (
      <EuiFocusTrap
        disabled={!this.state.isEntered}
        autoFocus={true}
        onDeactivation={() => {
          this.setState({ isEntered: false }, this.preventTabbing);
        }}
        clickOutsideDisables={true}
      >
        <div className={anchorClass} ref={this.popoverAnchorRef}>
          <div className={expandClass}>
            <EuiDataGridCellContent {...cellContentProps} />
          </div>
        </div>
      </EuiFocusTrap>
    );

    if (isExpandable) {
      innerContent = (
        <div className={anchorClass} ref={this.popoverAnchorRef}>
          <div className={expandClass}>
            <EuiDataGridCellContent {...cellContentProps} />
          </div>
          {showCellActions && (
            <EuiDataGridCellActions
              rowIndex={rowIndex}
              colIndex={colIndex}
              column={column}
              onExpandClick={() => {
                if (popoverIsOpen) {
                  closeCellPopover();
                } else {
                  openCellPopover({ rowIndex: visibleRowIndex, colIndex });
                }
              }}
            />
          )}
        </div>
      );
    }

    const content = (
      <div
        role="gridcell"
        aria-rowindex={ariaRowIndex}
        tabIndex={
          this.state.isFocused && !this.state.disableCellTabIndex ? 0 : -1
        }
        ref={this.cellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
        // Data attributes to help target specific cells by either data or current cell location
        data-gridcell-column-id={this.props.columnId} // Static column ID name, not affected by column order
        data-gridcell-column-index={this.props.colIndex} // Affected by column reordering
        data-gridcell-row-index={this.props.rowIndex} // Index from data, not affected by sorting or pagination
        data-gridcell-visible-row-index={this.props.visibleRowIndex} // Affected by sorting & pagination
        onKeyDown={handleCellKeyDown}
        onFocus={this.onFocus}
        onMouseEnter={() => {
          this.setState({ enableInteractions: true });
        }}
        onMouseLeave={() => {
          this.setState({ enableInteractions: false });
        }}
        onBlur={this.onBlur}
      >
        {innerContent}
      </div>
    );

    return rowManager && !IS_JEST_ENVIRONMENT
      ? createPortal(
          content,
          rowManager.getRow({
            rowIndex,
            visibleRowIndex,
            top: style!.top as string, // comes in as a `{float}px` string from react-window
            height: style!.height as number, // comes in as an integer from react-window
          })
        )
      : content;
  }
}
