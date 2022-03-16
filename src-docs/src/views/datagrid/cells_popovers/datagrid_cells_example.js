import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiCallOut,
  EuiBasicTable,
  EuiSpacer,
  EuiListGroupItem,
} from '../../../../../src';

import DataGridColumnCellActions from './column_cell_actions';
const dataGridColumnCellActionsSource = require('!!raw-loader!./column_cell_actions');

import { DataGridCellPopoverExample } from './datagrid_cell_popover_example';

import DataGridFocus from './focus';
const dataGridFocusSource = require('!!raw-loader!./focus');

import {
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
  EuiDataGridColumnActions,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

export const DataGridCellsExample = {
  title: 'Data grid cells & popovers',
  sections: [
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

    ...DataGridCellPopoverExample.sections,

    {
      title: 'Focus',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridFocusSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>EuiDataGrid</strong> tracks and manages complicated focus
            state management based upon the content of the individual inner
            cells. The following scenarios are supported and tested:
          </p>
          <h3>Initial focus</h3>
          <ul>
            <li>
              When tabbing to the grid before it has received focus, the first
              cell of either the header (if it is interaction) or first content
              cell is focused.
            </li>
            <li>Datagrid does not auto-focus on mount / page load</li>
            <li>
              When removing focus from the grid and then returning, the last
              focused cell remains focused.
            </li>
          </ul>
          <h3>Click and key events</h3>
          <ul>
            <li>
              Clicking on an interactive cell (not its content) should focus on
              the cell, or if it has only one interactive element the focus
              should shift to the element.
            </li>
            <li>
              Clicking on an interactive element within a cell the focus should
              always remain on that element, not shift to the cell or another
              element unless a subsequent user action changes it.
            </li>
            <li>
              Enter or F2 can be used interchangeably to enter inner cell focus
              if the logic below allows it.
            </li>
          </ul>
          <h3>
            The content and expandability of the cells dictate the focus target
            of the cell
          </h3>
          <p>
            The following combinations of focus are maintained to provide for a
            good balance between accessibility and ease of use while navigating
            the grid with your keyboard.
          </p>
          <EuiBasicTable
            columns={[
              {
                field: 'expandable',
                name: 'Expandablity',
              },
              {
                field: 'contents',
                name: 'Cell contains',
              },
              {
                field: 'result',
                name: 'Resulting focus',
                width: '50%',
                mobileOptions: {
                  width: '100%',
                },
              },
            ]}
            items={[
              {
                id: '1',
                expandable: 'Not expandable',
                contents: 'No interactive elements',
                result:
                  'Cell alone receives the focus, with no possible inner focus action',
              },
              {
                id: '2',
                expandable: 'Not expandable',
                contents: 'Single interactive element',
                result:
                  'The single inner element within the cell receives focus',
              },
              {
                id: '3',
                expandable: 'Not expandable',
                contents: 'Multiple interactive elements',
                result:
                  'The cell will allow a non-expanding focus trap on Enter keyDown',
              },
              {
                id: '4',
                expandable: 'Is expandable',
                contents:
                  'Any combination of interactive / non-interactive elements',
                result: 'The cell will focus on the expansion action',
              },
            ]}
          />
          <EuiSpacer />
          <EuiCallOut
            color="warning"
            title="Don't turn off cell expansion when the width of the column is unknown"
          >
            In general, you should change <EuiCode>isExpandable</EuiCode> to{' '}
            <EuiCode>false</EuiCode> only when you know the exact width and
            number of items that a cell will include. Control columns that
            contain row actions are a good example of when to use them. In
            certain scenarios, allowing multiple interactive elements in cells
            when you cannot control the width can lead to hidden focus because
            the content is truncated.
          </EuiCallOut>
        </Fragment>
      ),
      demo: <DataGridFocus />,
    },
  ],
};
