import React from 'react';
import {
  EuiCode
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_toolbar';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_toolbar');
const html = renderToHtml(Table);

export const toolbarSection = {
  title: 'In-Memory Table - With Toolbar (+ SearchBar and selection actions)',
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
        The example shows how to configure <EuiCode>EuiInMemoryTable</EuiCode> to display a toolbar
        at the top of the table. Here the toolbar is configured with a search bar and an action to
        only be available when selection is on.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table/>
};
