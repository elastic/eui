import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import DataGridDynamicHeight from './dynamic_height';
const dataGridDynamicHeightSource = require('!!raw-loader!./dynamic_height');
const dataGridDynamicHeightHtml = renderToHtml(DataGridDynamicHeight);

export const DataGridDynamicHeightExample = {
  title: 'Data grid dynamic height',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridDynamicHeightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridDynamicHeightHtml,
        },
      ],
      text: (
        <Fragment>
          <p> TODO</p>
        </Fragment>
      ),
      components: { DataGridDynamicHeight },
      demo: <DataGridDynamicHeight />,
    },
  ],
};
