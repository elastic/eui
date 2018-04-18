
import React from 'react';
import {
  EuiCode,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
  EuiTableHeaderMobile,
  EuiTableSortMobile,
  EuiTableSortMobileItem,

} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import Custom from './custom';
const source = require('!!raw-loader!./custom');
const html = renderToHtml(Custom);

export const section = {
  title: 'Build a custom table from individual components',
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
        As an alternative to <EuiCode>EuiBasicTable</EuiCode> you can instead construct a table from
        individual <strong>low level, basic components</strong> like <EuiCode>EuiTableHeader</EuiCode> and <EuiCode>EuiTableRowCell</EuiCode>.
        Below is one of many ways you might set this up on your own.
        Important to note are how you need to set individual props like
        the <EuiCode>truncateText</EuiCode> prop to cells to enforce a single-line behavior
        and truncate their contents, or set the <EuiCode>textOnly</EuiCode> prop
        to <EuiCode>false</EuiCode> if they contain overflowing content like popovers.
      </p>
      <h3>
        Responsive extras
      </h3>
      <p>
        You must supply a <EuiCode>header</EuiCode> prop equivalent to the column header
        on each <EuiCode>EuiTableRowCell</EuiCode> so that the mobile version will use that
        to populate the per cell headers.
      </p>
      <p>
        Also, custom table implementation <strong>will not</strong> auto-populate any header level functions
        like selection and filtering. In order to add mobile support for these functions,
        you will need to implement the <EuiCode>EuiTableHeaderMobile</EuiCode> component
        as a wrapper around these and use <EuiCode>EuiTableSortMobile</EuiCode> and <EuiCode>EuiTableSortMobileItem</EuiCode> components
        to supply mobile sorting. See demo below.
      </p>
    </div>
  ),
  components: { EuiTable },
  props: {
    EuiTable,
    EuiTableBody,
    EuiTableHeader,
    EuiTableHeaderCell,
    EuiTableHeaderCellCheckbox,
    EuiTableRow,
    EuiTableRowCell,
    EuiTableRowCellCheckbox,
    EuiTableHeaderMobile,
    EuiTableSortMobile,
    EuiTableSortMobileItem,
  },
  demo: <Custom/>,
};
