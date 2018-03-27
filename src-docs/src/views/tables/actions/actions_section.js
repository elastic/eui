import React from 'react';
import { EuiBasicTable } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './actions';
import { EuiCode } from '../../../../../src/components/code';
const source = require('!!raw-loader!./actions');
const html = renderToHtml(Table);

export const section = {
  title: 'Adding actions to BasicTable',
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
    <div>
      <p>
        The following example demonstrates &quot;actions&quot; columns. These are special columns
        where you define per-row, item level actions. The most basic action you might define is a
        type <EuiCode>button</EuiCode> or <EuiCode>icon</EuiCode> though you can always make your own
        custom actions as well.
      </p>
      <p>
        Actions enforce some strict UI/UX guidelines:
      </p>
      <ul>
        <li>
          There can only be a single action tool visible per row. When more than one action is defined,
          they will collapse under a single popover represented by the gear icon.
        </li>
        <li>
          Actions are only visible when the user hovers over the row with the mouse.
        </li>
      </ul>
    </div>
  ),
  components: { EuiBasicTable },
  demo: <Table/>,
};
