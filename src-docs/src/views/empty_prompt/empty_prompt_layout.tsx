import React, { useContext } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { ThemeContext } from '../../components/with_theme';
import {
  EuiEmptyPrompt,
  EuiImage,
  EuiSpacer,
} from '../../../../src/components';
import { examples, examplesType } from './_examples';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const example: examplesType = examples.firstTimeVisualization;

export default () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const iconImg: string = isDarkTheme ? example.iconDark! : example.iconLight!;

  const emptyPromptLayout = (
    <EuiEmptyPrompt
      icon={<EuiImage size="fullWidth" src={iconImg} alt="" />}
      title={example.title}
      layout="horizontal"
      color="plain"
      body={example.body}
      actions={example.actions}
      footer={example.footer}
    />
  );

  const emptyPromptLayoutJSXString = `
  import React from 'react';
  import { EuiEmptyPrompt, EuiButton, EuiTitle, EuiLink, EuiImage } from '@elastic/eui';
  
  export default () => (
    ${reactElementToJSXString(emptyPromptLayout)}
  );
  `;

  return (
    <>
      <EuiSpacer size="l" />

      <GuideSection
        demo={emptyPromptLayout}
        source={[
          {
            type: GuideSectionTypes.JSX_STRING,
            code: emptyPromptLayoutJSXString,
          },
        ]}
        props={{ EuiEmptyPrompt }}
        demoPanelProps={{
          color: 'subdued',
          paddingSize: 'l',
        }}
        snippet={`<EuiEmptyPrompt
    layout="horizontal"
    icon={<EuiImage size="fullWidth" src={illustration} alt="" />}
    title={<h2>Your title</h2>}
    body={<p>bodyContent</p>}
    actions={actions}
    footer={footer}
  />`}
      />
    </>
  );
};
