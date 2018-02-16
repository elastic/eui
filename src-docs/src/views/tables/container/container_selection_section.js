import React from 'react';
import {
  EuiCode
} from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './container_selection';
const source = require('!!raw-loader!./container_selection');
const html = renderToHtml(Table);

export const selectionSection = {
  title: 'Container - Selection',
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
      The following example shows how to use <EuiCode>EuiBasicTableContainer</EuiCode> along with item selection.
      It also shows how you can request the table to refresh its data by keeping a reference to the container.
    </p>
  ),
  demo: <Table/>,
};
