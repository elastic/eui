import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import { EuiCode } from '../../../../../src';

import DataGridStyling from './visibility';
const dataGridStylingSource = require('!!raw-loader!./_grid');

import DataGridControls from './additional_controls';
const dataGridControlsSource = require('!!raw-loader!./additional_controls');

import ToolbarPropsTable from './_props';

import {
  EuiDataGridToolBarVisibilityOptions,
  EuiDataGridToolBarAdditionalControlsOptions,
  EuiDataGridToolBarVisibilityColumnSelectorOptions,
  EuiDataGridToolBarVisibilityDisplaySelectorOptions,
  EuiDataGridToolBarAdditionalControlsLeftOptions,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

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
      snippet: controlsSnippet,
      props: {
        EuiDataGridToolBarVisibilityOptions,
        EuiDataGridToolBarAdditionalControlsOptions,
        EuiDataGridToolBarAdditionalControlsLeftOptions,
      },
      demo: <DataGridControls />,
    },
    {
      title: 'Toolbar props',
      text: <ToolbarPropsTable />,
    },
  ],
};
