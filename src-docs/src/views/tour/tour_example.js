import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSpacer, EuiTourStep } from '../../../../src/components';

import Tour from './tour';
import Managed from './managed';
import ManagedHook from './managed_hook';
import FullScreen from './fullscreen';

const tourSource = require('!!raw-loader!./tour');
const tourHtml = renderToHtml(Tour);
const managedSource = require('!!raw-loader!./managed');
const managedHtml = renderToHtml(Managed);
const managedHookSource = require('!!raw-loader!./managed_hook');
const managedHookHtml = renderToHtml(ManagedHook);

const fullSource = require('!!raw-loader!./fullscreen');
const fullHtml = renderToHtml(FullScreen);

export const TourExample = {
  title: 'Tour',
  beta: true,
  intro: (
    <>
      <p>
        The tour components provided by EUI allow for a flexible and
        customizable way to showcase items on a page in an ordered manner by
        augmenting existing elements on the page without altering functionality.
      </p>
      <EuiSpacer />
    </>
  ),
  sections: [
    {
      title: 'Standalone steps',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tourSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tourHtml,
        },
      ],
      text: (
        <p>
          Each <EuiCode>EuiTourStep</EuiCode> can be configured independently
          via props. In this case, each component is stateless and needs to be
          paired with some form of state management for navigation. See two
          options below: <EuiCode>useEuiTour</EuiCode> and{' '}
          <EuiCode>EuiTour</EuiCode>.
        </p>
      ),
      props: { EuiTourStep },
      demo: <Tour />,
    },
    {
      title: 'Managed state with the useEuiTour custom hook',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedHookSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: managedHookHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>useEuiTour</EuiCode> hook for minimal state
          management using a predefined React reducer. Pass an array of steps
          consisting of accepted props, and an object of global configuration.
          The result is a full configuration obejct for each step, a set of
          reducer actions to perform state changes, and an up-to-date state
          object derived from the internal reducer.
        </p>
      ),
      props: { EuiTourStep },
      demo: <ManagedHook />,
    },
    {
      title: 'Managed state via EuiTour render prop component',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: managedHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>EuiTour</EuiCode> render prop component for minimal
          state management. This is an alternative to the{' '}
          <EuiCode>useEuiTour</EuiCode> hook for React class components, or use
          cases where a single wrapping component can be used.
        </p>
      ),
      demo: <Managed />,
    },
    {
      title: 'Fullscreen demo',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fullSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fullHtml,
        },
      ],
      text: <p />,
      demo: <FullScreen />,
    },
  ],
};
