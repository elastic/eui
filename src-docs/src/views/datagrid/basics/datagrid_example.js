import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCallOut,
  EuiCode,
  EuiText,
  EuiSpacer,
  EuiLink,
} from '../../../../../src/components';

import DataGrid from './datagrid';
import { DataGridTopProps, EuiDataGridPaginationProps } from './_props';
const dataGridSource = require('!!raw-loader!./datagrid');

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
import DataGridFlex from './flex';
const dataGridFlexSource = require('!!raw-loader!./flex');

import DataGridVirtualization from './virtualization';
const dataGridVirtualizationSource = require('!!raw-loader!./virtualization');
import DataGridVirtualizationConstrained from './virtualization_constrained';
const dataGridVirtualizationConstrainedSource = require('!!raw-loader!./virtualization_constrained');

import {
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridStyle,
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridColumnVisibility,
  EuiDataGridColumnActions,
  EuiDataGridControlColumn,
  EuiDataGridToolBarVisibilityColumnSelectorOptions,
  EuiDataGridRowHeightsOptions,
  EuiDataGridCellValueElementProps,
  EuiDataGridCellPopoverElementProps,
  EuiDataGridSchemaDetector,
  EuiDataGridRefProps,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

const gridSnippet = `const columns = [{ id: 'A' }, { id: 'B' }];
const [visibleColumns, setVisibleColumns] = useState(['A', 'B']);

<EuiDataGrid
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={10}
  renderCellValue={({ rowIndex, colIndex }) => \`\${rowIndex},\${colIndex}\`}
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
        strengths are in rendering rather than creating content.
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
              <Link to="/tabular-content/data-grid-advanced#data-grid-in-memory">
                in memory level
              </Link>{' '}
              to have the grid automatically handle updating your columns.
              Depending upon the level chosen, you may need to manage the
              content order separately from the grid.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-schema-columns">
                Schemas
              </Link>{' '}
              allow you to tailor the render and sort methods for each column.
              The component ships with a few automatic schema detection and
              types, but you can also pass in custom ones.
            </li>
            <li>
              Unlike tables, the data grid <strong>forces truncation</strong>.
              To display more content your can customize{' '}
              <Link to="/tabular-content/data-grid-cells-popovers#conditionally-customizing-cell-popover-content">
                popovers
              </Link>{' '}
              to display more content and actions into popovers.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-style-display#grid-style">
                Grid styling
              </Link>{' '}
              can be controlled by the engineer, but augmented by user
              preference depending upon the features you enable.
            </li>
            <li>
              <Link to="/tabular-content/data-grid-schema-columns#control-columns">
                Control columns
              </Link>{' '}
              allow you to add repeatable actions and controls like checkboxes
              or buttons to your grid.
            </li>
            <li>
              The <Link to="/tabular-content/data-grid-toolbar">toolbar</Link>{' '}
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
        EuiDataGridCellPopoverElementProps,
        EuiDataGridSchemaDetector,
        EuiDataGridStyle,
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarVisibilityColumnSelectorOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridRowHeightsOptions,
        EuiDataGridRefProps,
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
              <EuiLink
                href="https://github.com/elastic/eui/tree/main/src/components/datagrid/data_grid_types.ts"
                target="_blank"
              >
                /datagrid/data_grid_types.ts
              </EuiLink>{' '}
              file.
            </p>
            <h3>
              <EuiCode>EuiDataGrid</EuiCode>
            </h3>
          </EuiText>
          <EuiSpacer />
          <DataGridTopProps />
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
