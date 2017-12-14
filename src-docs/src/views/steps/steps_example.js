import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import Steps from './steps';
const stepsSource = require('!!raw-loader!./steps');
const stepsHtml = renderToHtml(Steps);

import HeadingElementSteps from './heading_element_steps';
const headingElementStepsSource = require('!!raw-loader!./heading_element_steps');
const headingElementStepsHtml = renderToHtml(HeadingElementSteps);

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
  },
  {
    title: 'Heading Element Steps',
    source: [{
      type: GuideSectionTypes.JS,
      code: headingElementStepsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: headingElementStepsHtml,
    }],
    text: (
      <p>
        something something better accessibility
      </p>
    ),
    demo: <HeadingElementSteps />,
  }],
};
