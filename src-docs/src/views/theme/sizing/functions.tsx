import React, { useContext, useMemo } from 'react';

import { EuiCallOut, EuiSpacer, EuiTitle } from '../../../../../src';

import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import { PaddingJS, UtilsJS } from './_sizing_js';

// This array is used inside routes.js to create the sidenav sub-sections
export const sizingFunctionSections = [
  { title: 'Logical properties', id: 'logical' },
  { title: 'Padding', id: 'padding' },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

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
    <>
      <GuideSection color="transparent">
        <EuiTitle>
          <h2
            id={`${sizingFunctionSections[0].id}`}
          >{`${sizingFunctionSections[0].title}`}</h2>
        </EuiTitle>

        <EuiSpacer size="m" />

        {utilsContent}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiTitle>
          <h2
            id={`${sizingFunctionSections[1].id}`}
          >{`${sizingFunctionSections[1].title}`}</h2>
        </EuiTitle>

        <EuiSpacer size="m" />

        {paddingContent}
      </GuideSection>
    </>
  );
};
