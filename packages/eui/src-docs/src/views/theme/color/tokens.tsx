import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  AMSTERDAM_NAME_KEY,
  EuiCallOut,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiThemeAmsterdam,
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
  DataVisJS,
  DataVisValuesJS,
  SeverityJS,
  SeverityValuesJS,
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
  DataVisSass,
  DataVisValuesSass,
  SeveritySass,
  SeverityValuesSass,
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
        <EuiText>
          <p>
            Elastic UI builds with a very limited palette. It uses a core set of
            three colors with a green / orange / red qualitative set and
            combined with a six-color grayscale. Variation beyond these colors
            is minimal and always done with math manipulation against the
            original set.
          </p>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiCallOut iconType="accessibility" title="Colors and accessibility">
          Never rely solely on color to convey meaning. Colors can be overridden
          by{' '}
          <Link to="/theming/high-contrast-mode/#forced-contrast-themes-and-colors">
            system forced colors
          </Link>
          , or can be difficult to distinguish for different users. Always
          combine color context with accompanying{' '}
          <Link to="/display/icons">icons</Link> or{' '}
          <Link to="/guidelines/writing">copy</Link> to indicate states such as
          error, activity, etc.
        </EuiCallOut>
      </>
    ) : (
      <>
        <EuiText>
          <p>
            Elastic UI builds with a color palette that is based on predefined
            14-step scales for a core set of three colors (blue / teal / pink)
            as well as a green / yellow / red qualitative set and combined with
            a 28-step grayscale. Colors are defined to work well when combined
            for their semantic purpose.
          </p>
          <p>
            When switching between light and dark color modes, the theme keys do
            not change, only their values do.
          </p>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiCallOut iconType="accessibility" title="Colors and accessibility">
          Never rely solely on color to convey meaning. Colors can be overridden
          by{' '}
          <Link to="/theming/high-contrast-mode/#forced-contrast-themes-and-colors">
            system forced colors
          </Link>
          , or can be difficult to distinguish for different users. Always
          combine color context with accompanying{' '}
          <Link to="/display/icons">icons</Link> or{' '}
          <Link to="/guidelines/writing">copy</Link> to indicate states such as
          error, activity, etc.
        </EuiCallOut>
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
  { title: 'Data visualization colors', id: 'data-vis-colors' },
  { title: 'Severity and Health colors', id: 'severity-colors' },
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

  const dataVisContent = useMemo(() => {
    if (showSass) return <DataVisSass />;
    return <DataVisJS />;
  }, [showSass]);

  const severityContent = useMemo(() => {
    if (showSass) return <SeveritySass />;
    return <SeverityJS />;
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
          <p>
            When switching between light and dark color modes, the theme keys do
            not change, only their values do. This is why most keys are not
            named for their <strong>evaluated</strong> value but by their{' '}
            <strong>purpose</strong>.
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

      {/* Data vis colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          {' '}
          <h2 id={`${colorsSections[6].id}`}>{`${colorsSections[6].title}`}</h2>
          <p>
            The following colors are color-blind safe and should be used in
            categorically seried visualizations and graphics. They are meant to
            be contrasted against the value of{' '}
            <EuiCode>
              {euiTheme.themeName === EuiThemeAmsterdam.key
                ? 'colors.emptyShade'
                : 'colors.backgroundBasePlain'}
            </EuiCode>{' '}
            for the current theme.
          </p>
          {euiTheme.themeName === EuiThemeAmsterdam.key && (
            <p>
              When using the palette as a background for text (i.e. badges), use
              the <EuiCode>BehindText</EuiCode> variant. It is a brightened
              version of the base palette to create better contrast with text.
            </p>
          )}
        </EuiText>

        <EuiSpacer size="xl" />

        {dataVisContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <DataVisValuesSass /> : <DataVisValuesJS />}
      </GuideSection>

      {/* Severity colors */}
      <GuideSection color="subdued">
        <EuiText grow={false}>
          {' '}
          <h2 id={`${colorsSections[7].id}`}>{`${colorsSections[7].title}`}</h2>
          <p>
            Severity indicates an increasing level of risk and Health describes
            the status of an element that would typically be associated with
            positive or negative values.
          </p>
        </EuiText>

        <EuiSpacer size="xl" />

        {severityContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <SeverityValuesSass /> : <SeverityValuesJS />}
      </GuideSection>
    </>
  );
};
