import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import {
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import DataGridRowHeightOptions from './row_height_options';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_options');
const dataGridRowHeightOptionsHtml = renderToHtml(DataGridRowHeightOptions);
import DataGridRowAutoHeight from './row_auto_height';
const dataGridRowAutoHeightSource = require('!!raw-loader!./row_auto_height');
const dataGridRowAutoHeightHtml = renderToHtml(DataGridRowAutoHeight);

const rowHeightsSnippet = `rowHeightsOptions = {
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
}`;

const autoRowHeightsSnippet = `
  {
    defaultHeight: 'auto', // each row auto fit to content except rows which was defined in 'rowHeights'
    rowHeights: {
      1: {
        lineCount: 5, // for row which have index 1 we allow to show 5 lines after that we truncate
      },
      4: 140, // for row which have index 4 we set 140 pixel
    },
  }
`;

export const DataGridRowHeightOptionsExample = {
  title: 'Data grid row height options',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          Row height options can be passed down to the grid through the{' '}
          <EuiCode>rowHeightsOptions</EuiCode> prop. It accepts an object
          configuring the default height and/or specific row heights:
        </p>
        <ul>
          <li>
            <EuiCode>defaultHeight</EuiCode> - defines the default size for all
            rows
          </li>
          <li>
            <EuiCode>rowHeights</EuiCode> - overrides the height for a specific
            row
          </li>
        </ul>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut color="warning" title="Rows have minimum height requirements">
        <p>
          Rows must be at least <strong>34 pixels</strong> tall so they can
          render at least one line of text. If you provide a smaller height the
          row will default to 34 pixels.
        </p>
      </EuiCallOut>
      <EuiSpacer />
    </Fragment>
  ),
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
      title: 'Fixed heights for rows',
      text: (
        <Fragment>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {rowHeightsSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridRowHeightOptions },
      demo: <DataGridRowHeightOptions />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowAutoHeightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridRowAutoHeightHtml,
        },
      ],
      title: 'Auto-fit row to content',
      text: (
        <Fragment>
          <p>
            Row height options also supports to set value so that rows auto fit
            to content. Just provide <EuiCode>auto</EuiCode> as value for{' '}
            <EuiCode>defaultHeight</EuiCode> or for one of the rows in{' '}
            <EuiCode>rowHeights</EuiCode>
          </p>
          <EuiSpacer />
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {autoRowHeightsSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridRowAutoHeight },
      demo: <DataGridRowAutoHeight />,
    },
  ],
};
