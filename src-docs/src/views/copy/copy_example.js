import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCopy, EuiCode } from '../../../../src/components';

import Copy from './copy';
const copySource = require('!!raw-loader!./copy');
const copyHtml = renderToHtml(Copy);

export const CopyExample = {
  title: 'Copy',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: copySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: copyHtml,
        },
      ],
      text: (
        <p>
          The <strong>EuiCopy</strong> component is a utility for copying text
          to clipboard. Wrap a function that returns a component. The first
          argument will be a <EuiCode>copy</EuiCode> function.
        </p>
      ),
      components: { EuiCopy },
      demo: <Copy />,
      props: { EuiCopy },
      snippet: `<EuiCopy textToCopy={this.state.copyText}>
  {copy => (
    <EuiButton onClick={copy}>Click to copy</EuiButton>
  )}
</EuiCopy>`,
    },
  ],
};
