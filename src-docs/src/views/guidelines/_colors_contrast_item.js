import React from 'react';
import { withTheme } from '../../components';
import { calculateContrast } from '../../../../src/services';

import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss';

import {
  EuiBadge,
  EuiIcon,
  EuiCopy,
  EuiFlexItem,
} from '../../../../src/components';

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

const _ColorsContrastItem = ({
  theme,
  foreground,
  background,
  minimumContrast,
}) => {
  let palette;
  switch (theme) {
    case 'amsterdam-dark':
      palette = darkAmsterdamColors;
      break;
    case 'amsterdam-light':
      palette = { ...lightColors, ...lightAmsterdamColors };
      break;
    case 'dark':
      palette = darkColors;
      break;
    default:
      palette = lightColors;
      break;
  }

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
            <kbd>Click</kbd> to copy SCSS configuration
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

export const ColorsContrastItem = withTheme(_ColorsContrastItem);
