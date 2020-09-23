import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_search';
import { propsInfo } from './props_info';
import { Link } from 'react-router-dom';

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
        You can read more about search bar{' '}
        <Link to="/forms/search-bar">
          <strong>here</strong>
        </Link>{' '}.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
