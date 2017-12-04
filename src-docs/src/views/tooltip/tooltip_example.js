import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import TooltipExamples from './examples';
const examplesSource = require('!!raw-loader!./examples');
const examplesHtml = renderToHtml(TooltipExamples);

export const TooltipExample = {
  title: 'Tooltip',
  intro: (
    <div>
      <EuiCallOut
        title="Work in progress"
        color="warning"
      >
        <p>
          This component is still undergoing active development, and its interface and implementation
          are both subject to change.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </div>
  ),
  sections: [{
    title: 'Tooltip',
    source: [{
      type: GuideSectionTypes.JS,
      code: examplesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: examplesHtml,
    }],
    text: (
      <p />
    ),
    demo: <TooltipExamples />,
  }],
};
