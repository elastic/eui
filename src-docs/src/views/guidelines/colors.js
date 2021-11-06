import React, { useState } from 'react';

import {
  EuiText,
  EuiSpacer,
  EuiLink,
  EuiTitle,
  EuiHorizontalRule,
} from '../../../../src/components';
import { ColorSection } from './colors/color_section';
import { ContrastSlider } from './colors/contrast_slider';

import { ratingAA, allowedColors } from './colors/_utilities';

import {
  brand_colors,
  shade_colors,
} from '../../../../src/global_styling/variables/_colors';

export default ({ currentLanguage = 'js' }) => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(4.5);
  const colors = currentLanguage.includes('sass')
    ? allowedColors.concat(['euiPageBackgroundColor'])
    : Object.keys(brand_colors).concat(
        Object.keys(shade_colors).concat(['body'])
      );

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
          onChange={(sliderValue, toggleChecked) => {
            setContrastValue(sliderValue);
            setShowTextVariants(toggleChecked);
          }}
        />

        <EuiSpacer size="xxl" />
        <EuiSpacer size="xxl" />

        {colors.map((color) => {
          return (
            <React.Fragment key={color}>
              <ColorSection
                currentLanguage={currentLanguage}
                color={color}
                minimumContrast={contrastValue}
                showTextVariants={showTextVariants}
              />

              <EuiHorizontalRule margin="xl" />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
