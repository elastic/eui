import React, { FunctionComponent, ReactNode, useMemo } from 'react';

interface EuiDataGridCellProps {
  rowIndex: number;
  columnName: string;
  width: number;
  renderCellValue: (rowIndex: number, columnName: string) => ReactNode;
}

export const EuiDataGridCell: FunctionComponent<
  EuiDataGridCellProps
> = props => {
  const { rowIndex, columnName, renderCellValue, width } = props;

  const value = useMemo(() => renderCellValue(rowIndex, columnName), [
    rowIndex,
    columnName,
  ]);

  return (
    <div className="euiDataGridRowCell" style={{ width: `${width}px` }}>
      {value}
    </div>
  );
};
