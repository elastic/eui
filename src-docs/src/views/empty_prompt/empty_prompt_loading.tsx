import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const example: examplesType = examples.loading;

export default () => {
  const emptyPrompt = (
    <EuiEmptyPrompt icon={example.iconLoading} title={example.title} />
  );

  const emptyPromptJSXString = `
  import React from 'react';
  import { EuiEmptyPrompt, EuiLoadingLogo } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(emptyPrompt)}
  );
  `;

  const loadingSnippet = `<EuiEmptyPrompt
  icon={<EuiLoadingLogo logo="logoKibana" size="xl" />}
  title={<h2>Loading</h2>}
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
      snippet={loadingSnippet}
    />
  );
};
