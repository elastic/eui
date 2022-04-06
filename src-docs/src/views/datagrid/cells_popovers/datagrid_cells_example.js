import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiCallOut,
  EuiBasicTable,
  EuiSpacer,
  EuiText,
  EuiListGroupItem,
} from '../../../../../src';

import DataGridColumnCellActions from './column_cell_actions';
const dataGridColumnCellActionsSource = require('!!raw-loader!./column_cell_actions');

import VisibleCellActions from './visible_cell_actions';
const visibleCellActionsSource = require('!!raw-loader!./visible_cell_actions');

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
  intro: (
    <EuiText>
      <p>
        Data grid cells are rendered using the{' '}
        <EuiCode>renderCellValue</EuiCode> prop. This prop accepts a function
        which is treated as a React component behind the scenes. This means the
        data grid passes cell-specific props (e.g. row index, column/schema
        info, etc.) to your render function, which can ouput anything from a
        string to any JSX element.
      </p>
      <p>
        Each data grid cell will automatically render an expand action button
        and an expansion popover (
        <Link to="#disabling-cell-expansion-popovers">
          which can be disabled
        </Link>
        ). For cells with overflowing or truncated content, this expansion
        popover helps display the full amount of content, or can be customized
        to show extra details.
      </p>
    </EuiText>
  ),
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
            In addition to making a cell expandable, you can add more custom
            actions by setting <EuiCode>columns.cellActions</EuiCode>. These
            actions will render as icon buttons in the cell on hover/focus, and
            render as full buttons in the cell expansion popover. Note that once
            any <EuiCode>cellActions</EuiCode> are passed, the cell becomes
            automatically expandable - this ensures keyboard and screen reader
            users have access to all cell actions.
          </p>
          <p>
            <EuiCode>columns.cellActions</EuiCode> accepts an array of render
            functions. Behind the scenes, the functions are treated as a React
            components allowing hooks, context, and other React concepts to be
            used. Because different button types are used between the cell and
            the cell popover, we pass your render function a{' '}
            <EuiCode>Component</EuiCode> prop which you must render in order for
            your cell actions to switch correctly between button icons and
            buttons.
          </p>
          <p>
            To close a cell&apos;s expansion popover upon clicking an action,
            use the{' '}
            <Link to="/tabular-content/data-grid-advanced#ref-methods">
              closeCellPopover
            </Link>{' '}
            API available via the <EuiCode>ref</EuiCode> prop.
          </p>
          <p>
            In the below example, the email and city columns provide 1{' '}
            <EuiCode>cellAction</EuiCode> each, while the country column
            provides 2 <EuiCode>cellAction</EuiCode>s.
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
    {
      title: 'Visible cell actions and cell popovers',
      text: (
        <>
          <p>
            By default, only the first 2 cell actions of a cell will be
            displayed to the left of the expand action button, and remaining
            actions will be displayed in the footer of the cell expansion
            popover.
          </p>
          <p>
            This number is configurable by setting{' '}
            <EuiCode>columns.visibleCellActions</EuiCode>, should you need to
            display more cell actions immediately. However, we advise caution
            when increasing this limit - the default is set to ensure cell
            action buttons do not crowd out content.
          </p>
          <p>
            The below example shows an increasing number of{' '}
            <EuiCode>cellActions</EuiCode> in each column. The third column
            shows <EuiCode>visibleCellActions</EuiCode> set to 3, and the fourth
            column shows excess actions overflowing into the popover.
          </p>
        </>
      ),
      demo: <VisibleCellActions />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: visibleCellActionsSource,
        },
      ],
      props: {
        EuiDataGridColumn,
      },
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
