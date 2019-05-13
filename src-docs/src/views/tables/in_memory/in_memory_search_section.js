import React from 'react';
import { EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_search';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_search');
const html = renderToHtml(Table);

export const searchSection = {
  title: 'In-Memory Table - With Search',
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
        The example shows how to configure <EuiCode>EuiInMemoryTable</EuiCode>{' '}
        to display a search bar
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
