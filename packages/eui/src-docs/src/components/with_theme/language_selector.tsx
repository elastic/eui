import React, { useContext } from 'react';

import { EuiButtonGroup } from '../../../../src/components';

import { ThemeContext } from './theme_context';

export const THEME_LANGUAGES = ['language--js', 'language--sass'] as const;

export type ThemeLanguages = {
  id: (typeof THEME_LANGUAGES)[number];
  label: string;
  title: string;
};

export const themeLanguagesOptions: ThemeLanguages[] = [
  {
    id: 'language--js',
    label: 'CSS-in-JS',
    title: 'Language selector: CSS-in-JS',
  },
  {
    id: 'language--sass',
    label: 'Sass',
    title: 'Language selector: Sass',
  },
];

const ids = themeLanguagesOptions.map(({ id }) => id);

export const LanguageSelector = ({
  onChange,
}: {
  onChange?: (id: string) => void;
}) => {
  const themeContext = useContext(ThemeContext);
  const toggleIdSelected = themeContext.themeLanguage;
  const onLanguageChange = (optionId: string) => {
    themeContext.setContext({
      themeLanguage: optionId as ThemeLanguages['id'],
    });
    onChange?.(optionId);
  };

  return (
    <EuiButtonGroup
      buttonSize="m"
      color="accent"
      legend="Language selector"
      options={themeLanguagesOptions}
      idSelected={
        ids.includes(toggleIdSelected) ? toggleIdSelected : 'language--js'
      }
      onChange={(id) => onLanguageChange(id)}
    />
  );
};
