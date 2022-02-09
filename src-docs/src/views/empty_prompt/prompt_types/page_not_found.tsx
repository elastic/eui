import React, { useContext } from 'react';
import { EuiEmptyPrompt, EuiImage } from '../../../../../src/components';
// @ts-ignore Importing from JS file
import { typesOfUseCases } from '../_types_of_use_cases';
import { ThemeContext } from '../../../components/with_theme';

export default () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const example: any = typesOfUseCases.errorPages.example;

  const iconImg: string = isDarkTheme ? example.iconDark : example.iconLight;

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
