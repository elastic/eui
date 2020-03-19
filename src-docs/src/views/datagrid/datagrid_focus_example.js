import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiTitle } from '../../../../src/components';

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
          <EuiTitle>
            <h3>Initial focus</h3>
          </EuiTitle>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            Datagrid does not auto-focus on mount / page load
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            When tabbing to the grid before it has received focus, the first
            cell of [either header or first content row] is focused
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            When tabbing to the grid after it has received focus, the last
            focused cell remains focused
          </p>

          <EuiTitle>
            <h3>Clicking</h3>
          </EuiTitle>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            Clicking on any interactive cell appropriately focuses that cell
            and/or its content
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            Clicking on an interactive element, focus remains on that element
          </p>

          <EuiTitle>
            <h3>Cell focus states</h3>
          </EuiTitle>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            No focusable elements (+ is not expandable): focus cell, no
            interaction
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            Only one focusable element (not expandable): shift focus to the
            element
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            Only one focusable element (the expansion button): outline cell,
            focus on expansion button
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            2+ focusable elements (not expandable): focus cell, enter/f2 enters
            focus trap
          </p>
          <p>
            <span role="img" aria-label="working">
              ✅
            </span>{' '}
            1+ focusable elements (element + expandable): focus cell, enter/f2
            opens popover
          </p>
        </Fragment>
      ),
      components: { DataGridFocus },
      demo: <DataGridFocus />,
    },
  ],
};
