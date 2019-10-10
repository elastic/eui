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
} from 'react';
import classNames from 'classnames';
import tabbable from 'tabbable';
import { EuiPopover } from '../popover';
import { CommonProps, Omit } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { keyCodes } from '../../services';
import { EuiDataGridExpansionFormatter } from './data_grid_types';
import { EuiMutationObserver } from '../observer/mutation_observer';

export interface CellValueElementProps {
  rowIndex: number;
  columnId: string;
  setCellProps: (props: CommonProps & HTMLAttributes<HTMLDivElement>) => void;
  isExpandable: boolean;
  isExpanded: boolean;
}

export interface EuiDataGridCellProps {
  rowIndex: number;
  colIndex: number;
  columnId: string;
  columnType?: string | null;
  width?: number;
  isFocused: boolean;
  onCellFocus: Function;
  interactiveCellId: string;
  isExpandable: boolean;
  expansionFormatter: EuiDataGridExpansionFormatter;
  renderCellValue:
    | JSXElementConstructor<CellValueElementProps>
    | ((props: CellValueElementProps) => ReactNode);
}

interface EuiDataGridCellState {
  cellProps: CommonProps & HTMLAttributes<HTMLDivElement>;
  popoverIsOpen: boolean;
}

type EuiDataGridCellValueProps = Omit<
  EuiDataGridCellProps,
  | 'width'
  | 'isFocused'
  | 'interactiveCellId'
  | 'onCellFocus'
  | 'expansionFormatter'
>;

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps & {
    setCellProps: CellValueElementProps['setCellProps'];
    isExpanded: boolean;
  }
> = memo(props => {
  const { renderCellValue, ...rest } = props;

  // React is more permissible than the TS types indicate
  const CellElement = renderCellValue as JSXElementConstructor<
    CellValueElementProps
  >;

  return <CellElement data-test-subj="cell-content" {...rest} />;
});

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  cellRef = createRef<HTMLDivElement>();
  tabbingRef: HTMLDivElement | null = null;
  state: EuiDataGridCellState = {
    cellProps: {},
    popoverIsOpen: false,
  };

  updateFocus = () => {
    const cell = this.cellRef.current;
    const { isFocused } = this.props;

    if (cell && isFocused) {
      cell.focus();
    }
  };

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
    if (nextProps.colIndex !== this.props.colIndex) return true;
    if (nextProps.columnId !== this.props.columnId) return true;
    if (nextProps.width !== this.props.width) return true;
    if (nextProps.renderCellValue !== this.props.renderCellValue) return true;
    if (nextProps.onCellFocus !== this.props.onCellFocus) return true;
    if (nextProps.isFocused !== this.props.isFocused) return true;
    if (nextProps.interactiveCellId !== this.props.interactiveCellId)
      return true;
    if (nextProps.expansionFormatter !== this.props.expansionFormatter)
      return true;

    if (nextState.cellProps !== this.state.cellProps) return true;
    if (nextState.popoverIsOpen !== this.state.popoverIsOpen) return true;

    return false;
  }

  setCellProps = (cellProps: HTMLAttributes<HTMLDivElement>) => {
    this.setState({ cellProps });
  };

  onPreventTabbableRef = (ref: HTMLDivElement | null) => {
    this.tabbingRef = ref;
    this.preventTabbing();
  };

  preventTabbing = () => {
    if (this.tabbingRef) {
      const tabbables = tabbable(this.tabbingRef);
      for (let i = 0; i < tabbables.length; i++) {
        tabbables[i].setAttribute('tabIndex', '-1');
      }
    }
  };

  render() {
    const {
      width,
      isFocused,
      isExpandable,
      expansionFormatter: ExpansionFormatter,
      interactiveCellId,
      columnType,
      onCellFocus,
      ...rest
    } = this.props;
    const { colIndex, rowIndex } = rest;

    const className = classNames('euiDataGridRowCell', {
      [`euiDataGridRowCell--${columnType}`]: columnType,
    });

    const cellProps = {
      ...this.state.cellProps,
      'data-test-subj': classNames(
        'dataGridRowCell',
        this.state.cellProps['data-test-subj']
      ),
      className: classNames(className, this.state.cellProps.className),
    };

    const widthStyle = width != null ? { width: `${width}px` } : {};
    if (cellProps.hasOwnProperty('style')) {
      cellProps.style = { ...cellProps.style, ...widthStyle };
    } else {
      cellProps.style = widthStyle;
    }

    const handleCellKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isExpandable) {
        switch (e.keyCode) {
          case keyCodes.ENTER:
            e.preventDefault();
            this.setState({ popoverIsOpen: true });
            break;
          case keyCodes.F2:
            e.preventDefault();
            this.setState({ popoverIsOpen: true });
            break;
        }
      }
    };

    const cellContentProps = {
      ...rest,
      setCellProps: this.setCellProps,
      columnType: columnType,
      isExpandable,
      isExpanded: this.state.popoverIsOpen,
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
      <div className="euiDataGridRowCell__expandInner">
        <EuiMutationObserver
          observerOptions={{ subtree: true, childList: true }}
          onMutation={this.preventTabbing}>
          {mutationRef => {
            const onRef = (ref: HTMLDivElement | null) => {
              mutationRef(ref);
              this.onPreventTabbableRef(ref);
            };

            return (
              <div ref={onRef} className="euiDataGridRowCell__expandCode">
                {screenReaderPosition}
                <EuiDataGridCellContent {...cellContentProps} />
              </div>
            );
          }}
        </EuiMutationObserver>
      </div>
    );

    if (isExpandable) {
      anchorContent = (
        <div className="euiDataGridRowCell__expandInner">
          <EuiMutationObserver
            observerOptions={{ subtree: true, childList: true }}
            onMutation={this.preventTabbing}>
            {mutationRef => {
              const onRef = (ref: HTMLDivElement | null) => {
                mutationRef(ref);
                this.onPreventTabbableRef(ref);
              };

              return (
                <div ref={onRef} className="euiDataGridRowCell__expandCode">
                  {screenReaderPosition}
                  <EuiDataGridCellContent {...cellContentProps} />
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
        CellValueElementProps
      >;
      const popoverContent = (
        <ExpansionFormatter>
          <CellElement {...cellContentProps} />
        </ExpansionFormatter>
      );

      innerContent = (
        <div className="euiDataGridRowCell__content">
          <EuiPopover
            anchorClassName="euiDataGridRowCell__expand"
            button={anchorContent}
            isOpen={this.state.popoverIsOpen}
            ownFocus
            panelClassName="euiDataGridRowCell__popover"
            zIndex={2000}
            display="block"
            closePopover={() => this.setState({ popoverIsOpen: false })}
            onTrapDeactivation={this.updateFocus}>
            {popoverContent}
          </EuiPopover>
        </div>
      );
    }

    return (
      <div
        role="gridcell"
        tabIndex={isFocused ? 0 : -1}
        ref={this.cellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
        onKeyDown={handleCellKeyDown}
        onFocus={() => onCellFocus([colIndex, rowIndex])}>
        {innerContent}
      </div>
    );
  }
}
