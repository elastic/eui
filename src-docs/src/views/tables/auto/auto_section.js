import React from 'react';
import { GuideSectionTypes } from '../../../components';
import { renderToHtml } from '../../../services';
import { EuiCode } from '../../../../../src/components';

import { Table } from './auto';

const source = require('!!raw-loader!./auto');
const html = renderToHtml(Table);

export const section = {
  title: 'A BasicTable with auto layout',
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
        <EuiCode>EuiBasicTable</EuiCode> has a fixed layout by default. You can
        change it to <EuiCode>auto</EuiCode> using the{' '}
        <EuiCode>tableLayout</EuiCode> prop. Note that setting{' '}
        <EuiCode>tableLayout</EuiCode> to <EuiCode>auto</EuiCode> prevents the{' '}
        <EuiCode>truncateText</EuiCode> prop from working properly. If you want
        to set different columns widths while still being able to use{' '}
        <EuiCode>truncateText</EuiCode>, set the width of each column using the{' '}
        <EuiCode>width</EuiCode> prop.
      </p>
    </div>
  ),
  demo: <Table />,
};
