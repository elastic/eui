import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
} from '../../../../../src/components';

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling_grid');

import DataGridFocus from './focus';
const dataGridFocusSource = require('!!raw-loader!./focus');

import {
  EuiDataGridStyle,
  EuiDataGridToolBarVisibilityOptions,
} from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import { dataGridRowHeightOptionsExample } from './datagrid_height_options_example';

export const gridSnippet = `<EuiDataGrid
  {...usualProps}
  columns={[
    // three columns are available, but restrict Avatar to 50px and don't let users resize it
    { id: 'Avatar', initialWidth: 50, isResizable: false },
    { id: 'Name' },
    { id: 'Email' },
  ]}
  // This can work as a shape.
  toolbarVisibility={{
    showDisplaySelector: false,
    showSortSelector: false,
    showFullScreenSelector: false,
    // showColumnSelector also takes an object, check the prop docs.
    showColumnSelector: false,
    additionalControls: {
      left: (
        <Fragment>
          <EuiButtonEmpty
            size="xs"
            onClick={() => {}}>
            New button
          </EuiButtonEmpty>
          <EuiButtonEmpty
            size="xs"
            onClick={() => {}}>
            Another button
          </EuiButtonEmpty>
        </Fragment>
      )
    }
  }}
  // Or as a boolean to turn everything off.
  toolbarVisibility={false}
  // Change the initial style of the grid.
  gridStyle={{
    border: 'all',
    stripes: true,
    rowHover: 'highlight',
    header: 'shade',
    // If showDisplaySelector.allowDensity={true} from toolbarVisibility, fontSize and cellPadding will be superceded by what the user decides.
    fontSize: 'm',
    cellPadding: 'm',
    footer: 'overline'
  }}
/>
`;

export const DataGridStylingExample = {
  title: 'Data grid style & display',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridStylingSource,
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
            With the default settings, the{' '}
            <EuiCode>showDisplaySelector.allowDensity</EuiCode> setting in{' '}
            <EuiCode>toolbarVisibility</EuiCode> means the user has the ability
            to override the padding and font size passed into{' '}
            <EuiCode>gridStyle</EuiCode> by the engineer. The font size
            overriding only works with text or elements that can inherit the
            parent font size or elements that use units relative to the parent
            container.
          </p>
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridStyle,
        EuiDataGridToolBarVisibilityOptions,
      },
      demo: <DataGridStyling />,
    },
    ...dataGridRowHeightOptionsExample.sections,
    {
      title: 'Focus',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridFocusSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            Data Grid tracks and manages complicated focus state management
            based upon the content of the individual inner cells. The following
            scenarios are supported and tested:
          </p>
          <h2>Initial focus</h2>
          <ul>
            <li>
              When tabbing to the grid before it has received focus, the first
              cell of either the header (if it is interaction) or first content
              cell is focused.
            </li>
            <li> Datagrid does not auto-focus on mount / page load</li>
            <li>
              When removing focus from the grid and then returning, the last
              focused cell remains focused.
            </li>
          </ul>
          <h2>Click and key events</h2>
          <ul>
            <li>
              Clicking on an interactive cell (not its content) should focus on
              the cell, or if it has only one interactive element the focus
              should shift to the element.
            </li>
            <li>
              Clicking on an interactive element within a cell the focus should
              always remain on that element, not shift to the cell or another
              element unless a subsequent user action changes it.
            </li>
            <li>
              Enter or F2 can be used interchangeably to enter inner cell focus
              if the logic below allows it.
            </li>
          </ul>
          <h2>
            The content and expandability of the cells dictate the focus target
            of the cell
          </h2>
          <p>
            The following combinations of focus are maintained to provide for a
            good balance between accessibility and ease of use while navigating
            a grid with your keyboard.
          </p>
          <h3>
            Cell alone receives the focus, with no possible inner focus action
            when:
          </h3>
          <ul>
            <li>The cell is not expandable.</li>
            <li>The cell has no interactive elements</li>
          </ul>
          <h3>A single inner element within the cell receives focus when:</h3>
          <ul>
            <li>The cell is not expandable.</li>
            <li>The cell has a single interaction element.</li>
          </ul>
          <h3>A cell will focus on the expansion action when:</h3>
          <ul>
            <li>The expansion ability is allowed on the cell.</li>
            <li>
              Any combination of interactive / non-interactive is contained in
              the cell contents.
            </li>
          </ul>
          <h3>A cell will allow a non-expanding focus trap on keyDown when</h3>
          <ul>
            <li>The cell is not expandable.</li>
            <li>The cell contains multiple interactive elements.</li>
          </ul>
          <EuiCallOut
            size="s"
            color="warning"
            title="A caution about turning off cell expansion when the width of the column is unknown"
          >
            In general, you should turn <EuiCode>isExpandible</EuiCode> to false
            only when you know the exact width and number of items that a cell
            will include. Control columns that contain row actions are a good
            example of when to use them. In certain scenarios, allowing multiple
            interactive elements in cells when you can not control the width can
            lead to hidden focus because the content is truncated.
          </EuiCallOut>
        </Fragment>
      ),
      demo: <DataGridFocus />,
    },
  ],
};
