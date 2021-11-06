import React from 'react';
import { useSassVars } from '../../_json/_get_sass_vars';

import {
  EuiIcon,
  EuiTitle,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiFlexGrid,
  EuiPanel,
  useEuiTheme,
} from '../../../../../../src';

import {
  getHexValueFromColorName,
  ColorsContrastItem,
  allowedColors,
  textVariants,
  coreColors,
  coreTextVariants,
} from './_utilities';

import {
  brand_colors,
  shade_colors,
  brand_text_colors,
  text_colors,
} from '../../../../../../src/global_styling/variables/_colors';

export const ColorSection = ({
  currentLanguage = 'sass',
  color,
  minimumContrast,
  showTextVariants,
  children,
}) => {
  const { euiTheme } = useEuiTheme();
  const palette = useSassVars();

  let colorsForContrast;
  let hex;

  if (currentLanguage.includes('js')) {
    const allowedColors = Object.keys(brand_colors).concat(
      Object.keys(shade_colors)
    );
    const textVariants = Object.keys(brand_text_colors).concat(
      Object.keys(text_colors)
    );

    colorsForContrast = showTextVariants ? textVariants : allowedColors;
    hex = euiTheme.colors[color];
  } else {
    colorsForContrast = showTextVariants ? textVariants : allowedColors;
    hex = getHexValueFromColorName(palette, color);
  }

  const iconClass =
    color.includes('Lightest') ||
    color.includes('Empty') ||
    color.includes('Page') ||
    color.includes('body')
      ? 'colorGuidelines_colorPreviewTooLight'
      : undefined;

  function colorIsCore(color) {
    if (currentLanguage.includes('js')) {
      return coreColors.includes(color) || coreTextVariants.includes(color);
    } else {
      return coreColors.includes(color) || coreTextVariants.includes(color);
    }
  }

  return (
    <>
      <EuiTitle size="xs">
        <h3 id={color}>
          <EuiIcon
            className={iconClass}
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            color={hex}
          />{' '}
          &ensp;
          {color}: <EuiCode>{hex}</EuiCode>
        </h3>
      </EuiTitle>

      <EuiSpacer />

      {children && (
        <>
          <EuiText grow={false}>{children}</EuiText>
          <EuiSpacer />
        </>
      )}

      <EuiPanel color="subdued">
        <EuiText size="xs">
          <EuiFlexGrid columns={2} direction="column" gutterSize="s">
            {showTextVariants && colorIsCore(color) && (
              <ColorsContrastItem
                foreground={`${color}Text`}
                background={'euiPageBackgroundColor'}
                minimumContrast={minimumContrast}
              />
            )}
            {colorsForContrast.map((color2) => {
              if (colorIsCore(color) && colorIsCore(color2)) {
                // i.e. don't render if both are core colors
                return;
              }
              return (
                <ColorsContrastItem
                  foreground={color2}
                  background={color}
                  key={color2}
                  minimumContrast={minimumContrast}
                />
              );
            })}
          </EuiFlexGrid>
        </EuiText>
      </EuiPanel>
    </>
  );
};
