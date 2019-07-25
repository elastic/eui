import React, {
  FunctionComponent,
  JSXElementConstructor,
  memo,
  ReactNode,
} from 'react';
import { Omit } from '../common';

interface CellValueElementProps {
  rowIndex: number;
  columnName: string;
}

export interface EuiDataGridCellProps {
  rowIndex: number;
  columnName: string;
  width: number;
  renderCellValue:
    | JSXElementConstructor<CellValueElementProps>
    | ((props: CellValueElementProps) => ReactNode);
}

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

export const EuiDataGridCell: FunctionComponent<
  EuiDataGridCellProps
> = props => {
  const { width, ...rest } = props;

  return (
    <div
      className="euiDataGridRowCell"
      data-test-subj="dataGridRowCell"
      style={{ width: `${width}px` }}>
      <EuiDataGridCellContent {...rest} />
    </div>
  );
};
