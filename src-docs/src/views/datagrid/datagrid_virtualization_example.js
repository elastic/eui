import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { EuiCallOut, EuiCode } from '../../../../src/components';
import { GuideSectionTypes } from '../../components';

import DataGridVirtualization from './virtualization';
const dataGridVirtualizationSource = require('!!raw-loader!./virtualization');
const dataGridVirtualizationHtml = renderToHtml(DataGridVirtualization);

import DataGridVirtualizationConstrained from './virtualization_constrained';
const dataGridVirtualizationConstrainedSource = require('!!raw-loader!./virtualization_constrained');
const dataGridVirtualizationConstrainedHtml = renderToHtml(
  DataGridVirtualizationConstrained
);

export const DataGridVirtualizationExample = {
  title: 'Data grid virtualization',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridVirtualizationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridVirtualizationHtml,
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
      components: { DataGridVirtualization },
      demo: <DataGridVirtualization />,
    },
    {
      title: 'Constrained by DOM',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridVirtualizationConstrainedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridVirtualizationConstrainedHtml,
        },
      ],
      demo: <DataGridVirtualizationConstrained />,
    },
  ],
};
