import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiCallOut, EuiCode } from '../../../../src/components';

import DataGridFocus from './focus';
const dataGridFocusSource = require('!!raw-loader!./focus');
const dataGridFocusHtml = renderToHtml(DataGridFocus);

export const DataGridFocusExample = {
  title: 'Data grid focus',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dataGridFocusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dataGridFocusHtml,
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
      components: { DataGridFocus },
      demo: <DataGridFocus />,
    },
  ],
};
