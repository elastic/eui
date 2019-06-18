import React from 'react';
import { EuiBasicTable, EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './selection';
const source = require('!!raw-loader!./selection');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding selection to a BasicTable',
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
      <EuiCode>selection</EuiCode> property.
      <br />
      It is important to provide a <EuiCode>getAriaLabel</EuiCode> modifier
      function for accessibility.
      If no modifier function is provided, the default aria-label value is{' '}
      <EuiCode>Select this row</EuiCode>.
    </p>
  ),
  components: { EuiBasicTable },
  demo: <Table />,
};
