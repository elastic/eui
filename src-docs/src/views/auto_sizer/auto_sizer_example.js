import React from 'react';

import { GuideSectionTypes } from '../../components';
import { EuiLink, EuiAutoSizer } from '../../../../src/components';

import AutoSizer from './auto_sizer';
const autoSizerSource = require('!!raw-loader!./auto_sizer');

const autoSizerSnippet = `<EuiAutoSizer>
  {({height, width}) =>
    (<!-- Component goes here -->)
  }
</EuiAutoSizer>`;

export const AutoSizerExample = {
  title: 'Auto sizer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: autoSizerSource,
        },
      ],
      text: (
        <p>
          <strong>EuiAutoSizer</strong> helps components that use virtualized
          rendering and/or require explicit dimensions to fill all available
          space in the parent container. See the{' '}
          <EuiLink href="https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md">
            react-virtualized-auto-sizer
          </EuiLink>{' '}
          documentation as <strong>EuiAutoSizer</strong> is a passthrough
          component for <strong>AutoSizer</strong>.
        </p>
      ),
      props: { EuiAutoSizer },
      demo: <AutoSizer />,
      snippet: autoSizerSnippet,
    },
  ],
};
