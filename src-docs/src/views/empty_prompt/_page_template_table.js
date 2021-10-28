import React from 'react';
import {
  EuiCode,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
} from '../../../../src/components';

export default () => (
  <EuiTable>
    <EuiTableHeader>
      <EuiTableHeaderCell>Page template</EuiTableHeaderCell>
      <EuiTableHeaderCell>Empty prompt usage</EuiTableHeaderCell>
    </EuiTableHeader>

    <EuiTableBody>
      <EuiTableRow>
        <EuiTableRowCell isMobileFullWidth>
          <EuiCode>{'["centeredContent", "default"]'}</EuiCode>
        </EuiTableRowCell>

        <EuiTableRowCell>
          Set the color to <EuiCode>{'"plain"'}</EuiCode> and the{' '}
          <EuiCode>hasBorder</EuiCode> prop to <EuiCode>true</EuiCode>.
        </EuiTableRowCell>
      </EuiTableRow>

      <EuiTableRow>
        <EuiTableRowCell>
          <EuiCode>{'["centeredBody", "empty"]'}</EuiCode>
        </EuiTableRowCell>

        <EuiTableRowCell>
          Set the color to <EuiCode>{'"plain"'}</EuiCode>.
        </EuiTableRowCell>
      </EuiTableRow>
    </EuiTableBody>
  </EuiTable>
);
