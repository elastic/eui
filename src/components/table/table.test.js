import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTable } from './table';
import { EuiTableRow } from './table_row';
import { EuiTableRowCell } from './table_row_cell';
import { EuiTableBody } from './table_body';
import { EuiTableHeader } from './table_header';
import { EuiTableHeaderCell } from './table_header_cell';

test('renders EuiTable', () => {
  const component = (
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
  expect(render(component)).toMatchSnapshot();
});
