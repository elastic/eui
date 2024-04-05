import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../../components';

import { EuiCode } from '../../../../../src/components/code';

import Table from './mobile';
const source = require('!!raw-loader!./mobile');
import { EuiTableRowCellMobileOptionsShape } from '../props/props';

/* eslint-disable local/css-logical-properties */
const exampleColumnSnippet = `{
  field: 'firstName',
  name: 'First Name',
  truncateText: true,
  mobileOptions: {
    render: (item) => (<>{item.firstName} {item.lastName}</>), // Custom renderer for mobile view only
    header: false, // Won't show inline header in mobile view
    width: '100%', // Applies a specific width
    enlarge: true, // Increase text size compared to rest of cells
    truncateText: false, // Text will wrap instead of truncating to one line
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
        manner, pass <EuiCode>true</EuiCode>. The below example table switches
        between <EuiCode>true/false</EuiCode> for quick/easy preview between
        mobile and desktop table UIs at all breakpoints.
      </p>
      <p>
        To customize your cell's appearance/rendering in mobile vs. desktop
        view, use the <EuiCode>mobileOptions</EuiCode> configuration. This
        object can be passed to each column item in{' '}
        <strong>EuiBasicTable</strong> or to <strong>EuiTableRowCell</strong>{' '}
        directly. See the "Snippet" tab in the below example, or the "Props" tab
        for a full list of configuration options.
      </p>
    </>
  ),
  props: { EuiTableRowCellMobileOptionsShape },
  snippet: exampleColumnSnippet,
  demo: <Table />,
};
