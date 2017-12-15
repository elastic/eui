import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

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
    title: 'Heading elements',
    source: [{
      type: GuideSectionTypes.JS,
      code: headingElementStepsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: headingElementStepsHtml,
    }],
    text: (
      <div>
        <p>
          To aid with accessibility and hierarchical headings,
          you can and should pass in a heading element to use for each step title.
          The example below shows that the logical heading element should be an <EuiCode>h2</EuiCode>
          and therefore adds <EuiCode>headingElement=&quot;h2&quot;</EuiCode> to the EuiSteps component.
        </p>
        <p>
          The style of the title will <strong>not</strong> be affected.
        </p>
      </div>
    ),
    demo: <HeadingElementSteps />,
  }],
};
