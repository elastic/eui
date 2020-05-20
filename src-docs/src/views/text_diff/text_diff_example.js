import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, useEuiTextDiff } from '../../../../src/components';

import TextDiff from './text_diff';
const textDiffSource = require('!!raw-loader!./text_diff');
const textDiffHtml = renderToHtml(TextDiff);

import TextDiffCustomComponents from './text_diff_custom_components';
const customComponentsSource = require('!!raw-loader!./text_diff_custom_components');
const customComponentsHtml = renderToHtml(TextDiffCustomComponents);

import TextDiffTimeOut from './text_diff_timeout';
const TextDiffTimeOutSource = require('!!raw-loader!./text_diff_timeout');
const TextDiffTimeOutHtml = renderToHtml(TextDiffTimeOut);

export const TextDiffExample = {
  title: 'Text Diff',
  sections: [
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
      title: 'Text Diff with custom components',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customComponentsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customComponentsHtml,
        },
      ],
      text: (
        <p>
          Custom components such as{' '}
          <EuiCode>
            InsertComponent, DeletionComponent, NoChangeComponent{' '}
          </EuiCode>
          can be passed to the utility to render customized styles.
        </p>
      ),
      demo: <TextDiffCustomComponents />,
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
          The <EuiCode>timeout</EuiCode> prop is used to set how many seconds any
          diff&apos;s exploration phase may take. The default value is 0.1, a
          value of 0 disables the timeout and lets diff run until completion.
          The higher the timeout, the more detailed the comparison.
        </p>
      ),
      demo: <TextDiffTimeOut />,
      props: { useEuiTextDiff },
    },
  ],
};
