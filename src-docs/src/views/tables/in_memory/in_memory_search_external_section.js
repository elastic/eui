import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_search_external';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_search_external');
const html = renderToHtml(Table);

export const searchExternalSection = {
  title: 'In-memory table with search and external state',
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
        The example shows how to configure <strong>EuiInMemoryTable</strong>{' '}
        when both external and internal search/filter states are in use.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
