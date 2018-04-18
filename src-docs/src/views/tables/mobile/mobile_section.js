import React from 'react';
import { EuiBasicTable } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './mobile';
import { EuiCode } from '../../../../../src/components/code';
const source = require('!!raw-loader!./mobile');
const html = renderToHtml(Table);

export const section = {
  title: 'Responsive tables',
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
        Allowing a table to be responsive means breaking each row down into it&apos;s own section and
        individually displaying each table header above the cell contents. There are few times when
        you may want to exclude this behavior from your table, for instance, when the table has very
        few columns or the table does not break down easily into this format. For these use cases, you
        may set <EuiCode>responsive = false</EuiCode>.
      </p>
      <h3>
        Properties that must be added at the table:
      </h3>
      <ul>
        <li>
          <EuiCode>isSelectable</EuiCode>: if the table has a single column of checkboxes for selecting rows
        </li>
        <li>
          <EuiCode>hasActions</EuiCode>: if the table has a column for actions which may/may not be hidden in hover
        </li>
      </ul>
      <h3>
        Custom mobile headers
      </h3>
      <p>
        Add the following properties to your data and/or <EuiCode>&lt;EuiTableRowCell&gt;</EuiCode> to
        customize the look of the section header.
      </p>
      <ul>
        <li>
          <EuiCode>isMobileHeader</EuiCode>: does not display data-header attribute and
          enlarges the text and displays it full width only on mobile screens
        </li>
        <li>
          <EuiCode>hideforMobile</EuiCode>: does not display the cell on mobile screens
        </li>
      </ul>
      <h3>Other props:</h3>
      <ul>
        <li>
          <EuiCode>isMobileFullWidth</EuiCode>: add to <EuiCode>&lt;EuiTableRowCell&gt;</EuiCode> if it should
          take up the full width on mobile screens
        </li>
      </ul>
    </div>
  ),
  components: { EuiBasicTable },
  demo: <Table/>,
};
