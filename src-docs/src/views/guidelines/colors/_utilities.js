import React from 'react';
import { calculateContrast, rgbToHex } from '../../../../../src/services';
import { useSassVars } from '../_get_sass_vars';

import { EuiBadge, EuiCopy, EuiFlexItem } from '../../../../../src/components';
import { EuiIcon } from '../../../../../src/components/icon';

export const coreColors = [
  'euiColorPrimary',
  'euiColorAccent',
  'euiColorSuccess',
  'euiColorWarning',
  'euiColorDanger',
];

export const coreTextVariants = [
  'euiColorPrimaryText',
  'euiColorAccentText',
  'euiColorSuccessText',
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
  <EuiBadge iconType="partial" color="#666">
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
    contrastRating = 'checkInCircleFilled';
    contrastRatingBadge = ratingAAA;
  } else if (contrast >= 4.5) {
    contrastRating = 'checkInCircleFilled';
    contrastRatingBadge = ratingAA;
  } else if (contrast >= 3) {
    contrastRating = 'partial';
    contrastRatingBadge = ratingAA18;
  } else if (foreground.includes('Shade') && contrast >= 2) {
    contrastRating = 'minusInCircle';
    contrastRatingBadge = <EuiIcon type="minusInCircle" />;
  } else {
    contrastRating = 'cross';
    contrastRatingBadge = <EuiIcon type="cross" />;
  }

  return { contrast, contrastRating, contrastRatingBadge };
}

export const ColorsContrastItem = ({
  foreground,
  background,
  minimumContrast,
}) => {
  const palette = useSassVars();
  const contrastRatings = getContrastRatings(background, foreground, palette);

  if (!contrastRatings || contrastRatings.contrast < minimumContrast) {
    return <></>;
  }

  const { contrast, contrastRating, contrastRatingBadge } = getContrastRatings(
    background,
    foreground,
    palette
  );
  const contastIsAcceptableToCopy = contrast >= 3;
  const textToCopy = `background-color: $${background};
color: $${foreground};`;
  const beforeMessage = contastIsAcceptableToCopy ? (
    <small>
      <kbd>Click</kbd> to copy SASS configuration
    </small>
  ) : (
    <small>
      Cannot copy configuration because the contrast is not acceptable
    </small>
  );

  return (
    <EuiFlexItem className="eui-textCenter">
      <EuiCopy
        anchorClassName="eui-displayBlock"
        title={
          <span>
            {contrastRatingBadge} Contrast is {contrast.toFixed(1)}
          </span>
        }
        beforeMessage={beforeMessage}
        afterMessage={<small>Copied!</small>}
        textToCopy={textToCopy}
      >
        {(copy) => (
          <EuiBadge
            className="guideColorSection__button"
            iconType={contrastRating}
            onClick={copy}
            onClickAriaLabel="Click to copy SASS configurations"
            disabled={!contastIsAcceptableToCopy}
            style={{
              backgroundColor: palette[background].rgba,
              color: palette[foreground].rgba,
            }}
          >
            {foreground}
          </EuiBadge>
        )}
      </EuiCopy>
    </EuiFlexItem>
  );
};

export function getHexValueFromColorName(palette, colorName, key) {
  const hex = key ? palette[colorName][key] : palette[colorName];
  return rgbToHex(hex.rgba).toUpperCase();
}
