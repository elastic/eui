import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';
import { useEuiTextDiffProp } from './props';
import TextDiff from './text_diff';
const textDiffSource = require('!!raw-loader!./text_diff');
const textDiffHtml = renderToHtml(TextDiff);

import TextDiffCustomComponents from './text_diff_custom_components';
const customComponentsSource = require('!!raw-loader!./text_diff_custom_components');
const customComponentsHtml = renderToHtml(TextDiffCustomComponents);

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
        <>
          <p>
            The hook, <strong>useEuiTextDiff</strong>, generates a set of
            changes between two strings. It returns both React elements for
            displaying the diff and an object representing the identified
            changes.The <EuiCode>timeout</EuiCode> prop is used to set how many
            seconds any diff&apos;s exploration phase may take. The default
            value is 0.1, a value of 0 disables the timeout and lets diff run
            until completion. The higher the timeout, the more detailed the
            comparison.
          </p>
          <p>
            <EuiCode language="ts">
              const [rendered, textDiffObject] = useEuiTextDiff()
            </EuiCode>
          </p>
        </>
      ),
      demo: <TextDiff />,
      props: { useEuiTextDiffProp },
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
          By default, the hook will render deletions as{' '}
          <EuiCode>{'<del>'}</EuiCode> and insertions as{' '}
          <EuiCode>{'<ins>'}</EuiCode> elements. You can replace these rendered
          html elements with the
          <EuiCode>
            InsertComponent, DeletionComponent, NoChangeComponent{' '}
          </EuiCode>
          props.
        </p>
      ),
      demo: <TextDiffCustomComponents />,
    },
  ],
};
