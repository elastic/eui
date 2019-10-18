import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiDescriptionList,
  EuiCodeBlock,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import DataGrid from './datagrid';
const dataGridSource = require('!!raw-loader!./datagrid');
const dataGridHtml = renderToHtml(DataGrid);

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
const dataGridContainerHtml = renderToHtml(DataGridContainer);

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');
const dataGridStylingHtml = renderToHtml(DataGridStyling);

import DataGridSchema from './schema';
const dataGridSchemaSource = require('!!raw-loader!./schema');
const dataGridSchemaHtml = renderToHtml(DataGridSchema);

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
} from './props';

const gridSnippet = `
  <EuiDataGrid
    columns={[{ id: 'A' }, { id: 'B' }]}
    columnVisibility={{
      visibleColumns: ['A', 'B'],
      setVisibleColumns: () => {},
    }}
    rowCount={3}
    renderCellValue={({ rowIndex, columnId }) =>
     \`\${rowIndex}, \${columnId}\`
    }
    sorting={{
      columns: [{ id: 'B', direction: 'asc' }],
      onSort: () => {},
    }}
    gridStyle={{
      border: 'all',
      fontSize: 'm',
      cellPadding: 'm',
      stripes: true,
      rowHover: 'highlight',
      header: 'shade',
    }}
    toolbarDisplay={{ showColumnSelector: false }}
  />
`;

const gridConcepts = [
  {
    title: 'columns',
    description: (
      <span>
        An array of <strong>DataGridColumn</strong> objects. Lists the columns
        available and the schema and settings tied to it.
      </span>
    ),
  },
  {
    title: 'inMemory',
    description: (
      <span>
        An optional (<strong>but very important</strong>) prop that provides
        levels of sorting, schema and pagination enhancements if you render more
        and more of your grid in memory.
      </span>
    ),
  },
  {
    title: 'columnVisibility',
    description:
      'Defines the initial visibile columns. You provide the intial state and update method.',
  },
  {
    title: 'Sorting',
    description:
      'Defines the initial sort parameters as well as a callback function for when sorting takes place in the grid.',
  },
  {
    title: 'gridStyle',
    description: 'Provides options to tailor the look and feel of the grid.',
  },
  {
    title: 'rowCount',
    description: 'The number of rows in your data set',
  },
  {
    title: 'toolbarDisplay',
    description:
      'Provides options to hide the above header toolbar or any of the individual controls within.',
  },
  {
    title: 'renderCellValue',
    description:
      'Provides a method to change the render of the individual cells.  This is useful when you need to effect the cell itself, rather than its content, for example when changing styling of the background color based upon the content values.',
  },
  {
    title: 'pagination',
    description: 'Provides configuration for pagination options.',
  },
  {
    title: 'toolbarDisplay',
    description:
      'Provides options to hide the above header toolbar or any of the individual controls within.',
  },
];

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
      text: (
        <span>
          <EuiCode>EuiDataGrid</EuiCode> is a performant, high-order component
          for displaying large amounts of tabular data with liberal usage of
          React hooks. From a product standpoint it is similar to an excel, or
          sheets like experience, except that its stengths are in rendering,
          rather that creating content. Because of its ability to expand and
          render expanded content from any cell, this means it is particularly
          good at custom rendering of cells and providing additional
          functionality based upon their content. The individual cells can
          contain whatever node content you wish, but will always truncate to
          keep data summarization clean. Likewise the expanded cell content
          within popoups can content any node content you wish as long as it
          fits witin its height and width restrictions.
        </span>
      ),
      components: { DataGrid },
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
      },
      demo: (
        <Fragment>
          <DataGrid />
          <EuiSpacer size="xxl" />
          <EuiText>
            <h2>A simplistic glance under the hood</h2>
            <p>
              Here is a very simple data grid example that does not take
              advantage of inMemory enhancements.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock
            language="javascript"
            paddingSize="s"
            isCopyable
            overflowHeight={300}>
            {gridSnippet}
          </EuiCodeBlock>
          <EuiSpacer size="xl" />
          <EuiText>
            <h3>General props explanation</h3>
            <p>
              Please check the props tab in the example above for more
              explanation. This section only describes the purpose of each prop,
              not the specifics of their implementation.
            </p>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiDescriptionList
            compressed
            listItems={gridConcepts}
            type="responsiveColumn"
            titleProps={{ style: { width: '20%' } }}
            descriptionProps={{ style: { width: '80%' } }}
          />
        </Fragment>
      ),
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
      title: 'Schema',
      text: (
        <p>Column type information can be included on the column definition.</p>
      ),
      components: { DataGridSchema },
      demo: <DataGridSchema />,
    },
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
      title: 'In Memory',
      text: <p>In memory description</p>,
      components: { InMemoryDataGrid },
      demo: <InMemoryDataGrid />,
    },
  ],
};
