import React from 'react';
import {
  EuiBasicTable,
  EuiCode
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './expanding_rows';
const source = require('!!raw-loader!./expanding_rows');
const html = renderToHtml(Table);

export const section = {
  title: 'Expanding rows',
  source: [
    {
      type: GuideSectionTypes.JS,
      code: source,
    }, {
      type: GuideSectionTypes.HTML,
      code: html,
    }
  ],
  text: (
    <p>
      You can expand rows by passing in a <EuiCode>itemIdToExpandedRowMap</EuiCode> prop
      which will contain the content you want rendered inside the expanded row.
    </p>
  ),
  components: { EuiBasicTable },
  demo: <Table/>,
};
