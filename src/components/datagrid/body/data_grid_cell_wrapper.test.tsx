/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { RowHeightUtils } from '../utils/__mocks__/row_heights';
import { schemaDetectors } from '../utils/data_grid_schema';

import { Cell } from './data_grid_cell_wrapper';

describe('Cell', () => {
  const requiredProps = {
    colIndex: 0,
    visibleRowIndex: 0,
    style: { top: '30px' },
    renderCellValue: () => null,
    interactiveCellId: '',
    rowHeightUtils: new RowHeightUtils(),
    schema: {},
    schemaDetectors,
    columns: [{ id: 'C' }],
    leadingControlColumns: [],
    trailingControlColumns: [],
    columnWidths: {},
    defaultColumnWidth: 30,
    visibleColCount: 1,
  };

  it('is a light wrapper around EuiDataGridCell', () => {
    const component = shallow(<Cell {...requiredProps} />);
    expect(component.find('EuiDataGridCell').exists()).toBe(true);
  });

  it('renders leading control column cells', () => {
    const component = shallow(
      <Cell
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
    expect(
      component
        .find('.euiDataGridRowCell--controlColumn')
        .hasClass('euiDataGridRowCell--firstColumn')
    ).toBeTruthy();
  });

  it('renders trailing control column cells', () => {
    const component = shallow(
      <Cell
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
    expect(
      component
        .find('.euiDataGridRowCell--controlColumn')
        .hasClass('euiDataGridRowCell--lastColumn')
    ).toBeTruthy();
  });

  it('renders text transform classes based on schema', () => {
    const component = shallow(
      <Cell
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
    expect(component.find('.euiDataGridRowCell--uppercase')).toHaveLength(1);
  });

  it('allows passing optional EuiDataGridCellProps overrides', () => {
    const component = shallow(
      <Cell
        {...requiredProps}
        columns={[{ id: 'a', isExpandable: true }]}
        isExpandable={false}
      />
    );
    expect(component.find('EuiDataGridCell').prop('isExpandable')).toBe(false);
  });
});
