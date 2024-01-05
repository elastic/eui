/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';

import { DataGridFocusContext } from '../../utils/focus';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';

import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

describe('EuiDataGridHeaderCellWrapper', () => {
  const requiredProps = {
    id: 'someColumn',
    index: 0,
    hasActionsPopover: true,
    children: <button />,
  };

  const mountWithContext = (props = {}, isFocused = true) => {
    (mockFocusContext.onFocusUpdate as jest.Mock).mockImplementation(
      (_, callback) => callback(isFocused) // allows us to mock isFocused state
    );
    return mount(
      <DataGridFocusContext.Provider value={mockFocusContext}>
        <EuiDataGridHeaderCellWrapper {...requiredProps} {...props} />
      </DataGridFocusContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    const component = mountWithContext();
    expect(component).toMatchInlineSnapshot(`
      <EuiDataGridHeaderCellWrapper
        hasActionsPopover={true}
        id="someColumn"
        index={0}
      >
        <div
          className="euiDataGridHeaderCell"
          data-gridcell-column-id="someColumn"
          data-gridcell-column-index={0}
          data-gridcell-row-index="-1"
          data-gridcell-visible-row-index="-1"
          data-test-subj="dataGridHeaderCell-someColumn"
          onFocus={[Function]}
          role="columnheader"
          style={Object {}}
          tabIndex={0}
        >
          <HandleInteractiveChildren
            cellEl={
              <div
                class="euiDataGridHeaderCell"
                data-gridcell-column-id="someColumn"
                data-gridcell-column-index="0"
                data-gridcell-row-index="-1"
                data-gridcell-visible-row-index="-1"
                data-test-subj="dataGridHeaderCell-someColumn"
                role="columnheader"
                tabindex="0"
              >
                <button
                  data-euigrid-tab-managed="true"
                  tabindex="-1"
                />
              </div>
            }
            renderFocusTrap={false}
            updateCellFocusContext={[Function]}
          >
            <button />
          </HandleInteractiveChildren>
        </div>
      </EuiDataGridHeaderCellWrapper>
    `);
  });

  it('renders width, className, and arbitrary props', () => {
    const component = mountWithContext({
      width: 30,
      className: 'euiDataGridHeaderCell--test',
      'aria-label': 'test',
    });
    expect(component.find('[data-test-subj="dataGridHeaderCell-someColumn"]'))
      .toMatchInlineSnapshot(`
      <div
        aria-label="test"
        className="euiDataGridHeaderCell euiDataGridHeaderCell--test"
        data-gridcell-column-id="someColumn"
        data-gridcell-column-index={0}
        data-gridcell-row-index="-1"
        data-gridcell-visible-row-index="-1"
        data-test-subj="dataGridHeaderCell-someColumn"
        onFocus={[Function]}
        role="columnheader"
        style={
          Object {
            "width": "30px",
          }
        }
        tabIndex={0}
      >
        <HandleInteractiveChildren
          cellEl={
            <div
              aria-label="test"
              class="euiDataGridHeaderCell euiDataGridHeaderCell--test"
              data-gridcell-column-id="someColumn"
              data-gridcell-column-index="0"
              data-gridcell-row-index="-1"
              data-gridcell-visible-row-index="-1"
              data-test-subj="dataGridHeaderCell-someColumn"
              role="columnheader"
              style="width: 30px;"
              tabindex="0"
            >
              <button
                data-euigrid-tab-managed="true"
                tabindex="-1"
              />
            </div>
          }
          renderFocusTrap={false}
          updateCellFocusContext={[Function]}
        >
          <button />
        </HandleInteractiveChildren>
      </div>
    `);
  });

  // Focus behavior tested in `focus_utils.spec.tsx`
});
