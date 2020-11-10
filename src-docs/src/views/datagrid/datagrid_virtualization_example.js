import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import DataGridVirtualization from './virtualization';
const dataGridVirtualizationSource = require('!!raw-loader!./virtualization');
const dataGridVirtualizationHtml = renderToHtml(DataGridVirtualization);

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
            Virtualization description
          </p>
        </Fragment>
      ),
      components: { DataGridVirtualization },
      demo: <DataGridVirtualization />,
    },
  ],
};
