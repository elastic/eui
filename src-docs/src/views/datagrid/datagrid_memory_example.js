import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCallOut } from '../../../../src/components';

import InMemoryDataGrid from './in_memory';
const inMemoryDataGridSource = require('!!raw-loader!./in_memory');
const inMemoryDataGridHtml = renderToHtml(InMemoryDataGrid);

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

export const DataGridMemoryExample = {
  title: 'Data grid in-memory settings',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inMemoryDataGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: inMemoryDataGridHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The grid has levels of <strong>in-memory</strong> settings that can
            be set. The higher levels open up more features, but require you to
            utilize callbacks for sorting and pagination as those features are
            enabled. The following settings are available. When possible, it is
            advisable to utilize in-memory as deeply as possible to provide a
            better core experience for the user.
          </p>
          <ul>
            <li>
              <strong>undefined</strong>: when not in use the grid will not
              autodetect schemas. Unless you manually provide schemas, sorting
              will also be heavily limited and likely inaccurate.
            </li>
            <li>
              <strong>enhancements</strong>: provides no in-memory operations.
              If set the grid will try to autodetect schemas only based on the
              content currently available (usually a single page of pagination)
            </li>
            <li>
              <strong>pagination</strong>: Enhancements are provided as above,
              but only pagination is performed in memory.
            </li>
            <li>
              <strong>sorting</strong>: Enhancements are provided as above, and
              pagination and sorting are both performed in memory.
            </li>
          </ul>
          <EuiCallOut size="s" title="Check how the schemas change in the demo">
            When <EuiCode>inMemory</EuiCode> is not set, schemas are not autodetected. Because no
            schemas are defined, the sorting doesn&apos;t really work.
          </EuiCallOut>
        </Fragment>
      ),
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
      components: { InMemoryDataGrid },
      demo: <InMemoryDataGrid />,
    },
  ],
};
