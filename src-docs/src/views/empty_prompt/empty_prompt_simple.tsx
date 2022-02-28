import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const example: examplesType = examples.licenseUpgrade;

export default () => {
  const emptyPrompt = (
    <EuiEmptyPrompt title={example.title} actions={example.actions} />
  );

  const emptyPromptJSXString = `
  import React from 'react';
  import { EuiEmptyPrompt, EuiButton, EuiButtonEmpty, EuiTitle, EuiLink } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(emptyPrompt)}
  );
  `;

  const simpleSnippet = `<EuiEmptyPrompt
  title={<h2>Your title</h2>}
  actions={[primaryAction, secondaryAction]}
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
      snippet={simpleSnippet}
    />
  );
};
