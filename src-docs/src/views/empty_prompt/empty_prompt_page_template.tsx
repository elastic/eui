import React, { useContext } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { ThemeContext } from '../../components/with_theme';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiSpacer,
  EuiPageTemplate,
} from '../../../../src/components';
import { examples, examplesType } from './_examples';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const example: examplesType = examples.firstTimeVisualization;

export default () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const iconImg: string = isDarkTheme ? example.iconDark! : example.iconLight!;

  const emptyPrompt = (
    <EuiPageTemplate
      template="empty"
      pageContentProps={{
        paddingSize: 'none',
        role: null, // For passing a11y tests in EUI docs only
      }}
    >
      <EuiEmptyPrompt
        icon={<EuiImage size="fullWidth" src={iconImg} alt="" />}
        title={example.title}
        layout="horizontal"
        color="plain"
        body={example.body}
        actions={example.actions}
        footer={example.footer}
      />
    </EuiPageTemplate>
  );

  const emptyPromptLayoutJSXString = `
  import React from 'react';
  import { EuiPageTemplate, EuiEmptyPrompt, EuiButton, EuiTitle, EuiLink, EuiImage } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(emptyPrompt)}
  );
  `;

  return (
    <>
      <EuiSpacer size="l" />

      <GuideSection
        demo={emptyPrompt}
        source={[
          {
            type: GuideSectionTypes.JSX_STRING,
            code: emptyPromptLayoutJSXString,
          },
        ]}
        props={{ EuiEmptyPrompt }}
      />
    </>
  );
};
