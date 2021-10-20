import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './mobile';
import { EuiTextColor } from '../../../../../src/components/text';
import { EuiCode, EuiCodeBlock } from '../../../../../src/components/code';
const source = require('!!raw-loader!./mobile');
const html = renderToHtml(Table);
import { EuiTableRowCellMobileOptionsShape } from '../props/props';

const exampleItem = `{
  field: 'firstName',
  name: 'First Name',
  truncateText: true,
  mobileOptions: {
    render: (item) => (<span>{item.firstName} {item.lastName}</span>), // Custom renderer for mobile view only
    header: false,   // Won't show inline header in mobile view
    width: '100%', // Applies a specific width
    enlarge: true,   // Increase text size compared to rest of cells
    truncateText: false, // Only works if a 'render()' is also provided
  }
}`;

export const section = {
  title: 'Responsive tables',
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
        Allowing a table to be responsive means breaking each row down into its
        own section and individually displaying each table header above the cell
        contents. There are few times when you may want to exclude this behavior
        from your table, for instance, when the table has very few columns or
        the table does not break down easily into this format. For these use
        cases, you may set <EuiCode language="js">responsive=false</EuiCode>.
      </p>
      <p>
        To make your table work responsively, please make sure you add the
        following <EuiTextColor color="danger">additional</EuiTextColor> props
        to the top level table component (<strong>EuiBasicTable</strong> or{' '}
        <strong>EuiInMemoryTable</strong>):
      </p>
      <ul>
        <li>
          <EuiCode>isSelectable</EuiCode>: if the table has a single column of
          checkboxes for selecting rows
        </li>
        <li>
          <EuiCode>isExpandable</EuiCode>: if the table has rows that can expand
        </li>
        <li>
          <EuiCode>hasActions</EuiCode>: if the table has a column for actions
          which may/may not be hidden in hover
        </li>
      </ul>
      <p>
        The <EuiCode>mobileOptions</EuiCode> object can be passed to the{' '}
        <strong>EuiTableRowCell</strong> directly or with each column item
        provided to <strong>EuiBasicTable</strong>.
      </p>
      <EuiCodeBlock language="js">{exampleItem}</EuiCodeBlock>
      <p>
        <strong>Note:</strong> You can also change basic table row cell props
        like <EuiCode>truncateText</EuiCode> and <EuiCode>textOnly</EuiCode> for
        mobile layouts, though you must also be passing a mobile specific render
        function.
      </p>
    </div>
  ),
  props: { EuiTableRowCellMobileOptionsShape },
  demo: <Table />,
};
