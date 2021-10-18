import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { EuiSpacer, EuiText } from '../../../../../src';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

import JSValues from './_breakpoints_js';
import SassValues from './_breakpoints_sass';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const baseContent = useMemo(() => {
    if (showSass) return <SassValues />;
    return <JSValues />;
  }, [showSass]);

  return (
    <GuidePage
      isBeta={!showSass}
      title="Breakpoints"
      notice={!showSass && <ThemeNotice />}
      showThemeLanguageToggle
      description={
        <>
          For most of your usages we recommend using the{' '}
          <Link to="/utilities/responsive">responsive utilities</Link>{' '}
          <strong>instead</strong> of consuming these theme tokens directly.
        </>
      }
    >
      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2>Default values</h2>
        <p>
          If you want to align your custom responsive styles with EUI&apos;s
          breakpoints, or when using components that accept our named
          breakpoints, you&apos;ll want to utilize the following default values
          and provided {showSass ? 'mixins' : 'hooks'}.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      {baseContent}
    </GuidePage>
  );
};
