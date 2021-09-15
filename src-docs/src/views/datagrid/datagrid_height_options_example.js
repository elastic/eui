import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';
import {
  EuiDataGrid,
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import { EuiDataGridRowHeightsOptions } from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

import DataGridRowHeightOptions from './row_height_options';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_options');
import DataGridRowAutoHeight from './row_auto_height';
const dataGridRowAutoHeightSource = require('!!raw-loader!./row_auto_height');

const rowHeightsSnippet = `rowHeightsOptions = {
  defaultHeight: {
    lineCount: 2, // default every row to 2 lines of text. Also we can provide height in pixels
  },
  rowHeights: {
    1: {
      lineCount: 5, // for row which have index 1 we allow to show 5 lines after that we truncate
    },
    4: 140, // for row which have index 4 we set 140 pixel
    5: 80,
  },
}`;

const rowHeightsFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: {
      lineCount: 2, // default every row to 2 lines of text. Also we can provide height in pixels
    },
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with fixed height for rows"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  height={400}
  renderCellValue={RenderCellValue}
  inMemory={{ level: 'sorting' }}
  sorting={{ columns: sortingColumns, onSort }}
  rowHeightsOptions={rowHeightsOptions}
  pagination={{
    ...pagination,
    pageSizeOptions: [50, 250, 1000],
    onChangeItemsPerPage: onChangeItemsPerPage,
    onChangePage: onChangePage,
  }}
/>
`;

const autoRowHeightsSnippet = `rowHeightsOptions = {
  defaultHeight: 'auto', // each row auto fit to content except rows which was defined in 'rowHeights'
  rowHeights: {
    1: {
      lineCount: 5, // for row which have index 1 we allow to show 5 lines after that we truncate
    },
    4: 140, // for row which have index 4 we set 140 pixel
  },
}
`;

const autoRowHeightsFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: 'auto'
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with auto height for rows"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  height={400}
  renderCellValue={RenderCellValue}
  inMemory={{ level: 'sorting' }}
  sorting={{ columns: sortingColumns, onSort }}
  rowHeightsOptions={rowHeightsOptions}
  pagination={{
    ...pagination,
    pageSizeOptions: [50, 250, 1000],
    onChangeItemsPerPage: onChangeItemsPerPage,
    onChangePage: onChangePage,
  }}
/>
`;

export const DataGridRowHeightOptionsExample = {
  title: 'Data grid row heights options',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          By default, the rows get a fixed height of <strong>34 pixels</strong>,
          but there are scenarios where you might want to expand the height to
          fit more content. To do that, you can pass an object to the{' '}
          <EuiCode>rowHeightsOptions</EuiCode> prop. This object accepts two
          properties:
        </p>
        <ul>
          <li>
            <EuiCode>defaultHeight</EuiCode> - defines the default size for all
            rows
          </li>
          <li>
            <EuiCode>rowHeights</EuiCode> - overrides the height for a specific
            row
          </li>
        </ul>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut color="warning" title="Rows have minimum height requirements">
        <p>
          Rows must be at least <strong>34 pixels</strong> tall so they can
          render at least one line of text. If you provide a smaller height the
          row will default to <strong>34 pixels</strong>.
        </p>
      </EuiCallOut>
      <EuiSpacer />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowHeightOptionsSource,
        },
      ],
      title: 'Fixed heights for rows',
      text: (
        <Fragment>
          <p>
            You can change the default height to any size bigger than that by
            specifying the line count or the height in pixels for all rows or
            just for a specific row.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {rowHeightsSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridRowHeightOptions },
      props: {
        EuiDataGrid,
        EuiDataGridRowHeightsOptions,
      },
      demo: <DataGridRowHeightOptions />,
      snippet: rowHeightsFullSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowAutoHeightSource,
        },
      ],
      title: 'Auto heights for rows',
      text: (
        <Fragment>
          <p>
            You can change the default height for all rows by setting{' '}
            <EuiCode>defaultHeight=&quot;auto&quot;</EuiCode>. This will ensure
            the rows will auto expand to fit the content. You can also override
            the height of a specific row by passing an object to the{' '}
            <EuiCode>rowHeights</EuiCode> property with the index number and{' '}
            <EuiCode>&quot;auto&quot;</EuiCode>.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {autoRowHeightsSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridRowAutoHeight },
      props: {
        EuiDataGrid,
        EuiDataGridRowHeightsOptions,
      },
      demo: <DataGridRowAutoHeight />,
      snippet: autoRowHeightsFullSnippet,
    },
  ],
};
