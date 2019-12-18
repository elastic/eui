import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';
import { EuiCode } from '../../../../../src/components';

import { Table } from './auto';

const source = require('!!raw-loader!./auto');
const html = renderToHtml(Table);

export const section = {
  title: 'A BasicTable with auto layout',
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
    <div>
      <p>
        <EuiCode>EuiBasicTable</EuiCode> has a fixed layout by default. You can
        change it to auto using the <EuiCode>tableLayout</EuiCode>.
      </p>
    </div>
  ),
  demo: <Table />,
};
