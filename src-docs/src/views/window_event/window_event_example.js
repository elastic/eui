import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiWindowEvent
} from '../../../../src/services';

import {
  EuiCode,
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
          Use an <EuiCode>EuiWindowEvent</EuiCode> to safely and declaratively manage adding and auto-removing event listeners
          to the <EuiCode>window</EuiCode>. This is preferable to setting up your own window event listeners because it will remove
          old listeners when your component unmounts, preventing you from accidentally leaving them around forever.
        </p>
        <p>
          To add a window event listener, render this component with two props: the DOM event name (e.g. click, keydown)
          and a handler function that will be called when the event is triggered on the window element.
        </p>
      </div>
    ),
    components: { EuiWindowEvent },
    demo: <WindowEvent />,
  }],
};
