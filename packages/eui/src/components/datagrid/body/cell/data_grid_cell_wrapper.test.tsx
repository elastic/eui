/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

import { RowHeightUtils } from '../../utils/__mocks__/row_heights';
import { schemaDetectors } from '../../utils/data_grid_schema';

import { CellWrapper } from './data_grid_cell_wrapper';

describe('Cell', () => {
  const requiredProps = {
    colIndex: 0,
    visibleRowIndex: 0,
    style: { top: '30px' },
    renderCellValue: () => null,
    interactiveCellId: '',
    rowHeightUtils: new RowHeightUtils(),
    gridStyles: {},
    schema: {},
    schemaDetectors,
    columns: [{ id: 'C' }],
    leadingControlColumns: [],
    trailingControlColumns: [],
    columnWidths: {},
    defaultColumnWidth: 30,
    visibleColCount: 1,
  };

  it('renders leading control column cells', () => {
    const { container } = render(
      <CellWrapper
        {...requiredProps}
        leadingControlColumns={[
          {
            id: 'leading',
            width: 20,
            rowCellRender: () => null,
            headerCellRender: () => null,
          },
        ]}
      />
    );

    const cell = container.querySelector('.euiDataGridRowCell--controlColumn');
    expect(cell).toHaveClass('euiDataGridRowCell--firstColumn');
  });

  it('renders trailing control column cells', () => {
    const { container } = render(
      <CellWrapper
        {...requiredProps}
        colIndex={1}
        visibleColCount={2}
        trailingControlColumns={[
          {
            id: 'trailing',
            width: 20,
            rowCellRender: () => null,
            headerCellRender: () => null,
          },
        ]}
      />
    );

    const cell = container.querySelector('.euiDataGridRowCell--controlColumn');
    expect(cell).toHaveClass('euiDataGridRowCell--lastColumn');
  });

  it('renders text transform classes based on schema', () => {
    const { getByRole } = render(
      <CellWrapper
        {...requiredProps}
        columns={[{ id: 'b', schema: 'SHOUTING' }]}
        schema={{ b: { columnType: 'SHOUTING' } } as any}
        schemaDetectors={[
          {
            type: 'SHOUTING',
            textTransform: 'uppercase',
            detector: () => 1,
            sortTextAsc: '',
            sortTextDesc: '',
            icon: 'starFilled',
          },
        ]}
      />
    );

    const cell = getByRole('gridcell');
    expect(cell).toHaveClass('euiDataGridRowCell--uppercase');
  });

  it('allows passing optional EuiDataGridCellProps overrides', () => {
    const { getByRole } = render(
      <CellWrapper
        {...requiredProps}
        columns={[{ id: 'a', isExpandable: true }]}
        width={123}
      />
    );

    const cell = getByRole('gridcell');
    expect(cell).toHaveStyle({
      width: '123px',
    });
  });
});
