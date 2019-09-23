import React, {
  Fragment,
  FunctionComponent,
  JSXElementConstructor,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CellValueElementProps, EuiDataGridCellProps } from './data_grid_cell';
import { EuiDataGridColumn } from './data_grid_types';
import { EuiInnerText } from '../inner_text';

interface EuiDataGridInMemoryRendererProps {
  columns: EuiDataGridColumn[];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  onCellRender: (
    rowIndex: number,
    column: EuiDataGridColumn,
    value: string
  ) => void;
}

function noop() {}

export const EuiDataGridInMemoryRenderer: FunctionComponent<
  EuiDataGridInMemoryRendererProps
> = ({ columns, rowCount, renderCellValue, onCellRender }) => {
  const [documentFragment] = useState(() => document.createDocumentFragment());

  const rows = useMemo(() => {
    const rows = [];

    const CellElement = renderCellValue as JSXElementConstructor<
      CellValueElementProps
    >;

    for (let i = 0; i < rowCount; i++) {
      rows.push(
        <Fragment key={i}>
          {columns.map(column => (
            <Fragment key={column.id}>
              <EuiInnerText>
                {(ref, text) => {
                  useEffect(() => {
                    if (text != null) {
                      onCellRender(i, column, text);
                    }
                  }, [text]);
                  return (
                    <div ref={ref}>
                      <CellElement
                        rowIndex={i}
                        columnId={column.id}
                        setCellProps={noop}
                      />
                    </div>
                  );
                }}
              </EuiInnerText>
            </Fragment>
          ))}
        </Fragment>
      );
    }

    return rows;
  }, [columns, rowCount, renderCellValue]);

  return createPortal(
    <Fragment>{rows}</Fragment>,
    (documentFragment as unknown) as Element
  );
};
