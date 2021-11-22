import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import {
  EuiDataGrid,
  EuiCallOut,
  EuiCode,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import DataGrid from './basics/datagrid';
import TopLevelProps from './basics/_props';
const dataGridSource = require('!!raw-loader!./basics/datagrid');

import DataGridContainer from './basics/container';
const dataGridContainerSource = require('!!raw-loader!./basics/container');
import DataGridFlex from './basics/flex';
const dataGridFlexSource = require('!!raw-loader!./basics/flex');

import DataGridVirtualization from './basics/virtualization';
const dataGridVirtualizationSource = require('!!raw-loader!./basics/virtualization');
import DataGridVirtualizationConstrained from './basics/virtualization_constrained';
const dataGridVirtualizationConstrainedSource = require('!!raw-loader!./basics/virtualization_constrained');

import {
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridStyle,
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridColumnVisibility,
  EuiDataGridColumnActions,
  EuiDataGridPopoverContentProps,
  EuiDataGridControlColumn,
  EuiDataGridToolBarVisibilityColumnSelectorOptions,
  EuiDataGridRowHeightsOptions,
  EuiDataGridCellValueElementProps,
  EuiDataGridSchemaDetector,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

const gridSnippet = `<EuiDataGrid
  // Optional. Will try to autodectect schemas and do sorting and pagination in memory.
  inMemory={{ level: 'sorting' }}
  // Required. There are 200 total records.
  rowCount={200}
  // Required. Sets up three columns, the last of which has a custom schema we later define down below.
  // The first column defines a starting width of 150px, prevents the user from resizing it and no actions are displayed
  // The second column B won't allow clicking in to see the content in a popup and doesn't show move actions in column header cell
  // The third column provides one additional cell action, that triggers an alert once clicked
  columns={[
      { id: 'A', initialWidth: 150, isResizable: false, actions: false },
      { id: 'B', isExpandable: false, actions: { showMoveLeft: false, showMoveRight: false } },
      { id: 'C', schema: 'franchise', cellActions: [{ label: 'test', iconType: 'heart', callback: ()=> alert('test') }]}
  ]}
  // Optional. This allows you to initially hide columns. Users can still turn them on.
  columnVisibility={{
    visibleColumns: ['A', 'C'],
    setVisibleColumns: () => {},
  }}
  leadingControlColumns={[
    {
      id: 'selection',
      width: 31,
      headerCellRender: () => <span>Select a Row</span>,
      rowCellRender: () => <div><EuiCheckbox ... /></div>,
    },
  ]}
  trailingControlColumns={[
    {
      id: 'actions',
      width: 40,
      headerCellRender: () => null,
      rowCellRender: MyGridActionsComponent,
    },
  ]}
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
    showColumnSelector: false,
    showDisplaySelector: false,
    showSortSelector: false,
    showFullScreenSelector: false,
    additionalControls: {
      left: <EuiButtonEmpty size="xs" />,
      right: <EuiButtonIcon size="xs" />,
    },
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
  // Optional. Allows configuring the heights of grid rows
  rowHeightsOptions={{
    defaultHeight: 34,
    rowHeights: {
      0: auto
    },
    lineHeight: '1em',
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
      // EuiIcon or Token to signify this schema.
      icon: 'star',
      // The color to use for the icon token.
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
/>`;

export const DataGridExample = {
  title: 'Data grid',
  intro: (
    <EuiText>
      <p>
        <strong>EuiDataGrid</strong> is for displaying large amounts of tabular
        data. It is a better choice over{' '}
        <Link to="/tabular-content/tables/">EUI tables</Link> when there are
        many columns, the data in those columns is fairly uniform, and when
        schemas and sorting are important for comparison. Although it is similar
        to traditional spreedsheet software, EuiDataGrid&apos;s current
        strengths are in rendering rather than creating content.{' '}
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Core concepts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSource,
        },
      ],
      text: (
        <Fragment>
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
              <Link to="/tabular-content/data-grid-schemas-and-popovers/">
                popovers
              </Link>{' '}
              to display more content and actions into popovers.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-styling-and-control/">
                Grid styling
              </Link>{' '}
              can be controlled by the engineer, but augmented by user
              preference depending upon the features you enable.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-control-columns/">
                Control columns
              </Link>{' '}
              allow you to add repeatable actions and controls like checkboxes
              or buttons to your grid.
            </li>
            <li>
              The <Link to="/tabular-content/data-grid-toolbar/">toolbar</Link>{' '}
              offers the user ways to manipulate the display and order of the
              data.
            </li>
          </ul>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
        EuiDataGridColumnCellAction,
        EuiDataGridColumnVisibility,
        EuiDataGridColumnActions,
        EuiDataGridControlColumn,
        EuiDataGridInMemory,
        EuiDataGridPaginationProps,
        EuiDataGridSorting,
        EuiDataGridCellValueElementProps,
        EuiDataGridSchemaDetector,
        EuiDataGridStyle,
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarVisibilityColumnSelectorOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridPopoverContentProps,
        EuiDataGridRowHeightsOptions,
      },
      demo: (
        <Fragment>
          <DataGrid />
        </Fragment>
      ),
      snippet: gridSnippet,
    },
    {
      title: 'Top level props',
      wrapText: false,
      text: (
        <Fragment>
          <EuiText>
            <p>
              Please check the props tab in the example above for more
              explanation on the lower level object types. The majority of the
              types are defined in the{' '}
              <a
                href="https://github.com/elastic/eui/tree/main/src/components/datagrid/data_grid_types.ts"
                target="_blank"
              >
                /datagrid/data_grid_types.ts
              </a>{' '}
              file.
            </p>
          </EuiText>
          <EuiSpacer />
          <TopLevelProps />
        </Fragment>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridContainerSource,
        },
      ],
      title: 'Data grid adapts to its container',
      text: (
        <p>
          When wrapped inside a container, like a dashboard panel, the grid will
          start hiding controls and adopt a more strict flex layout. Use the
          <EuiCode>minSizeForControls</EuiCode> prop to control the min width to
          enables/disables grid controls based on available width.
        </p>
      ),
      demo: <DataGridContainer />,
      demoPanelProps: { color: 'subdued' },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridFlexSource,
        },
      ],
      text: (
        <p>
          When placed within an{' '}
          <Link to="/layout/flex">
            <strong>EuiFlexGroup</strong> and <strong>EuiFlexItem</strong>
          </Link>
          , the data grid will have trouble shrinking to fit. To fix this, you
          will need to manually add a style of{' '}
          <EuiCode language="css">min-width: 0</EuiCode> to the{' '}
          <strong>EuiFlexItem</strong>.
        </p>
      ),
      demo: <DataGridFlex />,
    },
    {
      title: 'Virtualization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridVirtualizationSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Creating a lot of DOM nodes is computationally expensive, and{' '}
            <strong>EuiDataGrid</strong> uses a couple wrapping divs to build
            each cell. To help offset the cost of larger tables, cell
            virtualization can be opted into by constraining the grid&apos;s
            height and/or width. There are two ways to enable this
            functionality. First, <EuiCode>height</EuiCode> and/or{' '}
            <EuiCode>width</EuiCode> can be passed as props, which are applied
            to the grid&apos;s container style. Alternatively, if{' '}
            <strong>EuiDataGrid</strong> is unable to render at the full
            dimensions it needs due to screen real estate or other DOM
            constraints, it will overflow within a scrollable container and only
            render the visible cells.
          </p>

          <EuiCallOut
            title={
              <>
                Never toggle the height between a value and{' '}
                <EuiCode>undefined</EuiCode>.
              </>
            }
            color="warning"
          >
            <p>
              Similar to React&apos;s rule of not switching between a controlled
              and uncontrolled input, <EuiCode>EuiDataGrid</EuiCode> does not
              accommodate for its height switching to or from{' '}
              <EuiCode>undefined</EuiCode>. For demonstration purposes, the
              example below uses a <EuiCode>key</EuiCode> to force{' '}
              <strong>EuiDataGrid</strong> to completely remount when its height
              changes between constrained & constrained heights.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      demo: <DataGridVirtualization />,
    },
    {
      text: <h3>Constrained by DOM</h3>,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridVirtualizationConstrainedSource,
        },
      ],
      demo: <DataGridVirtualizationConstrained />,
    },
  ],
};
