import React from 'react';

import { EuiBadge, EuiIcon } from '../../../../../src/components';

export const ratingAAA = (
  <EuiBadge iconType="starFilled" color="#000">
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

export function getContrastRatings(contrast: number, foreground: string) {
  let contrastRating;
  let contrastRatingBadge;
  if (contrast >= 7) {
    contrastRating = 'starFilled';
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

  return { contrastRating, contrastRatingBadge };
}
