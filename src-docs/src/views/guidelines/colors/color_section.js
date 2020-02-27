import React from 'react';
import { getSassVars } from '../_get_sass_vars';

import {
  EuiIcon,
  EuiTitle,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiFlexGrid,
} from '../../../../../src/components';
import { getHexValueFromColorName, ColorsContrastItem } from './_utilities';

export const ColorSection = ({
  theme,
  color,
  colorsForContrast,
  minimumContrast,
  showTextVariants,
}) => {
  const palette = getSassVars(theme);
  const hex = getHexValueFromColorName(palette, color);

  return (
    <>
      <EuiTitle size="xs">
        <h3 id={color}>
          <EuiIcon
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

      <EuiText grow={false}>
        <p>
          Used as the background color of primary page content. While full white
          in light mode, it is not full black in dark mode.
        </p>
        <p>
          If you need a color that is full white in both light and dark modes,
          use <EuiCode>euiColorGhost</EuiCode>.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiText size="xs">
        <EuiFlexGrid
          columns={2}
          className="guideSection__shadedBox"
          direction="column"
          gutterSize="s">
          {showTextVariants && color.indexOf('Shade') === -1 && (
            <ColorsContrastItem
              foreground={`${color}Text`}
              background={'euiPageBackgroundColor'}
              minimumContrast={minimumContrast}
            />
          )}

          {colorsForContrast.map(color2 => {
            if (
              color2.indexOf('Shade') === -1 &&
              color.indexOf('Shade') === -1
            ) {
              // i.e. don't render, if non-shade top of non-shade
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
