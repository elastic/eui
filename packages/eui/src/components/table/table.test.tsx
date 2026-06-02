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
import { EUI_TABLE_CSS_CONTAINER_NAME } from './const';

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
  });

  describe('responsive/mobile context', () => {
    it('renders responsive styles if below the default m breakpoint', () => {
      window.innerWidth = 767;
      const { getByRole } = render(<EuiTable />);

      expect(getByRole('table').className).toContain('-mobile');
    });

    it('allows customizing responsiveBreakpoint', () => {
      const { getByRole } = render(<EuiTable responsiveBreakpoint="xl" />);

      expect(getByRole('table').className).toContain('-mobile');
    });

    it('allows customizing responsiveBreakpoint via EuiProvider.componentDefaults', () => {
      const { getByRole } = render(
        <EuiProvider
          componentDefaults={{
            EuiTable: { responsiveBreakpoint: 'xl' },
          }}
        >
          <EuiTable />
        </EuiProvider>,
        { wrapper: undefined }
      );

      expect(getByRole('table').className).toContain('-mobile');
    });
  });

  // Should be in sync with the same test suite
  // in src/components/basic_table/basic_table.test.tsx
  // and src/components/basic_table/in_memory_table.test.tsx
  // to ensure equal behavior
  describe('scrollableInline', () => {
    it('updates table width styles when enabled', () => {
      const { getByRole, rerender } = render(<EuiTable />);
      let table = getByRole('table');

      expect(table).toHaveStyleRule('inline-size', '100%');
      expect(table).not.toHaveStyleRule('min-inline-size');

      rerender(<EuiTable scrollableInline />);
      table = getByRole('table');

      expect(table).toHaveStyleRule('inline-size', 'auto');
      expect(table).toHaveStyleRule('min-inline-size', '100%');
    });
  });

  it('always renders responsive tables styles if set to `true`', () => {
    window.innerWidth = 2000;
    const { getByRole } = render(<EuiTable responsiveBreakpoint={true} />);

    expect(getByRole('table').className).toContain('-mobile');
  });

  it('never renders responsive tables if set to `false`', () => {
    window.innerWidth = 320;
    const { getByRole } = render(<EuiTable responsiveBreakpoint={false} />);

    expect(getByRole('table').className).toContain('-desktop');
  });

  it('has CSS container properties set', () => {
    const { getByRole } = render(<EuiTable />);

    // container styles are always applied on the wrapper element of the table
    const element = getByRole('table').parentElement;

    expect(element).toHaveStyleRule(
      'container-name',
      EUI_TABLE_CSS_CONTAINER_NAME
    );
    expect(element).toHaveStyleRule('container-type', 'scroll-state');
  });
});
