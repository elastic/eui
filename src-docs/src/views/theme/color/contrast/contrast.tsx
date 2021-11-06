import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../../../components/with_theme';

import {
  EuiText,
  EuiSpacer,
  EuiLink,
  EuiTitle,
  EuiPanel,
} from '../../../../../../src/components';

import { ColorSection } from './color_section';
import { ContrastSlider } from './contrast_slider';
import { ratingAA, allowedColors } from './_utilities';

export default () => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(4.5);
  const colors = allowedColors.concat(['euiPageBackgroundColor']);
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

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
        <EuiSpacer size="xxl" />

        {showSass && (
          <EuiPanel color="subdued">
            {colors.map((color: string) => {
              return (
                <ColorSection
                  color={color}
                  minimumContrast={contrastValue}
                  showTextVariants={showTextVariants}
                />
              );
            })}
          </EuiPanel>
        )}
      </div>
    </>
  );
};
