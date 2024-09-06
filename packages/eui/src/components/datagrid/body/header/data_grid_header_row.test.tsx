/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

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
    gridStyles: { header: 'shade' as const },
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridHeaderRow {...requiredProps} />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGridHeader emotion-euiDataGridHeader-shade"
        data-test-subj="dataGridHeader"
        role="row"
      />
    `);
  });

  it('renders columns', () => {
    const { container } = render(
      <EuiDataGridHeaderRow
        {...requiredProps}
        columns={[{ id: 'someColumn' }]}
        schema={{ someColumn: { columnType: 'string' } }}
        columnWidths={{ someColumn: 30 }}
        defaultColumnWidth={20}
      />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGridHeader emotion-euiDataGridHeader-shade"
        data-test-subj="dataGridHeader"
        role="row"
      >
        <div
          aria-describedby="euiDataGridCellHeader_generated-id_sorting"
          class="euiDataGridHeaderCell euiDataGridHeaderCell--string euiDataGridHeaderCell--hasColumnActions"
          data-gridcell-column-id="someColumn"
          data-gridcell-column-index="0"
          data-gridcell-row-index="-1"
          data-gridcell-visible-row-index="-1"
          data-test-subj="dataGridHeaderCell-someColumn"
          role="columnheader"
          style="width: 30px;"
          tabindex="-1"
        >
          <div
            class="euiDataGridColumnResizer"
            data-test-subj="dataGridColumnResizer"
            style="margin-right: 0px;"
          />
          <div
            class="euiDataGridHeaderCell__content"
            title="someColumn"
          >
            someColumn
          </div>
          <div
            class="euiPopover emotion-euiPopover-block-EuiDataGridHeaderCell"
          >
            <button
              aria-label="Press the Enter key to view this column's actions"
              class="euiDataGridHeaderCell__button css-wvewty"
              data-euigrid-tab-managed="true"
              data-test-subj="dataGridHeaderCellActionButton-someColumn"
              tabindex="-1"
            >
              <div
                class="euiDataGridHeaderCell__icon"
              >
                <span
                  color="text"
                  data-euiicon-type="boxesVertical"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    `);
  });

  it('renders leading control columns', () => {
    const { container } = render(
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
      />
    );

    expect(
      container.querySelector('.euiDataGridHeaderCell--controlColumn')
    ).toBeInTheDocument();
  });

  it('renders trailing control columns', () => {
    const { container } = render(
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
      />
    );

    expect(
      container.querySelector('.euiDataGridHeaderCell--controlColumn')
    ).toBeInTheDocument();
  });
});
