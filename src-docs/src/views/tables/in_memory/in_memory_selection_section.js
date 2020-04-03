import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_selection';
const source = require('!!raw-loader!./in_memory_selection');
const html = renderToHtml(Table);

export const selectionSection = {
  title: 'In-memory table selection',
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
      The following example shows how to use <strong>EuiInMemoryTable</strong>{' '}
      along with item selection. It also shows how you can display messages,
      errors and show loading indication.
    </p>
  ),
  demo: <Table />,
};
