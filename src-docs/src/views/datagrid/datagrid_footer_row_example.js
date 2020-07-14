import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCodeBlock, EuiCode } from '../../../../src/components';

import DataGridFooterRow from './footer_row';
const dataGridControlColumnsSource = require('!!raw-loader!./footer_row');
const dataGridControlColumnsHtml = renderToHtml(DataGridFooterRow);

import { DataGridControlColumn as EuiDataGridControlColumn } from './props';

export const DataGridFooterRowExample = {
  title: 'Data grid footer row',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlColumnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridControlColumnsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>Footer row</p>
        </Fragment>
      ),
      components: { DataGridFooterRow },

      props: {
        EuiDataGrid,
        EuiDataGridControlColumn,
      },
      demo: <DataGridFooterRow />,
    },
  ],
};
