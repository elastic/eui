import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiHighlight, EuiMark } from '../../../../src/components';

import { Highlight } from './highlight';
import { Mark } from './mark';

const highlightSource = require('!!raw-loader!./highlight');
const highlightHtml = renderToHtml(Highlight);

const markSource = require('!!raw-loader!./mark');
const markHtml = renderToHtml(Mark);

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
          Use <EuiCode>EuiHighlight</EuiCode> to highlight substrings within a
          string, typically in response to user input.
        </p>
      ),
      props: { EuiHighlight },
      components: { EuiHighlight },
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
          Use <EuiCode>EuiMark</EuiCode> to wrap a string in an
          <EuiCode>mark</EuiCode> element.
        </p>
      ),
      components: { EuiMark },
      demo: <Mark />,
    },
  ],
};
