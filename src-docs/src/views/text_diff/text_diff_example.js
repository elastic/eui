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
          The hook, <strong>useEuiTextDiff</strong>, generates a set of changes between two
          strings. It returns both React elements for displaying the diff
          and an object representing the identified changes.
        </p>
        <p>
          <EuiCode language="ts">const [rendered, textDiffObject] = useEuiTextDiff()</EuiCode>
        </p>
      ),
      demo: <TextDiff />,
      props: { useEuiTextDiff },
    },
    {
      title: 'Custom rendered elements',
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
          By default, the hook will render deletions as <EuiCode>{'<del>'}</EuiCode> and 
          insertions as <EuiCode>{'<ins>'}</EuiCode> elements. You can replace these rendered
          html elements with the
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
      title: 'Adjusting the timeout delay',
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
