import React from 'react';
import { EuiCode } from '../../../../../src/components';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';

import { Table } from './in_memory_custom_sorting';
import { propsInfo } from './props_info';

const source = require('!!raw-loader!./in_memory_custom_sorting');
const html = renderToHtml(Table);

export const customSortingSection = {
  title: 'In-Memory Table - Custom sort values',
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
        Sometimes the value displayed in a column is not appropriate to use for
        sorting, such as pre-formatting values to be human-readable. In these
        cases it&apos;s possible to pass the <EuiCode>sortable</EuiCode> prop as
        a function instead of <EuiCode>true</EuiCode> or{' '}
        <EuiCode>false</EuiCode>. The function is used to extract or calculate
        the intended sort value for each <EuiCode>item</EuiCode>.
      </p>
    </div>
  ),
  props: propsInfo,
  demo: <Table />,
};
