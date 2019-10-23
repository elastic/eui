import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCode } from '../../../../src/components';

import DataGridSchema from './schema';
const dataGridSchemaSource = require('!!raw-loader!./schema');
const dataGridSchemaHtml = renderToHtml(DataGridSchema);

import {
  DataGridColumn,
  DataGridPagination,
  DataGridSorting,
  DataGridInMemory,
  DataGridStyle,
  DataGridCellValueElement,
  DataGridSchemaDetector,
  DataGridToolbarVisibilityOptions,
  DataGridColumnVisibility,
} from './props';

export const DataGridSchemaExample = {
  title: 'Data grid schemas and popovers',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridSchemaHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Schemas are data types you pass to grid columns to affect how the
            columns and expansion popovers render. Schemas also allow you to
            define individual sorting comparators so that sorts can do more than
            just A-Z comparisons. By default, <EuiCode>EuiDataGrid</EuiCode>{' '}
            ships with a few built-in schemas for{' '}
            <EuiCode>numeric, currency, datetime, boolean and json</EuiCode>{' '}
            data. When the <EuiCode>inMemory</EuiCode> prop is in use it will
            automatically try to figure out the best schema based on the{' '}
            <EuiCode>{'inMemory: {{ level: value }}'}</EuiCode> you set, but
            this will come with the caveat that you will need to provide and
            manage sorting outside the component. In general we recommend
            passing schema information to your columns instead of using
            auto-detection when you have that knowledge of your data available
            during ingestion.
          </p>
          <h4>Defining custom schemas</h4>
          <p>
            Custom schemas are passed as an array to{' '}
            <EuiCode>schemaDetectors</EuiCode> and are constructed against the{' '}
            <EuiCode>EuiDataGridSchemaDetector</EuiCode> interface. You can see
            an example of a simple custom schema used on the last column below.
            In addition to schemas being useful to map against for cell and
            expansion rendering, any schema will also add a
            <EuiCode>
              className=&quot;euiDataGridRowCell--schemaName&quot;
            </EuiCode>{' '}
            to each matching cell.
          </p>
          <h4>Defining expansio</h4>
          <p>
            Likewise, you can inject custom content into any of the popovers a
            cell expands into. Add <EuiCode>popoverContents</EuiCode> functions
            to populate a matching schema&apos;s popover using a new component.
            You can see an example of this by clicking into one of the cells in
            the last column below.
          </p>
          <h4>Disabling expansion popovers</h4>
          <p>
            Often the popovers are unnecessary for short form content. In the
            example below we&apos;ve turned them off by setting{' '}
            <EuiCode>isExpandable=false</EuiCode> on the boolean column.
          </p>
        </Fragment>
      ),
      components: { DataGridSchema },
      props: {
        EuiDataGrid,
        EuiDataGridColumn: DataGridColumn,
        EuiDataGridColumnVisibility: DataGridColumnVisibility,
        EuiDataGridInMemory: DataGridInMemory,
        EuiDataGridPagination: DataGridPagination,
        EuiDataGridSorting: DataGridSorting,
        EuiDataGridCellValueElement: DataGridCellValueElement,
        EuiDataGridSchemaDetector: DataGridSchemaDetector,
        EuiDataGridStyle: DataGridStyle,
        EuiDataGridToolbarVisibilityOptions: DataGridToolbarVisibilityOptions,
      },
      demo: <DataGridSchema />,
    },
  ],
};
