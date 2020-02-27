import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiTourStep } from '../../../../src/components';

import Tour from './tour';
import Managed from './managed';

const tourSource = require('!!raw-loader!./tour');
const tourHtml = renderToHtml(Tour);
const tourSnippet = '<EuiTour size="xs" />';
const managedSource = require('!!raw-loader!./managed');
const managedHtml = renderToHtml(Managed);
const managedSnippet = '<EuiTour size="xs" />';

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
  ],
};
