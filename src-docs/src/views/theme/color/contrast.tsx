import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../../components/with_theme';

import {
  EuiText,
  EuiSpacer,
  EuiLink,
  EuiTitle,
  EuiPanel,
} from '../../../../../src/components';

import {
  ColorSectionSass,
  coreColors as sassCoreColors,
  grayColors as sassGrayColors,
} from './_contrast_sass';

import { ColorSectionJS } from './_contrast_js';
import { brandKeys, shadeKeys } from './_color_js';

import { ContrastSlider } from './_contrast_slider';
import { ratingAA } from './_contrast_utilities';
import { _EuiThemeColors } from '../../../../../src/global_styling/variables/_colors';

export default () => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(4.5);

  const showSass = useContext(ThemeContext).themeLanguage.includes('sass');

  return (
    <>
      <EuiText grow={false}>
        <h2>Accessible text contrast</h2>
        <p>
          <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
            WCAG specifications
          </EuiLink>{' '}
          defines specific contrast ratios between foreground text and a
          background color. The grids below display which color combinations
          pass that rating. In general you should try to use a color combination
          that is {ratingAA} or above with the exception of using large text.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      <EuiTitle size="xs">
        <h3>
          Use the slider and toggle to adjust the color combinations shown in
          the sections below.
        </h3>
      </EuiTitle>
      <EuiSpacer size="m" />

      {/* This wrapping div for the sticky positioning */}
      <div>
        <ContrastSlider
          contrastValue={contrastValue}
          showTextVariants={showTextVariants}
          // @ts-ignore Help
          onChange={(
            sliderValue: React.SetStateAction<number>,
            toggleChecked: React.SetStateAction<boolean>
          ) => {
            setContrastValue(sliderValue);
            setShowTextVariants(toggleChecked);
          }}
        />

        <EuiSpacer size="xxl" />

        <EuiText grow={false}>
          <h3>{showSass ? 'Page' : 'Body'} background color</h3>
          <p>
            In order to meet contrast minimums, the text variants use the page
            body color as the denominator for calculating the altered color.
            Text placed on backgrounds darker than this cannot guarantee
            contrast acceptance.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiPanel color="subdued">
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
        </EuiPanel>

        <EuiSpacer size="xxl" />

        <EuiText grow={false}>
          <h3>Brand colors</h3>
          <p>
            We typically only recommend using full black or white on top of
            brand colors. This can be in the form of full, empty, ink, or ghost
            shades. <strong>Never combine two brand colors.</strong>
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiPanel color="subdued">
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
                      color={color as keyof _EuiThemeColors}
                      minimumContrast={contrastValue}
                      showTextVariants={false}
                    />
                    <EuiSpacer />
                  </React.Fragment>
                );
              })}
        </EuiPanel>

        <EuiSpacer size="xxl" />

        <EuiText grow={false}>
          <h3>Shades</h3>
          <p>
            Again we recommend sticking with the text variant of brand colors
            when possible. The opposite may be true when using darker shades as
            backgrounds.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiPanel color="subdued">
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
                      color={color as keyof _EuiThemeColors}
                      minimumContrast={contrastValue}
                      showTextVariants={showTextVariants}
                    />
                    <EuiSpacer />
                  </React.Fragment>
                );
              })}
        </EuiPanel>
      </div>
    </>
  );
};
