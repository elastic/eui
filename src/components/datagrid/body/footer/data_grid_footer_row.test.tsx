/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { render } from '../../../../test/rtl';

import { EuiDataGridFooterRow } from './data_grid_footer_row';

describe('EuiDataGridFooterRow', () => {
  const requiredProps = {
    rowIndex: 10,
    leadingControlColumns: [],
    trailingControlColumns: [],
    columns: [{ id: 'someColumn' }, { id: 'someColumnWithoutSchema' }],
    schema: { someColumn: { columnType: 'string' } },
    columnWidths: { someColumn: 30 },
    renderCellValue: () => <div />,
    interactiveCellId: 'someId',
  };

  it('renders columns', () => {
    const component = shallow(<EuiDataGridFooterRow {...requiredProps} />);

    expect(component).toMatchInlineSnapshot(`
      <div
        className="euiDataGridRow euiDataGridFooter"
        data-test-subj="dataGridRow dataGridFooterRow"
        role="row"
      >
        <EuiDataGridCell
          className="euiDataGridFooterCell"
          colIndex={0}
          columnId="someColumn"
          columnType="string"
          interactiveCellId="someId"
          isExpandable={true}
          key="0,10"
          popoverContext={
            Object {
              "cellLocation": Object {
                "colIndex": 0,
                "rowIndex": 0,
              },
              "closeCellPopover": [Function],
              "openCellPopover": [Function],
              "popoverIsOpen": false,
              "setCellPopoverProps": [Function],
              "setPopoverAnchor": [Function],
              "setPopoverContent": [Function],
            }
          }
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
          key="1,10"
          popoverContext={
            Object {
              "cellLocation": Object {
                "colIndex": 0,
                "rowIndex": 0,
              },
              "closeCellPopover": [Function],
              "openCellPopover": [Function],
              "popoverIsOpen": false,
              "setCellPopoverProps": [Function],
              "setPopoverAnchor": [Function],
              "setPopoverContent": [Function],
            }
          }
          renderCellValue={[Function]}
          rowIndex={10}
          visibleRowIndex={10}
        />
      </div>
    `);
  });

  describe('control columns', () => {
    const requiredColumnProps = {
      headerCellRender: () => <div />,
      rowCellRender: () => <div />,
      width: 25,
    };

    it('renders leading control columns as null/empty by default', () => {
      const component = shallow(
        <EuiDataGridFooterRow
          {...requiredProps}
          columns={[]}
          leadingControlColumns={[
            { id: 'someLeadingColumn', ...requiredColumnProps },
          ]}
        />
      );

      expect(component).toMatchInlineSnapshot(`
        <div
          className="euiDataGridRow euiDataGridFooter"
          data-test-subj="dataGridRow dataGridFooterRow"
          role="row"
        >
          <EuiDataGridCell
            className="euiDataGridFooterCell euiDataGridRowCell--controlColumn"
            colIndex={0}
            columnId="someLeadingColumn"
            interactiveCellId="someId"
            isExpandable={false}
            key="someLeadingColumn-10"
            popoverContext={
              Object {
                "cellLocation": Object {
                  "colIndex": 0,
                  "rowIndex": 0,
                },
                "closeCellPopover": [Function],
                "openCellPopover": [Function],
                "popoverIsOpen": false,
                "setCellPopoverProps": [Function],
                "setPopoverAnchor": [Function],
                "setPopoverContent": [Function],
              }
            }
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

    it('renders trailing control columns as null/empty by default', () => {
      const component = shallow(
        <EuiDataGridFooterRow
          {...requiredProps}
          columns={[]}
          trailingControlColumns={[
            { id: 'someTrailingColumn', ...requiredColumnProps },
          ]}
        />
      );

      expect(component).toMatchInlineSnapshot(`
        <div
          className="euiDataGridRow euiDataGridFooter"
          data-test-subj="dataGridRow dataGridFooterRow"
          role="row"
        >
          <EuiDataGridCell
            className="euiDataGridFooterCell euiDataGridRowCell--controlColumn"
            colIndex={0}
            columnId="someTrailingColumn"
            interactiveCellId="someId"
            isExpandable={false}
            key="someTrailingColumn-10"
            popoverContext={
              Object {
                "cellLocation": Object {
                  "colIndex": 0,
                  "rowIndex": 0,
                },
                "closeCellPopover": [Function],
                "openCellPopover": [Function],
                "popoverIsOpen": false,
                "setCellPopoverProps": [Function],
                "setPopoverAnchor": [Function],
                "setPopoverContent": [Function],
              }
            }
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

    it('renders control column `footerCellRender`s and `footerCellProps` if passed', () => {
      const { container, getByTestSubject } = render(
        <EuiDataGridFooterRow
          {...requiredProps}
          columns={[]}
          leadingControlColumns={[
            {
              id: 'someLeadingColumn',
              ...requiredColumnProps,
              footerCellRender: () => (
                <div data-test-subj="customLeadingControlFooterCell" />
              ),
              footerCellProps: { className: 'leading' },
            },
          ]}
          trailingControlColumns={[
            {
              id: 'someTrailingColumn',
              ...requiredColumnProps,
              footerCellRender: () => (
                <div data-test-subj="customTrailingControlFooterCell" />
              ),
              footerCellProps: { className: 'trailing' },
            },
          ]}
        />
      );

      expect(
        container.querySelector('.euiDataGridFooterCell.leading')
      ).toBeInTheDocument();
      expect(
        getByTestSubject('customLeadingControlFooterCell')
      ).toBeInTheDocument();

      expect(
        container.querySelector('.euiDataGridFooterCell.trailing')
      ).toBeInTheDocument();
      expect(
        getByTestSubject('customTrailingControlFooterCell')
      ).toBeInTheDocument();
    });
  });

  it('renders striped styling if the footer row is odd', () => {
    const component = shallow(
      <EuiDataGridFooterRow {...requiredProps} visibleRowIndex={15} />
    );
    expect(component.hasClass('euiDataGridRow--striped')).toBe(true);
  });
});
