/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, render, shallow } from 'enzyme';

import { mockRowHeightUtils } from '../utils/__mocks__/row_heights';
import { schemaDetectors } from '../utils/data_grid_schema';

import { EuiDataGridBody, Cell, getParentCellContent } from './data_grid_body';

describe('EuiDataGridBody', () => {
  const requiredProps = {
    isFullScreen: false,
    headerIsInteractive: true,
    rowCount: 1,
    visibleRows: { startRow: 0, endRow: 1, visibleRowCount: 1 },
    toolbarHeight: 10,
    columnWidths: { columnA: 20 },
    columns: [
      { id: 'columnA', schema: 'boolean' },
      { id: 'columnB', isExpandable: true },
    ],
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
    rowHeightUtils: mockRowHeightUtils,
    gridStyles: {},
    gridWidth: 300,
  };

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 34,
    });
  });

  it('renders', () => {
    // EuiDataGridBody should be `render`ed here over `mount` due to large
    // snapshot memory issues
    const component = render(<EuiDataGridBody {...requiredProps} />);
    expect(component).toMatchSnapshot();
    expect(component.find('[data-test-subj="dataGridRowCell"]')).toHaveLength(
      2
    );
  });

  it('renders leading columns, trailing columns, and footer rows', () => {
    const component = mount(
      <EuiDataGridBody
        {...requiredProps}
        leadingControlColumns={[
          {
            id: 'someLeadingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 30,
          },
        ]}
        trailingControlColumns={[
          {
            id: 'someTrailingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 40,
          },
        ]}
        visibleColCount={4}
        renderFooterCellValue={() => <footer data-test-subj="footer" />}
      />
    );
    expect(component.find('Cell')).toHaveLength(4);
    expect(component.find('[data-test-subj="footer"]')).toHaveLength(2);
  });

  // TODO: Test final height/weights in Cypress

  // TODO: Test tabbing in Cypress

  // TODO: Test column resizing in Cypress
});

describe('Cell', () => {
  const requiredProps = {
    columnIndex: 0,
    rowIndex: 0,
    style: {},
    data: {
      rowMap: {},
      rowOffset: 0,
      leadingControlColumns: [],
      trailingControlColumns: [],
      columns: [{ id: 'C' }],
      columnWidths: {},
      defaultColumnWidth: 30,
      schema: {},
      schemaDetectors,
      popoverContents: {},
      interactiveCellId: '',
      renderCellValue: jest.fn(),
    },
  };

  it('is a light wrapper around EuiDataGridCell', () => {
    const component = shallow(<Cell {...requiredProps} />);
    expect(component.find('EuiDataGridCell').exists()).toBe(true);
  });

  describe('stripes', () => {
    it('renders odd rows with .euiDataGridRowCell--stripe', () => {
      const component = shallow(<Cell {...requiredProps} rowIndex={3} />);
      expect(component.hasClass('euiDataGridRowCell--stripe')).toBe(true);

      component.setProps({ rowIndex: 4 });
      expect(component.hasClass('euiDataGridRowCell--stripe')).toBe(false);
    });
  });
});

describe('getParentCellContent', () => {
  const doc = document.createDocumentFragment();

  const body = document.createElement('body');
  doc.appendChild(body);

  const cell = document.createElement('div');
  cell.setAttribute('data-datagrid-cellcontent', 'true');
  body.appendChild(cell);

  const span = document.createElement('span');
  span.textContent = 'Here comes the text';
  cell.appendChild(span);

  const text = span.childNodes[0];

  it('locates the cell element when starting with the cell itself', () => {
    expect(getParentCellContent(cell)).toBe(cell);
  });

  it('locates the cell element when starting with an element inside the cell', () => {
    expect(getParentCellContent(span!)).toBe(cell);
  });

  it('locates the cell element when starting with a text node inside the cell', () => {
    expect(getParentCellContent(text!)).toBe(cell);
  });

  it('does not locate the cell element when starting outside the cell', () => {
    expect(getParentCellContent(body)).toBeNull();
  });
});
