import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiHighlight, EuiMark } from '../../../../src/components';

import { Highlight } from './highlight';
import { Mark } from './mark';

const highlightSource = require('!!raw-loader!./highlight');
const highlightHtml = renderToHtml(Highlight);
const highlightSnippet = `<EuiHighlight search={searchValue} highlightAll={isHighlightAll}>
  The quick brown fox jumped over the lazy dog
</EuiHighlight>
`;

const markSource = require('!!raw-loader!./mark');
const markHtml = renderToHtml(Mark);
const markSnippet = '<EuiMark>mark</EuiMark>';

export const HighlightAndMarkExample = {
  title: 'Highlight and mark',
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
          Use <strong>EuiHighlight</strong> to highlight substrings within a
          string, typically in response to user input.
        </p>
      ),
      props: { EuiHighlight },
      components: { EuiHighlight },
      snippet: highlightSnippet,
      demo: <Highlight />,
    },
    {
      title: 'Mark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: markHtml,
        },
      ],
      text: (
        <p>
          Use <strong>EuiMark</strong> to wrap a string in an
          <EuiCode>mark</EuiCode> element.
        </p>
      ),
      components: { EuiMark },
      snippet: markSnippet,
      demo: <Mark />,
    },
  ],
};
