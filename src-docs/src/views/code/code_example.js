import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiCodeBlockImpl,
} from '../../../../src/components';

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeHtml = renderToHtml(Code);

import CodeBlock from './code_block';
const codeBlockSource = require('!!raw-loader!./code_block');
const codeBlockHtml = renderToHtml(CodeBlock);

export const CodeExample = {
  title: 'Code',
  sections: [{
    title: 'Inline',
    source: [{
      type: GuideSectionTypes.JS,
      code: codeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: codeHtml,
    }],
    text: (
      <p>
        <EuiCode>Code</EuiCode> is for making inline code snippets that can work
        within or next to bodies of text.
      </p>
    ),
    demo: <Code />,
  }, {
    title: 'CodeBlock',
    source: [{
      type: GuideSectionTypes.JS,
      code: codeBlockSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: codeBlockHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiCodeBlock</EuiCode> can be used to create multi-line code blocks.
      </p>
    ),
    props: { EuiCodeBlockImpl },
    demo: <CodeBlock />,
  }],
};
