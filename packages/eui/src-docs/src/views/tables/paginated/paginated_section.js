import React from 'react';
import { EuiBasicTable, EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';

import Table from './paginated';
const source = require('!!raw-loader!./paginated');

export const section = {
  title: 'Adding pagination to a table',
  source: [
    {
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <p>
      The following example shows how to configure pagination via the{' '}
      <EuiCode>pagination</EuiCode>
      property.
    </p>
  ),
  components: { EuiBasicTable },
  demo: <Table />,
};
