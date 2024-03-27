import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../../components';

import Table from './mobile';
import { EuiTextColor } from '../../../../../src/components/text';
import { EuiCode, EuiCodeBlock } from '../../../../../src/components/code';
const source = require('!!raw-loader!./mobile');
import { EuiTableRowCellMobileOptionsShape } from '../props/props';

/* eslint-disable local/css-logical-properties */
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
      type: GuideSectionTypes.TSX,
      code: source,
    },
  ],
  text: (
    <>
      <p>
        Tables will be mobile-responsive by default, breaking down each row into
        its own card section and individually displaying each table header above
        the cell contents. The default breakpoint at which the table will
        responsively shift into cards is the{' '}
        <Link to="/theming/breakpoints/values">
          <EuiCode>m</EuiCode> window size
        </Link>
        , which can be customized with the{' '}
        <EuiCode>responsiveBreakpoint</EuiCode> prop (e.g.,{' '}
        <EuiCode language="js">{'responsiveBreakpoint="s"'}</EuiCode>).
      </p>
      <p>
        To never render your table responsively (e.g. for tables with very few
        columns), you may set{' '}
        <EuiCode language="js">{'responsiveBreakpoint={false}'}</EuiCode>.
        Inversely, if you always want your table to render in a mobile-friendly
        manner, pass <EuiCode>true</EuiCode>.
      </p>
      <p>
        {/* TODO: This shouldn't be true by the end of the Emotion conversion */}
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
    </>
  ),
  props: { EuiTableRowCellMobileOptionsShape },
  demo: <Table />,
};
