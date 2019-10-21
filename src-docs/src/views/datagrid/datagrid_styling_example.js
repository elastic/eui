import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCode } from '../../../../src/components';

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
const dataGridContainerHtml = renderToHtml(DataGridContainer);

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');
const dataGridStylingHtml = renderToHtml(DataGridStyling);

import {
  DataGridColumn,
  DataGridPagination,
  DataGridSorting,
  DataGridInMemory,
  DataGridStyle,
  CellValueElement,
  DataGridSchemaDetector,
  DataGridToolbarDisplayOptions,
  DataGridColumnVisibility,
} from './props';

export const DataGridStylingExample = {
  title: 'Data grid styling',
  sections: [
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
      text: (
        <Fragment>
          <p>
            Styling can be passed down to the grid through the{' '}
            <EuiCode>gridStyle</EuiCode> prop. It accepts an object shape that
            allows for customization. When the density controls are also
            present, both font size and padding will merge against the initial
            defaults provided by the prop.
          </p>
          <p>
            Likewise the <EuiCode>toolbarDisplay</EuiCode> prop controls whether
            or not to show buttons on the toolbar to display above the grid. It
            accepts a boolean or shape object. The boolean allows turning off
            the toolbar entirely, while the shape allows you to turn off
            individual buttons as you need.
          </p>
        </Fragment>
      ),
      components: { DataGridStyling },

      props: {
        EuiDataGrid,
        DataGridColumn,
        DataGridPagination,
        DataGridSorting,
        DataGridInMemory,
        DataGridStyle,
        CellValueElement,
        DataGridSchemaDetector,
        DataGridToolbarDisplayOptions,
        DataGridColumnVisibility,
      },
      demo: <DataGridStyling />,
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

      props: {
        EuiDataGrid,
        DataGridColumn,
        DataGridPagination,
        DataGridSorting,
        DataGridInMemory,
        DataGridStyle,
        CellValueElement,
        DataGridSchemaDetector,
        DataGridToolbarDisplayOptions,
        DataGridColumnVisibility,
      },
      demo: <DataGridContainer />,
    },
  ],
};
