import React, { useContext, useMemo } from 'react';
import { EuiSpacer, EuiText, EuiProvider } from '../../../../../src';

import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import JSContent, {
  BreakpointValuesJS,
  CustomBreakpointsJS,
  CUSTOM_BREAKPOINTS,
} from './_breakpoints_js';
import SassContent, { BreakpointValuesSass } from './_breakpoints_sass';

export const breakpointSections = [
  { title: 'Default values', id: 'default-values' },
  { title: 'Custom values', id: 'custom-values' },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const baseContent = useMemo(() => {
    if (showSass) return <SassContent />;
    return <JSContent />;
  }, [showSass]);

  const valuesContent = useMemo(() => {
    if (showSass) return <BreakpointValuesSass />;
    return <BreakpointValuesJS />;
  }, [showSass]);

  return (
    <>
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={breakpointSections[0].id}>{breakpointSections[0].title}</h2>
          <p>
            If you want to align your custom responsive styles with EUI&apos;s
            breakpoints, or when using components that accept our named
            breakpoints, you&apos;ll want to utilize the following default
            values and provided {showSass ? 'mixins' : 'hooks'}.
          </p>
        </EuiText>
        <EuiSpacer size="xl" />

        {baseContent}
      </GuideSection>

      <GuideSection color="transparent">{valuesContent}</GuideSection>

      {currentLanguage.includes('js') && (
        <EuiProvider modify={{ breakpoint: CUSTOM_BREAKPOINTS }}>
          <GuideSection color="subdued">
            <EuiText grow={false}>
              <h2 id={breakpointSections[1].id}>
                {breakpointSections[1].title}
              </h2>
              <p>
                EUI&apos;s theme breakpoints can be overridden and extended.
                However, the default sizes (<strong>xl</strong> through{' '}
                <strong>xs</strong>) will always be present and cannot be
                removed.
              </p>
            </EuiText>
            <EuiSpacer size="xl" />

            <CustomBreakpointsJS />
          </GuideSection>

          <GuideSection color="transparent">{valuesContent}</GuideSection>
        </EuiProvider>
      )}
    </>
  );
};
