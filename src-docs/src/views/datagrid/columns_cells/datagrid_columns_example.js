import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiListGroupItem,
} from '../../../../../src/components';

import DataGridControlColumns from './control_columns';
const dataGridControlColumnsSource = require('!!raw-loader!./control_columns');

import DataGridColumnWidths from './column_widths';
const dataGridColumnWidthsSource = require('!!raw-loader!./column_widths');
import DataGridColumnActions from './column_actions';
const dataGridColumnActionsSource = require('!!raw-loader!./column_actions');
import DataGridColumnCellActions from './column_cell_actions';
const dataGridColumnCellActionsSource = require('!!raw-loader!./column_cell_actions');

import {
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
  EuiDataGridControlColumn,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

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

export const DataGridColumnsExample = {
  title: 'Data grid columns & cells',
  sections: [
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnCellActionsSource,
        },
      ],
      title: 'Cell actions',
      text: (
        <Fragment>
          <p>
            On top of making a cell expandable, you can add more custom actions
            by setting <EuiCode>cellActions</EuiCode>. This contains functions
            called to render additional buttons in the cell and in the popover
            when expanded. Behind the scenes those are treated as a React
            components allowing hooks, context, and other React concepts to be
            used. The functions receives an argument of type
            <code>EuiDataGridColumnCellActionProps</code>. The icons of these
            actions are displayed on mouse over, and also appear in the popover
            when the cell is expanded. Note that once you&apos;ve defined the{' '}
            <EuiCode>cellAction</EuiCode> property, the cell&apos;s
            automatically expandable.
          </p>
          <p>
            Below, the email and city columns provide 1{' '}
            <EuiCode>cellAction</EuiCode> each, while the country column
            provides 2 <EuiCode>cellAction</EuiCode>s.
            <br />
            The email column cell action closes the popover if it&apos;s
            expanded through the <EuiCode>closePopover</EuiCode> prop.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridColumn,
        EuiDataGridColumnActions,
        EuiDataGridColumnCellAction,
        EuiDataGridColumnCellActionProps,
        EuiListGroupItem,
      },
      demo: <DataGridColumnCellActions />,
    },
  ],
};
