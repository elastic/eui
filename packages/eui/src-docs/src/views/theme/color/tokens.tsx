import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  AMSTERDAM_NAME_KEY,
  EuiCode,
  EuiSpacer,
  EuiText,
  useEuiTheme,
} from '../../../../../src';
import { GuideSection } from '../../../components/guide_section/guide_section';

import { ThemeContext } from '../../../components/with_theme';
import { ThemeNotice } from '../_components/_theme_notice';

import {
  BackgroundJS,
  BackgroundValuesJS,
  BorderJS,
  BorderValuesJS,
  BrandJS,
  BrandValuesJS,
  ShadeJS,
  ShadeValuesJS,
  SpecialJS,
  SpecialValuesJS,
  TextJS,
  TextValuesJS,
} from './_color_js';
import {
  BackgroundSass,
  BackgroundValuesSass,
  BorderSass,
  BorderValuesSass,
  BrandSass,
  BrandValuesSass,
  ShadeSass,
  ShadeValuesSass,
  SpecialSass,
  SpecialValuesSass,
  TextSass,
  TextValuesSass,
} from './_color_sass';

const Intro = () => {
  const { euiTheme } = useEuiTheme();

  const description =
    euiTheme.themeName === AMSTERDAM_NAME_KEY ? (
      <>
        <p>
          Elastic UI builds with a very limited palette. It uses a core set of
          three colors with a green / orange / red qualitative set and combined
          with a six-color grayscale. Variation beyond these colors is minimal
          and always done with math manipulation against the original set.
        </p>
        <p>
          When switching between light and dark color modes, the theme keys do
          not change, only their values do. This is why most keys are not named
          for their <strong>evaluated</strong> value but by their{' '}
          <strong>purpose</strong>.
        </p>
      </>
    ) : (
      <>
        <p>
          Elastic UI builds with a color palette that is based on predefined
          14-step scales for a core set of three colors (blue / teal / pink) as
          well as a green / yellow / red qualitative set and combined with a
          28-step grayscale. Colors are defined to work well when combined for
          their semantic purpose.
        </p>
        <p>
          When switching between light and dark color modes, the theme keys do
          not change, only their values do.
        </p>
      </>
    );

  return (
    <EuiText grow={false}>
      <p>{description}</p>
    </EuiText>
  );
};

export const colorsInfo = {
  title: 'Colors',
  notice: <ThemeNotice />,
  showThemeLanguageToggle: true,
  intro: <Intro />,
};

// This array is used inside routes.js to create the sidenav sub-sections
export const colorsSections = [
  { title: 'Brand colors', id: 'brand-colors' },
  { title: 'Text colors', id: 'text-colors' },
  { title: 'Background colors', id: 'background-colors' },
  { title: 'Border colors', id: 'border-colors' },
  { title: 'Shades', id: 'shades' },
  { title: 'Special colors', id: 'special-colors' },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const brandContent = useMemo(() => {
    const description = (
      <p>
        Most usages of the colors can be implemented simply by pulling and
        applying the values.
      </p>
    );
    if (showSass) return <BrandSass description={description} />;
    return <BrandJS description={description} />;
  }, [showSass]);

  const textContent = useMemo(() => {
    const description = (
      <p>
        Remember, when using any of the EUI colors for text,{' '}
        <strong>use the text specific variant</strong>.
      </p>
    );
    if (showSass) return <TextSass description={description} />;
    return <TextJS description={description} />;
  }, [showSass]);

  const backgroundContent = useMemo(() => {
    if (showSass) return <BackgroundSass />;
    return <BackgroundJS />;
  }, [showSass]);

  const borderContent = useMemo(() => {
    if (showSass) return <BorderSass />;
    return <BorderJS />;
  }, [showSass]);

  const shadesContent = useMemo(() => {
    const description = (
      <>
        <p>
          Since the EUI colors usually evaluate to a hex value, the easiest way
          to perform color operations like transparency by using the EUI
          provided method of <EuiCode>transparentize()</EuiCode>.
        </p>
        <p>
          For all available color functions see the{' '}
          <Link to="/theming/colors/utilities">Colors Utilities page</Link>.
        </p>
      </>
    );
    if (showSass) return <ShadeSass description={description} />;
    return <ShadeJS description={description} />;
  }, [showSass]);

  const specialContent = useMemo(() => {
    const description = (
      <p>
        Constant colors are those that do not change no matter the theme or
        color mode and typically represent the polar extremes.
      </p>
    );
    if (showSass) return <SpecialSass description={description} />;
    return <SpecialJS description={description} />;
  }, [showSass]);

  return (
    <>
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${colorsSections[0].id}`}>{`${colorsSections[0].title}`}</h2>
          <p>
            Elastic has two main brand colors. The other three are used for
            statefulness like indicating between successful and dangerous
            actions.
          </p>
        </EuiText>

        <EuiSpacer size="xl" />

        {brandContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <BrandValuesSass /> : <BrandValuesJS />}
      </GuideSection>

      {/* Text colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${colorsSections[1].id}`}>{`${colorsSections[1].title}`}</h2>
          <p>
            {euiTheme.themeName === AMSTERDAM_NAME_KEY ? (
              <>
                Each brand color also has a corresponding text variant that has
                been calculated for proper (at least 4.5) contrast against{' '}
                <EuiCode>colors.body</EuiCode> and should be used specifically
                when coloring text.
              </>
            ) : (
              <>
                Each brand color also has a corresponding text variant that
                should be used specifically when coloring text.
              </>
            )}
            As is used in{' '}
            <Link to="/display/text#coloring-text">
              <strong>EuiTextColor</strong>
            </Link>
            .
          </p>
        </EuiText>

        <EuiSpacer size="xl" />

        {textContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <TextValuesSass /> : <TextValuesJS />}
      </GuideSection>

      {/* Background colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${colorsSections[2].id}`}>{`${colorsSections[2].title}`}</h2>
          <p>
            Semantic background colors. These should be used according to their
            semantic purpose.
          </p>
          <p>
            If a border is needed use the semantically related border color,
            e.g. <EuiCode>backgroundBasePrimary</EuiCode> with{' '}
            <EuiCode>borderBasePrimary</EuiCode>.
          </p>
        </EuiText>

        <EuiSpacer size="xl" />

        {backgroundContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <BackgroundValuesSass /> : <BackgroundValuesJS />}
      </GuideSection>

      {/* Border colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${colorsSections[3].id}`}>{`${colorsSections[3].title}`}</h2>
          <p>
            Semantic border colors. These should be used according to their
            semantic purpose.
          </p>
          <p>
            The default border color (used as <EuiCode>border.color</EuiCode>)
            is <EuiCode>borderBaseSubdued</EuiCode>. Use the{' '}
            <EuiCode>base</EuiCode> border colors for most cases. Use{' '}
            <EuiCode>borderBasePlain</EuiCode> for a slightly stronger border
            (e.g. for forms).
          </p>
        </EuiText>

        <EuiSpacer size="xl" />

        {borderContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <BorderValuesSass /> : <BorderValuesJS />}
      </GuideSection>

      {/* Shade colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2 id={`${colorsSections[4].id}`}>{`${colorsSections[4].title}`}</h2>
          <p>
            A six-color grayscale palette. Variation beyond these colors is
            minimal and always done through computations against this set.
          </p>
        </EuiText>

        <EuiSpacer size="xl" />

        {shadesContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <ShadeValuesSass /> : <ShadeValuesJS />}
      </GuideSection>

      {/* Special colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          {' '}
          <h2 id={`${colorsSections[5].id}`}>{`${colorsSections[5].title}`}</h2>
          <p>These are used a lot for special cases.</p>
        </EuiText>

        <EuiSpacer size="xl" />

        {specialContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <SpecialValuesSass /> : <SpecialValuesJS />}
      </GuideSection>
    </>
  );
};
