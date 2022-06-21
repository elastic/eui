/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { logicalCSS, euiCantAnimate } from '../../global_styling';
import { UseEuiTheme } from '../../services';

/**
 * Animations
 */
const euiIndeterminateAnimation = keyframes`
  0% {
    transform: scaleX(1) translateX(-100%);
  }
  100% {
    transform: scaleX(1) translateX(100%);
  }
`;

/**
 * Emotion styles
 */
export const euiProgressStyles = ({ euiTheme }: UseEuiTheme) => ({
  euiProgress: css`
    position: relative;
    overflow: hidden;
    background-color: ${euiTheme.colors.lightShade};
  `,
  // https://css-tricks.com/html5-progress-element/
  // Good resource if you need to work in here. There's some gotchas with
  // dealing with cross-browser progress bars.
  native: css`
    display: block;
    ${logicalCSS('width', '100%')}
    appearance: none;
    border: none;
    border-radius: ${euiTheme.size.s};

    &::-webkit-progress-bar {
      background-color: ${euiTheme.colors.lightShade};
    }

    &::-webkit-progress-value {
      transition: width ${euiTheme.animation.normal} linear;
    }
    &::-moz-progress-bar {
      transition: width ${euiTheme.animation.normal} linear;
    }
  `,
  // An indeterminate bar has an unreliable end time. Because of a Firefox animation issue,
  // we apply this style to a <div> instead of a <progress> element.
  // See https://css-tricks.com/html5-progress-element/ for more info.
  indeterminate: css`
    &:before {
      position: absolute;
      content: '';
      ${logicalCSS('width', '100%')}
      top: 0;
      bottom: 0;
      left: 0;
      transform: scaleX(0) translateX(0%);
      animation: ${euiIndeterminateAnimation} 1s
        ${euiTheme.animation.resistance} infinite;

      ${euiCantAnimate} {
        animation-duration: 2s;
        animation-timing-function: linear;
      }
    }
  `,
});
