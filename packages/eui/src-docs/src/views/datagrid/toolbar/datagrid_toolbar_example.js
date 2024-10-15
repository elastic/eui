import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGridToolbarControl,
  EuiCode,
  EuiCallOut,
} from '../../../../../src';

import DataGridToolbarVisibility from './visibility';
const dataGridToolbarVisibilitySource = require('!!raw-loader!./_grid');

import DataGridControls from './additional_controls';
const dataGridControlsSource = require('!!raw-loader!./additional_controls');

import DataGridCustomToolbar from './render_custom_toolbar';
const dataGridCustomToolbarSource = require('!!raw-loader!./render_custom_toolbar');

import ToolbarPropsTable from './_props';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridToolBarVisibilityColumnSelectorOptions,
  EuiDataGridToolBarVisibilityDisplaySelectorOptions,
  EuiDataGridToolBarAdditionalControlsLeftOptions,
  EuiDataGridCustomToolbarProps,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

/* eslint-disable local/css-logical-properties */
const controlsSnippet = `<EuiDataGrid
  aria-label="Data grid with additional toolbar controls"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  toolbarVisibility={{
    // Use of a fragment for multiple items will insure proper margins
    additionalControls: {
      left: {
        prepend: (
          <>
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
          </>
        ),
        append: (
          <>
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
          </>
        ),
      },
      right: (
        <>
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
        </>
      ),
    },
    // Additional controls can also be passed to the display settings popover
    showDisplaySelector: {
      additionalDisplaySettings: <div>Custom settings content</div>,
    },
  }}
/>
`;

export const DataGridToolbarExample = {
  title: 'Data grid toolbar',
  sections: [
    {
      title: 'Toolbar visibility',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridToolbarVisibilitySource,
        },
      ],
      text: (
        <Fragment>
          <p>
            The <EuiCode>toolbarVisibility</EuiCode> prop when used as a boolean
            controls the visibility of the entire toolbar displayed above the
            grid. Using the prop as a shape, allows setting the visibility of
            the individual controls within.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridToolBarVisibilityColumnSelectorOptions,
        EuiDataGridToolBarVisibilityDisplaySelectorOptions,
      },
      demo: <DataGridToolbarVisibility />,
      snippet: `<EuiDataGrid
  aria-label="Data grid with additional toolbar controls"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  toolbarVisibility={{
    showColumnSelector: false,
    showSortSelector: false,
    showDisplaySelector: false,
    showFullScreenSelector: false,
  }}
/>`,
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
            <EuiCode>{'<EuiDataGridToolbarControl />'}</EuiCode> for the
            left-side of the toolbar and{' '}
            <EuiCode>{'<EuiButtonIcon size="xs" />'}</EuiCode> for the
            right-side of the toolbar.
          </p>
        </>
      ),
      snippet: controlsSnippet,
      props: {
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridToolBarAdditionalControlsLeftOptions,
        EuiDataGridToolbarControl,
      },
      demo: <DataGridControls />,
    },
    {
      title: 'Completely custom toolbar rendering',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dataGridCustomToolbarSource,
        },
      ],
      text: (
        <>
          <p>
            If more customized control over the toolbar is required than{' '}
            <EuiCode>toolbarVisibility</EuiCode> or{' '}
            <EuiCode>additionalControls</EuiCode> allows, you can use the{' '}
            <EuiCode>renderCustomToolbar</EuiCode> prop to pass a component. The
            default datagrid controls are passed back as parameters for optional
            usage.
          </p>
          <p>
            <EuiCode>renderCustomToolbar</EuiCode> should only be used when a
            very custom layout (e.g. moving default buttons between sides,
            interspering custom controls between default controls, custom
            responsive behavior, etc.) is required. For consistent visuals, we
            recommend using the{' '}
            <EuiCode>{'<EuiDataGridToolbarControl />'}</EuiCode> subcomponent
            when rendering custom controls.
          </p>
          <EuiCallOut
            color="warning"
            iconType="alert"
            title="Keep consistency in mind when customizing the toolbar"
          >
            If using multiple datagrid instances across your app, users will
            typically want to reach for the same controls for each grid.
            Changing the available controls inconsistently across your app may
            result in user frustration.
          </EuiCallOut>
        </>
      ),
      demo: <DataGridCustomToolbar />,
      props: {
        EuiDataGridCustomToolbarProps,
        EuiDataGridToolbarControl,
      },
      snippet: `<EuiDataGrid
  aria-label="Data grid with a custom toolbar and additional content in the display settings popover "
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCustomToolbar={({ displayControl }) => <div>Custom toolbar content {displayControl}</div>}
  toolbarVisibility={{
    showDisplaySelector: {
      customRender: ({ densityControl }) => <div>Custom display selector {densityControl}</div>
    }
  }}
/>`,
    },
    {
      title: 'Toolbar props',
      text: (
        <>
          <h3>
            <EuiCode>EuiDataGridToolBarVisibilityOptions</EuiCode>
          </h3>
          <ToolbarPropsTable />
        </>
      ),
    },
  ],
};
