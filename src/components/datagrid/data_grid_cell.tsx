import React, {
  Component,
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactNode,
  createRef,
} from 'react';
import { Omit } from '../common';

interface CellValueElementProps {
  rowIndex: number;
  columnId: string;
}

export interface EuiDataGridCellProps {
  rowIndex: number;
  colIndex: number;
  columnId: string;
  width: number;
  isFocusable: boolean;
  onCellFocus: Function;
  renderCellValue:
    | JSXElementConstructor<CellValueElementProps>
    | ((props: CellValueElementProps) => ReactNode);
}

interface EuiDataGridCellState {}

type EuiDataGridCellValueProps = Omit<
  EuiDataGridCellProps,
  'width' | 'isFocusable'
>;

const EuiDataGridCellContent: FunctionComponent<
  EuiDataGridCellValueProps
> = memo(props => {
  const { renderCellValue, ...rest } = props;

  // React is more permissable than the TS types indicate
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

  updateFocus() {
    if (this.cellRef.current && this.props.isFocusable) {
      this.cellRef.current.focus();
    }
  }

  componentDidUpdate() {
    this.updateFocus();
  }

  render() {
    const { width, isFocusable, ...rest } = this.props;
    const { colIndex, rowIndex, onCellFocus } = rest;

    return (
      <div
        role="gridcell"
        tabIndex={isFocusable ? 0 : -1}
        ref={this.cellRef}
        className="euiDataGridRowCell"
        data-test-subj="dataGridRowCell"
        onFocus={() => onCellFocus(colIndex, rowIndex)}
        style={{ width: `${width}px` }}>
        <EuiDataGridCellContent {...rest} />
      </div>
    );
  }
}
