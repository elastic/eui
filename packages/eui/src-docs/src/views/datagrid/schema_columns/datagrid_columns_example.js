import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiListGroupItem,
} from '../../../../../src/components';

import DataGridSchema from '../schema_columns/schema';
const dataGridSchemaSource = require('!!raw-loader!./schema');

import DataGridControlColumns from './control_columns';
const dataGridControlColumnsSource = require('!!raw-loader!./control_columns');

import DataGridColumnWidths from './column_widths';
const dataGridColumnWidthsSource = require('!!raw-loader!./column_widths');
import DataGridColumnActions from './column_actions';
const dataGridColumnActionsSource = require('!!raw-loader!./column_actions');
import DataGridColumnDragging from './column_dragging';
const dataGridColumnDraggingSource = require('!!raw-loader!./column_dragging');

import DataGridFooterRow from './footer_row';
const dataGridFooterRowSource = require('!!raw-loader!./footer_row');

import {
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridControlColumn,
  EuiDataGridSchemaDetector,
  EuiDataGridCellValueElementProps,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

/* eslint-disable local/css-logical-properties */
const gridLeadingColumnsSnippet = `<EuiDataGrid
  aria-label="Data grid with trailing columns set"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  leadingControlColumns={[
    {
      id: 'selection',
      width: 31,
      headerCellRender: () => <span>Select a Row</span>,
      rowCellRender: () => <div><EuiSelectBox ... /></div>,
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
/>
`;

const widthsSnippet = `<EuiDataGrid
  aria-label="Data grid with columns columns set"
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  columns={[
    {
      id: 'Column A',
      initialWidth: 100, // start at 100px
    },
    {
      id: 'Column B',
      isResizable: false, // don't let users resize this column
    },
  ]}
/>
`;

const gridFooterSnippet = `const footerCellValues = {
  // desired data
};

<EuiDataGrid
  aria-label="Data grid with footer set"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  renderFooterCellValue={({ rowIndex, columnId }) =>
    footerCellValues[columnId] || null
  }
/>
`;

export const DataGridColumnsExample = {
  title: 'Data grid schema & columns',
  sections: [
    {
      title: 'Schemas',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSchemaSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Schemas are data types you pass to grid columns to affect how the
            columns and expansion popovers render. Schemas also allow you to
            define individual sorting comparators so that sorts can do more than
            just A-Z comparisons. By default, <strong>EuiDataGrid</strong> ships
            with a few built-in schemas for{' '}
            <EuiCode>numeric, currency, datetime, boolean and json</EuiCode>{' '}
            data. When the <EuiCode>inMemory</EuiCode> prop is in use it will
            automatically try to figure out the best schema based on the{' '}
            <EuiCode language="js">{'inMemory:{{ level: value }}'}</EuiCode> you
            set, but this will come with the caveat that you will need to
            provide and manage sorting outside the component. In general we
            recommend passing schema information to your columns instead of
            using auto-detection when you have that knowledge of your data
            available during ingestion.
          </p>
          <h3>Defining custom schemas</h3>
          <p>
            Custom schemas are passed as an array to{' '}
            <EuiCode>schemaDetectors</EuiCode> and are constructed against the{' '}
            <strong>EuiDataGridSchemaDetector</strong> interface. You can see an
            example of a simple custom schema used on the last column below. In
            addition to schemas being useful to map against for cell and
            expansion rendering, any schema will also add a
            <EuiCode language="js">
              {'className="euiDataGridRowCell--schemaName"'}
            </EuiCode>{' '}
            to each matching cell.
          </p>
        </Fragment>
      ),
      demo: <DataGridSchema />,
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
        EuiDataGridSchemaDetector,
      },
      snippet: `// The following schema 'franchise' essentially acts like a boolean, looking for Star Wars or Star Trek in a column.
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
  // EuiIcon or Prop to signify this schema.
  icon: 'star',
  // The color to use for the icon prop.
  color: '#000000',
},
]}`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnWidthsSource,
        },
      ],
      title: 'Column widths',
      text: (
        <Fragment>
          <p>
            By default, visible columns are given equal widths to fill up
            available space in the grid and can be resized by the user to any
            desired width. There are two parameters on{' '}
            <strong>EuiDataGridColumn</strong> to change this default behavior.{' '}
            <EuiCode>initialWidth</EuiCode> is a numeric value providing the
            starting width of a column, in pixels. Second, the{' '}
            <EuiCode>isResizable</EuiCode> value can be set to{' '}
            <EuiCode>false</EuiCode> to remove the user&apos;s ability to resize
            column.
          </p>
          <p>
            Below, the first column is given an initial width and is not
            resizable. The second column is also given an initial width but its
            width can still be changed.
          </p>
        </Fragment>
      ),
      snippet: widthsSnippet,
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
      },
      demo: <DataGridColumnWidths />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnActionsSource,
        },
      ],
      title: 'Column actions',
      text: (
        <Fragment>
          <p>
            By default, columns provide actions for sorting, moving and hiding.
            These can be extended with custom actions. You can customize the
            actions by setting the <EuiCode>actions</EuiCode> value of{' '}
            <strong>EuiDataGridColumn</strong>. Setting it to{' '}
            <EuiCode>false</EuiCode> removes the action menu displayed. You can
            configure it by passing an object of type{' '}
            <strong>EuiDataGridColumnAction</strong>. This allows you a hide,
            configure the existing actions and add new ones.
          </p>
          <p>
            Below, the first column provides no action, the second doesn&apos;t
            provide the ability to hide the columns, the 3rd provides an
            additional action, the 4th overwrites the hide action with a custom
            label and icon.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
        EuiDataGridColumnActions,
        EuiListGroupItem,
      },
      demo: <DataGridColumnActions />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnDraggingSource,
        },
      ],
      title: 'Draggable columns',
      text: (
        <Fragment>
          <p>
            To reorder columns directly instead of via the actions menu popover,
            you can enable draggable <strong>EuiDataGrid</strong> header columns
            via the <EuiCode>columnVisibility.canDragAndDropColumns</EuiCode>{' '}
            prop. This will allow you to reorder the column by dragging them.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
        EuiDataGridColumnActions,
        EuiListGroupItem,
      },
      demo: <DataGridColumnDragging />,
    },
    {
      title: 'Control columns',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlColumnsSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Control columns can be used to include ancillary cells not based on
            the dataset, such as row selection checkboxes or action buttons.
            These columns can be placed at either side of the data grid, and
            users are unable to resize, sort, or rearrange them.
          </p>
          <p>
            These custom columns are defined by passing an array of
            EuiDataGridControlColumn objects (see <em>Props</em> tab below) to{' '}
            <EuiCode>leadingControlColumns</EuiCode> and/or{' '}
            <EuiCode>trailingControlColumns</EuiCode>.
          </p>
          <p>
            As with the data grid&apos;s <EuiCode>renderCellValue</EuiCode>, the
            control columns&apos; <EuiCode>headerCellRender</EuiCode> and{' '}
            <EuiCode>rowCellRender</EuiCode> props are treated as React
            components.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridControlColumn,
      },
      demo: <DataGridControlColumns />,
      snippet: gridLeadingColumnsSnippet,
    },
    {
      title: 'Footer row',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridFooterRowSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            A footer row can be used to include value aggregations to the grid.
            Values could be based on the dataset, such as sum/average/min/max of
            numeric values in a column, or any other necessary data.
          </p>
          <p>
            The footer row is defined by passing{' '}
            <EuiCode>renderFooterCellValue</EuiCode> function prop into{' '}
            <strong>EuiDataGrid</strong>. This function acts like a React
            component, receiving{' '}
            <EuiCode>EuiDataGridCellValueElementProps</EuiCode> and returning a
            React node.
          </p>
          <p>
            When rendering footer cell values, we encourage turning off cell
            expansion on cells without content with{' '}
            <EuiCode>setCellProps({'{ isExpandable: false }'})</EuiCode>.
          </p>
          <p>
            Control columns will render empty footer cells by default, unless a
            custom <EuiCode>footerCellRender</EuiCode> function is passed.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridCellValueElementProps,
      },
      demo: <DataGridFooterRow />,
      snippet: gridFooterSnippet,
    },
  ],
};
