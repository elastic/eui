import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiSteps,
} from '../../../../src/components';

import Steps from './steps';
const stepsSource = require('!!raw-loader!./steps');
const stepsHtml = renderToHtml(Steps);

import StepsComplex from './steps_complex';
const stepsComplexSource = require('!!raw-loader!./steps_complex');
const stepsComplexHtml = renderToHtml(StepsComplex);

import HeadingElementSteps from './heading_element_steps';
const headingElementStepsSource = require('!!raw-loader!./heading_element_steps');
const headingElementStepsHtml = renderToHtml(HeadingElementSteps);

import StepsHorizontal from './steps_horizontal';
const stepsHorizontalSource = require('!!raw-loader!./steps_horizontal');
const stepsHorizontalHtml = renderToHtml(StepsHorizontal);

export const StepsExample = {
  title: 'Steps',
  sections: [{
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
    props: { EuiSteps },
    demo: <Steps />,
  },
  {
    title: 'Complex steps',
    source: [{
      type: GuideSectionTypes.JS,
      code: stepsComplexSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: stepsComplexHtml,
    }],
    text: (
      <p>
        If you need to call out a set of substeps that are not lines of code,
        most likely a <EuiCode>&lt;ol/&gt;</EuiCode>, wrap
        the block in a <EuiCode>&lt;EuiSubSteps/&gt;</EuiCode>.
      </p>
    ),
    demo: <StepsComplex />,
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
  },
  {
    title: 'Horizontal',
    source: [{
      type: GuideSectionTypes.JS,
      code: stepsHorizontalSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: stepsHorizontalHtml,
    }],
    text: (
      <p>For use when forms/setup instructions can and should be split into multiple pages.</p>
    ),
    demo: <StepsHorizontal />
  }],
};
