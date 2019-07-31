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
  columnName: string;
}

export interface EuiDataGridCellProps {
  rowIndex: number;
  colIndex: number;
  focusedCell: [number, number];
  columnName: string;
  width: number;
  onCellFocus: Function;
  renderCellValue:
    | JSXElementConstructor<CellValueElementProps>
    | ((props: CellValueElementProps) => ReactNode);
}

interface EuiDataGridCellState {}

type EuiDataGridCellValueProps = Omit<EuiDataGridCellProps, 'width'>;

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

  isFocusOnMe() {
    return (
      this.props.focusedCell[0] === this.props.colIndex &&
      this.props.focusedCell[1] === this.props.rowIndex
    );
  }

  setFocus() {
    if (this.cellRef.current && this.isFocusOnMe()) {
      this.cellRef.current.focus();
    }
  }

  componentDidMount() {
    this.setFocus();
  }

  componentDidUpdate() {
    this.setFocus();
  }

  render() {
    const { width, ...rest } = this.props;
    const { colIndex, rowIndex, onCellFocus } = this.props;

    return (
      <div
        role="gridcell"
        tabIndex={this.isFocusOnMe() ? 0 : -1}
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
