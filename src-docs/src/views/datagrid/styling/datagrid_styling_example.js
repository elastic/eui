import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../../components';
import {
  EuiDataGrid,
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiBasicTable,
  EuiSpacer,
} from '../../../../../src/components';

import { EuiDataGridStyle } from '!!prop-loader!../../../../../src/components/datagrid/data_grid_types';

import DataGridStyling from './styling';
const dataGridStylingSource = require('!!raw-loader!./styling_grid');

import DataGridDisplayCallbacks from './display_callbacks';
const dataGridDisplayCallbacksSource = require('!!raw-loader!./display_callbacks');

import DataGridFocus from './focus';
const dataGridFocusSource = require('!!raw-loader!./focus');

import { dataGridRowHeightOptionsExample } from './datagrid_height_options_example';

export const gridSnippet = `gridStyle={{
  border: 'all',
  stripes: true,
  rowHover: 'highlight',
  header: 'shade',
  // If showDisplaySelector.allowDensity={true} from toolbarVisibility, fontSize and cellPadding will be superceded by what the user decides.
  fontSize: 'm',
  cellPadding: 'm',
  footer: 'overline'
}}`;

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
        <Fragment>
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
          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {gridSnippet}
          </EuiCodeBlock>
        </Fragment>
      ),
      props: {
        EuiDataGrid,
        EuiDataGridStyle,
      },
      demo: <DataGridStyling />,
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
            <strong>EuiDataGrid</strong> tracks and manages complicated focus
            state management based upon the content of the individual inner
            cells. The following scenarios are supported and tested:
          </p>
          <h3>Initial focus</h3>
          <ul>
            <li>
              When tabbing to the grid before it has received focus, the first
              cell of either the header (if it is interaction) or first content
              cell is focused.
            </li>
            <li>Datagrid does not auto-focus on mount / page load</li>
            <li>
              When removing focus from the grid and then returning, the last
              focused cell remains focused.
            </li>
          </ul>
          <h3>Click and key events</h3>
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
          <h3>
            The content and expandability of the cells dictate the focus target
            of the cell
          </h3>
          <p>
            The following combinations of focus are maintained to provide for a
            good balance between accessibility and ease of use while navigating
            the grid with your keyboard.
          </p>
          <EuiBasicTable
            columns={[
              {
                field: 'expandable',
                name: 'Expandablity',
              },
              {
                field: 'contents',
                name: 'Cell contains',
              },
              {
                field: 'result',
                name: 'Resulting focus',
                width: '50%',
                mobileOptions: {
                  width: '100%',
                },
              },
            ]}
            items={[
              {
                id: '1',
                expandable: 'Not expandable',
                contents: 'No interactive elements',
                result:
                  'Cell alone receives the focus, with no possible inner focus action',
              },
              {
                id: '2',
                expandable: 'Not expandable',
                contents: 'Single interactive element',
                result:
                  'The single inner element within the cell receives focus',
              },
              {
                id: '3',
                expandable: 'Not expandable',
                contents: 'Multiple interactive elements',
                result:
                  'The cell will allow a non-expanding focus trap on Enter keyDown',
              },
              {
                id: '4',
                expandable: 'Is expandable',
                contents:
                  'Any combination of interactive / non-interactive elements',
                result: 'The cell will focus on the expansion action',
              },
            ]}
          />
          <EuiSpacer />
          <EuiCallOut
            color="warning"
            title="Don't off cell expansion when the width of the column is unknown"
          >
            In general, you should change <EuiCode>isExpandable</EuiCode> to{' '}
            <EuiCode>false</EuiCode> only when you know the exact width and
            number of items that a cell will include. Control columns that
            contain row actions are a good example of when to use them. In
            certain scenarios, allowing multiple interactive elements in cells
            when you cannot control the width can lead to hidden focus because
            the content is truncated.
          </EuiCallOut>
        </Fragment>
      ),
      demo: <DataGridFocus />,
    },
  ],
};
