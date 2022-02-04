/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { DataGridFocusContext } from './focus';
import { mockFocusContext } from './__mocks__/focus_context';
import { EuiDataGridPaginationRenderer } from './data_grid_pagination';

describe('EuiDataGridPaginationRenderer', () => {
  const props = {
    pageIndex: 0,
    pageSize: 25,
    pageSizeOptions: [25],
    onChangePage: jest.fn(),
    onChangeItemsPerPage: jest.fn(),
    rowCount: 100,
    controls: 'data-grid-id',
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders', () => {
    const component = shallow(<EuiDataGridPaginationRenderer {...props} />);
    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__pagination"
      >
        <EuiTablePagination
          activePage={0}
          aria-controls="data-grid-id"
          aria-label="Pagination for preceding grid"
          hidePerPageOptions={false}
          itemsPerPage={25}
          itemsPerPageOptions={
            Array [
              25,
            ]
          }
          onChangeItemsPerPage={[MockFunction]}
          onChangePage={[Function]}
          pageCount={4}
        />
      </div>
    `);
  });

  it('renders a detailed aria-label', () => {
    const component = shallow(
      <EuiDataGridPaginationRenderer {...props} aria-label="Test Grid" />
    );
    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__pagination"
      >
        <EuiTablePagination
          activePage={0}
          aria-controls="data-grid-id"
          aria-label="Pagination for preceding grid: Test Grid"
          hidePerPageOptions={false}
          itemsPerPage={25}
          itemsPerPageOptions={
            Array [
              25,
            ]
          }
          onChangeItemsPerPage={[MockFunction]}
          onChangePage={[Function]}
          pageCount={4}
        />
      </div>
    `);
  });

  it('hides the page size selection if pageSizeOptions is empty', () => {
    const component = shallow(
      <EuiDataGridPaginationRenderer {...props} pageSizeOptions={[]} />
    );
    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGrid__pagination"
      >
        <EuiTablePagination
          activePage={0}
          aria-controls="data-grid-id"
          aria-label="Pagination for preceding grid"
          hidePerPageOptions={true}
          itemsPerPage={25}
          itemsPerPageOptions={Array []}
          onChangeItemsPerPage={[MockFunction]}
          onChangePage={[Function]}
          pageCount={4}
        />
      </div>
    `);
  });

  it('does not render if there are fewer rows than the smallest page size option', () => {
    const component = shallow(
      <EuiDataGridPaginationRenderer
        {...props}
        rowCount={1}
        pageSizeOptions={[10, 25]}
      />
    );
    expect(component.isEmptyRender()).toBe(true);
  });

  it('focuses the first data cell on page change', () => {
    const component = mount(
      <DataGridFocusContext.Provider value={mockFocusContext}>
        <EuiDataGridPaginationRenderer {...props} />
      </DataGridFocusContext.Provider>
    );
    const onChangePage: Function = component
      .find('EuiTablePagination')
      .prop('onChangePage');
    onChangePage(3);
    expect(mockFocusContext.setFocusedCell).toHaveBeenCalledWith([0, 0]);
  });
});
