import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCallOut,
  EuiCode,
  EuiSpacer,
  EuiText,
} from '../../../../../src/components';

import { EuiDataGridRowHeightsOptions } from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import DataGridRowLineHeight from './row_line_height';
const dataGridRowLineHeightSource = require('!!raw-loader!./row_height_auto');
import DataGridRowHeightOptions from './row_height_fixed';
const dataGridRowHeightOptionsSource = require('!!raw-loader!./row_height_fixed');
import DataGridRowAutoHeight from './row_height_auto';
const dataGridRowAutoHeightSource = require('!!raw-loader!./row_height_auto');

const lineHeightFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: {
      lineCount: 3 // default every row to 3 lines of text
    },
    lineHeight: '2em', // default every cell line-height to 2em
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with line height set"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  rowHeightsOptions={rowHeightsOptions}
/>
`;

const rowHeightsFullSnippet = `const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: 140, // default every row to 140px
    rowHeights: {
      1: {
        lineCount: 5, // row at index 1 will show 5 lines
      },
      4: 200, // row at index 4 will adjust the height to 200px
      5: 80,
    },
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with row heights overrides"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  rowHeightsOptions={rowHeightsOptions}
/>
`;

const autoRowHeightsFullSnippet = [
  `// the demo matches this snippet
const rowHeightsOptions = useMemo(
  () => ({
    defaultHeight: 'auto' // all rows will automatically adjust the height except rows defined in 'rowHeights'
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with auto height for rows"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  rowHeightsOptions={rowHeightsOptions}
/>`,
  `// you can also automatically adjust the height for a specific row
const rowHeightsOptions = useMemo(
  () => ({
    rowHeights: {
      1: 'auto', // row at index 1 will automatically adjust the height
      4: 140, // row at index 4 will adjust the height to 140px
    }
  }),
  []
);

<EuiDataGrid
  aria-label="Data grid with auto height for rows"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  rowHeightsOptions={rowHeightsOptions}
/>
`,
];

export const dataGridRowHeightOptionsExample = {
  sections: [
    {
      title: 'Row heights options',
      text: (
        <Fragment>
          <EuiText>
            <p>
              By default, all rows get a height of <strong>34 pixels</strong>,
              but there are scenarios where you might want to adjust the height
              to fit more content. To do that, you can pass an object to the{' '}
              <EuiCode>rowHeightsOptions</EuiCode> prop. This object accepts the
              following properties:
            </p>
            <ul>
              <li>
                <EuiCode>defaultHeight</EuiCode>
                <ul>
                  <li>Defines the default size for all rows</li>
                  <li>
                    Can be configured with an exact pixel height, a line count,
                    or <EuiCode>&quot;auto&quot;</EuiCode> to fit all content
                  </li>
                </ul>
              </li>
              <li>
                <EuiCode>rowHeights</EuiCode>
                <ul>
                  <li>Overrides the height for a specific row</li>
                  <li>
                    Can be configured with an exact pixel height, a line count,
                    or <EuiCode>&quot;auto&quot;</EuiCode> to fit all content
                  </li>
                </ul>
              </li>
              <li>
                <EuiCode>lineHeight</EuiCode>
                <ul>
                  <li>
                    Sets a default line height for all cells, which is used to
                    calculate row height
                  </li>
                  <li>
                    Accepts any value that the <EuiCode>line-height</EuiCode>{' '}
                    CSS property normally takes (e.g. px, ems, rems, or
                    unitless)
                  </li>
                </ul>
              </li>
              <li>
                <EuiCode>onChange</EuiCode>
                <ul>
                  <li>
                    Optional callback when the user changes the data grid&apos;s
                    internal <EuiCode>rowHeightsOptions</EuiCode> (e.g., via the
                    toolbar display selector).
                  </li>
                  <li>
                    Can be used to store and preserve user display preferences
                    on page refresh - see this{' '}
                    <Link to="/tabular-content/data-grid-style-display#adjusting-your-grid-to-usertoolbar-changes">
                      data grid styling and control example
                    </Link>
                    .
                  </li>
                </ul>
              </li>
              <li>
                <EuiCode>scrollAnchorRow</EuiCode>
                <ul>
                  <li>
                    Optional indicator of the row that should be used as an
                    anchor for vertical layout shift compensation.
                  </li>
                  <li>
                    Can be set to the default <EuiCode>undefined</EuiCode>,
                    <EuiCode>&quot;start&quot;</EuiCode>, or
                    <EuiCode>&quot;center&quot;</EuiCode>.
                  </li>
                  <li>
                    If set to <EuiCode>&quot;start&quot;</EuiCode>, the topmost
                    visible row will monitor for unexpected changes to its
                    vertical position and try to compensate for these by
                    scrolling the grid scroll container such that the topmost
                    row position remains stable.
                  </li>
                  <li>
                    If set to <EuiCode>&quot;center&quot;</EuiCode>, the middle
                    visible row will monitor for unexpected changes to its
                    vertical position and try to compensate for these by
                    scrolling the grid scroll container such that the middle row
                    position remains stable.
                  </li>
                  <li>
                    This is particularly useful when the grid contains
                    <EuiCode>auto</EuiCode> sized rows. Since these rows are
                    measured as they appear in the overscan, they can cause
                    surprising shifts of the vertical position of all following
                    rows when their measured height is different from the
                    estimated height.
                  </li>
                </ul>
              </li>
            </ul>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut
            color="warning"
            title="Rows have minimum height requirements"
          >
            <p>
              Rows must be at least <strong>34 pixels</strong> tall so they can
              render at least one line of text. If you provide a smaller height
              the row will default to <strong>34 pixels</strong>.
            </p>
          </EuiCallOut>
          <EuiSpacer />
        </Fragment>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dataGridRowLineHeightSource,
        },
      ],
      title: 'Setting a default height and line height for rows',
      text: (
        <Fragment>
          <p>
            You can change the default height for all rows via the{' '}
            <EuiCode>defaultHeight</EuiCode> property. Note that the{' '}
            <EuiCode>showDisplaySelector.allowRowHeight</EuiCode> setting in{' '}
            <EuiCode>toolbarVisibility</EuiCode> means the user has the ability
            to override this default height. Users will be able to toggle
            between single rows, a configurable line count, or{' '}
            <EuiCode>&quot;auto&quot;</EuiCode>.
          </p>
          <p>
            You can also customize the line height of all cells with the{' '}
            <EuiCode>lineHeight</EuiCode> property. However, if you wrap your
            cell content with CSS that overrides/sets line-height (e.g. in an{' '}
            <EuiCode>EuiText</EuiCode>), your row heights will not be calculated
            correctly - make sure to match the passed{' '}
            <EuiCode>lineHeight</EuiCode> property to the actual cell content
            line height.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridRowHeightsOptions,
      },
      demo: <DataGridRowLineHeight />,
      snippet: lineHeightFullSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dataGridRowHeightOptionsSource,
        },
      ],
      title: 'Overriding specific row heights',
      text: (
        <Fragment>
          <p>
            You can override the default height of a specific row by passing a
            <EuiCode>rowHeights</EuiCode> object associating the row&apos;s
            index with a specific height configuration.
          </p>
          <EuiCallOut
            color="warning"
            title="Disabling the row height toolbar control"
          >
            Individual row heights will be overridden by the toolbar display
            controls. If you do not want users to be able to override specific
            row heights, set{' '}
            <EuiCode>
              toolbarVisibility.showDisplaySelector.allowRowHeight
            </EuiCode>{' '}
            to <EuiCode>false</EuiCode>.
          </EuiCallOut>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridRowHeightsOptions,
      },
      demo: <DataGridRowHeightOptions />,
      snippet: rowHeightsFullSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dataGridRowAutoHeightSource,
        },
      ],
      title: 'Auto heights for rows',
      text: (
        <Fragment>
          <p>
            To enable automatically fitting rows to their content you can set{' '}
            <EuiCode>defaultHeight=&quot;auto&quot;</EuiCode>. This ensures
            every row automatically adjusts its height to fit the contents.
          </p>
          <p>
            You can also override the height of a specific row by passing a
            <EuiCode>rowHeights</EuiCode> object associating the row&apos;s
            index with an <EuiCode>&quot;auto&quot;</EuiCode> value.
          </p>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridRowHeightsOptions,
      },
      demo: <DataGridRowAutoHeight />,
      snippet: autoRowHeightsFullSnippet,
    },
  ],
};
