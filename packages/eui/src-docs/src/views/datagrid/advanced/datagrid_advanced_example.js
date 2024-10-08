import React from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiCode,
  EuiSpacer,
  EuiCallOut,
  EuiTitle,
  EuiLink,
} from '../../../../../src/components';

import { EuiDataGridRefProps } from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import { DataGridMemoryExample } from './datagrid_memory_example';
import { DataGridCustomBodyExample } from './render_custom_grid_body/example';

import DataGridRef from './ref';
const dataGridRefSource = require('!!raw-loader!./ref');
const dataGridRefSnippet = `const dataGridRef = useRef();
<EuiDataGrid ref={dataGridRef} {...props} />

// Manually toggle the data grid's fullscreen state
dataGridRef.current.setIsFullScreen(true);

// Manually focus a specific cell within the data grid
dataGridRef.current.setFocusedCell({ rowIndex, colIndex });

// Manually opens the popover of a specified cell within the data grid
dataGridRef.current.openCellPopover({ rowIndex, colIndex });

// Close any open cell popover
dataGridRef.current.closeCellPopover();
`;

export const DataGridAdvancedExample = {
  title: 'Data grid advanced',
  sections: [
    {
      title: 'Ref methods',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dataGridRefSource,
        },
      ],
      text: (
        <>
          <p>
            For advanced use cases, and particularly for data grids that manage
            associated modals/flyouts and need to manually control their grid
            cell popovers & focus states, we expose certain internal methods via
            the <EuiCode>ref</EuiCode> prop of <strong>EuiDataGrid</strong>.
            These methods are:
          </p>
          <ul>
            <li>
              <p>
                <EuiCode>setIsFullScreen(isFullScreen)</EuiCode> - controls the
                fullscreen state of the data grid. Accepts a true/false boolean
                flag.
              </p>
            </li>
            <li>
              <EuiCode>setFocusedCell({'{ rowIndex, colIndex }'})</EuiCode> -
              focuses the specified cell in the grid.
              <EuiSpacer size="s" />
              <EuiCallOut
                iconType="accessibility"
                title="Using this method is an accessibility requirement if your data
                grid toggles a modal or flyout."
                color="warning"
              >
                Your modal or flyout should restore focus into the grid on close
                to prevent keyboard or screen reader users from being stranded.
              </EuiCallOut>
              <EuiSpacer size="m" />
            </li>
            <li>
              <EuiCode>openCellPopover({'{ rowIndex, colIndex }'})</EuiCode> -
              opens the specified cell&apos;s popover contents.
              <EuiSpacer size="m" />
            </li>
            <li>
              <p>
                <EuiCode>closeCellPopover()</EuiCode> - closes any currently
                open cell popover.
              </p>
            </li>
          </ul>

          <EuiCallOut title="Handling cell location">
            When using <EuiCode>setFocusedCell</EuiCode> or{' '}
            <EuiCode>openCellPopover</EuiCode>, keep in mind:
            <ul>
              <li>
                <EuiCode>colIndex</EuiCode> is affected by the user reordering
                or hiding columns.
              </li>
              <li>
                If the passed cell indices are outside the data grid&apos;s
                total row count or visible column count, an error will be
                thrown.
              </li>
              <li>
                If the data grid is paginated or sorted, the grid will handle
                automatically finding specified row index&apos;s correct
                location for you.
              </li>
            </ul>
          </EuiCallOut>

          <EuiSpacer size="s" />

          <EuiTitle>
            <h3>react-window methods</h3>
          </EuiTitle>
          <p>
            <EuiCode>EuiDataGrid</EuiCode> also exposes several underlying
            methods from{' '}
            <EuiLink
              href="https://react-window.vercel.app/#/api/VariableSizeGrid"
              target="_blank"
            >
              react-window&apos;s <EuiCode>VariableSizeGrid</EuiCode> imperative
              API
            </EuiLink>{' '}
            via its <EuiCode>ref</EuiCode>:
          </p>
          <ul>
            <li>
              <p>
                <EuiCode>
                  scrollTo({'{ scrollLeft: number, scrollTop: number }'})
                </EuiCode>{' '}
                - scrolls the grid to the specified horizontal and vertical
                pixel offsets.
              </p>
            </li>
            <li>
              <p>
                <EuiCode>
                  scrollToItem(
                  {
                    '{ align: string = "auto", columnIndex?: number, rowIndex?: number }'
                  }
                  )
                </EuiCode>{' '}
                - scrolls the grid to the specified row and columns indices
              </p>
            </li>
          </ul>
          <EuiCallOut title="react-window vs. EUI">
            <p>
              Unlike EUI&apos;s ref APIs, <EuiCode>rowIndex</EuiCode> here
              refers to the <strong>visible</strong> <EuiCode>rowIndex</EuiCode>{' '}
              when passed to a method of a native{' '}
              <EuiCode>react-window</EuiCode> API.
            </p>
            <p>
              For example:{' '}
              <EuiCode>
                {'scrollToItem({ rowIndex: 50, columnIndex: 0 })'}
              </EuiCode>{' '}
              will always scroll to 51st visible row on the currently visible
              page, regardless of the content in the cell. In contrast,{' '}
              <EuiCode>
                {'setFocusedCell({ rowIndex: 50, colIndex: 0 })'}
              </EuiCode>{' '}
              will scroll to the 51st row in your data, which may not be the
              51st visible row in the grid if it is paginated or sorted.
            </p>
          </EuiCallOut>

          <EuiSpacer />

          <p>
            The below example shows how to use the internal APIs for a data grid
            that opens a modal via cell actions, that scroll to specific cells,
            and that can be put into full-screen mode.
          </p>
        </>
      ),
      components: { DataGridRef },
      demo: <DataGridRef />,
      snippet: dataGridRefSnippet,
      props: { EuiDataGridRefProps },
    },
    ...DataGridMemoryExample.sections,
    DataGridCustomBodyExample,
  ],
};
