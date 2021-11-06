import React, { FunctionComponent } from 'react';

import { EuiText, EuiFlexGrid, EuiPanel } from '../../../../../../src';

import {
  ColorsContrastItem,
  allowedColors,
  textVariants,
  coreColors,
  coreTextVariants,
} from './_utilities';

type ColorSection = {
  color: string;
  minimumContrast: string | number;
  showTextVariants: boolean;
};

export const ColorSection: FunctionComponent<ColorSection> = ({
  color,
  minimumContrast,
  showTextVariants,
}) => {
  const colorsForContrast = showTextVariants ? textVariants : allowedColors;

  function colorIsCore(color: string) {
    return coreColors.includes(color) || coreTextVariants.includes(color);
  }

  return (
    <>
      <EuiPanel color="transparent">
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
