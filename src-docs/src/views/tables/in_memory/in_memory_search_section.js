import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_search';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_search');
const html = renderToHtml(Table);

export const searchSection = {
  title: 'In-memory table with search',
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
        The example shows how to configure <strong>EuiInMemoryTable</strong> to
        display a search bar.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
