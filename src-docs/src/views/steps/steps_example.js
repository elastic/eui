import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import Steps from './steps';
const stepsSource = require('!!raw-loader!./steps');
const stepsHtml = renderToHtml(Steps);

export const StepsExample = {
  title: 'Steps',
  sections: [{
    title: 'Steps',
    source: [{
      type: GuideSectionTypes.JS,
      code: stepsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: stepsHtml,
    }],
    text: (
      <p>
        Numbered steps
      </p>
    ),
    demo: <Steps />,
  }],
};
