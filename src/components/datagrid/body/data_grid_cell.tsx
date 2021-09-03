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
  createRef,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
  KeyboardEvent,
  memo,
  MutableRefObject,
} from 'react';
import tabbable from 'tabbable';
import { keys } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiFocusTrap } from '../../focus_trap';
import { useEuiI18n } from '../../i18n';
import { hasResizeObserver } from '../../observer/resize_observer/resize_observer';
import { DataGridFocusContext } from '../data_grid_context';
import {
  EuiDataGridCellProps,
  EuiDataGridCellState,
  EuiDataGridCellValueElementProps,
  EuiDataGridCellValueProps,
} from '../data_grid_types';
import { getStylesForCell } from '../row_height_utils';
import { EuiDataGridCellButtons } from './data_grid_cell_buttons';
import { EuiDataGridCellPopover } from './data_grid_cell_popover';

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: EuiDataGridCellValueElementProps['setCellProps'];
    isExpanded: boolean;
    setCellContentsRef: EuiDataGridCell['setCellContentsRef'];
  }
> = memo(
  ({
    renderCellValue,
    column,
    setCellContentsRef,
    rowHeightsOptions,
    rowIndex,
    colIndex,
    ...rest
  }) => {
    // React is more permissible than the TS types indicate
    const CellElement = renderCellValue as JSXElementConstructor<
      EuiDataGridCellValueElementProps
    >;

    const positionText = useEuiI18n(
      'euiDataGridCell.position',
      'Row: {row}; Column: {col}',
      { row: rowIndex + 1, col: colIndex + 1 }
    );

    return (
      <>
        <div
          ref={setCellContentsRef}
          data-datagrid-cellcontent
          className={!rowHeightsOptions ? 'euiDataGridRowCell__truncate' : ''}
          style={
            rowHeightsOptions
              ? getStylesForCell(rowHeightsOptions, rowIndex)
              : {}
          }
        >
          <CellElement
            isDetails={false}
            data-test-subj="cell-content"
            rowIndex={rowIndex}
            {...rest}
          />
        </div>
        <EuiScreenReaderOnly>
          <p>{positionText}</p>
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
  observer!: any; // ResizeObserver
  popoverPanelRef: MutableRefObject<HTMLElement | null> = createRef();
  cellContentsRef: HTMLDivElement | null = null;
  state: EuiDataGridCellState = {
    cellProps: {},
    popoverIsOpen: false,
    isFocused: false,
    isEntered: false,
    enableInteractions: false,
    disableCellTabIndex: false,
  };
  unsubscribeCell?: Function = () => {};
  focusTimeout: number | undefined;
  style = null;

  setCellRef = (ref: HTMLDivElement | null) => {
    this.cellRef.current = ref;

    // watch the first cell for size changes and use that to re-compute row heights
    if (this.props.colIndex === 0 && this.props.visibleRowIndex === 0) {
      if (ref && hasResizeObserver) {
        this.observer = new (window as any).ResizeObserver(() => {
          const rowHeight = this.cellRef.current!.getBoundingClientRect()
            .height;
          if (this.props.setRowHeight) {
            this.props.setRowHeight(rowHeight);
          }
        });
        this.observer.observe(ref);
      } else if (this.observer) {
        this.observer.disconnect();
      }
    }
  };

  static contextType = DataGridFocusContext;

  getInteractables = () => {
    const tabbingRef = this.cellContentsRef;

    if (tabbingRef) {
      return tabbingRef.querySelectorAll<HTMLElement>(
        '[data-datagrid-interactable=true]'
      );
    }

    return [];
  };

  takeFocus = () => {
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
        if (this.props.isExpandable === false && interactables.length === 1) {
          // Only one element can be interacted with
          interactables[0].focus();
        } else {
          cell.focus();
        }
      }
    }
  };

  componentDidMount() {
    this.unsubscribeCell = this.context.onFocusUpdate(
      [this.props.colIndex, this.props.visibleRowIndex],
      this.onFocusUpdate
    );
  }

  onFocusUpdate = (isFocused: boolean) => {
    this.setState({ isFocused }, () => {
      if (isFocused) {
        this.takeFocus();
      }
    });
  };

  componentWillUnmount() {
    window.clearTimeout(this.focusTimeout);
    if (this.unsubscribeCell) {
      this.unsubscribeCell();
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
    if (nextProps.renderCellValue !== this.props.renderCellValue) return true;
    if (nextProps.interactiveCellId !== this.props.interactiveCellId)
      return true;
    if (nextProps.popoverContent !== this.props.popoverContent) return true;

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
    if (nextState.popoverIsOpen !== this.state.popoverIsOpen) return true;
    if (nextState.isEntered !== this.state.isEntered) return true;
    if (nextState.isFocused !== this.state.isFocused) return true;
    if (nextState.enableInteractions !== this.state.enableInteractions)
      return true;
    if (nextState.disableCellTabIndex !== this.state.disableCellTabIndex)
      return true;

    // check if we should update cell because height was changed
    if (this.cellRef.current && nextProps.getRowHeight) {
      if (
        this.cellRef.current.offsetHeight &&
        this.cellRef.current.offsetHeight !==
          nextProps.getRowHeight(nextProps.rowIndex)
      ) {
        return true;
      }
    }

    return false;
  }

  componentDidUpdate(prevProps: EuiDataGridCellProps) {
    if (this.props.columnId !== prevProps.columnId) {
      this.setCellProps({});
    }
  }

  setCellProps = (cellProps: HTMLAttributes<HTMLDivElement>) => {
    this.setState({ cellProps });
  };

  setCellContentsRef = (ref: HTMLDivElement | null) => {
    this.cellContentsRef = ref;
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
      const { colIndex, visibleRowIndex, isExpandable } = this.props;
      // focus in next tick to give potential focus capturing mechanisms time to release their traps
      // also clear any previous focus timeout that may still be queued
      if (EuiDataGridCell.activeFocusTimeoutId) {
        window.clearTimeout(EuiDataGridCell.activeFocusTimeoutId);
      }
      EuiDataGridCell.activeFocusTimeoutId = this.focusTimeout = window.setTimeout(
        () => {
          this.context.setFocusedCell([colIndex, visibleRowIndex]);

          const interactables = this.getInteractables();
          if (interactables.length === 1 && isExpandable === false) {
            interactables[0].focus();
            this.setState({ disableCellTabIndex: true });
          }
        },
        0
      );
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

  closePopover = () => {
    this.setState({ popoverIsOpen: false });
  };

  render() {
    const {
      width,
      isExpandable,
      popoverContent: PopoverContent,
      interactiveCellId,
      columnType,
      className,
      column,
      style,
      ...rest
    } = this.props;
    const { rowIndex } = rest;

    const showCellButtons =
      this.state.isFocused ||
      this.state.isEntered ||
      this.state.enableInteractions ||
      this.state.popoverIsOpen;

    const cellClasses = classNames(
      'euiDataGridRowCell',
      {
        [`euiDataGridRowCell--${columnType}`]: columnType,
        ['euiDataGridRowCell--open']: this.state.popoverIsOpen,
      },
      className
    );

    const cellProps = {
      ...this.state.cellProps,
      'data-test-subj': classNames(
        'dataGridRowCell',
        this.state.cellProps['data-test-subj']
      ),
      className: classNames(cellClasses, this.state.cellProps.className),
    };

    cellProps.style = { ...style, width, ...cellProps.style };

    const handleCellKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (isExpandable) {
        if (this.state.popoverIsOpen) {
          return;
        }
        switch (event.key) {
          case keys.ENTER:
          case keys.F2:
            event.preventDefault();
            this.setState({ popoverIsOpen: true });
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

    const cellContentProps = {
      ...rest,
      setCellProps: this.setCellProps,
      column,
      columnType: columnType,
      isExpandable,
      isExpanded: this.state.popoverIsOpen,
      isDetails: false,
      setCellContentsRef: this.setCellContentsRef,
      rowHeightsOptions: this.props.rowHeightsOptions,
    };

    const anchorClass = classNames('euiDataGridRowCell__expandFlex', {
      euiDataGridRowCell__alignBaseLine: this.props.rowHeightsOptions,
    });
    const expandClass = this.props.rowHeightsOptions
      ? 'euiDataGridRowCell__contentByHeight'
      : 'euiDataGridRowCell__expandContent';

    let anchorContent = (
      <EuiFocusTrap
        disabled={!this.state.isEntered}
        autoFocus={true}
        onDeactivation={() => {
          this.setState({ isEntered: false }, this.preventTabbing);
        }}
        style={this.props.rowHeightsOptions ? { height: '100%' } : {}}
        clickOutsideDisables={true}
      >
        <div className={anchorClass}>
          <div className={expandClass}>
            <EuiDataGridCellContent {...cellContentProps} />
          </div>
        </div>
      </EuiFocusTrap>
    );

    if (isExpandable || (column && column.cellActions)) {
      if (showCellButtons) {
        anchorContent = (
          <div className={anchorClass}>
            <div className={expandClass}>
              <EuiDataGridCellContent {...cellContentProps} />
            </div>
            <EuiDataGridCellButtons
              rowIndex={rowIndex}
              column={column}
              popoverIsOpen={this.state.popoverIsOpen}
              closePopover={this.closePopover}
              onExpandClick={() => {
                this.setState(({ popoverIsOpen }) => ({
                  popoverIsOpen: !popoverIsOpen,
                }));
              }}
            />
          </div>
        );
      } else {
        anchorContent = (
          <div className={anchorClass}>
            <div className={expandClass}>
              <EuiDataGridCellContent {...cellContentProps} />
            </div>
          </div>
        );
      }
    }

    let innerContent = anchorContent;
    if (isExpandable || (column && column.cellActions)) {
      if (this.state.popoverIsOpen) {
        innerContent = (
          <div
            className={
              this.props.rowHeightsOptions
                ? 'euiDataGridRowCell__contentByHeight'
                : 'euiDataGridRowCell__content'
            }
          >
            <EuiDataGridCellPopover
              anchorContent={anchorContent}
              cellContentProps={cellContentProps}
              cellContentsRef={this.cellContentsRef}
              closePopover={this.closePopover}
              column={column}
              panelRefFn={(ref) => (this.popoverPanelRef.current = ref)}
              popoverIsOpen={this.state.popoverIsOpen}
              rowIndex={rowIndex}
              renderCellValue={rest.renderCellValue}
              popoverContent={PopoverContent}
            />
          </div>
        );
      } else {
        innerContent = anchorContent;
      }
    }

    return (
      <div
        role="gridcell"
        tabIndex={
          this.state.isFocused && !this.state.disableCellTabIndex ? 0 : -1
        }
        ref={this.setCellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
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
  }
}
