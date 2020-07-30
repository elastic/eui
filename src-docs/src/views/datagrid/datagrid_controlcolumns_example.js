import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCodeBlock, EuiCode } from '../../../../src/components';

import DataGridControlColumns from './control_columns';
const dataGridControlColumnsSource = require('!!raw-loader!./control_columns');
const dataGridControlColumnsHtml = renderToHtml(DataGridControlColumns);

import { DataGridControlColumn as EuiDataGridControlColumn } from './props';

const gridSnippet = `<EuiDataGrid
  {...usualProps}
  leadingControlColumns={[
    {
      id: 'selection',
      width: 31,
      headerCellRender: () => <span>Select a Row</span>,
      rowCellRender: () => <div><EuiSelectBox ... /></div>,
    },
  ]}
  trailingControlColumns={[
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => null,
      rowCellRender: MyGridActionsComponent,
    },
  ]}
/>
`;

export const DataGridControlColumnsExample = {
  title: 'Data grid control columns',
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
            Control columns can be used to include ancillary cells not based on
            the dataset, such as row selection checkboxes or action buttons.
            These columns can be placed at either side of the data grid, and
            users are unable to resize, sort, or rearrange them.
          </p>
          <p>
            These custom columns are defined by passing an array of
            EuiDataGridControlColumn objects (see <em>Props</em> tab below) to{' '}
            <EuiCode>leadingControlColumns</EuiCode> and/or{' '}
            <EuiCode>trailingControlColumns</EuiCode>.
          </p>
          <p>
            As with the data grid&apos;s <EuiCode>renderCellValue</EuiCode>, the
            control columns&apos; <EuiCode>headerCellRender</EuiCode> and{' '}
            <EuiCode>rowCellRender</EuiCode> props are treated as React
            components.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridControlColumns },

      props: {
        EuiDataGrid,
        EuiDataGridControlColumn,
      },
      demo: <DataGridControlColumns />,
    },
  ],
};
