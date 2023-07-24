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

import { EuiTable } from './table';
import { EuiTableRow } from './table_row';
import { EuiTableRowCell } from './table_row_cell';
import { EuiTableBody } from './table_body';
import { EuiTableHeader } from './table_header';
import { EuiTableHeaderCell } from './table_header_cell';

test('renders EuiTable', () => {
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
