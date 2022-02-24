import React, { useContext } from 'react';
import { ThemeContext } from '../../components/with_theme';
import {
  EuiPageTemplate,
  EuiEmptyPrompt,
  EuiImage,
} from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.firstTimeVisualization;

export default () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const iconImg: string = isDarkTheme ? example.iconDark! : example.iconLight!;

  return (
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
};
