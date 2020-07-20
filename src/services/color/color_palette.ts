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

export const MID_COLOR_STOP = '#EBEFF5';

/**
 * This function takes an array of colors and returns an array of interpolated
 * colors based on the number of steps/len needed for use in UI elements such as charts.
 * Derived from https://github.com/gka/palettes (Unlicensed)
 */

export function colorPalette(
  /**
   * The main color code or array of codes
   */
  colors: string[],
  /**
   * The number of colors in the resulting array (default 10)
   */
  len: number = 10,
  /**
   * Forces color interpolation to be calculated separately for each half (default false)
   */
  diverging: boolean = false,
  /**
   * Uses a more static interpolation for non-continuous spectrums
   */
  categorical: boolean = false
) {
  let hexStart: string[] = colors.slice();
  let hexEnd: string[] = [];

  const even = len % 2 === 0;
  const numColorsLeft = diverging ? Math.ceil(len / 2) + (even ? 1 : 0) : len;
  const numColorsRight = diverging ? Math.ceil(len / 2) + (even ? 1 : 0) : 0;

  // If only a single color is provided prepend the mid-point color
  if (hexStart.length === 1) {
    hexStart.unshift(MID_COLOR_STOP);
  }

  // If diverging, split the start array and duplicate the mid color
  if (diverging) {
    // If there's no midpoint, create one
    if (hexStart.length < 3) {
      hexStart[2] = hexStart[1];
      hexStart[1] = MID_COLOR_STOP;
    }

    const numColorsHalf = Math.ceil(hexStart.length / 2);

    const colorsLeft = hexStart.filter(function(item, index) {
      if (index < numColorsHalf) {
        return true; // keep it
      }
    });
    const colorsRight = hexStart
      .reverse()
      .filter(function(item, index) {
        if (index < numColorsHalf) {
          return true; // keep it
        }
      })
      .reverse();

    hexStart = colorsLeft;
    hexEnd = colorsRight;
  }

  function createSteps(colors: string[], steps: number) {
    if (!colors.length) {
      return colors;
    }

    if (!categorical) {
      return chroma
        .bezier(colors)
        .scale()
        .correctLightness()
        .colors(steps);
    } else {
      return chroma.scale(colors).colors(steps);
    }
  }

  const stepsLeft = createSteps(hexStart, numColorsLeft);
  const stepsRight = createSteps(hexEnd, numColorsRight);

  return (even && diverging
    ? stepsLeft.slice(0, stepsLeft.length - 1)
    : stepsLeft
  ).concat(stepsRight.slice(1));
}
