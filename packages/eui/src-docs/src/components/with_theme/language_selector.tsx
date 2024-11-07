import React, { useContext } from 'react';

import { EuiButtonGroup } from '../../../../src/components';

import {
  ThemeContext,
  theme_languages,
  THEME_LANGUAGES,
} from './theme_context';

export const LanguageSelector = ({
  onChange,
}: {
  onChange?: (id: string) => void;
}) => {
  const themeContext = useContext(ThemeContext);
  const toggleIdSelected = themeContext.themeLanguage;
  const onLanguageChange = (optionId: string) => {
    themeContext.setContext({
      themeLanguage: optionId as THEME_LANGUAGES['id'],
    });
    onChange?.(optionId);
  };

  return (
    <EuiButtonGroup
      buttonSize="m"
      color="accent"
      legend="Language selector"
      options={theme_languages}
      idSelected={toggleIdSelected}
      onChange={(id) => onLanguageChange(id)}
    />
  );
};
