/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

import { EuiDataGridFooterRow } from './data_grid_footer_row';

describe('EuiDataGridFooterRow', () => {
  const requiredProps = {
    rowIndex: 10,
    leadingControlColumns: [],
    trailingControlColumns: [],
    columns: [{ id: 'someColumn' }, { id: 'someColumnWithoutSchema' }],
    visibleColCount: 2,
    schema: { someColumn: { columnType: 'string' } },
    columnWidths: { someColumn: 30 },
    renderCellValue: () => <div />,
    interactiveCellId: 'someId',
    gridStyles: { stickyFooter: false, footer: 'striped' as const },
  };

  it('renders columns', () => {
    const { container } = render(<EuiDataGridFooterRow {...requiredProps} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGridFooter emotion-euiDataGridFooter"
        data-test-subj="dataGridRow dataGridFooterRow"
        role="row"
      >
        <div
          aria-rowindex="11"
          class="euiDataGridRowCell euiDataGridRowCell--string euiDataGridFooterCell euiDataGridRowCell--firstColumn emotion-euiDataGridRowCell-euiDataGridFooterCell"
          data-gridcell-column-id="someColumn"
          data-gridcell-column-index="0"
          data-gridcell-row-index="10"
          data-gridcell-visible-row-index="10"
          data-test-subj="dataGridRowCell"
          role="gridcell"
          style="width: 30px;"
          tabindex="-1"
        >
          <div
            class="euiDataGridRowCell__content euiDataGridRowCell__content--defaultHeight eui-textTruncate emotion-euiDataGridRowCell__content-defaultHeight"
            data-datagrid-cellcontent="true"
          >
            <div />
          </div>
          <span
            aria-hidden="true"
            class="euiScreenReaderOnly"
            data-tabular-copy-marker="tab"
          >
            ↦
          </span>
        </div>
        <div
          aria-rowindex="11"
          class="euiDataGridRowCell euiDataGridFooterCell euiDataGridRowCell--lastColumn emotion-euiDataGridRowCell-euiDataGridFooterCell"
          data-gridcell-column-id="someColumnWithoutSchema"
          data-gridcell-column-index="1"
          data-gridcell-row-index="10"
          data-gridcell-visible-row-index="10"
          data-test-subj="dataGridRowCell"
          role="gridcell"
          tabindex="-1"
        >
          <div
            class="euiDataGridRowCell__content euiDataGridRowCell__content--defaultHeight eui-textTruncate emotion-euiDataGridRowCell__content-defaultHeight"
            data-datagrid-cellcontent="true"
          >
            <div />
          </div>
          <span
            aria-hidden="true"
            class="euiScreenReaderOnly"
            data-tabular-copy-marker="newline"
          >
            ↵
          </span>
        </div>
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
      const { container } = render(
        <EuiDataGridFooterRow
          {...requiredProps}
          columns={[]}
          leadingControlColumns={[
            { id: 'someLeadingColumn', ...requiredColumnProps },
          ]}
        />
      );

      expect(
        container.querySelector('.euiDataGridRowCell__content')
      ).toBeEmptyDOMElement();
    });

    it('renders trailing control columns as null/empty by default', () => {
      const { container } = render(
        <EuiDataGridFooterRow
          {...requiredProps}
          columns={[]}
          trailingControlColumns={[
            { id: 'someTrailingColumn', ...requiredColumnProps },
          ]}
        />
      );

      expect(
        container.querySelector('.euiDataGridRowCell__content')
      ).toBeEmptyDOMElement();
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
    const { container } = render(
      <EuiDataGridFooterRow {...requiredProps} visibleRowIndex={15} />
    );
    expect(container.firstElementChild!.className).toContain('striped');
  });
});
