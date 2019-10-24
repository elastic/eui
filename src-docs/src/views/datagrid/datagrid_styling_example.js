import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiDataGrid, EuiCode, EuiCodeBlock } from '../../../../src/components';

import DataGridContainer from './container';
const dataGridContainerSource = require('!!raw-loader!./container');
const dataGridContainerHtml = renderToHtml(DataGridContainer);

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling');
const dataGridStylingHtml = renderToHtml(DataGridStyling);

import { DataGridStyle, DataGridToolbarVisibilityOptions } from './props';

const gridSnippet = `<EuiDataGrid
  {...usualProps}
  // This can work as a shape.
  toolbarVisibility={{
    showColumnSelector: false
    showStyleSelector: false
    showSortSelector: false
    showFullScreenSelector: false
  }}
  // Or as a boolean to turn everything off.
  toolbarVisibility={false}
  // Change the initial style of the grid.
  gridStyle={{
    border: 'all',
    stripes: true,
    rowHover: 'highlight',
    header: 'shade',
    // If showStyleSelector={true} from toolbarVisibility, these last two will be superceded by what the user decides.
    fontSize: 'm',
    cellPadding: 'm',
  }}
/>
`;

export const DataGridStylingExample = {
  title: 'Data grid styling',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridStylingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Styling can be passed down to the grid through the{' '}
            <EuiCode>gridStyle</EuiCode> prop. It accepts an object that allows
            for customization.
          </p>
          <p>
            The <EuiCode>toolbarVisibility</EuiCode> prop when used as a boolean
            controls the visibility of the toolbar displayed above the grid.
            Using the prop as a shape, allows setting the visibility of the
            individual buttons within.
          </p>
          <p>
            With the default settings, the <EuiCode>showStyleSelector</EuiCode>{' '}
            setting in <EuiCode>toolbarVisibility</EuiCode> means the user has
            the ability to override the padding and font size passed into{' '}
            <EuiCode>gridStyle</EuiCode> by the engineer.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      components: { DataGridStyling },

      props: {
        EuiDataGrid,
        EuiDataGridStyle: DataGridStyle,
        EuiDataGridToolbarVisibilityOptions: DataGridToolbarVisibilityOptions,
      },
      demo: <DataGridStyling />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridContainerHtml,
        },
      ],
      title: 'Data grid adapts to its container',
      text: (
        <p>
          When wrapped inside a container, like a dashboard panel, the grid will
          start hiding controls and adopt a more strict flex layout
        </p>
      ),
      components: { DataGridContainer },

      demo: <DataGridContainer />,
    },
  ],
};
