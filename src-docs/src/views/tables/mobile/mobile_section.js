import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './mobile';
import { propsInfo } from './props_info';
import { EuiTextColor } from '../../../../../src/components/text';
import { EuiCode, EuiCodeBlock } from '../../../../../src/components/code';
const source = require('!!raw-loader!./mobile');
const html = renderToHtml(Table);

const exampleItem = `{
  field: 'firstName',
  name: 'First Name',
  truncateText: true,
  mobileOptions: {
    render: (item) => (<span>{item.firstName} {item.lastName}</span>), // Custom renderer for mobile view only
    header: false,   // Won't show inline header in mobile view
    fullWidth: true, // Forces 100% width of the cell
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
        cases, you may set <EuiCode>responsive = false</EuiCode>.
      </p>
      <h4>
        To make your table work responsively, please make sure you add the
        following <EuiTextColor color="danger">additional</EuiTextColor> props
        to the top level table component (<EuiCode>EuiBasicTable</EuiCode> or{' '}
        <EuiCode>EuiInMemoryTable</EuiCode>):
      </h4>
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
      <h4>
        The <EuiCode>mobileOptions</EuiCode> object can be passed to the{' '}
        <EuiCode>EuiTableRowCell</EuiCode> directly or with each column item
        provided to <EuiCode>EuiBasicTable</EuiCode>.
      </h4>
      <EuiCodeBlock lang="javascript">{exampleItem}</EuiCodeBlock>
      <h4>Note:</h4>
      <p>
        You can also change basic table row cell props like{' '}
        <EuiCode>truncateText</EuiCode> and <EuiCode>textOnly</EuiCode> for
        mobile layouts, though you must also be passing a mobile specific render
        function.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
