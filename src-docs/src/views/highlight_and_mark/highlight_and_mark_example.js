import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiHighlight, EuiMark } from '../../../../src/components';

import { highlightConfig, markConfig } from './playground';

import { Highlight } from './highlight';
import { Mark } from './mark';

const highlightSource = require('!!raw-loader!./highlight');
const highlightSnippet = `<EuiHighlight search={searchValue} highlightAll={isHighlightAll}>
  <!-- A text where all your search matches will be highlighted -->
</EuiHighlight>
`;

const markSource = require('!!raw-loader!./mark');
const markSnippet = '<EuiMark><!-- Mark text --></EuiMark>';

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
      ],
      text: (
        <p>
          Use <strong>EuiHighlight</strong> to highlight substrings within a
          string, typically in response to user input.
        </p>
      ),
      props: { EuiHighlight },
      snippet: highlightSnippet,
      demo: <Highlight />,
      playground: highlightConfig,
    },
    {
      title: 'Mark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: markSource,
        },
      ],
      text: (
        <p>
          Use <strong>EuiMark</strong> to wrap a string in a{' '}
          <EuiCode>mark</EuiCode> element.
        </p>
      ),
      props: { EuiMark },
      snippet: markSnippet,
      demo: <Mark />,
      playground: markConfig,
    },
  ],
};
