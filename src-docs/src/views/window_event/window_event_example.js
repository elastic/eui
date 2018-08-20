import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiWindowEvent,
} from '../../../../src/components';

import { WindowEvent } from './window_event';
const source = require('!!raw-loader!./window_event');
const html = renderToHtml(WindowEvent);

export const WindowEventExample = {
  title: 'Window Event',
  sections: [{
    title: 'Window Event',
    source: [{
      type: GuideSectionTypes.JS,
      code: source,
    }, {
      type: GuideSectionTypes.HTML,
      code: html,
    }],
    text: (
      <p>
        Use an <EuiCode>EuiWindowEvent</EuiCode> to safely manage adding and auto-removing event listeners to <EuiCode>window</EuiCode>.
      </p>
    ),
    components: { EuiWindowEvent },
    demo: <WindowEvent />,
  }],
};
