import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

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
          <p>Virtualization description</p>
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
      text: (
        <Fragment>
          <p>Virtualization description</p>
        </Fragment>
      ),
      demo: <DataGridVirtualizationConstrained />,
    },
  ],
};
