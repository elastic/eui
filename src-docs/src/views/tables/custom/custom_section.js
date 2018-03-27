
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
    <p>
      As an alternative to <EuiCode>EuiBasicTable</EuiCode> you can instead construct a table from
      individual <strong>low level, basic components</strong>
      like <EuiCode>EuiTableHeader</EuiCode> and <EuiCode>EuiTableRowCell</EuiCode>.
      Below is one of many ways you might set this up on your own.
      Important to note are how you need to set individual props like
      the <EuiCode>truncateText</EuiCode> prop to cells to enforce a single-line behavior
      and truncate their contents, or set the <EuiCode>textOnly</EuiCode> prop
      to <EuiCode>false</EuiCode> if they contain overflowing content like popovers.
    </p>
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
  },
  demo: <Custom/>,
};
