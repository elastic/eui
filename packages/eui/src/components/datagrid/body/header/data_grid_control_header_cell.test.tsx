/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';

describe('EuiDataGridControlHeaderCell', () => {
  const props = {
    index: 0,
    isLastColumn: true,
    controlColumn: {
      id: 'someControlColumn',
      headerCellRender: () => <button data-euigrid-tab-managed="true" />,
      rowCellRender: () => <div />,
      width: 50,
    },
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridControlHeaderCell {...props} />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        aria-describedby="generated-id_focusTrapHint"
        class="euiDataGridHeaderCell euiDataGridHeaderCell--controlColumn emotion-euiDataGridHeaderCell"
        data-gridcell-column-id="someControlColumn"
        data-gridcell-column-index="0"
        data-gridcell-row-index="-1"
        data-gridcell-visible-row-index="-1"
        data-test-subj="dataGridHeaderCell-someControlColumn"
        role="columnheader"
        style="width: 50px;"
        tabindex="-1"
      >
        <div
          data-focus-guard="true"
          style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
          tabindex="-1"
        />
        <div
          data-focus-lock-disabled="disabled"
        >
          <button
            data-euigrid-tab-managed="true"
            tabindex="-1"
          />
          <p
            hidden=""
            id="generated-id_focusTrapHint"
          >
            Press the Enter key to interact with this cell's contents.
          </p>
          <div
            aria-atomic="true"
            aria-live="polite"
            class="emotion-euiScreenReaderOnly"
            role="status"
          />
        </div>
        <div
          data-focus-guard="true"
          style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
          tabindex="-1"
        />
        <span
          aria-hidden="true"
          class="euiScreenReaderOnly"
          data-tabular-copy-marker="newline"
        >
          ↵
        </span>
      </div>
    `);
  });
});
