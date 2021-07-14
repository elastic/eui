import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import {
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
} from '../../../../src/components';

import DataGridRowHeightOptions from './row_height_options';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_options');
const dataGridRowHeightOptionsHtml = renderToHtml(DataGridRowHeightOptions);

const rowHeightsSnippet = `
  {
    defaultHeight: {
      lineCount: 2, // default every row to 2 lines of text. Also we can provide height in pixels
    },
    rowHeights: {
      1: {
        lineCount: 5, // for row which have index 1 we allow to show 5 lines after that we truncate
      },
      4: 140, // for row which have index 4 we set 140 pixel
      5: 80,
    },
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
            <EuiCode>rowHeightsOptions</EuiCode> prop. It accepts an object
            configuring the default height and/or specific row heights:
          </p>
          <ul>
            <li>
              <EuiCode>defaultHeight</EuiCode> - defines the default size for
              all rows
            </li>
            <li>
              <EuiCode>rowHeights</EuiCode> - overrides the height for a
              specific row
            </li>
          </ul>
          <EuiCallOut
            color="warning"
            title="Rows have minimum height requirements">
            <p>
              Rows must be at least <strong>34 pixels</strong> tall so they can
              render at least one line of text. If you provide a smaller height
              the row will default to 34 pixels.
            </p>
          </EuiCallOut>
          <EuiSpacer />
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {rowHeightsSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridRowHeightOptions },
      demo: <DataGridRowHeightOptions />,
    },
  ],
};
