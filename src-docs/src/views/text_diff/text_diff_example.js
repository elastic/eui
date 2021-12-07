import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';
import { useEuiTextDiffProp } from './props';
import TextDiff from './text_diff';
const textDiffSource = require('!!raw-loader!./text_diff');

import TextDiffCustomComponents from './text_diff_custom_components';
const customComponentsSource = require('!!raw-loader!./text_diff_custom_components');

export const TextDiffExample = {
  title: 'Text diff',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textDiffSource,
        },
      ],
      text: (
        <>
          <p>
            The hook, <strong>useEuiTextDiff</strong>, generates a set of
            changes between two strings. It returns both React elements for
            displaying the diff and an object representing the identified
            changes. The <EuiCode>timeout</EuiCode> prop is used to set how many
            seconds any diff&apos;s exploration phase may take. The default
            value is 0.1, a value of 0 disables the timeout and lets diff run
            until completion. The higher the timeout, the more detailed the
            comparison.
          </p>
          <p>
            <EuiCode language="tsx">
              {
                'const [rendered, textDiffObject] = useEuiTextDiff({ beforeText, afterText })'
              }
            </EuiCode>
          </p>
        </>
      ),
      demo: <TextDiff />,
      props: { useEuiTextDiffProp },
      snippet: `const [rendered, textDiffObject] = useEuiTextDiff({ beforeText, afterText })

<EuiText><p>{rendered}</p></EuiText>`,
    },
    {
      title: 'Custom rendered elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customComponentsSource,
        },
      ],
      text: (
        <>
          <p>
            By default, the hook will wrap deletions with{' '}
            <EuiCode>{'<del>'}</EuiCode> and insertions with{' '}
            <EuiCode>{'<ins>'}</EuiCode> elements. You can replace these
            elements with the <EuiCode>deleteComponent</EuiCode> and{' '}
            <EuiCode>insertComponent</EuiCode>
            props respectively.
          </p>
          <p>
            Also, since <EuiCode>rendered</EuiCode> is simple html string, you
            can wrap it in any contextual element like{' '}
            <Link to="/display/text">
              <strong>EuiText</strong>
            </Link>{' '}
            or{' '}
            <Link to="/display/code">
              <strong>EuiCodeBlock</strong>
            </Link>
            .
          </p>
        </>
      ),
      demo: <TextDiffCustomComponents />,
      snippet: `const [rendered] = useEuiTextDiff({
  beforeText,
  afterText,
  insertComponent: 'strong',
});

<EuiCodeBlock fontSize="m" paddingSize="m">
  {rendered}
</EuiCodeBlock>`,
    },
  ],
};
