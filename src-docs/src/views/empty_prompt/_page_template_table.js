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
      <EuiTableHeaderCell>
        EuiPageTemplate <EuiCode>template</EuiCode>
      </EuiTableHeaderCell>
      <EuiTableHeaderCell>EuiEmptyPrompt settings</EuiTableHeaderCell>
    </EuiTableHeader>

    <EuiTableBody>
      <EuiTableRow>
        <EuiTableRowCell isMobileFullWidth>
          <EuiCode>{"'centeredContent' | 'default'"}</EuiCode>
        </EuiTableRowCell>

        <EuiTableRowCell>
          Set <EuiCode language="tsx">{'color="plain"'}</EuiCode> and
          <EuiCode language="tsx">{'hasBorder={true}'}</EuiCode>.
        </EuiTableRowCell>
      </EuiTableRow>

      <EuiTableRow>
        <EuiTableRowCell>
          <EuiCode>{"'centeredBody' | 'empty'"}</EuiCode>
        </EuiTableRowCell>

        <EuiTableRowCell>
          Set <EuiCode language="tsx">{'color="plain"'}</EuiCode>.
        </EuiTableRowCell>
      </EuiTableRow>
    </EuiTableBody>
  </EuiTable>
);
