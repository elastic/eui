import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { EuiCode } from '../../../../../src/components';

import Table from './auto';

const source = require('!!raw-loader!./auto');
const layoutSnippet = [
  `<EuiBasicTable
  columns={[
    { field: 'column1', name: 'Column 1' },
    { field: 'column2', name: 'Column 2' }
  ]}
  tableLayout="auto"
/>
`,
  `<EuiBasicTable
    columns={[
      { field: 'column1', name: 'Column 1', truncateText: true, width: '20%' },
      { field: 'column2', name: 'Column 2' }
    ]}
/>`,
  `<EuiBasicTable
    columns={[
      { field: 'column1', name: 'Column 1', valign: 'top' },
      { field: 'column2', name: 'Column 2' }
    ]}
/>`,
];

export const section = {
  title: 'Table layout',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <>
      <p>
        <strong>EuiBasicTable</strong> has a fixed layout by default. You can
        change it to <EuiCode>auto</EuiCode> using the{' '}
        <EuiCode>tableLayout</EuiCode> prop. Note that setting{' '}
        <EuiCode>tableLayout</EuiCode> to <EuiCode>auto</EuiCode> prevents the{' '}
        <EuiCode>truncateText</EuiCode> prop from working properly. If you want
        to set different columns widths while still being able to use{' '}
        <EuiCode>truncateText</EuiCode>, set the width of each column using the{' '}
        <EuiCode>width</EuiCode> prop.
      </p>
      <p>
        You can also set the vertical alignment (<EuiCode>valign</EuiCode>) at
        the column level which will affect the cell contents for that entire
        column excluding the header and footer.
      </p>
    </>
  ),
  snippet: layoutSnippet,
  demo: <Table />,
};
