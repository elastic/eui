import React, {
  Component,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactNode,
  createRef,
  HTMLAttributes,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';
// @ts-ignore
import { EuiText } from '../text';
import { EuiPopover } from '../popover';
// @ts-ignore
// import { EuiCodeBlock } from '../code';
import { CommonProps, Omit } from '../common';
// @ts-ignore
import { EuiButtonIcon } from '../button';
import { keyCodes } from '../../services';

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
  'width' | 'isFocused' | 'interactiveCellId' | 'onCellFocus'
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

  return <CellElement {...rest} />;
});

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  cellRef = createRef<HTMLDivElement>();
  state: EuiDataGridCellState = {
    cellProps: {},
    popoverIsOpen: false,
  };

  updateFocus() {
    const cell = this.cellRef.current;
    const { isFocused } = this.props;

    if (cell && isFocused) {
      cell.focus();
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
    if (nextProps.colIndex !== this.props.colIndex) return true;
    if (nextProps.columnId !== this.props.columnId) return true;
    if (nextProps.width !== this.props.width) return true;
    if (nextProps.renderCellValue !== this.props.renderCellValue) return true;
    if (nextProps.onCellFocus !== this.props.onCellFocus) return true;
    if (nextProps.isFocused !== this.props.isFocused) return true;
    if (nextProps.interactiveCellId !== this.props.interactiveCellId)
      return true;

    if (nextState.cellProps !== this.state.cellProps) return true;
    if (nextState.popoverIsOpen !== this.state.popoverIsOpen) return true;

    return false;
  }

  setCellProps = (cellProps: HTMLAttributes<HTMLDivElement>) => {
    this.setState({ cellProps });
  };

  render() {
    const {
      width,
      isFocused,
      isExpandable,
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
        title="Expand cell content"
      />
    );

    let anchorContent = (
      <div className="euiDataGridRowCell__expandInner">
        <div className="euiDataGridRowCell__expandCode">
          <EuiDataGridCellContent {...cellContentProps} />
        </div>
      </div>
    );

    if (isExpandable) {
      anchorContent = (
        <div className="euiDataGridRowCell__expandInner">
          <div className="euiDataGridRowCell__expandCode">
            <EuiDataGridCellContent {...cellContentProps} />
          </div>
          <div className={buttonClasses}>{expandButton}</div>
        </div>
      );
    }

    let innerContent = anchorContent;
    if (isExpandable) {
      // TODO: This is temporary. It's mostly just to show that different schema likely will require different
      // markup. We also likely will want a way to pass a custom render to the popup and the default cell
      // content as part of the data config.
      const CellElement = rest.renderCellValue as JSXElementConstructor<
        CellValueElementProps
      >;
      let popoverContent: ReactNode;
      if (columnType === 'json') {
        popoverContent = (
          /*<EuiCodeBlock
            isCopyable
            transparentBackground
            paddingSize="none"
            language="json">*/
          <CellElement {...cellContentProps} />
          // </EuiCodeBlock>
        );
      } else {
        popoverContent = (
          <EuiText>
            <CellElement {...cellContentProps} />
          </EuiText>
        );
      }

      innerContent = (
        <div className="euiDataGridRowCell__content">
          <EuiPopover
            anchorClassName="euiDataGridRowCell__expand"
            button={anchorContent}
            isOpen={this.state.popoverIsOpen}
            ownFocus
            panelClassName="euiDataGridRowCell__popover"
            zIndex={2000}
            closePopover={() => this.setState({ popoverIsOpen: false })}>
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
