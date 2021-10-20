import React, { useContext, useMemo } from 'react';

import { EuiCode, EuiSpacer, EuiText } from '../../../../../src/components';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeNotice } from '../_components/_theme_notice';

import { ColorJS, RadiusJS, TypesJS, WidthJS } from './_border_js';
import { ColorSass, TypesSass, WidthSass, RadiusSass } from './_border_sass';

// This array is used inside routes.js to create the sidenav sub-sections
export const bordersSections = [
  { title: 'Types', id: 'types' },
  { title: 'Color', id: 'color' },
  { title: 'Width', id: 'width' },
  { title: 'Radius', id: 'radius' },
];

export default () => {
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
    <GuidePage
      title="Borders"
      isBeta={!showSass}
      notice={!showSass && <ThemeNotice />}
      description="The border tokens contain both individual border property values and full shorthand border properties."
      showThemeLanguageToggle
    >
      <EuiSpacer size="xl" />

      <EuiText>
        <h2 id={`${bordersSections[0].id}`}>{`${bordersSections[0].title}`}</h2>
      </EuiText>

      <EuiSpacer size="xl" />

      {borderContent}

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${bordersSections[1].id}`}>{`${bordersSections[1].title}`}</h2>
        <p>
          EUI only has one base color it uses for all borders (or calculated
          borders).
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      {colorContent}

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${bordersSections[2].id}`}>{`${bordersSections[2].title}`}</h2>
      </EuiText>

      <EuiSpacer size="xl" />

      {widthContent}

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2 id={`${bordersSections[3].id}`}>{`${bordersSections[3].title}`}</h2>
      </EuiText>

      <EuiSpacer size="xl" />

      {radiusContent}
    </GuidePage>
  );
};
