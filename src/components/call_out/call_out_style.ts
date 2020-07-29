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

import { css } from '@emotion/core';
import chroma from 'chroma-js';

const $euiCallOutTypes = {
  primary: 'euiColorPrimary',
  success: 'euiColorSuccess',
  warning: 'euiColorWarning',
  danger: 'euiColorDanger',
};

function euiCallOutColor(
  colors: any,
  type: keyof typeof $euiCallOutTypes = 'primary',
  returnBackgroundOrForeground: string = 'background'
) {
  const $color = colors[$euiCallOutTypes[type]];
  // const $backgroundColor = tintOrShade($color, 90%, 70%);
  const $backgroundColor = chroma($color)
    .luminance(0.9)
    .hex();
  // const $foregroundColor = shadeOrTint(makeHighContrastColor($color, $backgroundColor), 0, 20%);
  const $foregroundColor = $color;

  if (returnBackgroundOrForeground === 'background') {
    return $backgroundColor;
  } else if (returnBackgroundOrForeground === 'foreground') {
    return $foregroundColor;
  }
}

export const euiCallOutColors = (
  colors: any,
  type: keyof typeof $euiCallOutTypes = 'primary'
) => css`
  border-color: ${colors[$euiCallOutTypes[type]]};
  background-color: ${euiCallOutColor(colors, type, 'background')};

  .euiCallOutHeader__icon {
    fill: ${euiCallOutColor(colors, type, 'foreground')};
  }

  .euiCallOutHeader__title {
    color: ${euiCallOutColor(colors, type, 'foreground')};
  }
`;

/**
 * 1. Align icon with first line of title text if it wraps.
 * 2. If content exists under the header, space it appropriately.
 * 3. Apply margin to all but last item in the flex.
 */
export const euiCallOutHeader = (sizes: any) => css`
  display: flex;
  align-items: baseline; /* 1 */

  + * {
    margin-top: ${sizes.euiSizeS}; /* 2 */
  }

  > * + * {
    margin-left: ${sizes.euiSizeS}; /* 3 */
  }
`;

export const euiCallOutHeaderIcon = css`
  flex: 0 0 auto;
  /* Vertically center icon with first line of title */
  transform: translateY(2px);
`;
