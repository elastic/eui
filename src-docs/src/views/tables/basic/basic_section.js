import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';
import {
  EuiCode
} from '../../../../../src/components';
import { propsInfo } from './props_info';

import { Table } from './basic';

const source = require('!!raw-loader!./basic');
const html = renderToHtml(Table);

export const section = {
  title: 'A simple BasicTable',
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
        <EuiCode>EuiBasicTable</EuiCode> is an opinionated high level component that standarizes both display and injestion.
        At its most simple it only accepts two properties:
      </p>
      <ul>
        <li>
          <EuiCode>items</EuiCode> are an array of objects that should be displayed in the table;
          one item per row. The exact item data that will be rendered in each cell in these rows is determined
          by the <EuiCode>columns</EuiCode> property.
        </li>
        <li>
          <EuiCode>columns</EuiCode> defines what columns the table has and how to extract item data
          to display each cell in each row.
        </li>
      </ul>
      <p>
        This example shows the most basic form of the <EuiCode>EuiBasicTable</EuiCode>.
        It is configured with the required <EuiCode>items</EuiCode> and <EuiCode>columns</EuiCode> properties.
        It shows how each column defines the data it needs to display per item. Some columns display the value
        as is (e.g. <EuiCode>firstName</EuiCode> and <EuiCode>lastName</EuiCode> fields for the user column). Other
        columns customize the display of the data before it is injected. This customization
        can be done in two (non-mutual exclusive) ways:
      </p>
      <ul>
        <li>
          Provide a hint about the type of data (e.g. the &quot;Date of Birth&quot; column indicates that the
          data it shows is of type <EuiCode>date</EuiCode>). Providing data type hints will cause built-in
          display components to be adjusted (e.g. numbers will become right aligned, just like Excel).
        </li>
        <li>
          Provide a <EuiCode>render</EuiCode> function that given the value (and the item as a second argument)
          returns the React node that should be displayed as the content of the cell. This can be as simple as
          formatting values (e.g. the &quot;Date of Birth&quot; column) to utilizing more complex React components
          (e.g. the &quot;Online&quot;, &quot;Github&quot; and &quot;Nationality&quot; columns as seen below).
        </li>
      </ul>
    </div>
  ),
  props: propsInfo,
  demo: <Table/>,
};
