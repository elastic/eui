import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
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
    title: 'Code',
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
      <div>
        <p>
          <EuiCode>EuiCodeBlock</EuiCode> can be used to create multi-line code blocks.
          You can pass them a couple props for styling:
        </p>
        <ul>
          <li><EuiCode>language</EuiCode> sets the syntax highlighting for a specific language.</li>
          <li><EuiCode>paddingSize</EuiCode> accepts &ldquo;s&rdquo; / &ldquo;m&rdquo; / &ldquo;l&rdquo; (default).</li>
          <li><EuiCode>fontSize</EuiCode> accepts &ldquo;s&rdquo; (default) / &ldquo;m&rdquo; / &ldquo;l&rdquo;.</li>
          <li><EuiCode>overflowHeight</EuiCode> accepts a number. By default it is not set.</li>
          <li><EuiCode>transparentBackground</EuiCode> set to <EuiCode>false</EuiCode> will remove the background.</li>
          <li><EuiCode>inline</EuiCode> will display the passed code in an inline format. Will also remove any margins set.</li>
        </ul>
      </div>
    ),
    demo: <CodeBlock />,
  }],
};
