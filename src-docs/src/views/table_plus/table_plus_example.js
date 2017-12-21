import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import TablePlus from './table_plus';
const tablePlusSource = require('!!raw-loader!./table_plus');
const tablePlusHtml = renderToHtml(TablePlus);

export const TablePlusExample = {
  title: 'TablePlus',
  sections: [{
    title: 'TablePlus',
    source: [{
      type: GuideSectionTypes.JS,
      code: tablePlusSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: tablePlusHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiTablePlus</EuiCode> component.
      </p>
    ),
    demo: <TablePlus />,
  }],
};
