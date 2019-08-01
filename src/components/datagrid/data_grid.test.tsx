import React, { useState } from 'react';
import { mount, ReactWrapper, render } from 'enzyme';
import { EuiDataGrid } from './';
import { findTestSubject, requiredProps } from '../../test';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { keyCodes } from '../../services';

function getFocusableCell(component: ReactWrapper) {
  return findTestSubject(component, 'dataGridRowCell').find('[tabIndex=0]');
}

function extractGridData(datagrid: ReactWrapper) {
  const rows: string[][] = [];

  const headerCells = findTestSubject(datagrid, 'dataGridHeaderCell');
  const headerRow: string[] = [];
  headerCells.forEach((cell: any) => headerRow.push(cell.text()));
  rows.push(headerRow);

  const gridRows = findTestSubject(datagrid, 'dataGridRow');
  gridRows.forEach((row: any) => {
    const rowContent: string[] = [];
    const cells = findTestSubject(row, 'dataGridRowCell');
    cells.forEach((cell: any) => rowContent.push(cell.text()));
    rows.push(rowContent);
  });

  return rows;
}

function extractColumnWidths(datagrid: ReactWrapper) {
  return (findTestSubject(datagrid, 'dataGridHeaderCell') as ReactWrapper<{
    style: { width: string };
  }>).map(cell => cell.props().style.width);
}

describe('EuiDataGrid', () => {
  describe('rendering', () => {
    it('renders with common and div attributes', () => {
      const component = render(
        <EuiDataGrid
          {...requiredProps}
          columns={[{ name: 'A' }, { name: 'B' }]}
          rowCount={3}
          ariaLabel="test"
          renderCellValue={({ rowIndex, columnName }) =>
            `${rowIndex}, ${columnName}`
          }
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('cell rendering', () => {
    it('supports hooks', () => {
      const component = mount(
        <EuiDataGrid
          ariaLabel="test"
          columns={[{ name: 'Column 1' }, { name: 'Column 2' }]}
          rowCount={2}
          renderCellValue={({ rowIndex, columnName }) => {
            const [value] = useState(`Hello, Row ${rowIndex}-${columnName}!`);
            return <span>{value}</span>;
          }}
        />
      );
      expect(extractGridData(component)).toMatchInlineSnapshot(`
Array [
  Array [
    "Column 1",
    "Column 2",
  ],
  Array [
    "Hello, Row 0-Column 1!",
    "Hello, Row 0-Column 2!",
  ],
  Array [
    "Hello, Row 1-Column 1!",
    "Hello, Row 1-Column 2!",
  ],
]
`);
    });
  });

  describe('column resizing', () => {
    it('resizes a column by grab handles', () => {
      const component = mount(
        <EuiDataGrid
          ariaLabel="test"
          columns={[{ name: 'Column 1' }, { name: 'Column 2' }]}
          rowCount={3}
          renderCellValue={() => 'value'}
        />
      );

      const originalCellWidths = extractColumnWidths(component);
      expect(originalCellWidths).toEqual(['100px', '100px']);

      const firstResizer = component
        .find('EuiDataGridColumnResizer')
        .first()
        .instance() as EuiDataGridColumnResizer;
      firstResizer.onMouseDown({ pageX: 100 });
      firstResizer.onMouseMove({ pageX: 113 });
      firstResizer.onMouseMove({ pageX: 136 });
      firstResizer.onMouseMove({ pageX: 150 });
      firstResizer.onMouseUp();

      component.update();

      const updatedCellWidths = extractColumnWidths(component);
      expect(updatedCellWidths).toEqual(['150px', '100px']);
    });

    it('does not trigger value re-renders', () => {
      const renderCellValue = jest.fn(() => 'value');

      const component = mount(
        <EuiDataGrid
          ariaLabel="test"
          columns={[{ name: 'ColumnA' }]}
          rowCount={3}
          renderCellValue={renderCellValue}
        />
      );

      expect(renderCellValue).toHaveBeenCalledTimes(3);
      renderCellValue.mockClear();

      (component.instance() as EuiDataGrid).setColumnWidth('ColumnA', 200);

      component.update();

      expect(extractColumnWidths(component)).toEqual(['200px']);
      // expect(renderCellValue).toHaveBeenCalledTimes(0); // TODO re-enable after PR#2188
    });
  });

  describe('keyboard controls', () => {
    const component = mount(
      <EuiDataGrid
        {...requiredProps}
        columns={[{ name: 'A' }, { name: 'B' }]}
        rowCount={3}
        ariaLabel="test"
        renderCellValue={({ rowIndex, columnName }) =>
          `${rowIndex}, ${columnName}`
        }
      />
    );

    let focusableCell = getFocusableCell(component);
    expect(focusableCell.length).toEqual(1);
    expect(focusableCell.text()).toEqual('0, A');

    focusableCell
      .simulate('focus')
      .simulate('keydown', { keyCode: keyCodes.LEFT });

    focusableCell = getFocusableCell(component);
    expect(focusableCell.text()).toEqual('0, A'); // focus should not move when up against an edge

    focusableCell.simulate('keydown', { keyCode: keyCodes.UP });
    expect(focusableCell.text()).toEqual('0, A'); // focus should not move when up against an edge

    focusableCell.simulate('keydown', { keyCode: keyCodes.DOWN });

    focusableCell = getFocusableCell(component);
    expect(focusableCell.text()).toEqual('1, A');

    focusableCell.simulate('keydown', { keyCode: keyCodes.RIGHT });

    focusableCell = getFocusableCell(component);
    expect(focusableCell.text()).toEqual('1, B');

    focusableCell.simulate('keydown', { keyCode: keyCodes.UP });

    focusableCell = getFocusableCell(component);
    expect(focusableCell.text()).toEqual('0, B');

    focusableCell.simulate('keydown', { keyCode: keyCodes.LEFT });

    focusableCell = getFocusableCell(component);
    expect(focusableCell.text()).toEqual('0, A');
  });
});
