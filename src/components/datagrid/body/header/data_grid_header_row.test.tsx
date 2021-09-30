/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiDataGridHeaderRow } from './data_grid_header_row';

describe('EuiDataGridHeaderRow', () => {
  const requiredProps = {
    columns: [],
    columnWidths: {},
    schema: {},
    schemaDetectors: [],
    setColumnWidth: jest.fn(),
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
    headerIsInteractive: false,
  };

  it('renders', () => {
    const component = shallow(<EuiDataGridHeaderRow {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridHeader"
        data-test-subj="dataGridHeader"
        role="row"
      />
    `);
  });

  it('renders columns', () => {
    const component = shallow(
      <EuiDataGridHeaderRow
        {...requiredProps}
        columns={[{ id: 'someColumn' }]}
        schema={{ someColumn: { columnType: 'string' } }}
        columnWidths={{ someColumn: 30 }}
        defaultColumnWidth={20}
      />
    );
    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridHeader"
        data-test-subj="dataGridHeader"
        role="row"
      >
        <EuiDataGridHeaderCell
          column={
            Object {
              "id": "someColumn",
            }
          }
          columnWidths={
            Object {
              "someColumn": 30,
            }
          }
          columns={
            Array [
              Object {
                "id": "someColumn",
              },
            ]
          }
          defaultColumnWidth={20}
          headerIsInteractive={false}
          index={0}
          key="someColumn"
          schema={
            Object {
              "someColumn": Object {
                "columnType": "string",
              },
            }
          }
          schemaDetectors={Array []}
          setColumnWidth={[MockFunction]}
          setVisibleColumns={[MockFunction]}
          switchColumnPos={[MockFunction]}
        />
      </div>
    `);
  });

  it('renders leading control columns', () => {
    const component = shallow(
      <EuiDataGridHeaderRow
        {...requiredProps}
        leadingControlColumns={[
          {
            id: 'someLeadingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 25,
          },
        ]}
        headerIsInteractive={true}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridHeader"
        data-test-subj="dataGridHeader"
        role="row"
      >
        <EuiDataGridControlHeaderCell
          controlColumn={
            Object {
              "headerCellRender": [Function],
              "id": "someLeadingColumn",
              "rowCellRender": [Function],
              "width": 25,
            }
          }
          headerIsInteractive={true}
          index={0}
          key="someLeadingColumn"
        />
      </div>
    `);
  });

  it('renders trailing control columns', () => {
    const component = shallow(
      <EuiDataGridHeaderRow
        {...requiredProps}
        trailingControlColumns={[
          {
            id: 'someTrailingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 50,
          },
        ]}
        headerIsInteractive={true}
      />
    );

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridHeader"
        data-test-subj="dataGridHeader"
        role="row"
      >
        <EuiDataGridControlHeaderCell
          controlColumn={
            Object {
              "headerCellRender": [Function],
              "id": "someTrailingColumn",
              "rowCellRender": [Function],
              "width": 50,
            }
          }
          headerIsInteractive={true}
          index={0}
          key="someTrailingColumn"
        />
      </div>
    `);
  });
});
