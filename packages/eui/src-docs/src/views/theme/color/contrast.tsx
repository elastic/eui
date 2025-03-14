import React, {
  useState,
  useContext,
  useCallback,
  FunctionComponent,
  useMemo,
} from 'react';
import {
  _EuiThemeBackgroundColors,
  getTokenName,
} from '@elastic/eui-theme-common';

import { ThemeContext } from '../../../components/with_theme';

import {
  EuiText,
  EuiSpacer,
  EuiLink,
  EuiTitle,
  EuiPanel,
  EuiCode,
  EuiDescribedFormGroup,
  EuiButtonGroup,
  useEuiTheme,
} from '../../../../../src';

import {
  ColorSectionSass,
  coreColors as sassCoreColors,
  grayColors as sassGrayColors,
  backgroundBaseColors as sassBackgroundBaseColors,
  backgroundLightColors as sassBackgroundLightColors,
  backgroundFilledColors as sassBackgroundFilledColors,
} from './_contrast_sass';

import { ColorSectionJS } from './_contrast_js';
import { brandKeys, shadeKeys } from './_color_js';

import { ContrastSlider } from './_contrast_slider';
import { ratingAA } from './_contrast_utilities';
import { _EuiThemeColorsMode } from '../../../../../src/global_styling/variables/colors';
import { BACKGROUND_COLORS } from '../../../../../src/global_styling';
import {
  BUTTON_COLORS,
  euiButtonColor,
  _EuiButtonColor,
} from '../../../../../src/global_styling/mixins/_button';
import { GuideSection } from '../../../components/guide_section/guide_section';

// This array is used inside routes.js to create the sidenav sub-sections
export const contrastSections = [
  { title: 'Body background color', id: 'body-background-color' },
  { title: 'Brand colors', id: 'brand-colors' },
  { title: 'Shades', id: 'shades' },
  { title: 'Background colors', id: 'background-colors' },
];

const background_colors = BACKGROUND_COLORS.filter(
  (color) => color !== 'transparent'
);
const brand_background_colors = [...BACKGROUND_COLORS, 'text'].filter(
  (color) =>
    !['transparent', 'plain', 'subdued', 'disabled', 'highlighted'].includes(
      color
    )
);
const backgroundButtons = [
  'container',
  // 'hover', Commenting out for now since contrast can't be calculated on transparent values
  'button',
].map((m) => {
  return {
    id: m,
    label: m,
  };
});

export default () => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(4.5);

  const [backgroundColors, setBackgroundColors] =
    useState<any>(background_colors);
  const [backgroundFunction, setBackgroundFunction] = useState<any>(undefined);
  const [backgroundSelected, setBackgroundSelected] = useState(
    backgroundButtons[0].id
  );

  const switchBackgroundColors = useCallback((id: string) => {
    switch (id) {
      case 'container':
        setBackgroundSelected(id);
        setBackgroundColors(background_colors);
        setBackgroundFunction(undefined);
        break;
      case 'button':
        setBackgroundSelected(id);
        setBackgroundColors(BUTTON_COLORS);
        setBackgroundFunction('euiButtonColor(color)');
        break;
    }
  }, []);

  const showSass = useContext(ThemeContext).themeLanguage.includes('sass');

  const backgroundBaseColors = useMemo(
    () =>
      backgroundColors.map((color: string) => {
        return getTokenName(
          'backgroundBase',
          color
        ) as keyof _EuiThemeBackgroundColors;
      }),
    [backgroundColors]
  );

  const backgroundLightColors = brand_background_colors.map((color: string) => {
    return getTokenName(
      'backgroundLight',
      color
    ) as keyof _EuiThemeBackgroundColors;
  });

  const backgroundFilledColors = brand_background_colors.map(
    (color: string) => {
      return getTokenName(
        'backgroundFilled',
        color
      ) as keyof _EuiThemeBackgroundColors;
    }
  );

  return (
    <>
      <GuideSection color="transparent">
        <EuiText grow={false}>
          <h2>Accessible text contrast</h2>
          <p>
            <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
              WCAG specifications
            </EuiLink>{' '}
            defines specific contrast ratios between foreground text and a
            background color. The grids below display which color combinations
            pass that rating. In general you should try to use a color
            combination that is {ratingAA} or above with the exception of using
            large text.
          </p>
        </EuiText>
      </GuideSection>

      {/* This wrapping div for the sticky positioning */}
      <div>
        <GuideSection
          color="warning"
          className="guideColorsPage__stickySlider"
          css={({ euiTheme }) => ({ borderBlock: euiTheme.border.thin })}
        >
          <EuiTitle size="xs">
            <h3>
              Use the slider and toggle to adjust the color combinations shown
              in the sections below.
            </h3>
          </EuiTitle>
          <EuiSpacer size="m" />
          <ContrastSlider
            contrastValue={contrastValue}
            showTextVariants={showTextVariants}
            onChange={(sliderValue, toggleChecked) => {
              setContrastValue(Number(sliderValue));
              setShowTextVariants(toggleChecked);
            }}
          />
        </GuideSection>

        <GuideSection color="subdued">
          <EuiText grow={false}>
            <h2
              id={`${contrastSections[0].id}`}
            >{`${contrastSections[0].title}`}</h2>
            <p>
              In order to meet contrast minimums, the text variants use the page
              body color as the denominator for calculating the altered color.
              Text placed on backgrounds darker than this cannot guarantee
              contrast acceptance.
            </p>
          </EuiText>

          <EuiSpacer />

          {showSass ? (
            <ColorSectionSass
              color={'euiPageBackgroundColor'}
              minimumContrast={contrastValue}
              showTextVariants={showTextVariants}
            />
          ) : (
            <ColorSectionJS
              color={'body'}
              minimumContrast={contrastValue}
              showTextVariants={showTextVariants}
            />
          )}
        </GuideSection>

        <GuideSection color="transparent">
          <EuiText grow={false}>
            <h2
              id={`${contrastSections[1].id}`}
            >{`${contrastSections[1].title}`}</h2>
            <p>
              We typically only recommend using full black or white on top of
              brand colors. This can be in the form of full, empty, ink, or
              ghost shades. <strong>Never combine two brand colors.</strong>
            </p>
          </EuiText>

          <EuiSpacer />

          {showSass
            ? sassCoreColors.map((color: string) => {
                return (
                  <React.Fragment key={color}>
                    <ColorSectionSass
                      color={color}
                      minimumContrast={contrastValue}
                      showTextVariants={false}
                    />
                    <EuiSpacer />
                  </React.Fragment>
                );
              })
            : brandKeys.map((color: string) => {
                return (
                  <React.Fragment key={color}>
                    <ColorSectionJS
                      color={color as keyof _EuiThemeColorsMode}
                      minimumContrast={contrastValue}
                      showTextVariants={false}
                    />
                    <EuiSpacer />
                  </React.Fragment>
                );
              })}
        </GuideSection>

        <GuideSection color="subdued">
          <EuiText grow={false}>
            <h2
              id={`${contrastSections[2].id}`}
            >{`${contrastSections[2].title}`}</h2>
            <p>
              Again we recommend sticking with the text variant of brand colors
              when possible. The opposite may be true when using darker shades
              as backgrounds.
            </p>
          </EuiText>

          <EuiSpacer />

          {showSass
            ? sassGrayColors.map((color: string) => {
                return (
                  <React.Fragment key={color}>
                    <ColorSectionSass
                      key={color}
                      color={color}
                      minimumContrast={contrastValue}
                      showTextVariants={showTextVariants}
                    />
                    <EuiSpacer />
                  </React.Fragment>
                );
              })
            : shadeKeys.map((color: string) => {
                return (
                  <React.Fragment key={color}>
                    <ColorSectionJS
                      key={color}
                      color={color as keyof _EuiThemeColorsMode}
                      minimumContrast={contrastValue}
                      showTextVariants={showTextVariants}
                    />
                    <EuiSpacer />
                  </React.Fragment>
                );
              })}
        </GuideSection>

        <GuideSection color="transparent">
          <EuiText grow={false}>
            <h2
              id={`${contrastSections[3].id}`}
            >{`${contrastSections[3].title}`}</h2>
          </EuiText>
          <EuiSpacer />
          {!showSass && (
            <>
              <EuiPanel color="accent">
                <EuiDescribedFormGroup
                  fullWidth
                  title={<h3>Different colors for different contexts</h3>}
                  description={
                    <p>
                      These background colors are pre-defined shades of the
                      brand colors.{' '}
                      {backgroundFunction && (
                        <>
                          They are recalled by using the hook{' '}
                          <EuiCode>{backgroundFunction}</EuiCode>
                        </>
                      )}
                    </p>
                  }
                >
                  <EuiSpacer />
                  <EuiButtonGroup
                    buttonSize="m"
                    legend="Value measurement to show in table"
                    options={backgroundButtons}
                    idSelected={backgroundSelected}
                    onChange={(id) => switchBackgroundColors(id)}
                    color="accent"
                    isFullWidth
                  />
                </EuiDescribedFormGroup>
              </EuiPanel>
              <EuiSpacer />
            </>
          )}
          <>
            {backgroundSelected === 'button' ? (
              !showSass && (
                <BackgroundColorSection
                  title="Button background colors"
                  backgroundColors={[...BUTTON_COLORS]}
                  type={backgroundSelected}
                  contrastValue={contrastValue}
                  showTextVariants={showTextVariants}
                />
              )
            ) : (
              <>
                <BackgroundColorSection
                  title="Base background colors"
                  backgroundColors={
                    showSass ? sassBackgroundBaseColors : backgroundBaseColors
                  }
                  language={showSass ? 'scss' : 'js'}
                  type={backgroundSelected}
                  contrastValue={contrastValue}
                  showTextVariants={showTextVariants}
                />

                <BackgroundColorSection
                  title="Light background colors"
                  backgroundColors={
                    showSass ? sassBackgroundLightColors : backgroundLightColors
                  }
                  language={showSass ? 'scss' : 'js'}
                  type={backgroundSelected}
                  contrastValue={contrastValue}
                  showTextVariants={showTextVariants}
                />

                <BackgroundColorSection
                  title="Filled background colors"
                  backgroundColors={
                    showSass
                      ? sassBackgroundFilledColors
                      : backgroundFilledColors
                  }
                  language={showSass ? 'scss' : 'js'}
                  type={backgroundSelected}
                  contrastValue={contrastValue}
                  showTextVariants={showTextVariants}
                />
              </>
            )}
          </>
        </GuideSection>
      </div>
    </>
  );
};

const BackgroundColorSection: FunctionComponent<{
  title: string;
  backgroundColors: string[];
  type: string;
  language?: 'js' | 'scss';
  contrastValue: number;
  showTextVariants: boolean;
}> = ({
  title,
  backgroundColors,
  type,
  language = 'js',
  contrastValue,
  showTextVariants,
}) => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;

  const content = backgroundColors.map((color: string) => {
    switch (type) {
      case 'container':
        return (
          <React.Fragment key={color}>
            {language === 'scss' ? (
              <ColorSectionSass
                key={color}
                color={color as keyof _EuiThemeColorsMode}
                minimumContrast={contrastValue}
                showTextVariants={showTextVariants}
              />
            ) : (
              <ColorSectionJS
                key={color}
                color={color as keyof _EuiThemeColorsMode}
                colorValue={euiTheme.colors[color as keyof _EuiThemeColorsMode]}
                minimumContrast={contrastValue}
                showTextVariants={showTextVariants}
                tokenName={`euiTheme.colors.${color}`}
              />
            )}

            <EuiSpacer />
          </React.Fragment>
        );

      case 'button':
        return (
          color !== 'disabled' && (
            <React.Fragment key={color}>
              <ColorSectionJS
                key={color}
                color={color as keyof _EuiThemeColorsMode}
                colorValue={
                  euiButtonColor(euiThemeContext, color as _EuiButtonColor)
                    .backgroundColor
                }
                hookName="useEuiButtonColorCSS"
                minimumContrast={contrastValue}
                showTextVariants={showTextVariants}
              />
              <EuiSpacer />
            </React.Fragment>
          )
        );
    }
  });

  return (
    <>
      <EuiTitle size="s">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer />
      {content}
    </>
  );
};
