import React, { useContext, useMemo } from 'react';

import { EuiSpacer, EuiText, EuiTitle } from '../../../../../src';

import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

import JSValues, { BaseJS, ScaleValuesJS } from './_sizing_js';
import SassValues, { BaseSass, ScaleValuesSass } from './_sizing_sass';

export const sizingInfo = {
  title: 'Sizing',
  notice: <ThemeNotice />,
  showThemeLanguageToggle: true,
};

// This array is used inside routes.js to create the sidenav sub-sections
export const sizingSections = [
  { title: 'Base', id: 'base' },
  { title: 'Scale', id: 'scale' },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const baseContent = useMemo(() => {
    if (showSass) return <BaseSass />;
    return <BaseJS />;
  }, [showSass]);

  const scaleContent = useMemo(() => {
    if (showSass) return <SassValues />;
    return <JSValues />;
  }, [showSass]);

  return (
    <>
      <GuideSection color="transparent">
        <EuiText grow={false}>
          <h2 id={`${sizingSections[0].id}`}>{`${sizingSections[0].title}`}</h2>
          <p>
            All sizing values, including font sizes, are calculated from a
            single base integer and converted to pixel or rem string values.
          </p>
        </EuiText>

        <EuiSpacer size="l" />

        {baseContent}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiTitle>
          <h2 id={`${sizingSections[1].id}`}>{`${sizingSections[1].title}`}</h2>
        </EuiTitle>

        <EuiSpacer size="l" />

        {scaleContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <ScaleValuesSass /> : <ScaleValuesJS />}
      </GuideSection>
    </>
  );
};
