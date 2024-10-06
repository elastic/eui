/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import {
  render,
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../../../test/rtl';

import { DataGridFocusContext } from '../../utils/focus';
import { mockFocusContext } from '../../utils/__mocks__/focus_context';

import { EuiDataGridHeaderCell } from './data_grid_header_cell';

describe('EuiDataGridHeaderCell', () => {
  const requiredProps = {
    column: {
      id: 'someColumn',
    },
    index: 0,
    columns: [],
    columnWidths: {},
    defaultColumnWidth: 50,
    schema: { someColumn: { columnType: 'numeric' } },
    schemaDetectors: [],
    setColumnWidth: jest.fn(),
    visibleColCount: 1,
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
    gridStyles: { header: 'shade' as const },
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridHeaderCell {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('resizing', () => {
    it('renders a resizer', () => {
      const { getByTestSubject } = render(
        <EuiDataGridHeaderCell {...requiredProps} />
      );
      expect(getByTestSubject('dataGridColumnResizer')).toBeInTheDocument();
    });

    it('does not render a resizer if isResizable is false', () => {
      const { queryByTestSubject } = render(
        <EuiDataGridHeaderCell
          {...requiredProps}
          column={{ id: 'test', isResizable: false }}
        />
      );
      expect(
        queryByTestSubject('dataGridColumnResizer')
      ).not.toBeInTheDocument();
    });

    it('does not render a resizer if a column width cannot be found', () => {
      const { queryByTestSubject } = render(
        <EuiDataGridHeaderCell
          {...requiredProps}
          columnWidths={{}}
          defaultColumnWidth={undefined}
        />
      );
      expect(
        queryByTestSubject('dataGridColumnResizer')
      ).not.toBeInTheDocument();
    });
  });

  describe('popover', () => {
    it('does not render a popover if there are no column actions', () => {
      const { container } = render(
        <EuiDataGridHeaderCell
          {...requiredProps}
          column={{ id: 'test', actions: false }}
        />
      );
      expect(container.querySelector('.euiPopover')).not.toBeInTheDocument();
    });

    it('handles popover open and close', () => {
      const { container } = render(
        <DataGridFocusContext.Provider value={mockFocusContext}>
          <EuiDataGridHeaderCell {...requiredProps} />
        </DataGridFocusContext.Provider>
      );
      const toggle = container.querySelector('.euiDataGridHeaderCell__button')!;

      fireEvent.click(toggle);
      waitForEuiPopoverOpen();

      fireEvent.click(toggle);
      waitForEuiPopoverClose();
    });
  });
});
