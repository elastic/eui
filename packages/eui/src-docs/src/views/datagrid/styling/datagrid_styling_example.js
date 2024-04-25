import React from 'react';

import { GuideSectionTypes } from '../../../components';
import { EuiDataGrid, EuiCode } from '../../../../../src/components';

import { EuiDataGridStyle } from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling_grid');

import DataGridRowClasses from './row_classes';
const dataGridRowClassesSource = require('!!raw-loader!./row_classes');

import DataGridDisplayCallbacks from './display_callbacks';
const dataGridDisplayCallbacksSource = require('!!raw-loader!./display_callbacks');

import { dataGridRowHeightOptionsExample } from './datagrid_height_options_example';
import { gridSnippets } from '../_snippets';

const gridStyleSnippet = `
// memoize your gridStyle if necessary, or declare it as a constant outside of components to reduce grid re-renders
const ${gridSnippets.gridStyle};

<EuiDataGrid
  aria-label="Data grid with grid style set"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  gridStyle={gridStyle}
/>
`;

const dataGridRowClassesSnippet = `
<EuiDataGrid
  aria-label="Data grid with gridStyle.rowClasses set"
  columns={columns}
  columnVisibility={{ visibleColumns, setVisibleColumns }}
  rowCount={rowCount}
  renderCellValue={renderCellValue}
  gridStyle={{
    rowClasses: {
      0: 'someClass', // the first row will receive the 'someClass' class
      1: 'anotherClass',
      5: 'etc',
    }
  }}
/>
`;

export const DataGridStylingExample = {
  title: 'Data grid style & display',
  sections: [
    {
      title: 'Grid style',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
        },
      ],
      text: (
        <>
          <p>
            Styling can be passed down to the grid through the{' '}
            <EuiCode>gridStyle</EuiCode> prop. It accepts an object that allows
            for customization.
          </p>
          <p>
            With the default settings, the{' '}
            <EuiCode>showDisplaySelector.allowDensity</EuiCode> setting in{' '}
            <EuiCode>toolbarVisibility</EuiCode> means the user has the ability
            to override the padding and font size passed into{' '}
            <EuiCode>gridStyle</EuiCode> by the engineer. The font size
            overriding only works with text or elements that can inherit the
            parent font size or elements that use units relative to the parent
            container.
          </p>
        </>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridStyle,
      },
      snippet: gridStyleSnippet,
      demo: <DataGridStyling />,
    },
    {
      title: 'Grid row classes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridRowClassesSource,
        },
      ],
      text: (
        <>
          <p>
            Specific rows can be highlighted or otherwise have custom styling
            passed to them via the
            <EuiCode>gridStyle.rowClasses</EuiCode> prop. It accepts an object
            associating the row&apos;s index with a class name string.
          </p>
          <p>
            The example below sets a custom striped class on the 3rd row and
            dynamically updates the <EuiCode>rowClasses</EuiCode> map when rows
            are selected.
          </p>
        </>
      ),
      props: {
        EuiDataGridStyle,
      },
      snippet: dataGridRowClassesSnippet,
      demo: <DataGridRowClasses />,
    },
    ...dataGridRowHeightOptionsExample.sections,
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridDisplayCallbacksSource,
        },
      ],
      title: 'Adjusting your grid to user/toolbar changes',
      text: (
        <>
          <p>
            You can use the optional <EuiCode>gridStyle.onChange</EuiCode> and{' '}
            <EuiCode>rowHeightsOptions.onChange</EuiCode> callbacks to adjust
            your data grid based on user density or row height changes.
          </p>
          <p>
            For example, if the user changes the grid density to compressed, you
            may want to adjust a cell&apos;s content sizing in response. Or you
            could store user settings in localStorage or other database to
            preserve display settings on page refresh, like the below example
            does.
          </p>
        </>
      ),
      demo: <DataGridDisplayCallbacks />,
    },
  ],
};
