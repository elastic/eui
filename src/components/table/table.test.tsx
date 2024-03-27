/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';
import { EuiProvider } from '../provider';

import { EuiTable } from './table';
import { EuiTableRow } from './table_row';
import { EuiTableRowCell } from './table_row_cell';
import { EuiTableBody } from './table_body';
import { EuiTableHeader } from './table_header';
import { EuiTableHeaderCell } from './table_header_cell';

describe('EuiTable', () => {
  it('renders', () => {
    const { container } = render(
      <EuiTable {...requiredProps}>
        <EuiTableHeader>
          <EuiTableHeaderCell>Hi Title</EuiTableHeaderCell>
          <EuiTableHeaderCell>Bye Title</EuiTableHeaderCell>
        </EuiTableHeader>
        <EuiTableBody>
          <EuiTableRow>
            <EuiTableRowCell>Hi</EuiTableRowCell>
          </EuiTableRow>
          <EuiTableRow>
            <EuiTableRowCell>Bye</EuiTableRowCell>
          </EuiTableRow>
        </EuiTableBody>
      </EuiTable>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).not.toHaveClass('euiTable--responsive');
  });

  describe('responsive/mobile context', () => {
    it('renders responsive styles if below the default m breakpoint', () => {
      window.innerWidth = 767;
      const { container } = render(<EuiTable />);
      expect(container.firstChild).toHaveClass('euiTable--responsive');
    });

    it('allows customizing responsiveBreakpoint', () => {
      const { container } = render(<EuiTable responsiveBreakpoint="xl" />);

      expect(container.firstChild).toHaveClass('euiTable--responsive');
    });

    it('allows customizing responsiveBreakpoint via EuiProvider.componentDefaults', () => {
      const { container } = render(
        <EuiProvider
          componentDefaults={{
            EuiTable: { responsiveBreakpoint: 'xl' },
          }}
        >
          <EuiTable />
        </EuiProvider>,
        { wrapper: undefined }
      );

      expect(container.firstChild).toHaveClass('euiTable--responsive');
    });
  });

  it('always renders responsive tables styles if set to `true`', () => {
    window.innerWidth = 2000;
    const { container } = render(<EuiTable responsiveBreakpoint={true} />);

    expect(container.firstChild).toHaveClass('euiTable--responsive');
  });

  it('allows never rendering responsive tables if set to `false`', () => {
    window.innerWidth = 320;
    const { container } = render(<EuiTable responsiveBreakpoint={false} />);

    expect(container.firstChild).not.toHaveClass('euiTable--responsive');
  });
});
