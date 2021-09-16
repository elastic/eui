import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';
import { codeBlockConfig, codeConfig } from './playground';

import Code from './code';
const codeSource = require('!!raw-loader!./code');
const codeSnippet = '<EuiCode>Text to be formatted</EuiCode>';

import CodeBlock from './code_block';
const codeBlockSource = require('!!raw-loader!./code_block');
const codeBlockSnippet = `<EuiCodeBlock language="html" paddingSize="s" isCopyable>
{ \`<h1>Title</h1>\` }
</EuiCodeBlock>
`;

import CodeBlockLines from './line_numbers';
const codeBlockLinesSource = require('!!raw-loader!./line_numbers');
const codeBlockLinesSnippet = `<EuiCodeBlock language="json" lineNumbers>
{}
</EuiCodeBlock>
`;

import CodeBlockVirtualized from './virtualized';
const codeBlockVirtualizedSource = require('!!raw-loader!./virtualized');
const codeBlockVirtualizedSnippet = `<EuiCodeBlock language="json" isVirtualized overflowHeight={300}>
{}
</EuiCodeBlock>
`;

import CodeBlockVirtualizedFlyout from './virtualized_flyout';
const codeBlockVirtualizedFlyoutSource = require('!!raw-loader!./virtualized_flyout');

import CodeBlockPre from './code_block_pre';
const codeBlockPreSource = require('!!raw-loader!./code_block_pre');

export const CodeExample = {
  title: 'Code',
  intro: (
    <>
      <EuiCallOut>
        <p>
          <strong>EuiCode</strong> and <strong>EuiCodeBlock</strong> are
          intended to render static lines or blocks of code in{' '}
          <strong>read-only</strong> contexts. If you need capabilities to edit,
          or want to print long code (e.g., printing JSON from an API), we
          recommend installing a version of Monaco. If you are building within
          the Kibana platform, you can use their{' '}
          <EuiLink href="https://github.com/elastic/kibana/tree/master/src/plugins/kibana_react/public/code_editor">
            <strong>CodeEditor</strong>
          </EuiLink>
          .
        </p>
      </EuiCallOut>
      <EuiSpacer />
      <EuiText>
        <p>
          The <strong>EuiCode</strong> and <strong>EuiCodeBlock</strong>{' '}
          components support{' '}
          <EuiLink external href="https://prismjs.com/#supported-languages">
            all language syntaxes
          </EuiLink>{' '}
          supported by the
          <EuiCode>prism</EuiCode>{' '}
          <EuiLink external href="https://prismjs.com/">
            library
          </EuiLink>
          . The <EuiCode>language</EuiCode> prop can also be omitted to simply
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
      title: 'Line numbers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockLinesSource,
        },
      ],
      text: (
        <p>
          To render line numbers, add <EuiCode>lineNumbers</EuiCode>, and
          optionally change the starting number by passing a configuration
          object: <EuiCode>{'lineNumbers={{ start: 32 }}'}</EuiCode>
        </p>
      ),
      props: { EuiCodeBlock },
      snippet: codeBlockLinesSnippet,
      demo: <CodeBlockLines />,
    },
    {
      title: 'Code block virtualization',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockVirtualizedSource,
        },
      ],
      text: (
        <p>
          For large blocks of code, add <EuiCode>isVirtualized</EuiCode> to
          reduce the number of rendered rows and improve load times. Note that{' '}
          <EuiCode>overflowHeight</EuiCode> is required when using this
          configuration.
        </p>
      ),
      props: { EuiCodeBlock },
      snippet: codeBlockVirtualizedSnippet,
      demo: <CodeBlockVirtualized />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockVirtualizedFlyoutSource,
        },
      ],
      text: (
        <p>
          In places like <Link to="/layout/flyout">flyouts</Link>, you can use{' '}
          <EuiCode language="tsx">{'overflowHeight="100%"'}</EuiCode> to stretch
          the code block to fill the space. Just be sure that it&apos;s parent
          container is also <EuiCode language="css">{'height: 100%'}</EuiCode>.
        </p>
      ),
      demo: <CodeBlockVirtualizedFlyout />,
    },
    {
      title: 'Code block and white-space',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockPreSource,
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
