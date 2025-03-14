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
const codeBlockSnippet = `<EuiCodeBlock language="jsx" fontSize="m" paddingSize="m">
  { \`/* I'm an example of JS */
  import React from 'react';\` }
</EuiCodeBlock>
`;

import CodeBlockCopy from './code_block_copy';
const codeBlockCopySource = require('!!raw-loader!./code_block_copy');
const codeBlockCopySnippet = `<EuiCodeBlock language="html" isCopyable>
{ \`<h1>Title</h1>\` }
</EuiCodeBlock>
`;

import CodeBlockOverflow from './code_block_overflow';
const codeBlockOverflowSource = require('!!raw-loader!./code_block_overflow');
const codeBlockOverflowSnippet = `<EuiCodeBlock language="html" overflowHeight={300}>
{ \`<h1>Title</h1>\` }
</EuiCodeBlock>
`;

import CodeBlockPre from './code_block_pre';
const codeBlockPreSource = require('!!raw-loader!./code_block_pre');
const codeBlockPreSnippet = `<EuiCodeBlock language="html" whiteSpace="pre">
{ \`<h1>Title</h1>\` }
</EuiCodeBlock>
`;

import CodeBlockLines from './line_numbers';
const codeBlockLinesSource = require('!!raw-loader!./line_numbers');
const codeBlockLinesSnippet = `<EuiCodeBlock language="json" lineNumbers>
{}
</EuiCodeBlock>
`;
import CodeBlockLinesHighlight from './line_numbers_highlight';
const codeBlockLinesHighlightSource = require('!!raw-loader!./line_numbers_highlight');
const codeBlockLinesHighlightSnippet = `<EuiCodeBlock
  language="json"
  lineNumbers={{
    start: 32,
    highlight: '32, 34-37, 40',
    annotations: {
      33: <>A <b>special</b> note about this line</>,
      45: 'Also accepts quick plaintext notes',
    }
  }}
>
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
          <EuiLink href="https://github.com/elastic/kibana/tree/main/packages/shared-ux/code_editor/impl">
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
          available through the{' '}
          <EuiLink external href="https://prismjs.com/">
            <EuiCode>prismjs</EuiCode> library
          </EuiLink>{' '}
          and{' '}
          <EuiLink
            external
            href="https://www.elastic.co/guide/en/kibana/current/esql.html"
          >
            {' '}
            ES|QL syntax{' '}
          </EuiLink>{' '}
          provided by{' '}
          <EuiLink external href="https://github.com/elastic/prismjs-esql">
            <EuiCode>prismjs-esql</EuiCode> plugin
          </EuiLink>
          . The <EuiCode>language</EuiCode> prop can also be omitted to simply
          render formatted but non-highlighted code.
        </p>
        <p>
          JSX code (often React) has distinct language syntaxes from the base
          JavaScript and TypeScript languages. For these instances, use{' '}
          <EuiCode language="jsx">language=&quot;jsx&quot;</EuiCode> or{' '}
          <EuiCode language="tsx">language=&quot;tsx&quot;</EuiCode>.
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
          blocks with configurable font and padding sizes.
        </p>
      ),
      snippet: codeBlockSnippet,
      props: { EuiCodeBlock },
      demo: <CodeBlock />,
      playground: codeBlockConfig,
    },
    {
      text: (
        <p>
          Adding the <EuiCode>isCopyable</EuiCode> prop allows users to copy the
          text content of the code block.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockCopySource,
        },
      ],
      snippet: codeBlockCopySnippet,
      props: { EuiCodeBlock },
      demo: <CodeBlockCopy />,
    },
    {
      text: (
        <p>
          For long content, you can set an <EuiCode>overflowHeight</EuiCode>{' '}
          which will scroll if the text exceeds that height, and allows users to
          view the code in fullscreen mode.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockOverflowSource,
        },
      ],
      snippet: codeBlockOverflowSnippet,
      props: { EuiCodeBlock },
      demo: <CodeBlockOverflow />,
    },
    {
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
      snippet: codeBlockPreSnippet,
      demo: <CodeBlockPre />,
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
          To render line numbers, you can add <EuiCode>lineNumbers</EuiCode> as
          boolean flag.
        </p>
      ),
      props: { EuiCodeBlock },
      snippet: codeBlockLinesSnippet,
      demo: <CodeBlockLines />,
    },
    {
      text: (
        <>
          <p>
            You can customize line number display further with a configuration
            object containing the following optional settings:
          </p>
          <ul>
            <li>
              <EuiCode>start</EuiCode>: Changes the starting number of the first
              line. Defaults to <EuiCode>1</EuiCode>.
            </li>
            <li>
              <EuiCode>highlight</EuiCode>: Visually highlights certain lines
              (e.g. <EuiCode>&quot;3</EuiCode>), or ranges of lines (e.g.{' '}
              <EuiCode>&quot;5-10&quot;</EuiCode>). Accepts a comma-separated
              string of lines or line ranges.
            </li>
            <li>
              <EuiCode>annotations</EuiCode>: Displays an informational icon
              next to certain line numbers, that provides more context via a
              popover. Pass an object of line numbers with corresponding
              annotations (accepts strings or React nodes).
            </li>
          </ul>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: codeBlockLinesHighlightSource,
        },
      ],
      props: { EuiCodeBlock },
      snippet: codeBlockLinesHighlightSnippet,
      demo: <CodeBlockLinesHighlight />,
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
        <>
          <p>
            For large blocks of code, add <EuiCode>isVirtualized</EuiCode> to
            reduce the number of rendered rows and improve load times. Note that
            when using virtualization:
          </p>
          <ul>
            <li>
              <EuiCode>overflowHeight</EuiCode> is required
            </li>
            <li>
              <EuiCode>whiteSpace</EuiCode> is enforced as{' '}
              <EuiCode>pre</EuiCode>, and cannot be set to{' '}
              <EuiCode>pre-wrap</EuiCode>
            </li>
          </ul>
        </>
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
  ],
};
