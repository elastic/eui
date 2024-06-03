import React, { useContext, useState } from 'react';

import {
  EuiButtonGroup,
  EuiIcon,
  EuiLink,
  EuiText,
  EuiTourStep,
} from '../../../../src/components';

import {
  ThemeContext,
  theme_languages,
  THEME_LANGUAGES,
} from './theme_context';

const NOTIF_STORAGE_KEY = 'js_vs_sass_notification';
const NOTIF_STORAGE_VALUE = 'dismissed';

export const LanguageSelector = ({
  onChange,
  showTour = false,
}: {
  onChange?: (id: string) => void;
  showTour?: boolean;
}) => {
  const themeContext = useContext(ThemeContext);
  const toggleIdSelected = themeContext.themeLanguage;
  const onLanguageChange = (optionId: string) => {
    themeContext.changeThemeLanguage(optionId as THEME_LANGUAGES['id']);
    onChange?.(optionId);
    setTourIsOpen(false);
    localStorage.setItem(NOTIF_STORAGE_KEY, NOTIF_STORAGE_VALUE);
  };

  const [isTourOpen, setTourIsOpen] = useState(
    localStorage.getItem(NOTIF_STORAGE_KEY) === NOTIF_STORAGE_VALUE
      ? false
      : showTour
  );

  const onTourDismiss = () => {
    setTourIsOpen(false);
    localStorage.setItem(NOTIF_STORAGE_KEY, NOTIF_STORAGE_VALUE);
  };

  return (
    <EuiTourStep
      content={
        <EuiText style={{ maxWidth: 320 }}>
          <p>Select your preferred styling language with this toggle button.</p>
        </EuiText>
      }
      isStepOpen={isTourOpen}
      onFinish={onTourDismiss}
      step={1}
      stepsTotal={1}
      title={
        <>
          <EuiIcon type="bell" size="s" /> &nbsp; Theming update
        </>
      }
      footerAction={<EuiLink onClick={onTourDismiss}>Got it!</EuiLink>}
    >
      <EuiButtonGroup
        buttonSize="m"
        color="accent"
        legend="Language selector"
        options={theme_languages}
        idSelected={toggleIdSelected}
        onChange={(id) => onLanguageChange(id)}
      />
    </EuiTourStep>
  );
};
