import React, { useContext, useMemo } from 'react';

import {
  EuiHorizontalRule,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../../../../src/components';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

// @ts-ignore Importing JS
import JSValues, { BaseJS } from './_sizing_js';
import SassValues, { BaseSass } from './_sizing_sass';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const baseContent = useMemo(() => {
    if (showSass) return <BaseSass />;
    return <BaseJS />;
  }, [showSass]);

  const selectedTabContent = useMemo(() => {
    if (showSass) return <SassValues />;
    return <JSValues />;
  }, [showSass]);

  return (
    <GuidePage
      title="Sizing"
      isBeta={!showSass}
      notice={!showSass && <ThemeNotice />}
      showThemeLanguageToggle
    >
      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2>Base</h2>
        <p>
          All sizing values, including font sizes, are calculated from a single{' '}
          base integer and converted to pixel or rem string values.
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      {baseContent}

      <EuiHorizontalRule margin="xxl" />

      <EuiTitle>
        <h2>Scale</h2>
      </EuiTitle>

      <EuiSpacer size="l" />

      {selectedTabContent}
    </GuidePage>
  );
};
