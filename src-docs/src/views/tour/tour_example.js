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
          iconType="save"
          title="The examples on this page, use localStorage to persist state to demonstrate starting a tour at different stages."
        />
      ),
    },
    {
      title: 'Step options',
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
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stepDomSource,
        },
      ],
      text: (
        <>
          <h3>Using DOM selector as anchor location</h3>
          <p>
            Instead of wrapping the target element, use the{' '}
            <EuiCode>anchor</EuiCode> prop to specify a DOM node. Accepted
            values include an HTML element, a function returning an HTML
            element, or a DOM query selector.
          </p>
        </>
      ),
      demo: <StepDom />,
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
      title: 'Managed state with the useEuiTour custom hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedHookSource,
        },
      ],
      text: (
        <p>
          Use the <strong>useEuiTour</strong> hook for minimal state management
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
      title: 'Managed state via EuiTour render prop component',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedSource,
        },
      ],
      text: (
        <p>
          Use the <strong>EuiTour</strong> render prop component for minimal
          state management. This is an alternative to the{' '}
          <strong>useEuiTour</strong> hook for React class components, or use
          cases where a single wrapping component can be used.
        </p>
      ),
      demo: <Managed />,
    },
    {
      title: 'Passive tour',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: notActionDriven,
        },
      ],
      text: (
        <p>
          Use the <strong>EuiTour</strong> to provide sequential help without
          the user performing any actions (e.g. filling out a form or copying a
          text). In this scenario, consider using two buttons,{' '}
          <strong>Close tour</strong> and <strong>Next</strong>.
        </p>
      ),
      demo: <NotActionDriven />,
    },
    {
      title: 'Fullscreen demo',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullSource,
        },
      ],
      text: (
        <p>
          Unlike the other examples on this page, this example does not use{' '}
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
