import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import {
  EuiCode,
} from '../../../../src/components';

import DataGridRowHeightOptions from './row_height_options';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_options');
const dataGridRowHeightOptionsHtml = renderToHtml(DataGridRowHeightOptions);

export const DataGridRowHeightOptionsExample = {
  title: 'Data grid row height options',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowHeightOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridRowHeightOptionsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Row height options can be passed down to the grid through the{' '}
            <EuiCode>rowHeightOptions</EuiCode> prop. It accepts an object that allows
            for customization.
          </p>
          <p>
            The <EuiCode>rowHeightOptions</EuiCode> prop have two properties:
          </p>
          <ul>
            <li><EuiCode>defaultHeight</EuiCode> - uses for defining height which will be used for all rows as default (number)</li>
            <li><EuiCode>initialHeights</EuiCode> - uses for defining height which will be used for defined row.<br />
              This is an object where the key is the row number and the value is its height.
            </li>
          </ul>
        </Fragment>
      ),
      components: { DataGridRowHeightOptions },
      demo: <DataGridRowHeightOptions />,
    },
  ],
};