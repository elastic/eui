import React, { useContext, useMemo } from 'react';

import { EuiCallOut, EuiSpacer, EuiText, EuiTitle } from '../../../../../src';

import { GuideTabbedPage } from '../../../components/guide_tabbed_page';
import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

import JSValues, {
  BaseJS,
  PaddingJS,
  ScaleValuesJS,
  UtilsJS,
} from './_sizing_js';
import SassValues, { BaseSass, ScaleValuesSass } from './_sizing_sass';

// This array is used inside routes.js to create the sidenav sub-sections
export const sizingSections = [
  { title: 'Base', id: 'base' },
  { title: 'Scale', id: 'scale' },
  { title: 'Logical properties', id: 'logical' },
  { title: 'Padding', id: 'padding' },
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

  const utilsContent = useMemo(() => {
    if (showSass)
      return <EuiCallOut title="Utilities only available for Emotion." />;
    return <UtilsJS />;
  }, [showSass]);

  const paddingContent = useMemo(() => {
    if (showSass)
      return <EuiCallOut title="Utilities only available for Emotion." />;
    return <PaddingJS />;
  }, [showSass]);

  return (
    <GuideTabbedPage
      title="Sizing"
      isBeta={!showSass}
      notice={<ThemeNotice />}
      showThemeLanguageToggle
    >
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

      <GuideSection color="subdued">
        <EuiTitle>
          <h2 id={`${sizingSections[2].id}`}>{`${sizingSections[2].title}`}</h2>
        </EuiTitle>

        <EuiSpacer size="m" />

        {utilsContent}
      </GuideSection>

      <GuideSection color="transparent">
        <EuiTitle>
          <h2 id={`${sizingSections[3].id}`}>{`${sizingSections[3].title}`}</h2>
        </EuiTitle>

        <EuiSpacer size="m" />

        {paddingContent}
      </GuideSection>
    </GuideTabbedPage>
  );
};
