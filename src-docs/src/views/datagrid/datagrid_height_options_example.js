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

import DataGridRowHeightOptions from './row_height_fixed';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_fixed');
import DataGridRowAutoHeight from './row_height_auto';
const dataGridRowAutoHeightSource = require('!!raw-loader!./row_height_auto');

const rowHeightsSnippet = `rowHeightsOptions = {
  defaultHeight: 140, // default every row to 140px
  rowHeights: {
    1: {
      lineCount: 5, // for row which have index 1 we allow to show 5 lines after that we truncate
    },
    4: 200, // for row which have index 4 we set 140 pixel
    5: 80,
  },
}`;

const rowHeightsFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: {
      lineCount: 2,
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with fixed height for rows"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  height={400}
  renderCellValue={renderCellValue}
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

const autoRowHeightsSnippet = `// the demo below matches this snippet
rowHeightsOptions = {
  defaultHeight: 'auto', // all rows will automatically adjust the height except rows defined in 'rowHeights'
  rowHeights: {
    1: {
      lineCount: 5, // row at index 1 will show 5 lines
    },
    4: 140, // row at index 4 will adjust the height to 140px
  },
}

// you can also automatically adjust the height for a specific row
rowHeightsOptions = {
  rowHeights: {
    1: 'auto', // row at index 1 will automatically adjust the height
    4: 140, // row at index 4 will adjust the height to 140px
  }
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
  renderCellValue={renderCellValue}
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
          By default, all rows get a height of <strong>34 pixels</strong>, but
          there are scenarios where you might want to adjust the height to fit
          more content. To do that, you can pass an object to the{' '}
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
        <p>
          Each of these can be configured with an exact pixel height, a line
          count, or <EuiCode>&quot;auto&quot;</EuiCode> to fit all of the
          content. See the examples below for more details.
        </p>
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
            You can change the default height for all rows by passing a line
            count or pixel value to the <EuiCode>defaultHeight</EuiCode>{' '}
            property.
          </p>
          <p>
            You can also override the height of a specific row by passing a
            <EuiCode>rowHeights</EuiCode> object associating the row&apos;s
            index with a specific height configuration.
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
            To enable automatically fitting rows to their content you can set{' '}
            <EuiCode>defaultHeight=&quot;auto&quot;</EuiCode>. This ensures
            every row automatically adjusts its height to fit the contents.
          </p>
          <p>
            You can also override the height of a specific row by passing a
            <EuiCode>rowHeights</EuiCode> object associating the row&apos;s
            index with an <EuiCode>&quot;auto&quot;</EuiCode> value.
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
