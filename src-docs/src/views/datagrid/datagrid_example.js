import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid } from '../../../../src/components';

import DataGrid from './datagrid';
const dataGridSource = require('!!raw-loader!./datagrid');
const dataGridHtml = renderToHtml(DataGrid);

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
const dataGridContainerHtml = renderToHtml(DataGridContainer);

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');
const dataGridStylingHtml = renderToHtml(DataGridStyling);

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
      title: 'DataGrid container',
      text: <p>Inside a small container</p>,
      components: { DataGrid },
      demo: <DataGrid />,
      props: { EuiDataGrid },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridContainerHtml,
        },
      ],
      title: 'DataGrid container',
      text: <p>Inside a small container</p>,
      components: { DataGridContainer },
      demo: <DataGridContainer />,
      props: { EuiDataGrid },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridStylingHtml,
        },
      ],
      title: 'DataGrid',
      text: <p>EuiDataGrid</p>,
      components: { DataGridStyling },
      demo: <DataGridStyling />,
      props: { EuiDataGrid },
    },
  ],
};
