/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

import { DataGridFocusContext } from '../../utils/focus';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';

import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

describe('EuiDataGridHeaderCellWrapper', () => {
  const requiredProps = {
    id: 'someColumn',
    index: 0,
    isLastColumn: true,
    hasColumnActions: true,
    children: (
      <>
        Some Column
        <button>Mock column actions</button>
      </>
    ),
  };

  const renderWithContext = (props = {}, isFocused = true) => {
    (mockFocusContext.onFocusUpdate as jest.Mock).mockImplementation(
      (_, callback) => callback(isFocused) // allows us to mock isFocused state
    );
    return render(
      <DataGridFocusContext.Provider value={mockFocusContext}>
        <EuiDataGridHeaderCellWrapper {...requiredProps} {...props} />
      </DataGridFocusContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const { container } = renderWithContext();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="euiDataGridHeaderCell emotion-euiDataGridHeaderCell"
        data-gridcell-column-id="someColumn"
        data-gridcell-column-index="0"
        data-gridcell-row-index="-1"
        data-gridcell-visible-row-index="-1"
        data-test-subj="dataGridHeaderCell-someColumn"
        role="columnheader"
        tabindex="0"
      >
        Some Column
        <button
          data-euigrid-tab-managed="true"
          tabindex="-1"
        >
          Mock column actions
        </button>
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

  it('renders width, className, and arbitrary props', () => {
    const { getByTestSubject } = renderWithContext({
      width: 30,
      className: 'euiDataGridHeaderCell--test',
      'aria-label': 'test',
      children: 'No column actions',
    });
    expect(getByTestSubject('dataGridHeaderCell-someColumn'))
      .toMatchInlineSnapshot(`
      <div
        class="euiDataGridHeaderCell euiDataGridHeaderCell--test emotion-euiDataGridHeaderCell"
        data-gridcell-column-id="someColumn"
        data-gridcell-column-index="0"
        data-gridcell-row-index="-1"
        data-gridcell-visible-row-index="-1"
        data-test-subj="dataGridHeaderCell-someColumn"
        role="columnheader"
        style="width: 30px;"
        tabindex="0"
      >
        No column actions
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

  it('renders a focus trap if the cell contains interactive children', () => {
    const { container } = renderWithContext({
      children: (
        <>
          Some Column
          <button>Custom interactive child</button>
          <button>Mock column actions</button>
        </>
      ),
    });
    expect(container.querySelectorAll('[data-focus-guard]')).toHaveLength(2);
    expect(container.querySelector('[data-focus-lock-disabled]'))
      .toMatchInlineSnapshot(`
      <div
        data-focus-lock-disabled="disabled"
      >
        Some Column
        <button
          data-euigrid-tab-managed="true"
          tabindex="-1"
        >
          Custom interactive child
        </button>
        <button
          data-euigrid-tab-managed="true"
          tabindex="-1"
        >
          Mock column actions
        </button>
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
    `);
  });

  // Focus behavior tested in `focus_utils.spec.tsx`
});
