import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCodeBlock, EuiCode } from '../../../../src/components';

import DataGridFooterRow from './footer_row';
const dataGridControlColumnsSource = require('!!raw-loader!./footer_row');
const dataGridControlColumnsHtml = renderToHtml(DataGridFooterRow);

import {
  DataGridControlColumn as EuiDataGridControlColumn,
  DataGridCellValueElement as EuiDataGridCellValueElementProps,
} from './props';

const gridSnippet = `<EuiDataGrid
  {...usualProps}
  renderFooterCellValue={({ columnId }) =>
    columns.find(col => col.id === columnId).footerCellValue || null
  }
/>
`;

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
          <p>
            A footer row can be used to include value aggregations to the grid.
            Values could be based on the dataset, such as sum/average/min/max of
            numeric values in a column, or any other necessary data.
          </p>
          <p>
            The footer row is defined by passing{' '}
            <EuiCode>renderFooterCellValue</EuiCode> function prop into
            EuiDataGrid. <EuiCode>renderFooterCellValue</EuiCode> acts like a
            React component, receiving{' '}
            <EuiCode>EuiDataGridCellValueElementProps</EuiCode> and returning a
            React node.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridFooterRow },

      props: {
        EuiDataGrid,
        EuiDataGridControlColumn,
        EuiDataGridCellValueElementProps,
      },
      demo: <DataGridFooterRow />,
    },
  ],
};
