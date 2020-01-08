import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiPopover } from '../../../../src/components';

import Tour from './tour';
const tourSource = require('!!raw-loader!./tour');
const tourHtml = renderToHtml(Tour);

const tourSnippet = '<EuiTour size="xs" />';

export const TourExample = {
  title: 'Tour',
  intro: <p>Intro text goes here.</p>,
  sections: [
    {
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
          The <EuiCode>Tour</EuiCode> component is a...
        </p>
      ),
      props: { EuiPopover },
      snippet: tourSnippet,
      demo: (
        <div className="guideDemo__highlightSpacer">
          <Tour />
        </div>
      ),
    },
  ],
};
