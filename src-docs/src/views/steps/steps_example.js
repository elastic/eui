import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiSteps,
  EuiStep,
  EuiSubSteps,
  EuiStepsHorizontal,
} from '../../../../src/components';

import { EuiStepHorizontal } from '../../../../src/components/steps/step_horizontal';

import { stepConfig, stepHorizontalConfig } from './playground';

import Steps from './steps';
const stepsSource = require('!!raw-loader!./steps');
const stepsSnippet = [
  `<EuiSteps
  steps={[
    {
      title: 'Step 1',
      children: <EuiText><p>Do this first</p></EuiText>,
    },
  ]}
/>`,
  `<EuiSteps
  firstStepNumber={3}
  steps={[
    {
      title: 'Step 3',
      children: <EuiText><p>Do this third first</p></EuiText>,
    },
  ]}
/>`,
];

import StepsComplex from './steps_complex';
const stepsComplexSource = require('!!raw-loader!./steps_complex');
const stepsComplexSnippet = [
  `<EuiSteps
  steps={[
    {
      title: 'Step 1 has intro plus code snippet',
      children: (
        <>
          <EuiText>
            <p>Run this code snippet to install things.</p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="bash">npm install</EuiCodeBlock>
        </>
      ),
    },
  ]}
/>`,
  `<EuiSteps
  steps={[
    {
      title: 'Step 2 has sub steps',
      children: (
        <EuiText>
          <p>
            In order to complete this step, do the following things <strong>in order</strong>.
          </p>
          <EuiSubSteps>
            <ol>
              <li>Do thing 1</li>
              <li>Do thing 2</li>
              <li>Do thing 3</li>
            </ol>
          </EuiSubSteps>
          <p>Here are some bullet point reminders.</p>
          <ul>
            <li>Reminder 1</li>
            <li>Reminder 2</li>
            <li>Reminder 3</li>
          </ul>
        </EuiText>
      ),
    },
  ]}
/>`,
];

import HeadingElementSteps from './heading_element_steps';
const headingElementStepsSource = require('!!raw-loader!./heading_element_steps');
const headingElementStepsSnippet = `<EuiSteps steps={steps} headingElement="h2" />
`;

import StepsHorizontal from './steps_horizontal';
const stepsHorizontalSource = require('!!raw-loader!./steps_horizontal');
const stepsHorizontalSnippet = `<EuiStepsHorizontal steps={[{
    title: 'Completed step',
    status: 'complete',
    onClick: function,
  },
  {
    title: 'Current step',
    status: 'current',
    onClick: function,
  },
  {
    title: 'Incomplete step',
    onClick: function,
  }]}
/>`;

import Status from './status';
const statusSource = require('!!raw-loader!./status');
const statusSnippet = `<EuiSteps
  steps={[
    {
      title: 'Warning',
      children: 'Example of a warning',
      status: 'warning',
    },
  ]}
/>`;

import StepsTitleSizes from './steps_title_sizes';
const stepsTitleSizesSource = require('!!raw-loader!./steps_title_sizes');
const stepsTitleSizesSnippet = '<EuiSteps titleSize="xs" steps={steps} />';

export const StepsExample = {
  title: 'Steps',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsSource,
        },
      ],
      text: (
        <p>
          <strong>EuiSteps</strong> presents procedural content in a numbered
          outline format. It is best used when presenting instructional content
          that must be conducted in a particular order. It requires a{' '}
          <EuiCode>title</EuiCode> and <EuiCode>children</EuiCode> to be present
          and will automatically increment the step number based on the initial{' '}
          <EuiCode>firstStepNumber</EuiCode>.
        </p>
      ),
      props: { EuiSteps, EuiStep },
      snippet: stepsSnippet,
      demo: <Steps />,
      playground: stepConfig,
    },
    {
      title: 'Complex steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsComplexSource,
        },
      ],
      text: (
        <p>
          If you need to call out a set of substeps that are not lines of code,
          most likely a <EuiCode>{'<ol/>'}</EuiCode>, wrap the block in a{' '}
          <EuiCode>{'<EuiSubSteps/>'}</EuiCode>.
        </p>
      ),
      demo: <StepsComplex />,
      props: { EuiSubSteps },
      snippet: stepsComplexSnippet,
    },
    {
      title: 'Heading elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headingElementStepsSource,
        },
      ],
      text: (
        <div>
          <p>
            To aid with accessibility and hierarchical headings, you can and
            should pass in a heading element to use for each step title. The
            example below shows that the logical heading element should be an{' '}
            <EuiCode>h2</EuiCode>
            and therefore adds{' '}
            <EuiCode language="j">{'headingElement="h2"'}</EuiCode> to the
            EuiSteps component.
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
      ],
      text: (
        <p>
          Steps can optionally include <EuiCode>status</EuiCode> prop that will
          alter the look of the number prefix. The options are{' '}
          <EuiCode>incomplete</EuiCode>, <EuiCode>complete</EuiCode>,{' '}
          <EuiCode>warning</EuiCode>, <EuiCode>danger</EuiCode>,{' '}
          <EuiCode>disabled</EuiCode> and <EuiCode>loading</EuiCode>. This is
          used mostly as a final step when you need to make some sort of final
          check.
        </p>
      ),
      snippet: statusSnippet,
      demo: <Status />,
    },
    {
      title: 'Custom title sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsTitleSizesSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can set a different title size using{' '}
            <EuiCode>titleSize</EuiCode>. If <EuiCode>titleSize</EuiCode> is set
            in both <strong>EuiSteps</strong> and <strong>EuiStep</strong>, the
            latter value will override the former. Additionally, the title size{' '}
            <EuiCode>xs</EuiCode> will automatically generate smaller steps
            circles.
          </p>
        </Fragment>
      ),
      demo: <StepsTitleSizes />,
      snippet: stepsTitleSizesSnippet,
    },
    {
      title: 'Horizontal steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepsHorizontalSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            For use when forms/setup instructions can and should be split into
            multiple pages. Each step should correspond to an individual page of
            form elements, using the{' '}
            <EuiCode language="tsx">{'status'}</EuiCode> key to denote the
            user&apos;s progress.
          </p>
          <p>
            For horizontal steps, the <EuiCode language="tsx">status</EuiCode>{' '}
            key defaults to <EuiCode>{'"incomplete"'}</EuiCode> and the default
            filled styling is reserved for indicating{' '}
            <EuiCode>{'"current"'}</EuiCode> status.
          </p>
        </Fragment>
      ),
      demo: <StepsHorizontal />,
      snippet: stepsHorizontalSnippet,
      props: { EuiStepsHorizontal, EuiStepHorizontal },
      playground: stepHorizontalConfig,
    },
  ],
};
