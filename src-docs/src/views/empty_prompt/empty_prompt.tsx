import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
// @ts-ignore Importing from JS file
import emptyPromptConfig from './playground';

const example: examplesType = examples.startAddingCases;

export default () => {
  const emptyPrompt = (
    <EuiEmptyPrompt
      iconType={example.iconType}
      title={example.title}
      body={example.body}
      actions={example.actions}
      footer={example.footer}
    />
  );

  const emptyPromptJSXString = `
  import React from 'react';
  import { EuiEmptyPrompt, EuiButton, EuiTitle, EuiLink } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(
      <EuiEmptyPrompt
        iconType={example.iconType}
        title={example.title}
        body={example.body}
        actions={example.actions}
        footer={example.footer}
      />
    )}
  );
  `;

  const emptyPromptSnippet = `<EuiEmptyPrompt
  iconType="logoSolution"
  title={<h2>Your title</h2>}
  body={<p>Content</p>}
  actions={actions}
  footer={footer}
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
      snippet={emptyPromptSnippet}
      playground={emptyPromptConfig}
    />
  );
};
