import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSteps,
  EuiStep,
  EuiSubSteps,
  EuiStepsHorizontal,
} from '../../../../src/components';

import { EuiStepHorizontal } from '../../../../src/components/steps/step_horizontal';

import Steps from './steps';
const stepsSource = require('!!raw-loader!./steps');
const stepsHtml = renderToHtml(Steps);
const stepsSnippet = [
  `<EuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <p>Do this first</p>,
    },
  ]}
/>`,
  `<EuiSteps
  firstStepNumber={3}
  steps={[
    {
      title: 'Step 3',
      children: <p>Do this third first</p>,
    },
  ]}
/>`,
];

import StepsComplex from './steps_complex';
const stepsComplexSource = require('!!raw-loader!./steps_complex');
const stepsComplexHtml = renderToHtml(StepsComplex);

import HeadingElementSteps from './heading_element_steps';
const headingElementStepsSource = require('!!raw-loader!./heading_element_steps');
const headingElementStepsHtml = renderToHtml(HeadingElementSteps);
const headingElementStepsSnippet = `<EuiSteps steps={steps} headingElement="h2" />
`;

import StepsHorizontal from './steps_horizontal';
const stepsHorizontalSource = require('!!raw-loader!./steps_horizontal');
const stepsHorizontalHtml = renderToHtml(StepsHorizontal);
const stepsHorizontalSnippet = `<EuiStepsHorizontal steps={[{
  title: 'Completed step',
  isComplete: true,
  onClick: function,
}]} />
`;

import Status from './status';
const statusSource = require('!!raw-loader!./status');
const statusHtml = renderToHtml(Steps);
const statusSnippet = `<EuiSteps
  steps={[
    {
      title: 'Warning',
      children: 'Example of a warning',
      status: 'warning',
    },
  ]}
/>`;

export const StepsExample = {
  title: 'Steps',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsHtml,
        },
      ],
      text: <p>Numbered steps</p>,
      props: { EuiSteps, EuiStep },
      snippet: stepsSnippet,
      demo: <Steps />,
    },
    {
      title: 'Complex steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsComplexHtml,
        },
      ],
      text: (
        <p>
          If you need to call out a set of substeps that are not lines of code,
          most likely a <EuiCode>&lt;ol/&gt;</EuiCode>, wrap the block in a{' '}
          <EuiCode>&lt;EuiSubSteps/&gt;</EuiCode>.
        </p>
      ),
      demo: <StepsComplex />,
      props: { EuiSubSteps },
    },
    {
      title: 'Heading elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headingElementStepsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headingElementStepsHtml,
        },
      ],
      text: (
        <div>
          <p>
            To aid with accessibility and hierarchical headings, you can and
            should pass in a heading element to use for each step title. The
            example below shows that the logical heading element should be an{' '}
            <EuiCode>h2</EuiCode>
            and therefore adds <EuiCode>
              headingElement=&quot;h2&quot;
            </EuiCode>{' '}
            to the EuiSteps component.
          </p>
          <p>
            The style of the title will <strong>not</strong> be affected.
          </p>
        </div>
      ),
      snippet: headingElementStepsSnippet,
      demo: <HeadingElementSteps />,
    },
    {
      title: 'Steps status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: statusSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: statusHtml,
        },
      ],
      text: (
        <p>
          Steps can optionally include <EuiCode>status</EuiCode> prop that will
          alter the look of the number prefix. The options are{' '}
          <EuiCode>incomplete</EuiCode>, <EuiCode>complete</EuiCode>,{' '}
          <EuiCode>warning</EuiCode>, and <EuiCode>danger</EuiCode>. This is
          used mostly as a final step when you need to make some sort of final
          check.
        </p>
      ),
      snippet: statusSnippet,
      demo: <Status />,
    },
    {
      title: 'Horizontal steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsHorizontalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stepsHorizontalHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            For use when forms/setup instructions can and should be split into
            multiple pages.
          </p>
          <p>
            For each step object, be sure to signify previous/completed steps
            with <EuiCode>isComplete: true</EuiCode> and the current/selected
            step with <EuiCode>isSelected: true</EuiCode>.
          </p>
        </Fragment>
      ),
      demo: <StepsHorizontal />,
      snippet: stepsHorizontalSnippet,
      props: { EuiStepsHorizontal, EuiStepHorizontal },
    },
  ],
};
