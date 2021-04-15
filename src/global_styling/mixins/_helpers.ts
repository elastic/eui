/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import chroma from 'chroma-js';
import { useEuiTheme } from '../../services/theme/hooks';
import { transparentize } from '../../services/color';
import { useOverflowShadow } from './_shadow';

// Helper mixins

// Useful border shade when dealing with images of unknown color.
export const useInnerBorder = ({
  type = 'dark',
  borderRadius = 0,
  alpha = 0.1,
}: {
  type?: 'light' | 'dark';
  borderRadius?: number;
  alpha?: number;
}) => {
  const {
    euiTheme: { colors },
  } = useEuiTheme();
  const color = chroma(
    type === 'dark' ? colors.darkestShade : colors.emptyShade
  )
    .alpha(alpha)
    .css();

  return `
    position: relative;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: ${borderRadius};
      content: '';
      pointer-events: none;
      border: 1px solid ${color};
    }
  `;
};

// Set scroll bar appearance on Chrome (and firefox).
export const useScrollBar = ({
  thumbColor: _thumbColor,
  trackBackgroundColor: _trackBackgroundColor,
}: {
  thumbColor?: string;
  trackBackgroundColor?: string;
} = {}) => {
  const {
    euiTheme: { colors, size },
  } = useEuiTheme();
  const thumbColor = _thumbColor || colors.darkShade;
  const trackBackgroundColor = _trackBackgroundColor || 'transparent';
  // Firefox's scrollbar coloring cascades, but the sizing does not,
  // so it's being added to this mixin for allowing support wherever custom scrollbars are
  return `
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: ${size.base};
      height: ${size.base};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${transparentize(thumbColor, 0.5)};
      border: calc(${size.base} * 0.75) solid ${trackBackgroundColor};
      background-clip: content-box;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background-color: ${trackBackgroundColor};
    }
  `;
};

/**
 * 1. Focus rings shouldn't be visible on scrollable regions, but a11y requires them to be focusable.
 *    Browser's supporting `:focus-visible` will still show outline on keyboard focus only.
 *    Others like Safari, won't show anything at all.
 */

// Just overflow and scrollbars
export const useYScroll = () => `
  ${useScrollBar()}
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &:focus {
    outline: none; /* 1 */
  }
`;
export const useXScroll = () => `
  ${useScrollBar()}
  overflow-x: auto;

  &:focus {
    outline: none; /* 1 */
  }
`;

// // The full overflow with shadow
export const useYScrollWithShadows = () => `
  ${useYScroll()}
  ${useOverflowShadow({ direction: 'y' })}
`;

export const useXScrollWithShadows = () => `
  ${useXScroll()}
  ${useOverflowShadow({ direction: 'x' })}
`;

// Hiding elements offscreen to only be read by screen reader
export const useScreenReaderOnly = () => `
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

// // Specifically target IE11, but not Edge.
// @mixin internetExplorerOnly {
//   // sass-lint:disable-block no-vendor-prefixes
//   @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
//     @content;
//   }
// }

// Doesn't have reduced motion turned on
// export const useCanAnimate = `
//   @media screen and (prefers-reduced-motion: no-preference) {
//     @content;
//   }
// `
