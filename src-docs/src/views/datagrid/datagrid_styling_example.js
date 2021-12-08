import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiCodeBlock,
  EuiListGroupItem,
} from '../../../../src/components';

import DataGridDisplayCallbacks from './display_callbacks';
const dataGridDisplayCallbacksSource = require('!!raw-loader!./display_callbacks');

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');

import DataGridFlex from './flex';
const dataGridFlexSource = require('!!raw-loader!./flex');

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');

import DataGridControls from './additional_controls';
const dataGridControlsSource = require('!!raw-loader!./additional_controls');

import DataGridColumnWidths from './column_widths';
import DataGridColumnActions from './column_actions';
import DataGridColumnCellActions from './column_cell_actions';
const dataGridColumnWidthsSource = require('!!raw-loader!./column_widths');
const dataGridColumnActionsSource = require('!!raw-loader!./column_actions');
const dataGridColumnCellActionsSource = require('!!raw-loader!./column_cell_actions');

import {
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
  EuiDataGridStyle,
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridToolBarAdditionalControlsLeftOptions,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

const gridSnippet = `<EuiDataGrid
  {...usualProps}
  columns={[
    // three columns are available, but restrict Avatar to 50px and don't let users resize it
    { id: 'Avatar', initialWidth: 50, isResizable: false },
    { id: 'Name' },
    { id: 'Email' },
  ]}
  // This can work as a shape.
  toolbarVisibility={{
    showDisplaySelector: false,
    showSortSelector: false,
    showFullScreenSelector: false,
    // showColumnSelector also takes an object, check the prop docs.
    showColumnSelector: false,
    additionalControls: {
      left: (
        <Fragment>
          <EuiButtonEmpty
            size="xs"
            onClick={() => {}}>
            New button
          </EuiButtonEmpty>
          <EuiButtonEmpty
            size="xs"
            onClick={() => {}}>
            Another button
          </EuiButtonEmpty>
        </Fragment>
      )
    }
  }}
  // Or as a boolean to turn everything off.
  toolbarVisibility={false}
  // Change the initial style of the grid.
  gridStyle={{
    border: 'all',
    stripes: true,
    rowHover: 'highlight',
    header: 'shade',
    // If showDisplaySelector.allowDensity={true} from toolbarVisibility, fontSize and cellPadding will be superceded by what the user decides.
    fontSize: 'm',
    cellPadding: 'm',
    footer: 'overline'
  }}
/>
`;

const controlsSnippet = `<EuiDataGrid
  {...usualGridProps}
  toolbarVisibility={{
    // Use of a fragment for multiple items will insure proper margins
    additionalControls: {
      left: {
        prepend: (
          <Fragment>
            <EuiButtonEmpty
              size="xs"
              onClick={() => {}}>
              New button
            </EuiButtonEmpty>
            <EuiButtonEmpty
              size="xs"
              onClick={() => {}}>
              Another button
            </EuiButtonEmpty>
          </Fragment>
        ),
        append: (
          <Fragment>
            <EuiButtonEmpty
              size="xs"
              onClick={() => {}}>
              New button
            </EuiButtonEmpty>
            <EuiButtonEmpty
              size="xs"
              onClick={() => {}}>
              Another button
            </EuiButtonEmpty>
          </Fragment>
        ),
      },
      right: (
        <Fragment>
          <EuiToolTip content="Right-side button">
            <EuiButtonIcon
              aria-label="Right-side button"
              size="xs"
              iconType="refresh"
              onClick={() => {}}
            />
          </EuiToolTip>
          <EuiToolTip content="Another right-side button">
            <EuiButtonIcon
              aria-label="Another right-side button"
              size="xs"
              iconType="inspect"
              onClick={() => {}}
            />
          </EuiToolTip>
        </Fragment>
      )
    }
  }}
/>
`;

const widthsSnippet = `<EuiDataGrid
  {...usualGridProps}
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

export const DataGridStylingExample = {
  title: 'Data grid styling and control',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Styling can be passed down to the grid through the{' '}
            <EuiCode>gridStyle</EuiCode> prop. It accepts an object that allows
            for customization.
          </p>
          <p>
            The <EuiCode>toolbarVisibility</EuiCode> prop when used as a boolean
            controls the visibility of the toolbar displayed above the grid.
            Using the prop as a shape, allows setting the visibility of the
            individual buttons within.
          </p>
          <p>
            With the default settings, the{' '}
            <EuiCode>showDisplaySelector.allowDensity</EuiCode> setting in{' '}
            <EuiCode>toolbarVisibility</EuiCode> means the user has the ability
            to override the padding and font size passed into{' '}
            <EuiCode>gridStyle</EuiCode> by the engineer. The font size
            overriding only works with text or elements that can inherit the
            parent font size or elements that use units relative to the parent
            container.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridStyling },

      props: {
        EuiDataGrid,
        EuiDataGridStyle,
        EuiDataGridToolBarVisibilityOptions,
      },
      demo: <DataGridStyling />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridDisplayCallbacksSource,
        },
      ],
      title: 'Adjusting your grid to user/toolbar changes',
      text: (
        <>
          <p>
            You can use the optional <EuiCode>gridStyle.onChange</EuiCode> and{' '}
            <EuiCode>rowHeightsOptions.onChange</EuiCode> callbacks to adjust
            your data grid based on user density or row height changes.
          </p>
          <p>
            For example, if the user changes the grid density to compressed, you
            may want to adjust a cell&apos;s content sizing in response. Or you
            could store user settings in localStorage or other database to
            preserve display settings on page refresh, like the below example
            does.
          </p>
        </>
      ),
      demo: <DataGridDisplayCallbacks />,
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridControlsSource,
        },
      ],
      title: 'Additional controls in the toolbar',
      text: (
        <>
          <p>
            Use the <EuiCode>toolbarVisibility.additionalControls</EuiCode> prop
            to pass more buttons to the toolbar.
          </p>
          <p>
            Passing a single node to <EuiCode>additionalControls</EuiCode> will
            default to being placed in the <EuiCode>left.append</EuiCode>{' '}
            position of the toolbar. To configure which side of the toolbar your
            controls display in, pass an object with the <EuiCode>left</EuiCode>{' '}
            or <EuiCode>right</EuiCode> properties:
          </p>
          <ul>
            <li>
              <EuiCode>additionalControls.left</EuiCode> appends the passed
              custom control into the left side of the toolbar.
              <ul>
                <li>
                  <EuiCode>left.prepend</EuiCode> prepends the passed node into
                  the left side of the toolbar, before the column & sort
                  controls.
                </li>
                <li>
                  <EuiCode>left.append</EuiCode> appends the passed node into
                  the left side of the toolbar, after the column & sort
                  controls.
                </li>
              </ul>
            </li>
            <li>
              <EuiCode>additionalControls.right</EuiCode> prepends the passed
              node into the right side of the toolbar, before the density & full
              screen controls.
            </li>
          </ul>
          <p>
            Although any node is allowed, the recommendation is to use{' '}
            <EuiCode>{'<EuiButtonEmpty size="xs" />'}</EuiCode> for the
            left-side of the toolbar and{' '}
            <EuiCode>{'<EuiButtonIcon size="xs" />'}</EuiCode> for the
            right-side of the toolbar.
          </p>
        </>
      ),
      components: { DataGridControls },
      snippet: controlsSnippet,
      props: {
        EuiDataGrid,
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridToolBarAdditionalControlsLeftOptions,
      },
      demo: <DataGridControls />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnWidthsSource,
        },
      ],
      title: 'Column width constraints',
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
      components: { DataGridColumnWidths },
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
      components: { DataGridColumnActions },
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
          code: dataGridColumnCellActionsSource,
        },
      ],
      title: 'Column cell actions',
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
      components: { DataGridColumnCellActions },
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
