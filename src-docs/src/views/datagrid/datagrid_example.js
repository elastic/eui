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

import { Link } from 'react-router';

import DataGrid from './datagrid';
const dataGridSource = require('!!raw-loader!./datagrid');
const dataGridHtml = renderToHtml(DataGrid);

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
  DataGridPopoverContent,
} from './props';

const gridSnippet = `
  <EuiDataGrid
    // Optional. Will try to autodectect schemas and do sorting and pagination in memory.
    inMemory={{ level: 'sorting' }}
    // Required. There are 200 total records.
    rowCount={200}
    // Required. Sets up three columns, the last of which has a custom schema we later define down below.
    // The second column B won't allow clicking in to see the content in a popup.
    columns={[{ id: 'A' }, { id: 'B', isExpandable: false }, {id: 'C', schema: 'franchise'}]}
    // Optional. This allows you to initially hide columns. Users can still turn them on.
    columnVisibility={{
      visibleColumns: ['A', 'C'],
      setVisibleColumns: () => {},
    }}
    // Optional. Customize the content inside the cell. The current example outputs the row and column position.
    // Often used in combination with useEffect() to dynamically change the render.
    renderCellValue={({ rowIndex, columnId }) =>
     \`\${rowIndex}, \${columnId}\`
    }
    // Optional. Add pagination.
    pagination={{
      pageIndex: 1,
      pageSize: 100,
      pageSizeOptions: [50, 100, 200],
      onChangePage: () => {},
      onChangeItemsPerPage: () => {},
    }}
    // Optional, but required when inMemory is set. Provides the sort and gives a callback for when it changes in the grid.
    sorting={{
      columns: [{ id: 'C', direction: 'asc' }],
      onSort: () => {},
    }}
    // Optional. Allows you to configure what features the toolbar shows.
    // The prop also accepts a boolean if you want to toggle the entire toolbar on/off.
    toolbarVisibility={{
      showColumnSelector: false
      showStyleSelector: false
      showSortSelector: false
      showFullScreenSelector: false
    }}
    // Optional. Change the initial style of the grid.
    gridStyle={{
      border: 'all',
      fontSize: 'm',
      cellPadding: 'm',
      stripes: true,
      rowHover: 'highlight',
      header: 'shade',
    }}
    // Optional. Provide additional schemas to use in the grid.
    // This schema 'franchise' essentially acts like a boolean, looking for Star Wars or Star Trek in a column.
    schemaDetectors={[
      {
        type: 'franchise',
        // Try to detect if column data is this schema. A value of 1 is the highest possible. A (mean_average - standard_deviation) of .5 will be good enough for the autodetector to assign.
        detector(value) {
          return value.toLowerCase() === 'star wars' ||
            value.toLowerCase() === 'star trek'
            ? 1
            : 0;
        },
        // How we should sort data matching this schema. Again, a value of 1 is the highest value.
        comparator(a, b, direction) {
          const aValue = a.toLowerCase() === 'star wars';
          const bValue = b.toLowerCase() === 'star wars';
          if (aValue < bValue) return direction === 'asc' ? 1 : -1;
          if (aValue > bValue) return direction === 'asc' ? -1 : 1;
          return 0;
        },
        // Text for what the ASC sort does.
        sortTextAsc: 'Star Wars-Star Trek',
        // Text for what the DESC sort does.
        sortTextDesc: 'Star Trek-Star Wars',
        // EuiIcon to signify this schema.
        icon: 'star',
        // The color to use for the icon.
        color: '#000000',
      },
    ]}
    // Optional. Mapped against the schema, provide custom layout and/or content for the popover.
    popoverContents={{
      numeric: ({ children, cellContentsElement }) => {
        // \`children\` is the datagrid's \`renderCellValue\` as a ReactElement and should be used when you are only wrapping the contents
        // \`cellContentsElement\` is the cell's existing DOM element and can be used to extract the text value for processing, as below

        // want to process the already-rendered cell value
        const stringContents = cellContentsElement.textContent;

        // extract the groups-of-three digits that are right-aligned
        return stringContents.replace(/((\\d{3})+)$/, match =>
          // then replace each group of xyz digits with ,xyz
          match.replace(/(\\d{3})/g, ',$1')
        );
      },
    }}
  />
`;

const gridConcepts = [
  {
    title: 'columns',
    description: (
      <span>
        An array of <EuiCode>EuiDataGridColumn</EuiCode> objects. Lists the
        columns available and the schema and settings tied to it.
      </span>
    ),
  },
  {
    title: 'inMemory',
    description: (
      <span>
        A <EuiCode>EuiDataGridInMemory</EuiCode> object to define the level of
        high order schema-detection and sorting logic to use on your data.{' '}
        <strong>Try to set it when possible</strong>. If omitted, disables all
        enhancements and assumes content is flat strings.
      </span>
    ),
  },
  {
    title: 'columnVisibility',
    description: (
      <span>
        An array of <EuiCode>EuiDataGridColumnVisibility</EuiCode> objects.
        Defines which columns are visible in the grid and the order they are
        displayed.
      </span>
    ),
  },
  {
    title: 'schemaDetectors',
    description: (
      <span>
        An array of custom <EuiCode>EuiDataGridSchemaDetector</EuiCode> objects.
        You can inject custom schemas to the grid to define the classnames
        applied.
      </span>
    ),
  },
  {
    title: 'popoverContents',
    description: (
      <span>
        An object mapping <EuiCode>EuiDataGridColumn</EuiCode> schemas to a
        custom popover render. This dictates the content of the popovers when
        you click into each cell.
      </span>
    ),
  },
  {
    title: 'rowCount',
    description:
      'The total number of rows in the dataset (used by e.g. pagination to know how many pages to list).',
  },
  {
    title: 'gridStyle',
    description: (
      <span>
        Defines the look of the grid. Accepts a partial{' '}
        <EuiCode>EuiDataGridStyle</EuiCode> object. Settings provided may be
        overwritten or merged with user defined preferences if{' '}
        <EuiCode>toolbarVisibility.showStyleSelector</EuiCode> is set to true
        (which is the default).
      </span>
    ),
  },
  {
    title: 'toolbarVisibility',
    description: (
      <span>
        Accepts either a boolean or{' '}
        <EuiCode>EuiDataGridTooBarVisibilityOptions</EuiCode> object. When used
        as a boolean, defines the visibility of entire toolbar. When passed an
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
        <EuiCode>EuiDataGridCellValueElement</EuiCode> as its only argument.
      </span>
    ),
  },
  {
    title: 'pagination',
    description: (
      <span>
        A <EuiCode>EuiDataGridPagination</EuiCode> object. Omit to disable
        pagination completely.
      </span>
    ),
  },
  {
    title: 'sorting',
    description: (
      <span>
        A <EuiCode>EuiDataGridSorting</EuiCode> object that provides the sorted
        columns along with their direction. Omit to disable, but you&apos;ll
        likely want to also turn off the user sorting controls through the{' '}
        <EuiCode>toolbarVisibility</EuiCode> prop.
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
        <Fragment>
          <p>
            <EuiCode>EuiDataGrid</EuiCode> is for displaying large amounts of
            tabular data. It is a better choice over{' '}
            <Link to="/tabular-content/tables/">EUI tables</Link> when there are
            many columns, the data in those columns is fairly uniform, and when
            schemas and sorting are important for comparison. Although it is
            similar to traditional spreedsheet software, EuiDataGrid&apos;s
            current strengths are in rendering rather than creating content.{' '}
          </p>
          <h3>Core concepts</h3>
          <ul>
            <li>
              The grid allows you to optionally define an{' '}
              <Link to="/tabular-content/data-grid-in-memory-settings/">
                in memory level
              </Link>{' '}
              to have the grid automatically handle updating your columns.
              Depending upon the level choosen you may need to manage the
              content order separate from the grid.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-schemas-and-popovers/">
                Schemas
              </Link>{' '}
              allow you to tailor the render and sort methods for each column.
              The component ships with a few automatic schema detection and
              types, but you can also pass in custom ones.
            </li>
            <li>
              Unlike tables, the data grid <strong>forces truncation</strong>.
              To display more content your can customize{' '}
              <Link to="/tabular-content/data-grid-schemas-and-popvers/">
                popovers
              </Link>{' '}
              to display more content and actions into popovers.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-styling/">Grid styling</Link>{' '}
              can be controlled by the engineer, but augmented by user
              preference depending upon the features you enable.
            </li>
          </ul>
        </Fragment>
      ),
      components: { DataGrid },
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
        EuiDataGridPopoverContent: DataGridPopoverContent,
      },
      demo: (
        <Fragment>
          <DataGrid />
        </Fragment>
      ),
      extraContent: (
        <Fragment>
          <EuiSpacer size="xxl" />
          <EuiText>
            <h2>Snippet with every feature in use</h2>
            <p>
              Here is a complicated data grid example meant to give you an idea
              of the data structure and callbacks you&apos;ll need to provide if
              you were utilizing all the features.
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
    },
  ],
};
