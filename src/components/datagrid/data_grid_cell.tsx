import React, {
  Component,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactNode,
  createRef,
  HTMLAttributes,
  KeyboardEvent,
  ReactChild,
  MutableRefObject,
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';
import { EuiPopover } from '../popover';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { EuiDataGridPopoverContent } from './data_grid_types';
import { EuiMutationObserver } from '../observer/mutation_observer';
import { DataGridContext } from './data_grid_context';
import { EuiFocusTrap } from '../focus_trap';

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
  columnId: string;
  columnType?: string | null;
  width?: number;
  isFocused: boolean;
  onCellFocus: Function;
  interactiveCellId: string;
  isExpandable: boolean;
  className?: string;
  popoverContent: EuiDataGridPopoverContent;
  renderCellValue:
    | JSXElementConstructor<EuiDataGridCellValueElementProps>
    | ((props: EuiDataGridCellValueElementProps) => ReactNode);
}

interface EuiDataGridCellState {
  cellProps: CommonProps & HTMLAttributes<HTMLDivElement>;
  popoverIsOpen: boolean; // is expansion popover open
  isEntered: boolean; // enables focus trap for non-expandable cells with multiple interactive elements
  disableCellTabIndex: boolean; // disables tabIndex on the wrapping cell, used for focus management of a single interactive child
}

export type EuiDataGridCellValueProps = Omit<
  EuiDataGridCellProps,
  'width' | 'isFocused' | 'interactiveCellId' | 'onCellFocus' | 'popoverContent'
>;

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: EuiDataGridCellValueElementProps['setCellProps'];
    isExpanded: boolean;
  }
> = memo(props => {
  const { renderCellValue, ...rest } = props;

  // React is more permissible than the TS types indicate
  const CellElement = renderCellValue as JSXElementConstructor<
    EuiDataGridCellValueElementProps
  >;

  return (
    <CellElement isDetails={false} data-test-subj="cell-content" {...rest} />
  );
});

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  cellRef = createRef<HTMLDivElement>();
  popoverPanelRef: MutableRefObject<HTMLElement | null> = createRef();
  cellContentsRef: HTMLDivElement | null = null;
  state: EuiDataGridCellState = {
    cellProps: {},
    popoverIsOpen: false,
    isEntered: false,
    disableCellTabIndex: false,
  };
  unsubscribeCell?: Function = () => {};

  static contextType = DataGridContext;

  getInteractables = () => {
    const tabbingRef = this.cellContentsRef;

    if (tabbingRef) {
      return tabbingRef.querySelectorAll<HTMLElement>(
        '[data-datagrid-interactable=true]'
      );
    }

    return [];
  };

  updateFocus = () => {
    const cell = this.cellRef.current;
    const { isFocused } = this.props;

    if (cell && isFocused) {
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
      this.updateFocus
    );
  }

  componentWillUnmount() {
    if (this.unsubscribeCell) {
      this.unsubscribeCell();
    }
  }

  componentDidUpdate(prevProps: EuiDataGridCellProps) {
    const didFocusChange = prevProps.isFocused !== this.props.isFocused;

    if (didFocusChange) {
      this.updateFocus();
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
    if (nextProps.onCellFocus !== this.props.onCellFocus) return true;
    if (nextProps.isFocused !== this.props.isFocused) return true;
    if (nextProps.interactiveCellId !== this.props.interactiveCellId)
      return true;
    if (nextProps.popoverContent !== this.props.popoverContent) return true;

    if (nextState.cellProps !== this.state.cellProps) return true;
    if (nextState.popoverIsOpen !== this.state.popoverIsOpen) return true;
    if (nextState.isEntered !== this.state.isEntered) return true;
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

  onFocus = () => {
    const { onCellFocus, colIndex, visibleRowIndex, isExpandable } = this.props;
    onCellFocus([colIndex, visibleRowIndex]);

    const interactables = this.getInteractables();
    if (interactables.length === 1 && isExpandable === false) {
      interactables[0].focus();
      this.setState({ disableCellTabIndex: true });
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

  render() {
    const {
      width,
      isFocused,
      isExpandable,
      popoverContent: PopoverContent,
      interactiveCellId,
      columnType,
      onCellFocus,
      className,
      ...rest
    } = this.props;
    const { colIndex, rowIndex } = rest;

    const cellClasses = classNames(
      'euiDataGridRowCell',
      {
        [`euiDataGridRowCell--${columnType}`]: columnType,
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

    const widthStyle = width != null ? { width: `${width}px` } : {};
    if (cellProps.hasOwnProperty('style')) {
      cellProps.style = { ...cellProps.style, ...widthStyle };
    } else {
      cellProps.style = widthStyle;
    }

    const handleCellKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isExpandable) {
        switch (e.key) {
          case 'Enter':
          case 'F2':
            e.preventDefault();
            this.setState({ popoverIsOpen: true });
            break;
        }
      } else {
        if (e.key === 'Enter' || e.key === 'F2' || e.key === 'Escape') {
          const interactables = this.getInteractables();
          if (interactables.length >= 2) {
            switch (e.key) {
              case 'Enter':
                // `Enter` only activates the trap
                if (this.state.isEntered === false) {
                  this.enableTabbing();
                  this.setState({ isEntered: true });

                  // result of this keypress is focus shifts to the first interactive element
                  // and then the browser fires the onClick event because that's how [Enter] works
                  // so we need to prevent that default action otherwise entering the trap triggers the first element
                  e.preventDefault();
                }
                break;
              case 'F2':
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
              case 'Escape':
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
      columnType: columnType,
      isExpandable,
      isExpanded: this.state.popoverIsOpen,
      isDetails: false,
    };

    const buttonIconClasses = classNames(
      'euiDataGridRowCell__expandButtonIcon',
      {
        'euiDataGridRowCell__expandButtonIcon-isActive': this.state
          .popoverIsOpen,
      }
    );

    const buttonClasses = classNames('euiDataGridRowCell__expandButton', {
      'euiDataGridRowCell__expandButton-isActive': this.state.popoverIsOpen,
    });

    const expandButton = (
      <EuiI18n
        token="euiDataGridCell.expandButtonTitle"
        default="Click or hit enter to interact with cell content">
        {(expandButtonTitle: string) => (
          <EuiButtonIcon
            className={buttonIconClasses}
            color="text"
            iconSize="s"
            iconType="expandMini"
            aria-hidden
            onClick={() =>
              this.setState(({ popoverIsOpen }) => ({
                popoverIsOpen: !popoverIsOpen,
              }))
            }
            title={expandButtonTitle}
          />
        )}
      </EuiI18n>
    );

    const screenReaderPosition = (
      <EuiScreenReaderOnly>
        <p>
          <EuiI18n
            tokens={['euiDataGridCell.row', 'euiDataGridCell.column']}
            defaults={['Row', 'Column']}>
            {([row, column]: ReactChild[]) => (
              <span>
                {row}: {rowIndex + 1}, {column}: {colIndex + 1}:
              </span>
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
          <EuiMutationObserver
            observerOptions={{ subtree: true, childList: true }}
            onMutation={this.preventTabbing}>
            {mutationRef => {
              return (
                <div
                  ref={mutationRef}
                  className="euiDataGridRowCell__expandContent">
                  {screenReaderPosition}
                  <div
                    ref={this.setCellContentsRef}
                    className="euiDataGridRowCell__truncate">
                    <EuiDataGridCellContent {...cellContentProps} />
                  </div>
                </div>
              );
            }}
          </EuiMutationObserver>
        </div>
      </EuiFocusTrap>
    );

    if (isExpandable) {
      anchorContent = (
        <div className="euiDataGridRowCell__expandFlex">
          <EuiMutationObserver
            observerOptions={{ subtree: true, childList: true }}
            onMutation={this.preventTabbing}>
            {mutationRef => {
              return (
                <div
                  ref={mutationRef}
                  className="euiDataGridRowCell__expandContent">
                  {screenReaderPosition}
                  <div
                    ref={this.setCellContentsRef}
                    className="euiDataGridRowCell__truncate">
                    <EuiDataGridCellContent {...cellContentProps} />
                  </div>
                </div>
              );
            }}
          </EuiMutationObserver>
          <div className={buttonClasses}>{expandButton}</div>
        </div>
      );
    }

    let innerContent = anchorContent;
    if (isExpandable) {
      const CellElement = rest.renderCellValue as JSXElementConstructor<
        EuiDataGridCellValueElementProps
      >;
      const popoverContent = (
        <PopoverContent cellContentsElement={this.cellContentsRef!}>
          <CellElement {...cellContentProps} isDetails={true} />
        </PopoverContent>
      );

      innerContent = (
        <div className="euiDataGridRowCell__content">
          <EuiPopover
            anchorClassName="euiDataGridRowCell__expand"
            button={anchorContent}
            isOpen={this.state.popoverIsOpen}
            panelRef={ref => (this.popoverPanelRef.current = ref)}
            ownFocus
            panelClassName="euiDataGridRowCell__popover"
            zIndex={8001}
            display="block"
            closePopover={() => this.setState({ popoverIsOpen: false })}
            onKeyDown={e => {
              if (e.key === 'F2' || e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                this.setState({ popoverIsOpen: false });
              }
            }}
            onTrapDeactivation={this.updateFocus}>
            {popoverContent}
          </EuiPopover>
        </div>
      );
    }

    return (
      <div
        role="gridcell"
        tabIndex={isFocused && !this.state.disableCellTabIndex ? 0 : -1}
        ref={this.cellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
        onKeyDown={handleCellKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}>
        {innerContent}
      </div>
    );
  }
}
