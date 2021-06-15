import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiCodeBlock } from '../../../../src/components';

import DataGridRowHeightOptions from './row_height_options';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_options');
const dataGridRowHeightOptionsHtml = renderToHtml(DataGridRowHeightOptions);

const rowHeightsSnippet = `
  rowHeights: {
    1: {
      lineCount: 5 // for row which have index 1 we allow to show 5 lines after that we truncate
    },
    4: 140, // for row which have index 4 we set 140 pixel
    5: 80
  }
`;

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
            <EuiCode>rowHeightOptions</EuiCode> prop. It accepts an object that
            allows for customization.
          </p>
          <p>
            The <EuiCode>rowHeightsOptions</EuiCode> prop have two properties:
          </p>
          <ul>
            <li>
              <EuiCode>defaultHeight</EuiCode> - uses for defining height which
              will be used for all rows as default (number)
            </li>
            <li>
              <EuiCode>rowHeights</EuiCode> - uses for defining height which
              will be used for defined row.
              <br />
              <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
                {rowHeightsSnippet}
              </EuiCodeBlock>
            </li>
          </ul>
        </Fragment>
      ),
      components: { DataGridRowHeightOptions },
      demo: <DataGridRowHeightOptions />,
    },
  ],
};
