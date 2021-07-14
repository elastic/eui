import React from 'react';
import { EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { EuiTableSortingType } from '!!prop-loader!../../../../../src/components/basic_table/table_types';

import { Table } from './sorting';
const source = require('!!raw-loader!./sorting');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding sorting to a table',
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
      <EuiCode>sorting</EuiCode> property and flagging the sortable columns as{' '}
      <EuiCode language="js">sortable: true</EuiCode>. To enable the default
      sorting ability for <strong>every</strong> column, pass{' '}
      <EuiCode language="js">enableAllColumns: true</EuiCode> to the{' '}
      <EuiCode>sorting</EuiCode> prop. If you don&apos;t want the user to have
      control over the sort you can pass{' '}
      <EuiCode language="js">readOnly: true</EuiCode> to the{' '}
      <EuiCode>sorting</EuiCode> prop or per column.
    </p>
  ),
  props: { EuiTableSortingType },
  demo: <Table />,
};
