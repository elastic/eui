import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiText,
  EuiTourStep,
} from '../../../../src/components';

import Step from './step';
import StepDom from './step_dom';
import Tour from './tour';
import Managed from './managed';
import ManagedHook from './managed_hook';
import FullScreen from './fullscreen';
import NotActionDriven from './not_action_driven';

import Guidelines from './guidelines';

const stepSource = require('!!raw-loader!./step');
const stepSnippet = `
<EuiTourStep
  content={
    <EuiText>
      <p>The tour step content.</p>
    </EuiText>
  }
  isStepOpen={true}
  isTourActive={true}
  minWidth={300}
  onFinish={() => {}}
  step={1}
  stepsTotal={1}
  title="Title of the current step"
  subtitle="Title of the full tour"
  anchorPosition="rightUp">
  <EuiText>
    <p>The tour step anchor point.</p>
  </EuiText>
</EuiTourStep>
`;
const stepDomSource = require('!!raw-loader!./step_dom');
const tourSource = require('!!raw-loader!./tour');
const managedSource = require('!!raw-loader!./managed');
const managedHookSource = require('!!raw-loader!./managed_hook');
const notActionDriven = require('!!raw-loader!./not_action_driven');

const fullSource = require('!!raw-loader!./fullscreen');

export const TourExample = {
  title: 'Tour',
  guidelines: <Guidelines />,
  intro: (
    <EuiText>
      <p>
        The tour components provided by EUI allow for a flexible and
        customizable way to showcase items on a page in an ordered manner by
        augmenting existing elements on the page without altering functionality.
      </p>
    </EuiText>
  ),
  sections: [
    {
      wrapText: false,
      text: (
        <EuiCallOut
          iconType="iInCircle"
          title="Examples on this page use localStorage to persist state."
        />
      ),
    },
    {
      title: 'Wrap target element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepSource,
        },
      ],
      text: (
        <>
          <p>
            The <strong>EuiTourStep</strong> component is the base for building
            a feature tour or an individual popover for onboarding.
          </p>
          <p>
            All content and actions including titles, headings, and buttons are
            customizable via props.
          </p>
        </>
      ),
      props: { EuiTourStep },
      demo: <Step />,
      snippet: stepSnippet,
    },
    {
      title: 'Anchor to DOM element',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepDomSource,
        },
      ],
      text: (
        <>
          <p>
            Instead of wrapping the target element, use the{' '}
            <EuiCode>anchor</EuiCode> prop to specify a DOM node. Accepted
            values include an HTML element reference, a function returning an
            HTML element, or a CSS selector string such as{' '}
            <EuiCode>anchor="#anchorTarget"</EuiCode>.
          </p>
        </>
      ),
      demo: <StepDom />,
    },
    {
      title: 'Guided tour',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: notActionDriven,
        },
      ],
      text: (
        <>
          <p>
            Uers proceed through tour steps without needing to complete actions
            on the underlying page. In this scenario, consider showing both{' '}
            <strong>Close tour</strong> and <strong>Next</strong> buttons.
          </p>
        </>
      ),
      demo: <NotActionDriven />,
      demoPanelProps: { color: 'subdued' },
    },
    {
      title: 'Standalone steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tourSource,
        },
      ],
      text: (
        <p>
          Each <strong>EuiTourStep</strong> can be configured independently via
          props. In this case, each component is stateless and needs to be
          paired with some form of state management for navigation. The later
          examples showcase other ways to handle state management via{' '}
          <strong>useEuiTour</strong> and <strong>EuiTour</strong>.
        </p>
      ),
      demo: <Tour />,
    },
    {
      title: 'useEuiTour hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedHookSource,
        },
      ],
      text: (
        <p>
          The <strong>useEuiTour</strong> hook provides minimal state management
          using a predefined React reducer. Pass an array of steps consisting of
          accepted props, and an object of global configuration. The result is a
          full configuration object for each step, a set of reducer actions to
          perform state changes, and an up-to-date state object derived from the
          internal reducer.
        </p>
      ),
      demo: <ManagedHook />,
    },
    {
      title: 'EuiTour render prop component',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiTour</strong> render prop component provides minimal
          state management. An alternative to the <strong>useEuiTour</strong>{' '}
          hook, <strong>EuiTour</strong> can be used for React class components
          and use cases with a single wrapping component.
        </p>
      ),
      demo: <Managed />,
    },
    {
      title: 'Tour demo',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullSource,
        },
      ],
      text: (
        <p>
          A complete tour set in a more realistic application UI. Unlike other
          examples on this page, the demo does not use{' '}
          <EuiCode>localStorage</EuiCode> to persist state.
        </p>
      ),
      fullScreen: {
        slug: 'fullscreen',
        demo: <FullScreen />,
      },
    },
  ],
};
