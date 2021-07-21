import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import {
  EuiDataGrid,
  EuiCode,
  EuiCodeBlock,
  EuiListGroupItem,
} from '../../../../src/components';

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
const dataGridContainerHtml = renderToHtml(DataGridContainer);
import DataGridFlex from './flex';
const dataGridFlexSource = require('!!raw-loader!./flex');

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');
const dataGridStylingHtml = renderToHtml(DataGridStyling);

import DataGridControls from './additional_controls';
const dataGridControlsSource = require('!!raw-loader!./additional_controls');
const dataGridControlsHtml = renderToHtml(DataGridControls);

import DataGridColumnWidths from './column_widths';
import DataGridColumnActions from './column_actions';
import DataGridColumnCellActions from './column_cell_actions';
const dataGridColumnWidthsSource = require('!!raw-loader!./column_widths');
const dataGridColumnWidthsHtml = renderToHtml(DataGridColumnWidths);
const dataGridColumnActionsSource = require('!!raw-loader!./column_actions');
const dataGridColumnActionsHtml = renderToHtml(DataGridColumnActions);
const dataGridColumnCellActionsSource = require('!!raw-loader!./column_cell_actions');
const dataGridColumnCellActionsHtml = renderToHtml(DataGridColumnActions);

import {
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
  EuiDataGridStyle,
  EuiDataGridToolBarVisibilityOptions,
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
    showStyleSelector: false,
    showSortSelector: false,
    showFullScreenSelector: false,
    // showColumnSelector also takes an object, check the prop docs.
    showColumnSelector: false,
    additionalControls: (
      <Fragment>
        <EuiButtonEmpty
          size="xs"
          iconType="bell"
          color="text"
          className="euiDataGrid__controlBtn"
          onClick={() => {}}>
          New button
        </EuiButtonEmpty>
        <EuiButtonEmpty
          size="xs"
          iconType="branch"
          color="text"
          className="euiDataGrid__controlBtn"
          onClick={() => {}}>
          Another button
        </EuiButtonEmpty>
      </Fragment>
    )
  }}
  // Or as a boolean to turn everything off.
  toolbarVisibility={false}
  // Change the initial style of the grid.
  gridStyle={{
    border: 'all',
    stripes: true,
    rowHover: 'highlight',
    header: 'shade',
    // If showStyleSelector={true} from toolbarVisibility, these last two will be superceded by what the user decides.
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
    additionalControls: (
      <Fragment>
        <EuiButtonEmpty
          size="xs"
          iconType="bell"
          color="text"
          className="euiDataGrid__controlBtn"
          onClick={() => {}}>
          New button
        </EuiButtonEmpty>
        <EuiButtonEmpty
          size="xs"
          iconType="branch"
          color="text"
          className="euiDataGrid__controlBtn"
          onClick={() => {}}>
          Another button
        </EuiButtonEmpty>
      </Fragment>
    )
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
        {
          type: GuideSectionTypes.HTML,
          code: dataGridStylingHtml,
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
            With the default settings, the <EuiCode>showStyleSelector</EuiCode>{' '}
            setting in <EuiCode>toolbarVisibility</EuiCode> means the user has
            the ability to override the padding and font size passed into{' '}
            <EuiCode>gridStyle</EuiCode> by the engineer.
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
        {
          type: GuideSectionTypes.HTML,
          code: dataGridControlsHtml,
        },
      ],
      title: 'Additional controls in the toolbar',
      text: (
        <p>
          Use the <EuiCode>toolbarVisibility.additionalControls</EuiCode> prop
          to pass additional controls to the toolbar. These will always live to
          the left of the full screen button. It will respect the{' '}
          <EuiCode language="js">toolbarVisibility={'{false}'}</EuiCode> setting
          and hide when appropriate. Although any node can fit in this space,
          the recommendation is to use <strong>EuiButtonEmpty</strong>{' '}
          components with the configuration shown in the snippet.
        </p>
      ),
      components: { DataGridControls },
      snippet: controlsSnippet,
      demo: <DataGridControls />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridColumnWidthsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridColumnWidthsHtml,
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
        {
          type: GuideSectionTypes.HTML,
          code: dataGridColumnActionsHtml,
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
        {
          type: GuideSectionTypes.HTML,
          code: dataGridColumnCellActionsHtml,
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
