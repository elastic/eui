import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiTourStep } from '../../../../src/components';

import Tour from './tour';
import Managed from './managed';
import Managedv2 from './managed-v2';

const tourSource = require('!!raw-loader!./tour');
const tourHtml = renderToHtml(Tour);
const tourSnippet = '<EuiTour size="xs" />';
const managedSource = require('!!raw-loader!./managed');
const managedHtml = renderToHtml(Managed);
const managedSnippet = '<EuiTour size="xs" />';
const managedv2Source = require('!!raw-loader!./managed-v2');
const managedv2Html = renderToHtml(Managedv2);
const managedv2Snippet = '<EuiTour size="xs" />';

export const TourExample = {
  title: 'Tour',
  intro: (
    <p>
      The example(s) will demonstrate how the tour component attaches to/wraps
      around existing elements on the page.
    </p>
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
      snippet: tourSnippet,
      demo: <Tour />,
    },
    {
      title: 'Managed state',
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
          Using the <EuiCode>useEuiTour</EuiCode> hook for state management
        </p>
      ),
      props: { EuiTourStep },
      snippet: managedSnippet,
      demo: <Managed />,
    },
    {
      title: 'Managed state via render prop component',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: managedv2Source,
        },
        {
          type: GuideSectionTypes.HTML,
          code: managedv2Html,
        },
      ],
      text: (
        <p>
          Using the <EuiCode>EuiTour</EuiCode> render prop component for state
          management
        </p>
      ),
      snippet: managedv2Snippet,
      demo: <Managedv2 />,
    },
  ],
};
