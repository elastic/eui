import React from 'react';
import { EuiBasicTable, EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';

import Table from './selection';
const source = require('!!raw-loader!./selection');

export const section = {
  title: 'Adding selection to a table',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <p>
      The following example shows how to configure selection via the{' '}
      <EuiCode>selection</EuiCode>
      property. You can set items to be selected initially by passing an array
      of items as the <EuiCode>initialSelected</EuiCode> value inside{' '}
      <EuiCode>selection</EuiCode> property. You can also use the{' '}
      <EuiCode>setSelection</EuiCode> method to take complete control over table
      selection. This can be useful if you want to handle selection in table
      based on user interaction with another part of the UI.
    </p>
  ),
  components: { EuiBasicTable },
  demo: <Table />,
};
