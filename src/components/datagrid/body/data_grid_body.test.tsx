/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';

import { RowHeightUtils } from '../utils/__mocks__/row_heights';
import { schemaDetectors } from '../utils/data_grid_schema';

import { EuiDataGridBody } from './data_grid_body';

// Body props, reused by other body unit tests
export const dataGridBodyProps = {
  headerIsInteractive: true,
  rowCount: 1,
  visibleRows: { startRow: 0, endRow: 1, visibleRowCount: 1 },
  columnWidths: { columnA: 100 },
  columns: [
    { id: 'columnA', schema: 'boolean' },
    { id: 'columnB', isExpandable: true },
  ],
  leadingControlColumns: [],
  trailingControlColumns: [],
  visibleColCount: 2,
  schema: {
    columnA: { columnType: 'boolean' },
    columnB: { columnType: 'string' },
  },
  renderCellValue: () => <span>cell content</span>,
  interactiveCellId: 'someId',
  inMemory: { level: 'enhancements' as any },
  inMemoryValues: {},
  handleHeaderMutation: jest.fn(),
  setVisibleColumns: jest.fn(),
  switchColumnPos: jest.fn(),
  schemaDetectors,
  rowHeightUtils: new RowHeightUtils(),
  isFullScreen: false,
  gridStyles: {},
  gridWidth: 300,
  gridRef: { current: null },
  gridItemsRendered: { current: null },
  wrapperRef: { current: document.createElement('div') },
};

describe('EuiDataGridBody', () => {
  it('renders a virtualized data grid body by default', () => {
    const { container } = render(<EuiDataGridBody {...dataGridBodyProps} />);
    expect(container.querySelector('.euiDataGrid__virtualized')).toBeTruthy();
  });

  it('renders a custom rendered data grid body if `renderCustomGridBody` is passed', () => {
    const { container } = render(
      <EuiDataGridBody
        {...dataGridBodyProps}
        renderCustomGridBody={() => null}
      />
    );
    expect(
      container.querySelector('.euiDataGrid__customRenderBody')
    ).toBeTruthy();
  });
});
