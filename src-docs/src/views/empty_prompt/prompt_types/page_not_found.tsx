import React, { useContext } from 'react';
import { EuiEmptyPrompt, EuiImage } from '../../../../../src/components';
import { ThemeContext } from '../../../components/with_theme';
import { examples, examplesType } from '../_examples';

const example: examplesType = examples.pageNotFound;

export default () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const iconImg: string = isDarkTheme ? example.iconDark! : example.iconLight!;

  return (
    <EuiEmptyPrompt
      icon={<EuiImage size="fullWidth" src={iconImg} alt="" />}
      title={example.title}
      layout="vertical"
      body={example.body}
      actions={example.actions}
    />
  );
};
