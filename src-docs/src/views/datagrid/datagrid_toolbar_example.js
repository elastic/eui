import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';

import DataGridStyling from './toolbar/visibility';
const dataGridStylingSource = require('!!raw-loader!./toolbar/_grid');

import DataGridControls from './toolbar/additional_controls';
const dataGridControlsSource = require('!!raw-loader!./toolbar/additional_controls');

import ToolbarPropsTable from './toolbar/_props';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridToolBarVisibilityColumnSelectorOptions,
  EuiDataGridToolBarVisibilityDisplaySelectorOptions,
} from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';

const controlsSnippet = `<EuiDataGrid
  {...usualGridProps}
  toolbarVisibility={{
    // Use of a fragment for multiple items will insure proper margins
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
      ),
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

export const DataGridToolbarExample = {
  title: 'Data grid toolbar',
  sections: [
    {
      title: 'Toolbar visibility',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
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
        </Fragment>
      ),
      props: {
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridToolBarVisibilityColumnSelectorOptions,
        EuiDataGridToolBarVisibilityDisplaySelectorOptions,
      },
      demo: <DataGridStyling />,
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
            to pass more buttons to the toolbar. It will respect the{' '}
            <EuiCode language="js">toolbarVisibility={'{false}'}</EuiCode>{' '}
            setting and hide when appropriate.
          </p>
          <p>
            Passing a single node to <EuiCode>additionalControls</EuiCode> will
            default to being appended to the left side of the toolbar. To
            configure which side of the toolbar your controls display in, pass
            an object with either the <EuiCode>left</EuiCode> or{' '}
            <EuiCode>right</EuiCode> properties:
          </p>
          <ul>
            <li>
              <EuiCode>additionalControls.left</EuiCode> appends the passed
              custom control into the left side of the toolbar, after the column
              & sort controls.
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
      snippet: controlsSnippet,
      props: {
        EuiDataGridToolBarAdditionalControlsOptions,
      },
      demo: <DataGridControls />,
    },
    {
      title: 'Toolbar props',
      text: <ToolbarPropsTable />,
    },
  ],
};
