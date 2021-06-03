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
  Component,
  createRef,
  FocusEvent,
  FunctionComponent,
  HTMLAttributes,
  JSXElementConstructor,
  KeyboardEvent,
  memo,
  MutableRefObject,
  ReactChild,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';
import {
  EuiDataGridColumn,
  EuiDataGridPopoverContent,
} from './data_grid_types';
import { DataGridFocusContext } from './data_grid_context';
import { EuiFocusTrap } from '../focus_trap';
import { keys } from '../../services';
import { EuiDataGridCellButtons } from './data_grid_cell_buttons';
import { EuiDataGridCellPopover } from './data_grid_cell_popover';

export interface EuiDataGridCellValueElementProps {
  /**
   * index of the row being rendered, 0 represents the first row. This index always includes
   * pagination offset, meaning the first rowIndex in a grid is `pagination.pageIndex * pagination.pageSize`
   * so take care if you need to adjust the rowIndex to fit your data
   */
  rowIndex: number;
  /**
   * id of the column being rendered, the value comes from the #EuiDataGridColumn `id`
   */
  columnId: string;
  /**
   * callback function to set custom props & attributes on the cell's wrapping `div` element;
   * it's best to wrap calls to `setCellProps` in a `useEffect` hook
   */
  setCellProps: (props: CommonProps & HTMLAttributes<HTMLDivElement>) => void;
  /**
   * whether or not the cell is expandable, comes from the #EuiDataGridColumn `isExpandable` which defaults to `true`
   */
  isExpandable: boolean;
  /**
   * whether or not the cell is expanded
   */
  isExpanded: boolean;
  /**
   * when rendering the cell, `isDetails` is false; when the cell is expanded, `renderCellValue` is called again to render into the details popover and `isDetails` is true
   */
  isDetails: boolean;
}

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
  popoverContent: EuiDataGridPopoverContent;
  renderCellValue:
    | JSXElementConstructor<EuiDataGridCellValueElementProps>
    | ((props: EuiDataGridCellValueElementProps) => ReactNode);
  setRowHeight?: (height: number) => void;
  style?: React.CSSProperties;
}

interface EuiDataGridCellState {
  cellProps: CommonProps & HTMLAttributes<HTMLDivElement>;
  popoverIsOpen: boolean; // is expansion popover open
  isFocused: boolean; // tracks if this cell has focus or not, used to enable tabIndex on the cell
  isEntered: boolean; // enables focus trap for non-expandable cells with multiple interactive elements
  enableInteractions: boolean; // cell got hovered at least once, so cell button and popover interactions are rendered
  disableCellTabIndex: boolean; // disables tabIndex on the wrapping cell, used for focus management of a single interactive child
}

export type EuiDataGridCellValueProps = Omit<
  EuiDataGridCellProps,
  'width' | 'interactiveCellId' | 'popoverContent'
>;

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: EuiDataGridCellValueElementProps['setCellProps'];
    isExpanded: boolean;
  }
> = memo((props) => {
  const { renderCellValue, ...rest } = props;

  // React is more permissible than the TS types indicate
  const CellElement = renderCellValue as JSXElementConstructor<
    EuiDataGridCellValueElementProps
  >;

  return (
    <CellElement isDetails={false} data-test-subj="cell-content" {...rest} />
  );
});

// TODO: TypeScript has added types for ResizeObserver but not yet released
// https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/948
// for now, marking ResizeObserver usage as `any`
// and when EUI upgrades to a version of TS with ResizeObserver
// the anys can be removed
const hasResizeObserver =
  typeof window !== 'undefined' &&
  typeof (window as any).ResizeObserver !== 'undefined';

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
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

    // respond to adjusted top/left
    if (nextProps.style) {
      if (!this.props.style) return true;
      if (nextProps.style.top !== this.props.style.top) {
        return true;
      }
      if (nextProps.style.left !== this.props.style.left) return true;
    }

    if (nextState.cellProps !== this.state.cellProps) return true;
    if (nextState.popoverIsOpen !== this.state.popoverIsOpen) return true;
    if (nextState.isEntered !== this.state.isEntered) return true;
    if (nextState.isFocused !== this.state.isFocused) return true;
    if (nextState.enableInteractions !== this.state.enableInteractions)
      return true;
    if (nextState.disableCellTabIndex !== this.state.disableCellTabIndex)
      return true;

    return false;
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
      this.focusTimeout = window.setTimeout(() => {
        this.context.setFocusedCell([colIndex, visibleRowIndex]);

        const interactables = this.getInteractables();
        if (interactables.length === 1 && isExpandable === false) {
          interactables[0].focus();
          this.setState({ disableCellTabIndex: true });
        }
      }, 0);
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
    const { colIndex, rowIndex } = rest;

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
    };

    const screenReaderPosition = (
      <EuiScreenReaderOnly>
        <p>
          <EuiI18n
            tokens={['euiDataGridCell.row', 'euiDataGridCell.column']}
            defaults={['Row', 'Column']}>
            {([row, column]: ReactChild[]) => (
              <>
                {row}: {rowIndex + 1}, {column}: {colIndex + 1}:
              </>
            )}
          </EuiI18n>
        </p>
      </EuiScreenReaderOnly>
    );

    let anchorContent = (
      <EuiFocusTrap
        disabled={!this.state.isEntered}
        autoFocus={true}
        onDeactivation={() => {
          this.setState({ isEntered: false }, this.preventTabbing);
        }}
        clickOutsideDisables={true}>
        <div className="euiDataGridRowCell__expandFlex">
          <div className="euiDataGridRowCell__expandContent">
            {screenReaderPosition}
            <div
              ref={this.setCellContentsRef}
              className="euiDataGridRowCell__truncate">
              <EuiDataGridCellContent {...cellContentProps} />
            </div>
          </div>
        </div>
      </EuiFocusTrap>
    );

    if (isExpandable || (column && column.cellActions)) {
      if (showCellButtons) {
        anchorContent = (
          <div className="euiDataGridRowCell__expandFlex">
            <div className="euiDataGridRowCell__expandContent">
              <div
                ref={this.setCellContentsRef}
                className="euiDataGridRowCell__truncate">
                <EuiDataGridCellContent {...cellContentProps} />
              </div>
              {screenReaderPosition}
            </div>
            {showCellButtons && (
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
            )}
          </div>
        );
      } else {
        anchorContent = (
          <div
            ref={this.setCellContentsRef}
            className="euiDataGridRowCell__truncate">
            <EuiDataGridCellContent {...cellContentProps} />
            {screenReaderPosition}
          </div>
        );
      }
    }

    let innerContent = anchorContent;
    if (isExpandable || (column && column.cellActions)) {
      if (this.state.popoverIsOpen) {
        innerContent = (
          <div className="euiDataGridRowCell__content">
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
        onBlur={this.onBlur}>
        {innerContent}
      </div>
    );
  }
}
