import React from 'react';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCode } from '../../../../src/components';

import DataGridSchema from './schema';
const dataGridSchemaSource = require('!!raw-loader!./schema');

import {
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridSchemaDetector,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

export const DataGridSchemaExample = {
  title: 'Data grid schemas',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
      ],
      text: (
        <>
          <p>
            Schemas are data types you pass to grid columns to affect how the
            columns and expansion popovers render. Schemas also allow you to
            define individual sorting comparators so that sorts can do more than
            just A-Z comparisons. By default, <strong>EuiDataGrid</strong> ships
            with a few built-in schemas for{' '}
            <EuiCode>numeric, currency, datetime, boolean and json</EuiCode>{' '}
            data. When the <EuiCode>inMemory</EuiCode> prop is in use it will
            automatically try to figure out the best schema based on the{' '}
            <EuiCode language="js">{'inMemory:{{ level: value }}'}</EuiCode> you
            set, but this will come with the caveat that you will need to
            provide and manage sorting outside the component. In general we
            recommend passing schema information to your columns instead of
            using auto-detection when you have that knowledge of your data
            available during ingestion.
          </p>
          <h2>Defining custom schemas</h2>
          <p>
            Custom schemas are passed as an array to{' '}
            <EuiCode>schemaDetectors</EuiCode> and are constructed against the{' '}
            <strong>EuiDataGridSchemaDetector</strong> interface. You can see an
            example of a simple custom schema used on the last column below. In
            addition to schemas being useful to map against for cell and
            expansion rendering, any schema will also add a
            <EuiCode language="js">
              {'className="euiDataGridRowCell--schemaName"'}
            </EuiCode>{' '}
            to each matching cell.
          </p>
        </>
      ),
      components: { DataGridSchema },
      props: {
        EuiDataGridSchemaDetector,
        EuiDataGrid,
        EuiDataGridInMemory,
        EuiDataGridColumn,
        EuiDataGridColumnActions,
        EuiDataGridSorting,
      },
      demo: <DataGridSchema />,
    },
  ],
};
