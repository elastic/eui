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
    inMemory={{ level: 'sorting' }}
    columns={[{ id: 'A' }, { id: 'B' }]}
    columnVisibility={{
      visibleColumns: ['A', 'B'],
      setVisibleColumns: () => {},
    }}
    rowCount={200}
    renderCellValue={({ rowIndex, columnId }) =>
     \`\${rowIndex}, \${columnId}\`
    }
    pagination={{
      pageIndex: 1,
      pageSize: 100,
      pageSizeOptions: [50, 100, 200],
      onChangePage: () => {},
      onChangeItemsPerPage: () => {},
    }}
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
        An array of <EuiCode>DataGridColumn</EuiCode> objects. Lists the columns
        available and the schema and settings tied to it.
      </span>
    ),
  },
  {
    title: 'inMemory',
    description: (
      <span>
        A <EuiCode>DataGridInMemory</EuiCode> object to define the level of high
        order schema-detection and sorting logic to use on your data.{' '}
        <strong>Try to set it when possible</strong>. If ommited, disables all
        enhancements and assumes content is flat strings.
      </span>
    ),
  },
  {
    title: 'columnVisibility',
    description: (
      <span>
        An array of <EuiCode>DataGridColumnVisibility</EuiCode> objects. Defines
        which columns are visible in the grid and the order they are displayed.
      </span>
    ),
  },
  {
    title: 'schemaDetectors',
    description: (
      <span>
        An array of custom <EuiCode>DataGridSchemaDetector</EuiCode> objects.
        You can inject custom schemas to the grid to define the classnames
        applied
      </span>
    ),
  },
  {
    title: 'expansionFormatters',
    description: (
      <span>
        An object mapping <EuiCode>DataGridColumn</EuiCode> schemas to a custom
        expansion formatting component. This dictates the content of the
        popovers when you click into each cell.
      </span>
    ),
  },
  {
    title: 'rowCount',
    description:
      'The total number of rows in the dataset (used by e.g. pagination to know how many pages to list)',
  },
  {
    title: 'Sorting',
    description:
      'Defines the initial sort parameters as well as a callback function for when sorting takes place in the grid.',
  },
  {
    title: 'gridStyle',
    description: (
      <span>
        Defines the look and feel for the grid. Accepts a partial{' '}
        <EuiCode>DataGridStyle</EuiCode> object. Settings provided may be
        overwritten or merged with user defined preferences if toolbarDisplay
        density controls are available.
      </span>
    ),
  },
  {
    title: 'toolbarDisplay',
    description: (
      <span>
        Accepts either a boolean or{' '}
        <EuiCode>EuiDataGridTooBarDisplayOptions</EuiCode> object. When used as
        a boolean, defines the display of the toolbar entire. WHen passed an
        object allows you to turn off individual controls within the toolbar.
      </span>
    ),
  },
  {
    title: 'renderCellValue',
    description: (
      <span>
        A function called to render a cell&apos;s value. Behind the scenes it is
        treated as a React component allowing hooks, context, and other React
        concepts to be used. The function receives a{' '}
        <EuiCode>CellValueElement</EuiCode> as its only argument.
      </span>
    ),
  },
  {
    title: 'pagination',
    description: (
      <span>
        A <EuiCode>DataGridPagination</EuiCode> object. Omit to disable
        pagination completely.
      </span>
    ),
  },
  {
    title: 'toolbarDisplay',
    description: (
      <span>
        Accepts either a boolean or{' '}
        <EuiCode>EuiDataGridTooBarDisplayOptions</EuiCode> object. When used as
        a boolean, defines the display of the toolbar entire. WHen passed an
        object allows you to turn off individual controls within the toolbar.
      </span>
    ),
  },
  {
    title: 'sorting',
    description: (
      <span>
        A <EuiCode>DataGridSorting</EuiCode> oject that provides the sorted
        columns along with their direction. Omit to disable, but you&apos;ll
        likely want to also turn off the user sorting controls through the
        toolbarDisplay prop.
      </span>
    ),
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
          rather that creating content. The individual cells can contain
          whatever node content you wish, but will always truncate to keep data
          summarization clean. Likewise the expanded cell content within popoups
          can contain any node content you need by utilizing{' '}
          <EuiCode>expansionFormatters</EuiCode> that are mapped against your
          custom schemas.
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
              Here is a very simple data grid example meant to give you an idea
              of the basic structure and callbacks.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
          <EuiSpacer size="xl" />
          <EuiText>
            <h3>General props explanation</h3>
            <p>
              Please check the props tab in the example above for more
              explanation on the lower level object types. The majority of the
              types are defined in the{' '}
              <a
                href="https://github.com/elastic/eui/tree/master/src/components/data_grid/data_grid_types.ts"
                target="_blank">
                /data_grid/data_grid_types.ts
              </a>{' '}
              file.
            </p>
          </EuiText>
          <EuiSpacer />
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
