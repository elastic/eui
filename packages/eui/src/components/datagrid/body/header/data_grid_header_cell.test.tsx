/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../../test/rtl';

import { EuiDataGridHeaderCell } from './data_grid_header_cell';

describe('EuiDataGridHeaderCell', () => {
  const requiredProps = {
    column: {
      id: 'someColumn',
    },
    index: 0,
    isLastColumn: true,
    columns: [],
    columnWidths: {},
    defaultColumnWidth: 50,
    schema: { someColumn: { columnType: 'numeric' } },
    schemaDetectors: [],
    setColumnWidth: jest.fn(),
    setVisibleColumns: jest.fn(),
    switchColumnPos: jest.fn(),
    gridStyles: { header: 'shade' as const },
  };

  it('renders', () => {
    const { container } = render(<EuiDataGridHeaderCell {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not render a popover if there are no column actions', () => {
    const { container } = render(
      <EuiDataGridHeaderCell
        {...requiredProps}
        column={{ id: 'test', actions: false }}
      />
    );
    expect(container.querySelector('.euiPopover')).not.toBeInTheDocument();
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

  it('emits a copy newline from the last data column even when it is not the last visible column', () => {
    const { container } = render(
      <EuiDataGridHeaderCell
        {...requiredProps}
        isLastColumn={false}
        columns={[{ id: 'someColumn' }]}
      />
    );

    expect(
      container.querySelector('[data-tabular-copy-marker="newline"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-tabular-copy-marker="tab"]')
    ).not.toBeInTheDocument();
  });
});
