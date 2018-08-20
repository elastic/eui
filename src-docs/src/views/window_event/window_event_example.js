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
  title: 'Window Events',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: source,
    }, {
      type: GuideSectionTypes.HTML,
      code: html,
    }],
    text: (
      <div>
        <p>
          Use an <EuiCode>EuiWindowEvent</EuiCode> to safely and declaratively manage adding and auto-removing
          event listeners to the <EuiCode>window</EuiCode>.
        </p>
        <p>
          This is preferable to setting up your own window event listeners because it will remove old
          events when your component unmounts, preventing you from accidentally leaving them around forever.
        </p>
      </div>
    ),
    components: { EuiWindowEvent },
    demo: <WindowEvent />,
  }],
};
