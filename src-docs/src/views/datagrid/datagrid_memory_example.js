import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCallOut, EuiCode } from '../../../../src/components';

import InMemoryDataGrid from './in_memory';
const inMemoryDataGridSource = require('!!raw-loader!./in_memory');
const inMemoryDataGridHtml = renderToHtml(InMemoryDataGrid);

import {
  DataGridColumn,
  DataGridPagination,
  DataGridSorting,
  DataGridInMemory,
  DataGridStyle,
  DataGridCellValueElement,
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
            enabled. The following values are available. When possible, it is
            advisable to utilize in-memory as deeply as possible to provide a
            better and more consistent core experience for the user.
          </p>
          <ul>
            <li>
              <strong>undefined</strong>: When not in use the grid will not
              autodetect schemas. Sorting and pagination are the responsibility
              of the consuming application.
            </li>
            <li>
              <strong>enhancements</strong>: Provides no in-memory operations.
              If set, the grid will try to autodetect schemas only based on the
              content currently available (the current page of data).
            </li>
            <li>
              <strong>pagination</strong>: Schema detection works as above and
              pagination is performed in-memory. The pagination callbacks are
              still triggered on user interactions, but the row updates are
              performed by the grid.
            </li>
            <li>
              <strong>sorting</strong>: Schema detection and pagination are
              performed as above, and sorting is applied in-memory too. The
              onSort callback is still called and the application must own the
              column sort state, but data sorting is done by the grid based on
              the defined and/or detected schemas.
            </li>
          </ul>
          <p>
            When enabled, <strong>in-memory</strong> renders cell data
            off-screen and uses those values to detect schemas and perform
            sorting. This detaches the user experience from the raw data; the
            data grid never has access to the backing data, only what is
            returned by <EuiCode>renderCellValue</EuiCode>.
          </p>
          <EuiCallOut title="Check how the schemas change in the demo">
            When <EuiCode>inMemory</EuiCode> is not set, many of the
            examples&apos; sorting does not work because they don&apos;t have a
            backend service to call, instead naively applying JavaScript&apos;s
            default array sort which doesn&apos;t work well with numeric data
            and doesn&apos;t sort React elements such as the links.
          </EuiCallOut>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridInMemory: DataGridInMemory,
        EuiDataGridColumn: DataGridColumn,
        EuiDataGridColumnVisibility: DataGridColumnVisibility,
        EuiDataGridPagination: DataGridPagination,
        EuiDataGridSorting: DataGridSorting,
        EuiDataGridCellValueElement: DataGridCellValueElement,
        EuiDataGridSchemaDetector: DataGridSchemaDetector,
        EuiDataGridStyle: DataGridStyle,
        EuiDataGridToolbarDisplayOptions: DataGridToolbarDisplayOptions,
      },
      components: { InMemoryDataGrid },
      demo: <InMemoryDataGrid />,
    },
  ],
};
