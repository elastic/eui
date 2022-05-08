import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/with_theme';

import { EuiCallOut, EuiSpacer, EuiText } from '../../../../../src';
import { GuideSection } from '../../../components/guide_section/guide_section';

import { ContrastSections } from './_functions_contrast';
import { TextSections } from '../../color/text/sections';
import { TintShadeSections } from './_functions_shadeTint';
import { TransparencySections } from './_functions_transparency';

import { UtilsJS, UtilsValuesJS } from './_color_js';

// This array is used inside routes.js to create the sidenav sub-sections
export const colorsFunctionsSections = [
  {
    title: 'Background colors',
    id: 'background-colors',
  },
  {
    title: 'Contrast',
    id: 'contrast',
    text: <ContrastSections />,
  },
  {
    title: 'Transparency',
    id: 'transparency',
    text: <TransparencySections />,
  },
  {
    title: 'Tint and shade',
    id: 'tint-and-shade',
    text: <TintShadeSections />,
  },
  {
    title: 'Light or dark text',
    id: 'light-or-dark-text',
    text: <TextSections />,
  },
];

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <>
      {showSass ? (
        <GuideSection>
          <EuiCallOut title="Background colors only available for CSS-in-JS." />
        </GuideSection>
      ) : (
        <>
          <GuideSection color={'subdued'}>
            <EuiText grow={false}>
              <h2
                id={`${colorsFunctionsSections[0].id}`}
              >{`${colorsFunctionsSections[0].title}`}</h2>
            </EuiText>

            <EuiSpacer size="m" />

            <UtilsJS />
          </GuideSection>

          <GuideSection color="transparent">
            <UtilsValuesJS />
          </GuideSection>
        </>
      )}

      <GuideSection color={'subdued'}>
        <EuiText grow={false}>
          <h2>Utilities</h2>
        </EuiText>

        <EuiSpacer size="m" />

        {colorsFunctionsSections.map((section) =>
          section.id === colorsFunctionsSections[0].id ? undefined : (
            <>
              <EuiText grow={false}>
                <h3 id={`${section.id}`}>{`${section.title}`}</h3>
              </EuiText>
              <EuiSpacer size="m" />
              {section.text}
            </>
          )
        )}
      </GuideSection>
    </>
  );
};
