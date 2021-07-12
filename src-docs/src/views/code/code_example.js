import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiText,
} from '../../../../src/components';
import { codeBlockConfig, codeConfig } from './playground';

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeHtml = renderToHtml(Code);
const codeSnippet = '<EuiCode>Text to be formatted</EuiCode>';

import CodeBlock from './code_block';
const codeBlockSource = require('!!raw-loader!./code_block');
const codeBlockHtml = renderToHtml(CodeBlock);
const codeBlockSnippet = `<EuiCodeBlock language="html" paddingSize="s" isCopyable>
{ \`<h1>Title</h1>\` }
</EuiCodeBlock>
`;

import CodeBlockPre from './code_block_pre';
const codeBlockPreSource = require('!!raw-loader!./code_block_pre');
const codeBlockPreHtml = renderToHtml(CodeBlockPre);

export const CodeExample = {
  title: 'Code',
  intro: (
    <>
      <EuiText>
        <p>
          The <strong>EuiCode</strong> and <strong>EuiCodeBlock</strong>{' '}
          components support{' '}
          <EuiLink external href="https://github.com/wooorm/refractor#syntaxes">
            all language syntaxes
          </EuiLink>{' '}
          supported by the
          <EuiCode>prism</EuiCode>{' '}
          <EuiLink external href="https://prismjs.com/">
            library
          </EuiLink>
          .
          <br />
          The <EuiCode>language</EuiCode> prop can also be omitted to simply
          render formatted but unhighlighted code.
        </p>
        <p>
          JSX code (often React) has distinct language syntaxes from the base
          JavaScript and TypeScript languages. For these instances, use{' '}
          <EuiCode>language=&quot;jsx&quot;</EuiCode> or{' '}
          <EuiCode>language=&quot;tsx&quot;</EuiCode>.
        </p>
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'Inline',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiCode</strong> is for making inline code snippets that can
          work within or next to bodies of text.
        </p>
      ),
      snippet: codeSnippet,
      props: { EuiCode },
      demo: <Code />,
      playground: codeConfig,
    },
    {
      title: 'Code block',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeBlockHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiCodeBlock</strong> can be used to create multi-line code
          blocks. Copy and fullscreen buttons can be enabled via the
          <EuiCode>isCopyable</EuiCode> and <EuiCode>overflowHeight</EuiCode>
          props, respectively.
        </p>
      ),
      snippet: codeBlockSnippet,
      props: { EuiCodeBlock },
      demo: <CodeBlock />,
      playground: codeBlockConfig,
    },
    {
      title: 'Code block and white-space',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockPreSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: codeBlockPreHtml,
        },
      ],
      text: (
        <p>
          By default, the <EuiCode>whiteSpace</EuiCode> property is set to{' '}
          <EuiCode>pre-wrap</EuiCode>. This makes the text wrap when needed. You
          can, however, pass <EuiCode>pre</EuiCode> to the{' '}
          <EuiCode>whiteSpace</EuiCode> prop and the text won&apos;t wrap unless
          line breaks are in the content.
        </p>
      ),
      props: { EuiCodeBlock },
      demo: <CodeBlockPre />,
    },
  ],
};
