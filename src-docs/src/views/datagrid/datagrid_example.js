import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid } from '../../../../src/components';

import DataGrid from './datagrid';
const dataGridSource = require('!!raw-loader!./datagrid');
const dataGridHtml = renderToHtml(DataGrid);

import InMemoryDataGrid from './in_memory';
const inMemorydataGridSource = require('!!raw-loader!./in_memory');
const inMemoryDataGridHtml = renderToHtml(InMemoryDataGrid);

export const DataGridExample = {
  title: 'Data Grid',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridHtml,
        },
      ],
      text: <p>EuiDataGrid</p>,
      components: { EuiDataGrid },
      demo: <DataGrid />,
      props: { EuiDataGrid },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inMemorydataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inMemoryDataGridHtml,
        },
      ],
      title: 'In Memory',
      text: <p>In memory description</p>,
      components: { InMemoryDataGrid },
      demo: <InMemoryDataGrid />,
    },
  ],
};
