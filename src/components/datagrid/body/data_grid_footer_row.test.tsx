/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiDataGridFooterRow } from './data_grid_footer_row';

describe('EuiDataGridFooterRow', () => {
  const requiredProps = {
    rowIndex: 10,
    leadingControlColumns: [],
    trailingControlColumns: [],
    columns: [{ id: 'someColumn' }, { id: 'someColumnWithoutSchema' }],
    schema: { someColumn: { columnType: 'string' } },
    popoverContents: {},
    columnWidths: { someColumn: 30 },
    renderCellValue: () => <div />,
    interactiveCellId: 'someId',
  };

  it('renders columns', () => {
    const component = shallow(<EuiDataGridFooterRow {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRow euiDataGridFooter"
        data-test-subj="dataGridRow"
        role="row"
      >
        <EuiDataGridCell
          className="euiDataGridFooterCell"
          colIndex={0}
          columnId="someColumn"
          columnType="string"
          interactiveCellId="someId"
          isExpandable={true}
          key="someColumn-10"
          popoverContent={[Function]}
          renderCellValue={[Function]}
          rowIndex={10}
          visibleRowIndex={10}
          width={30}
        />
        <EuiDataGridCell
          className="euiDataGridFooterCell"
          colIndex={1}
          columnId="someColumnWithoutSchema"
          columnType={null}
          interactiveCellId="someId"
          isExpandable={true}
          key="someColumnWithoutSchema-10"
          popoverContent={[Function]}
          renderCellValue={[Function]}
          rowIndex={10}
          visibleRowIndex={10}
        />
      </div>
    `);
  });

  it('renders leading control columns', () => {
    const component = shallow(
      <EuiDataGridFooterRow
        {...requiredProps}
        columns={[]}
        leadingControlColumns={[
          {
            id: 'someLeadingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 25,
          },
        ]}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRow euiDataGridFooter"
        data-test-subj="dataGridRow"
        role="row"
      >
        <EuiDataGridCell
          className="euiDataGridFooterCell euiDataGridRowCell--controlColumn"
          colIndex={0}
          columnId="someLeadingColumn"
          interactiveCellId="someId"
          isExpandable={true}
          key="someLeadingColumn-10"
          popoverContent={[Function]}
          renderCellValue={[Function]}
          rowIndex={10}
          visibleRowIndex={10}
          width={25}
        />
      </div>
    `);

    const renderCellValue: Function = component
      .find('EuiDataGridCell')
      .prop('renderCellValue');
    expect(renderCellValue()).toEqual(null);
  });

  it('renders trailing control columns', () => {
    const component = shallow(
      <EuiDataGridFooterRow
        {...requiredProps}
        columns={[]}
        trailingControlColumns={[
          {
            id: 'someTrailingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 50,
          },
        ]}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRow euiDataGridFooter"
        data-test-subj="dataGridRow"
        role="row"
      >
        <EuiDataGridCell
          className="euiDataGridFooterCell euiDataGridRowCell--controlColumn"
          colIndex={0}
          columnId="someTrailingColumn"
          interactiveCellId="someId"
          isExpandable={true}
          key="someTrailingColumn-10"
          popoverContent={[Function]}
          renderCellValue={[Function]}
          rowIndex={10}
          visibleRowIndex={10}
          width={50}
        />
      </div>
    `);

    const renderCellValue: Function = component
      .find('EuiDataGridCell')
      .prop('renderCellValue');
    expect(renderCellValue()).toEqual(null);
  });
});
