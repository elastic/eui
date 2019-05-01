import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiHighlight } from '../../../../src/components';

import { Highlight } from './highlight';
const highlightSource = require('!!raw-loader!./highlight');
const highlightHtml = renderToHtml(Highlight);

export const HighlightExample = {
  title: 'Highlight',
  sections: [
    {
      title: 'Highlight',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: highlightSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: highlightHtml,
        },
      ],
      text: (
        <p>
          Use <EuiCode>EuiHighlight</EuiCode> to highlight substrings within a
          string, typically in response to user input.
        </p>
      ),
      components: { EuiHighlight },
      demo: <Highlight />,
    },
  ],
};
