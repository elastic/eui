import React, {
  Component,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactNode,
  createRef,
  HTMLAttributes,
  useState,
  KeyboardEvent,
  useEffect,
} from 'react';
import classNames from 'classnames';
// @ts-ignore
import { EuiText } from '../text';
import { EuiPopover } from '../popover';
// @ts-ignore
import { EuiCodeBlock } from '../code';
import { CommonProps, Omit } from '../common';
// @ts-ignore
import { EuiButtonIcon } from '../button';
import { EuiMutationObserver } from '../observer/mutation_observer';
import { keyCodes } from '../../services';

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
  isExpandable: boolean;
  isExpanded?: boolean;
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
  const { renderCellValue, isExpandable, isExpanded, ...rest } = props;
  const [popoverIsOpen, setPopoverIsOpen] = useState(isExpanded);

  useEffect(() => {
    setPopoverIsOpen(isExpanded);
  }, [isExpanded]);

  // React is more permissable than the TS types indicate
  const CellElement = renderCellValue as JSXElementConstructor<
    CellValueElementProps
  >;

  const buttonIconClasses = classNames('euiDataGridRowCell__expandButtonIcon', {
    'euiDataGridRowCell__expandButtonIcon-isActive': popoverIsOpen,
  });

  const buttonClasses = classNames('euiDataGridRowCell__expandButton', {
    'euiDataGridRowCell__expandButton-isActive': popoverIsOpen,
  });

  const expandButton = (
    <EuiButtonIcon
      className={buttonIconClasses}
      color="text"
      iconSize="s"
      iconType="expandMini"
      aria-hidden
      onClick={() => setPopoverIsOpen(!popoverIsOpen)}
      title="Expand cell content"
    />
  );

  // TODO: This is temporary. It's mostly just to show that different schema likely will require different
  // markup. We also likely will want a way to pass a custom render to the popup and the default cell
  // content as part of the data config.
  let cellElement: ReactNode;
  if (props.columnType === 'json') {
    cellElement = (
      <EuiCodeBlock
        isCopyable
        transparentBackground
        paddingSize="none"
        language="json">
        <CellElement {...rest} />
      </EuiCodeBlock>
    );
  } else {
    cellElement = (
      <EuiText>
        <CellElement {...rest} />
      </EuiText>
    );
  }

  return (
    <div className="euiDataGridRowCell__expand">
      <div className="euiDataGridRowCell__expandCode">
        <CellElement {...rest} />
      </div>
      {isExpandable && (
        <div className={buttonClasses}>
          <EuiPopover
            button={expandButton}
            isOpen={popoverIsOpen}
            ownFocus
            panelClassName="euiDataGridRowCell__popover"
            zIndex={2000}
            closePopover={() => setPopoverIsOpen(false)}>
            {cellElement}
          </EuiPopover>
        </div>
      )}
    </div>
  );
});

export class EuiDataGridCell extends Component<
  EuiDataGridCellProps,
  EuiDataGridCellState
> {
  cellRef = createRef<HTMLDivElement>();
  cellContentsRef = createRef<HTMLDivElement>();
  state: EuiDataGridCellState = {
    cellProps: {},
    popoverIsOpen: false,
  };

  updateFocus() {
    const cell = this.cellRef.current;
    const cellContents = this.cellContentsRef.current;
    const { isFocusable, isGridNavigationEnabled } = this.props;

    if (cell && isFocusable && cellContents) {
      if (isGridNavigationEnabled) {
        cell.focus();
      }
    }
  }

  componentDidUpdate(prevProps: EuiDataGridCellProps) {
    const didFocusChange = prevProps.isFocusable !== this.props.isFocusable;
    const didNavigationChange =
      prevProps.isGridNavigationEnabled !== this.props.isGridNavigationEnabled;

    if (didFocusChange || didNavigationChange) {
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
      isExpandable,
      isGridNavigationEnabled,
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
            console.log('hello');
            break;
          case keyCodes.F2:
            e.preventDefault();
            this.setState({ popoverIsOpen: true });
            break;
        }
      }
    };

    return (
      <div
        role="gridcell"
        tabIndex={isFocusable ? 0 : -1}
        ref={this.cellRef}
        {...cellProps}
        data-test-subj="dataGridRowCell"
        onKeyDown={handleCellKeyDown}
        onFocus={() => onCellFocus([colIndex, rowIndex])}>
        <EuiMutationObserver
          onMutation={() => {
            this.updateFocus();
          }}
          observerOptions={{
            childList: true,
            subtree: true,
          }}>
          {ref => (
            <div ref={ref}>
              <div
                ref={this.cellContentsRef}
                className="euiDataGridRowCell__content">
                <EuiDataGridCellContent
                  {...rest}
                  columnType={columnType}
                  setCellProps={this.setCellProps}
                  isExpandable={isExpandable}
                  isExpanded={this.state.popoverIsOpen}
                />
              </div>
            </div>
          )}
        </EuiMutationObserver>
      </div>
    );
  }
}
