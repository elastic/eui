/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, transparentize } from '../../../services';
import { mathWithUnits, euiCanAnimate } from '../../../global_styling';
import { euiCustomControl } from '../../form/form.styles';

import {
  euiRangeThumbStyle,
  euiRangeVariables,
} from '../../form/range/range.styles';

export const euiColorStopsStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean | undefined
) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme } = euiThemeContext;
  const stripeColor = euiTheme.colors.ink;
  const stripesBackground = `repeating-linear-gradient(
    -45deg,
    ${range.trackColor},
    ${range.trackColor} 25%,
    ${transparentize(stripeColor, 0.25)} 25%,
    ${transparentize(stripeColor, 0.25)} 50%,
    ${range.trackColor} 50%
  )`;

  return {
    // Base
    euiColorStops: css`
      ${!isDisabled &&
      `
      &:focus {
        outline: 2px solid ${euiTheme.focus.color};
      }

      .euiRangeTrack::after {
        background: ${stripesBackground};
        background-size: ${euiTheme.size.xs} ${euiTheme.size.xs}; // Percentage stops and background-size are both needed for Safari to render the gradient at fullWidth correctly
      }
   `}
    `,
    euiColorStops__addTarget: css`
      ${euiCustomControl(euiThemeContext, { type: 'round' })};
      ${euiRangeThumbStyle(euiThemeContext)};
      position: absolute;
      inset-block-start: 0;
      block-size: ${range.thumbHeight};
      inline-size: ${range.thumbHeight};
      background-color: ${euiTheme.colors.lightestShade};
      pointer-events: none;
      opacity: 0;
      ${euiCanAnimate} {
        transition: opacity ${euiTheme.animation.fast} ease-in;
      }
    `,
    isDragging: css`
      &:not(.euiColorStops-isDisabled):not(.euiColorStops-isReadOnly) {
        cursor: grabbing;
      }
    `,
    isHoverDisabled: css``,
    isDisabled: css``,
    isReadOnly: css``,
  };
};

export const euiColorStopsAddContainerStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean | undefined
) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiColorStopsAddContainer: css`
      display: block;
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: 50%;
      block-size: ${range.thumbHeight};
      margin-block-start: ${mathWithUnits(range.thumbHeight, (x) => x * -0.5)};

      ${!isDisabled &&
      `
        &:hover {
          cursor: pointer;

          .euiColorStops__addTarget {
            opacity: 0.7;
          }
        }
      `}
    `,
    isDisabled: css``,
  };
};
