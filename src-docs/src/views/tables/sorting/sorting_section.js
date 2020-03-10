import React from 'react';
import { EuiBasicTable, EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './sorting';
const source = require('!!raw-loader!./sorting');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding sorting to a BasicTable',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    },
    {
      type: GuideSectionTypes.HTML,
      code: html,
    },
  ],
  text: (
    <p>
      The following example shows how to configure column sorting via the{' '}
      <EuiCode>sorting</EuiCode>
      property and flagging the sortable columns as{' '}
      <EuiCode>sortable: true</EuiCode>. To enable the default sorting ability
      for <strong>every</strong> column, pass{' '}
      <EuiCode>enableAllColumns: true</EuiCode> to the{' '}
      <EuiCode>sorting</EuiCode>
      prop.
    </p>
  ),
  components: { EuiBasicTable },
  demo: <Table />,
};
