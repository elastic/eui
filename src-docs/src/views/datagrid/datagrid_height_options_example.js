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

import DataGridRowLineHeight from './row_line_height';
const dataGridRowLineHeightSource = require('!!raw-loader!./row_height_auto');
import DataGridRowHeightOptions from './row_height_fixed';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_fixed');
import DataGridRowAutoHeight from './row_height_auto';
const dataGridRowAutoHeightSource = require('!!raw-loader!./row_height_auto');

const lineHeightSnippet = `rowHeightsOptions = {
  defaultHeight: {
    lineCount: 3 // default every row to 3 lines of text
  },
  lineHeight: '2em', // default every cell line-height to 2em
}`;

const lineHeightFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: {
      lineCount: 3,
    },
    lineHeight: '2em';
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with line height set"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  height={400}
  renderCellValue={renderCellValue}
  rowHeightsOptions={rowHeightsOptions}
/>
`;

const rowHeightsSnippet = `rowHeightsOptions = {
  defaultHeight: 140, // default every row to 140px
  rowHeights: {
    1: {
      lineCount: 5, // row at index 1 will show 5 lines
    },
    4: 200, // row at index 4 will adjust the height to 200px
    5: 80,
  },
}`;

const rowHeightsFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: 140,
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
          <EuiCode>rowHeightsOptions</EuiCode> prop. This object accepts three
          properties:
        </p>
        <ul>
          <li>
            <EuiCode>defaultHeight</EuiCode>
            <ul>
              <li>Defines the default size for all rows</li>
              <li>
                Can be configured with an exact pixel height, a line count, or{' '}
                <EuiCode>&quot;auto&quot;</EuiCode> to fit all content
              </li>
            </ul>
          </li>
          <li>
            <EuiCode>rowHeights</EuiCode>
            <ul>
              <li>Overrides the height for a specific row</li>
              <li>
                Can be configured with an exact pixel height, a line count, or{' '}
                <EuiCode>&quot;auto&quot;</EuiCode> to fit all content
              </li>
            </ul>
          </li>
          <li>
            <EuiCode>lineHeight</EuiCode>
            <ul>
              <li>
                Sets a default line height for all cells, which is used to
                calculate row height
              </li>
              <li>
                Accepts any value that the <EuiCode>line-height</EuiCode> CSS
                property normally takes (e.g. px, ems, rems, or unitless)
              </li>
            </ul>
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
          code: dataGridRowLineHeightSource,
        },
      ],
      title: 'Setting a default height and line height for rows',
      text: (
        <Fragment>
          <p>
            You can change the default height for all rows by passing a line
            count or pixel value to the <EuiCode>defaultHeight</EuiCode>{' '}
            property, and customize the line height of all cells with the{' '}
            <EuiCode>lineHeight</EuiCode> property.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {lineHeightSnippet}
          </EuiCodeBlock>
          <EuiCallOut
            color="warning"
            title="Make sure your line heights match!"
          >
            <p>
              If you wrap your cell content with CSS that overrides/sets
              line-height (e.g. in an <EuiCode>EuiText</EuiCode>), your row
              heights will not be calculated correctly! Make sure to match or
              inherit the passed <EuiCode>lineHeight</EuiCode> property to the
              actual cell content line height.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      components: { DataGridRowLineHeight },
      props: {
        EuiDataGrid,
        EuiDataGridRowHeightsOptions,
      },
      demo: <DataGridRowLineHeight />,
      snippet: lineHeightFullSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowHeightOptionsSource,
        },
      ],
      title: 'Overriding specific row heights',
      text: (
        <Fragment>
          <p>
            You can override the default height of a specific row by passing a
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
