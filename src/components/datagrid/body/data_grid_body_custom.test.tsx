/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';

import { EuiDataGridProps } from '../data_grid_types';
import { dataGridBodyProps } from './data_grid_body.test';

import { EuiDataGridBodyCustomRender } from './data_grid_body_custom';

describe('EuiDataGridBodyCustomRender', () => {
  type DataType = { columnA: string; columnB: string };
  const raw_data: DataType[] = [
    { columnA: 'hello', columnB: 'world' },
    { columnA: 'lorem', columnB: 'ipsum' },
  ];
  const RenderCellValue: EuiDataGridProps['renderCellValue'] = ({
    rowIndex,
    columnId,
  }) => raw_data[rowIndex][columnId as keyof DataType];

  const bodyProps = {
    ...dataGridBodyProps,
    rowCount: 2,
    visibleRows: { startRow: 0, endRow: 2, visibleRowCount: 2 },
    renderCellValue: RenderCellValue,
  };

  it('treats `renderCustomGridBody` as a render prop', () => {
    const CustomGridBody: EuiDataGridProps['renderCustomGridBody'] = ({
      visibleColumns,
      visibleRowData,
      Cell,
    }) => {
      const visibleRows = raw_data.slice(
        visibleRowData.startRow,
        visibleRowData.endRow
      );
      return (
        <>
          {visibleRows.map((row, rowIndex) => (
            <div role="row" key={rowIndex}>
              {visibleColumns.map((column, colIndex) => (
                <Cell
                  colIndex={colIndex}
                  visibleRowIndex={rowIndex}
                  key={`${rowIndex},${colIndex}`}
                />
              ))}
            </div>
          ))}
        </>
      );
    };

    const { container, getByText } = render(
      <EuiDataGridBodyCustomRender
        {...bodyProps}
        renderCustomGridBody={CustomGridBody}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByText('hello')).toBeTruthy();
    expect(getByText('world')).toBeTruthy();
    expect(getByText('lorem')).toBeTruthy();
    expect(getByText('ipsum')).toBeTruthy();
  });

  // More complex test cases involving pagination, auto height, etc can be found in Cypress .spec tests
});
