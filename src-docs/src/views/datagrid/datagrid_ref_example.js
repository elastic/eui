import React from 'react';

import { GuideSectionTypes } from '../../components';
import {
  EuiCode,
  EuiCodeBlock,
  EuiSpacer,
  EuiCallOut,
} from '../../../../src/components';

import { EuiDataGridRefProps } from '!!prop-loader!../../../../src/components/datagrid/data_grid_types';
import DataGridRef from './ref';
const dataGridRefSource = require('!!raw-loader!./ref');
const dataGridRefSnippet = `const dataGridRef = useRef();
<EuiDataGrid ref={dataGridRef} {...props} />

// Mnaually focus a specific cell within the data grid
dataGridRef.current.setFocusedCell({ rowIndex, colIndex });
`;

export const DataGridRefExample = {
  title: 'Data grid ref methods',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRefSource,
        },
      ],
      text: (
        <>
          <p>
            For advanced use cases, and particularly for data grids that manage
            associated modals/flyouts and need to manually control their grid
            cell popovers & focus states, we expose certain internal methods via
            the <EuiCode>ref</EuiCode> prop of EuiDataGrid. These methods are:
          </p>
          <ul>
            <li>
              <EuiCode>setFocusedCell({'{ rowIndex, colIndex }'})</EuiCode> -
              focuses the specified cell in the grid.
              <EuiSpacer size="s" />
              <EuiCallOut
                iconType="accessibility"
                title="Using this method is an accessibility requirement if your data
                grid toggles a modal or flyout."
              >
                Your modal or flyout should restore focus into the grid on close
                to prevent keyboard or screen reader users from being stranded.
              </EuiCallOut>
            </li>
          </ul>
          <EuiCodeBlock language="jsx">{dataGridRefSnippet}</EuiCodeBlock>
          <p>
            The below example shows how to use the internal APIs for a data grid
            that opens a modal via cell actions.
          </p>
        </>
      ),
      components: { DataGridRef },
      demo: <DataGridRef />,
      snippet: dataGridRefSnippet,
      props: { EuiDataGridRefProps },
    },
  ],
};
