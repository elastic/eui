import React, {
  Component,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactNode,
  createRef,
  HTMLAttributes,
} from 'react';
import classnames from 'classnames';
import { CommonProps, Omit } from '../common';
import { getTabbables, CELL_CONTENTS_ATTR } from './utils';
import { EuiMutationObserver } from '../observer/mutation_observer';

export interface CellValueElementProps {
  rowIndex: number;
  columnId: string;
  setCellProps: (props: CommonProps & HTMLAttributes<HTMLDivElement>) => void;
}

export interface EuiDataGridCellProps {
  rowIndex: number;
  colIndex: number;
  columnId: string;
  columnType?: string | null;
  width?: number;
  isFocusable: boolean;
  onCellFocus: Function;
  isGridNavigationEnabled: boolean;
  interactiveCellId: string;
  renderCellValue:
    | JSXElementConstructor<CellValueElementProps>
    | ((props: CellValueElementProps) => ReactNode);
}

interface EuiDataGridCellState {
  cellProps: CommonProps & HTMLAttributes<HTMLDivElement>;
}

type EuiDataGridCellValueProps = Omit<
  EuiDataGridCellProps,
  | 'width'
  | 'isFocusable'
  | 'isGridNavigationEnabled'
  | 'interactiveCellId'
  | 'onCellFocus'
>;

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: CellValueElementProps['setCellProps'];
  }
> = memo(props => {
  const { renderCellValue, ...rest } = props;

  // React is more permissable than the TS types indicate
  const CellElement = renderCellValue as JSXElementConstructor<
    CellValueElementProps
  >;

  return <CellElement {...rest} />;
});

const IS_TABBABLE_ATTR = 'data-is-tabbable';

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  cellRef = createRef<HTMLDivElement>();
  cellContentsRef = createRef<HTMLDivElement>();
  state: EuiDataGridCellState = {
    cellProps: {},
  };

  isInteractiveCell() {
    const cellContents = this.cellContentsRef.current;

    if (!cellContents) {
      return false;
    }

    const tabbables = getTabbables(cellContents);

    return (
      tabbables.length > 1 ||
      (tabbables.length === 1 && this.hasNotTabbables(cellContents))
    );
  }

  updateFocus() {
    const cell = this.cellRef.current;
    const cellContents = this.cellContentsRef.current;
    const { isFocusable, isGridNavigationEnabled } = this.props;

    if (cell && isFocusable && cellContents) {
      const tabbables = getTabbables(cellContents);
      const isASimpleInteractiveCell =
        tabbables.length === 1 && !this.hasNotTabbables(cellContents);

      if (
        !isGridNavigationEnabled ||
        (isGridNavigationEnabled && isASimpleInteractiveCell)
      ) {
        (tabbables[0] as HTMLElement).focus();
      } else {
        cell.focus();
      }
    }
  }

  setTabbablesTabIndex() {
    const cellContents = this.cellContentsRef.current;

    if (cellContents) {
      const { isFocusable, isGridNavigationEnabled } = this.props;
      const areContentsFocusable = isFocusable && !isGridNavigationEnabled;

      getTabbables(cellContents).forEach(element => {
        element.setAttribute('tabIndex', areContentsFocusable ? '0' : '-1');
        element.setAttribute(IS_TABBABLE_ATTR, 'true');
      });
    }
  }

  hasNotTabbables(cellContents: Element) {
    const clone = cellContents.cloneNode(true) as HTMLElement;

    // has to exist because we set the `IS_TABBABLE_ATTR` attribute on it
    const tabbableElement = clone.querySelector(`[${IS_TABBABLE_ATTR}]`)!;

    if (tabbableElement) {
      // IE 11 doesn't support remove
      if (tabbableElement.remove) {
        tabbableElement.remove();
      } else {
        tabbableElement.parentNode!.removeChild(tabbableElement);
      }
    }

    // textContent includes not human readable text
    // but innerText causes a page reflow
    // so, only force a reflow if we have a strong signal that we should
    if (clone.textContent && clone.textContent.length > 0) {
      // Fallback to innerText if textContent isn't available
      // Only documented to fallback in tests; all officially supported browsers support innerText
      if (typeof clone.innerText === 'undefined') {
        return clone.textContent.length > 0;
      }

      return clone.innerText.length > 0;
    }

    return false;
  }

  componentDidMount() {
    this.setTabbablesTabIndex();
  }

  componentDidUpdate(prevProps: EuiDataGridCellProps) {
    const didFocusChange = prevProps.isFocusable !== this.props.isFocusable;
    const didNavigationChange =
      prevProps.isGridNavigationEnabled !== this.props.isGridNavigationEnabled;

    if (didFocusChange || didNavigationChange) {
      this.updateFocus();
      this.setTabbablesTabIndex();
    }
  }

  shouldComponentUpdate(
    nextProps: EuiDataGridCellProps,
    nextState: EuiDataGridCellState
  ) {
    if (nextProps.rowIndex !== this.props.rowIndex) return true;
    if (nextProps.colIndex !== this.props.colIndex) return true;
    if (nextProps.columnId !== this.props.columnId) return true;
    if (nextProps.width !== this.props.width) return true;
    if (nextProps.renderCellValue !== this.props.renderCellValue) return true;
    if (nextProps.onCellFocus !== this.props.onCellFocus) return true;
    if (nextProps.isFocusable !== this.props.isFocusable) return true;
    if (
      nextProps.isGridNavigationEnabled !== this.props.isGridNavigationEnabled
    )
      return true;
    if (nextProps.interactiveCellId !== this.props.interactiveCellId)
      return true;

    if (nextState.cellProps !== this.state.cellProps) return true;

    return false;
  }

  setCellProps = (cellProps: HTMLAttributes<HTMLDivElement>) => {
    this.setState({ cellProps });
  };

  render() {
    const {
      width,
      isFocusable,
      isGridNavigationEnabled,
      interactiveCellId,
      columnType,
      onCellFocus,
      ...rest
    } = this.props;
    const { colIndex, rowIndex } = rest;
    const isInteractive = this.isInteractiveCell();
    const isInteractiveCell = {
      [CELL_CONTENTS_ATTR]: isInteractive,
    };

    const className = classnames('euiDataGridRowCell', {
      [`euiDataGridRowCell--${columnType}`]: columnType,
    });

    const cellProps = {
      ...this.state.cellProps,
      'data-test-subj': classnames(
        'dataGridRowCell',
        this.state.cellProps['data-test-subj']
      ),
      className: classnames(className, this.state.cellProps.className),
    };

    const widthStyle = width != null ? { width: `${width}px` } : {};
    if (cellProps.hasOwnProperty('style')) {
      cellProps.style = { ...cellProps.style, ...widthStyle };
    } else {
      cellProps.style = widthStyle;
    }

    return (
      <div
        role="gridcell"
        {...isInteractive && { 'aria-describedby': interactiveCellId }}
        tabIndex={isFocusable ? 0 : -1}
        ref={this.cellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
        onFocus={() => onCellFocus([colIndex, rowIndex])}>
        <EuiMutationObserver
          onMutation={() => {
            this.updateFocus();
            this.setTabbablesTabIndex();
          }}
          observerOptions={{
            childList: true,
            subtree: true,
          }}>
          {ref => (
            <div ref={ref}>
              <div
                {...isInteractiveCell}
                ref={this.cellContentsRef}
                className="euiDataGridRowCell__content">
                <EuiDataGridCellContent
                  {...rest}
                  columnType={columnType}
                  setCellProps={this.setCellProps}
                />
              </div>
            </div>
          )}
        </EuiMutationObserver>
      </div>
    );
  }
}
