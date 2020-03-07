import React, { useContext } from 'react';
import { ThemeContext } from '../../../components';
import { getSassVars } from '../_get_sass_vars';

import {
  EuiIcon,
  EuiTitle,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiFlexGrid,
} from '../../../../../src/components';
import {
  getHexValueFromColorName,
  ColorsContrastItem,
  allowedColors,
  textVariants,
  coreColors,
  coreTextVariants,
} from './_utilities';

export const ColorSection = ({
  color,
  minimumContrast,
  showTextVariants,
  children,
}) => {
  const theme = useContext(ThemeContext).theme;
  const palette = getSassVars(theme);
  const colorsForContrast = showTextVariants ? textVariants : allowedColors;
  const hex = getHexValueFromColorName(palette, color);
  const iconClass =
    color.includes('Lightest') ||
    color.includes('Empty') ||
    color.includes('Page')
      ? 'colorGuidelines_colorPreviewTooLight'
      : undefined;

  function colorIsCore(color) {
    return coreColors.includes(color) || coreTextVariants.includes(color);
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

      <EuiText grow={false}>{children}</EuiText>

      <EuiSpacer />

      <EuiText size="xs">
        <EuiFlexGrid
          columns={2}
          className="guideSection__shadedBox"
          direction="column"
          gutterSize="s">
          {showTextVariants && colorIsCore(color) && (
            <ColorsContrastItem
              foreground={`${color}Text`}
              background={'euiPageBackgroundColor'}
              minimumContrast={minimumContrast}
            />
          )}

          {colorsForContrast.map(color2 => {
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
    </>
  );
};
