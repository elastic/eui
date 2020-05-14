import React from 'react';
import { EuiBasicTable, EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './selection';
const source = require('!!raw-loader!./selection');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding selection to a table',
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
      The following example shows how to configure selection via the{' '}
      <EuiCode>selection</EuiCode>
      property. You can set items to be selected initially by passing the array
      to be selected initially to the <EuiCode>initialSelected</EuiCode>{' '}
      property inside <EuiCode>selection</EuiCode> property. You can also use
      the <EuiCode>setSelection</EuiCode> property to take complete control over
      table selection. This can be useful if you want to handle selection in
      table based on user interaction with another part of the UI.
    </p>
  ),
  components: { EuiBasicTable },
  demo: <Table />,
};
