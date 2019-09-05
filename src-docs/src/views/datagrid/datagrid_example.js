import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCode } from '../../../../src/components';

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
  title: 'Data grid',
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
      title: 'DataGrid',
      text: <p>By default the data grid will grow into the container.</p>,
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
      title: 'Data grid adapts to its container',
      text: (
        <p>
          When wrapped inside a container, like a dashboard panel, the grid will
          start hiding controls and adopt a more strict flex layout
        </p>
      ),
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
      title: 'Customize data grid styling',
      text: (
        <p>
          Styling can be passed down to the grid through the{' '}
          <EuiCode>gridStyle</EuiCode> prop. It accepts an object shape that
          allows for customization. When the density controls are also present,
          both font size and padding will merge against the initial defaults
          provided by the prop.
        </p>
      ),
      components: { DataGridStyling },
      demo: <DataGridStyling />,
      props: { EuiDataGrid },
    },
  ],
};
