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
  intro: (
    <>
      <p>
        The example(s) will demonstrate how the tour component attaches to/wraps
        around existing elements on the page.
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
          The <EuiCode>EuiTourStep</EuiCode> component is not documented yet.
        </p>
      ),
      props: { EuiTourStep },
      demo: <Tour />,
    },
    {
      title: 'Managed state with custom hook',
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
          Using the <EuiCode>useEuiTour</EuiCode> hook for state management
        </p>
      ),
      props: { EuiTourStep },
      demo: <ManagedHook />,
    },
    {
      title: 'Managed state via render prop component',
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
          Using the <EuiCode>EuiTour</EuiCode> render prop component for state
          management
        </p>
      ),
      demo: <Managed />,
    },
    {
      title: 'Immersive',
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
