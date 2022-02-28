import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const example: examplesType = examples.startAddingCases;

export default () => {
  const emptyPrompt = (
    <EuiEmptyPrompt
      iconType={example.iconTypeApp}
      iconColor="default"
      title={example.title}
      titleSize="xs"
      body={example.body}
      actions={example.actions}
    />
  );

  const emptyPromptJSXString = `
  import React from 'react';
  import { EuiEmptyPrompt, EuiButton } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(emptyPrompt)}
  );
  `;

  const customSnippet = `<EuiEmptyPrompt
  iconType="solutionApp"
  iconColor="default"
  title={<h2>Your title</h2>}
  titleSize="xs"
  body={<p>Content</p>}
  actions={actions}
/>`;

  return (
    <GuideSection
      demo={emptyPrompt}
      source={[
        {
          type: GuideSectionTypes.JSX_STRING,
          code: emptyPromptJSXString,
        },
      ]}
      props={{ EuiEmptyPrompt }}
      snippet={customSnippet}
    />
  );
};
