import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_search_callback';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_search_callback');
const html = renderToHtml(Table);

export const searchCallbackSection = {
  title: 'In-memory table with search callback',
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
    <Fragment>
      <p>
        The example shows how to configure <strong>EuiInMemoryTable</strong> to
        display a search bar and intercept the search value when it changes so
        you can perform your own search logic.
      </p>
    </Fragment>
  ),
  props: propsInfo,
  demo: <Table />,
};
