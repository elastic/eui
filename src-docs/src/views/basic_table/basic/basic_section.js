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
  title: 'Basic',
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
        The following user table example shows the most basic form of the <EuiCode>EuiBasicTable</EuiCode>.
        It is configured with the required <EuiCode>items</EuiCode> and <EuiCode>columns</EuiCode> properties.
        It shows how each column defines the data it needs to display per item. Some simply display the value
        as is (e.g. <EuiCode>firstName</EuiCode> and <EuiCode>lastName</EuiCode> fields of the user). Other
        columns customize the way the extracted data is displayed. This can be done in two (non-mutual exclusive)
        ways:
      </p>
      <ul>
        <li>
          Provide a hit about the type of data (e.g. the &quot;Date of Birth&quot; column indicates that the
          data it shows is of type <EuiCode>date</EuiCode>). Providing data type hints will cause built-in
          defaults to be adjusted (e.g. numbers will by defaults be right aligned).
        </li>
        <li>
          Provide a <EuiCode>render</EuiCode> function that given the value (and the item as a second argument)
          returns the react node that should be displayed as the content of the cell. This can be as simple as
          formatting values (e.g. &quot;Date of Birth&quot; column) to returning a more complex react components
          (e.g. the &quot;Online&quot;, &quot;Github&quot; and &quot;Nationality&quot; columns).
        </li>
      </ul>
    </div>
  ),
  props: propsInfo,
  demo: <Table/>,
};
