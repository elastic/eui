import React from 'react';
import { EuiCode } from '../../../../../src/components';
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
      errors and show loading indication. You can set items to be selected
      initially by passing an array of items as the{' '}
      <EuiCode>initialSelected</EuiCode> value inside{' '}
      <EuiCode>selection</EuiCode> property. You can also use the{' '}
      <EuiCode>setSelection</EuiCode> method to take complete control over table
      selection. This can be useful if you want to handle selection in table
      based on user interaction with another part of the UI.
    </p>
  ),
  demo: <Table />,
};
