import React from 'react';
import { EuiBasicTable } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './actions';
import { EuiCode } from '../../../../../src/components/code';
const source = require('!!raw-loader!./actions');
const html = renderToHtml(Table);

export const section = {
  title: 'Actions',
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
        The following example demonstrates &quot;actions&quot; columns. This is a special column
        where you can define item level actions on. The most basic action you can define is a button
        (maybe be of type <EuiCode>`button`</EuiCode> or <EuiCode>`icon`</EuiCode>) and it is also
        possible to define a custom action.
      </p>
      <p>
        The implementation enforces some of the UI/UX guidelines:
      </p>
      <ul>
        <li>
          There can only be a single action tool visible per row. When more than one action is defined,
          they will all be collapsed under a single popover &quot;gear&quot; button.
        </li>
        <li>
          The actions are only visible when the user hovers over the row with the mouse.
        </li>
      </ul>
    </div>
  ),
  components: { EuiBasicTable },
  demo: <Table/>,
};
