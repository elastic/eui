import React, { Fragment } from 'react';
import {
  EuiCode
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_search_callback';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_search_callback');
const html = renderToHtml(Table);

export const searchCallbackSection = {
  title: 'In-Memory Table - With Search Callback',
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
    <Fragment>
      <p>
        The example shows how to configure <EuiCode>EuiInMemoryTable</EuiCode> to display a search bar
        and intercept the search value when it changes so you can perform your own search logic.
      </p>

      <p>
        Note that when the search has returned results, you&rsquo;ll need to call the <EuiCode>onQueryComplete</EuiCode>
        callback that&rsquo;s provided to the <EuiCode>search.onChange</EuiCode> prop.
      </p>
    </Fragment>
  ),
  props: propsInfo,
  demo: <Table/>
};
