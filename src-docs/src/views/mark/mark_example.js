import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiMark } from '../../../../src/components';

import { Mark } from './mark';
const markSource = require('!!raw-loader!./mark');
const markHtml = renderToHtml(Mark);

export const MarkExample = {
  title: 'Mark',
  sections: [
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
          Use <EuiCode>EuiMark</EuiCode> to mark substrings within a string,
          typically in response to user input.
        </p>
      ),
      components: { EuiMark },
      demo: <Mark />,
    },
  ],
};
