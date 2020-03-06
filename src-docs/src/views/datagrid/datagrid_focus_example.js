import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import { EuiCode } from '../../../../src/components';

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
            Focus focus focus, focus <EuiCode>focus</EuiCode>, focus focus focus. Focus focus. Focus!
          </p>
          <p>
            ✅ No focusable elements (+ is not expandable): focus cell, no interaction
          </p>
          <p>
            ✅ Only one focusable element (not expandable): shift focus to the element
          </p>
          <p>
            ✅ Only one focusable element (the expansion button): outline cell, focus on expansion button
          </p>
          <p>
            ✅ 2+ focusable elements (not expandable): focus cell, enter/f2 enters focus trap
          </p>
        </Fragment>
      ),
      components: { DataGridFocus },
      demo: <DataGridFocus />,
    },
  ],
};
