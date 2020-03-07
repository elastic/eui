import React, { useContext } from 'react';
import { ThemeContext } from '../../../components';
import { calculateContrast, rgbToHex } from '../../../../../src/services';
import { getSassVars } from '../_get_sass_vars';

import {
  EuiBadge,
  EuiIcon,
  EuiCopy,
  EuiFlexItem,
} from '../../../../../src/components';

export const coreColors = [
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorAccent',
  'euiColorWarning',
  'euiColorDanger',
];

export const coreTextVariants = [
  'euiColorPrimaryText',
  'euiColorSecondaryText',
  'euiColorAccentText',
  'euiColorWarningText',
  'euiColorDangerText',
];

export const grayColors = [
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
];

export const textColors = [
  'euiTextSubduedColor',
  'euiTextColor',
  'euiTitleColor',
  'euiColorGhost',
  'euiColorInk',
];

export const allowedColors = [...coreColors, ...grayColors];

export const textVariants = [...coreTextVariants, ...textColors];

export const ratingAAA = (
  <EuiBadge iconType="checkInCircleFilled" color="#000">
    AAA
  </EuiBadge>
);
export const ratingAA = (
  <EuiBadge iconType="checkInCircleFilled" color="#333">
    AA
  </EuiBadge>
);
export const ratingAA18 = (
  <EuiBadge iconType="invert" color="#666">
    AA18
  </EuiBadge>
);
export const ratingAll = <EuiBadge color="#eee">ALL</EuiBadge>;

function getContrastRatings(background, foreground, palette) {
  const contrast = calculateContrast(
    [palette[background].r, palette[background].g, palette[background].b],
    [palette[foreground].r, palette[foreground].g, palette[foreground].b]
  );

  let contrastRating;
  let contrastRatingBadge;
  if (contrast >= 7) {
    contrastRating = <EuiIcon type="checkInCircleFilled" />;
    contrastRatingBadge = ratingAAA;
  } else if (contrast >= 4.5) {
    contrastRating = <EuiIcon type="checkInCircleFilled" />;
    contrastRatingBadge = ratingAA;
  } else if (contrast >= 3) {
    contrastRating = <EuiIcon type="invert" />;
    contrastRatingBadge = ratingAA18;
  } else if (foreground.includes('Shade') && contrast >= 2) {
    contrastRating = <EuiIcon type="minusInCircle" />;
  } else {
    contrastRating = <EuiIcon type="cross" />;
  }

  return { contrast, contrastRating, contrastRatingBadge };
}

export const ColorsContrastItem = ({
  foreground,
  background,
  minimumContrast,
}) => {
  const themeContext = useContext(ThemeContext);
  const palette = getSassVars(themeContext.theme);

  const contrastRatings = getContrastRatings(background, foreground, palette);

  if (!contrastRatings || contrastRatings.contrast < minimumContrast) {
    return <></>;
  }

  const { contrast, contrastRating, contrastRatingBadge } = getContrastRatings(
    background,
    foreground,
    palette
  );
  const textToCopy = `background-color: $${background};
color: $${foreground};`;

  return (
    <EuiFlexItem className="eui-textCenter">
      <EuiCopy
        anchorClassName="eui-displayBlock"
        title={
          <span>
            {contrastRatingBadge} Contrast is {contrast.toFixed(1)}
          </span>
        }
        beforeMessage={
          <small>
            <kbd>Click</kbd> to copy SASS configuration
          </small>
        }
        afterMessage={<small>Copied!</small>}
        textToCopy={textToCopy}>
        {copy => (
          <button
            type="button"
            onClick={copy}
            className="eui-textLeft"
            style={{
              backgroundColor: palette[background].rgba,
              color: palette[foreground].rgba,
              padding: 6,
              marginBottom: 2,
              borderRadius: 4,
              whiteSpace: 'nowrap',
              width: '100%',
              maxWidth: 300,
            }}>
            {contrastRating} &ensp; {foreground}
          </button>
        )}
      </EuiCopy>
    </EuiFlexItem>
  );
};

export function getHexValueFromColorName(palette, colorName, key) {
  const hex = key ? palette[colorName][key] : palette[colorName];
  return rgbToHex(hex.rgba).toUpperCase();
}
