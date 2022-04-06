import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCopy, EuiCode } from '../../../../src/components';

import Copy from './copy';
const copySource = require('!!raw-loader!./copy');

import CopyToClipboard from './copy_to_clipboard';
const copyToClipboardSource = require('!!raw-loader!./copy_to_clipboard');

export const CopyExample = {
  title: 'Copy',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: copySource,
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
      snippet: `<EuiCopy textToCopy={textToCopy}>
  {copy => (
    <EuiButton onClick={copy}>Click to copy</EuiButton>
  )}
</EuiCopy>`,
    },
    {
      title: 'Copy to clipboard function',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: copyToClipboardSource,
        },
      ],
      text: (
        <p>
          The function <EuiCode>copyToClipboard</EuiCode> allows you to copy
          text to the clipboard. It receives an argument of type{' '}
          <EuiCode>string</EuiCode>.
        </p>
      ),
      demo: <CopyToClipboard />,
    },
  ],
};
