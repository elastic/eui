import React, { useContext, useMemo } from 'react';

import { useEuiTheme } from '../../../../../src/services';
import { AMSTERDAM_NAME_KEY } from '../../../../../src/themes';
import { EuiCode, EuiText } from '../../../../../src/components';

import { GuideTabbedPage } from '../../../components/guide_tabbed_page';
import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

import {
  ColorJS,
  ColorValuesJS,
  RadiusJS,
  RadiusValuesJS,
  TypesJS,
  TypesValuesJS,
  WidthJS,
  WidthValuesJS,
} from './_border_js';
import {
  ColorSass,
  TypesSass,
  TypesValuesSass,
  WidthSass,
  RadiusSass,
  ColorValuesSass,
  WidthValuesSass,
  RadiusValuesSass,
} from './_border_sass';

// This array is used inside routes.js to create the sidenav sub-sections
export const bordersSections = [
  { title: 'Types', id: 'types' },
  { title: 'Color', id: 'color' },
  { title: 'Width', id: 'width' },
  { title: 'Radius', id: 'radius' },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const borderContent = useMemo(() => {
    const description = (
      <p>
        These common border types string together the base properties of color,
        width and style to form common full <EuiCode>border</EuiCode>{' '}
        properties.
      </p>
    );
    if (showSass) return <TypesSass description={description} />;
    return <TypesJS description={description} />;
  }, [showSass]);

  const colorContent = useMemo(() => {
    const description = (
      <p>
        You can apply this color directly to any{' '}
        <EuiCode language="css">border-color</EuiCode> property.
      </p>
    );
    if (showSass) return <ColorSass description={description} />;
    return <ColorJS description={description} />;
  }, [showSass]);

  const widthContent = useMemo(() => {
    const description = (
      <>
        These basic properties make up the border thickness which can be used
        individually or in conjunction with
      </>
    );
    if (showSass) return <WidthSass description={description} />;
    return <WidthJS description={description} />;
  }, [showSass]);

  const radiusContent = useMemo(() => {
    const description = (
      <p>
        These basic properties make up the corner radii which can be used
        individually.
      </p>
    );
    if (showSass) return <RadiusSass description={description} />;
    return <RadiusJS description={description} />;
  }, [showSass]);

  return (
    <GuideTabbedPage
      title="Borders"
      notice={<ThemeNotice />}
      description="The border tokens contain both individual border property values and full shorthand border properties."
      showThemeLanguageToggle
    >
      <GuideSection color="subdued">
        <EuiText>
          <h2
            id={`${bordersSections[0].id}`}
          >{`${bordersSections[0].title}`}</h2>
        </EuiText>

        {borderContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <TypesValuesSass /> : <TypesValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${bordersSections[1].id}`}
          >{`${bordersSections[1].title}`}</h2>
          {euiTheme.themeName === AMSTERDAM_NAME_KEY ? (
            <p>
              EUI only has one base color it uses for all borders (or calculated
              borders).
            </p>
          ) : (
            <>
              <p>
                EUI has one main base color it uses for almost all borders (or
                calculated borders).
              </p>
              <p>
                Only form specific borders use the
                <EuiCode>euiTheme.colors.borderBasePlain</EuiCode> color token
                instead.
              </p>
            </>
          )}
        </EuiText>

        {colorContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <ColorValuesSass /> : <ColorValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${bordersSections[2].id}`}
          >{`${bordersSections[2].title}`}</h2>
        </EuiText>

        {widthContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <WidthValuesSass /> : <WidthValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${bordersSections[3].id}`}
          >{`${bordersSections[3].title}`}</h2>
        </EuiText>

        {radiusContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <RadiusValuesSass /> : <RadiusValuesJS />}
      </GuideSection>
    </GuideTabbedPage>
  );
};
