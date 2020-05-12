import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCodeBlockImpl,
  useEuiTextDiff,
} from '../../../../src/components';

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

import TextDiff from './text_diff';
const textDiffSource = require('!!raw-loader!./text_diff');
const textDiffHtml = renderToHtml(TextDiff);

import NoDeletion from './text_diff_no_deletions';
const noDeletionSource = require('!!raw-loader!./text_diff_no_deletions');
const noDeletionHtml = renderToHtml(NoDeletion);

import TextDiffTimeOut from './text_diff_timeout';
const TextDiffTimeOutSource = require('!!raw-loader!./text_diff_timeout');
const TextDiffTimeOutHtml = renderToHtml(TextDiffTimeOut);

export const CodeExample = {
  title: 'Code',
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
      demo: <Code />,
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
      props: { EuiCodeBlockImpl },
      demo: <CodeBlock />,
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
      props: { EuiCodeBlockImpl },
      demo: <CodeBlockPre />,
    },
    {
      title: 'Text Diff',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textDiffSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textDiffHtml,
        },
      ],
      text: (
        <p>
          <strong>useEuiTextDiff</strong> generates a set of changes between two
          strings. The hook returns both React elements for displaying the diff
          and an object representing the identified changes.
        </p>
      ),
      demo: <TextDiff />,
      props: { useEuiTextDiff },
    },
    {
      title: 'Text Diff without deletions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: noDeletionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: noDeletionHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>showDeletion</EuiCode> is used for hiding/showing deletions.
        </p>
      ),
      demo: <NoDeletion />,
      props: { useEuiTextDiff },
    },
    {
      title: 'Text Diff with timeout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: TextDiffTimeOutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: TextDiffTimeOutHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>timeout</EuiCode> is used to set how many seconds any
          diff&apos;s exploration phase may take. The default value is 0.1, a
          value of 0 disables the timeout and lets diff run until completion.
          Higher the timeout , more detailed is the comparision
        </p>
      ),
      demo: <TextDiffTimeOut />,
      props: { useEuiTextDiff },
    },
  ],
};
