import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCodeBlock } from '../../../../src/components';

import DataGridSelection from './selection';
const dataGridSelectionSource = require('!!raw-loader!./selection');
const dataGridSelectionHtml = renderToHtml(DataGridSelection);

const gridSnippet = `<EuiDataGrid
  {...usualProps}
  selection=
/>
`;

export const DataGridSelectionExample = {
  title: 'Data grid row selection',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridSelectionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridSelectionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>Blurb about selection API.</p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridSelection },

      props: {
        EuiDataGrid,
      },
      demo: <DataGridSelection />,
    },
  ],
};
