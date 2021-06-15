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

import chroma, { ColorSpaces } from 'chroma-js';
import { ColorStop } from './color_stops';

export const getEventPosition = (
  location: { x: number; y: number },
  container: HTMLElement
) => {
  const { x, y } = location;
  const { width, height, left, top } = container.getBoundingClientRect();
  let leftPos = x - (left + window.pageXOffset);
  let topPos = y - (top + window.pageYOffset);

  if (leftPos < 0) {
    leftPos = 0;
  } else if (leftPos > width) {
    leftPos = width;
  }

  if (topPos < 0) {
    topPos = 0;
  } else if (topPos > height) {
    topPos = height;
  }

  return { left: leftPos, top: topPos, width, height };
};

export const HEX_FALLBACK = '';
export const HSV_FALLBACK: ColorSpaces['hsv'] = [0, 0, 0];
export const RGB_FALLBACK: ColorSpaces['rgba'] = [NaN, NaN, NaN, 1];
export const RGB_JOIN = ', ';

// Given a string, this attempts to return a format that can be consumed by chroma-js
export const parseColor = (input?: string | null) => {
  let parsed: string | number[];
  if (!input) return null;
  if (input.indexOf(',') > 0) {
    if (!/^[\s,.0-9]*$/.test(input)) {
      return null;
    }
    const rgb = input
      .trim()
      .split(',')
      .filter((n) => n !== '')
      .map(Number);
    parsed = rgb.length > 2 && rgb.length < 5 ? rgb : HEX_FALLBACK;
  } else {
    parsed = input;
  }
  return parsed;
};

// Returns whether the given input will return a valid chroma-js object when designated as one of
// the acceptable formats: hex, rgb, rgba
export const chromaValid = (color: string | number[]) => {
  let parsed: string | number[] | null = color;
  if (typeof color === 'string') {
    parsed = parseColor(color);
  }

  if (!parsed) return false;

  if (typeof parsed === 'object') {
    return chroma.valid(parsed, 'rgb') || chroma.valid(parsed, 'rgba');
  }
  return chroma.valid(color, 'hex');
};

// Given an input and opacity configuration, this returns a valid chroma-js object
export const getChromaColor = (input?: string | null, allowOpacity = false) => {
  const parsed = parseColor(input);
  if (parsed && chromaValid(parsed)) {
    // type guard for the function overload
    const chromaColor =
      typeof parsed === 'object' ? chroma(parsed) : chroma(parsed);
    if (!allowOpacity && chromaColor.alpha() < 1) {
      return null;
    }
    return chromaColor;
  }
  return null;
};

// Given an array of objects with key value pairs stop/color returns a css linear-gradient
// Or given an array of hex colors returns a css linear-gradient
export const getLinearGradient = (palette: string[] | ColorStop[]) => {
  const lastColorStopArrayPosition = palette.length - 1;

  let linearGradient;

  const paletteHasStops = palette.some((item: string | ColorStop) => {
    return typeof item === 'object';
  });

  if (paletteHasStops) {
    const paletteColorStop = palette as ColorStop[];

    linearGradient = `linear-gradient(to right, ${paletteColorStop[0].color} 0%,`;

    const lastColorStopDecimal =
      100 / paletteColorStop[lastColorStopArrayPosition].stop;

    for (let i = 1; i < lastColorStopArrayPosition; i++) {
      linearGradient = `${linearGradient} ${
        paletteColorStop[i].color
      }\ ${Math.floor(paletteColorStop[i].stop * lastColorStopDecimal)}%,`;
    }

    const linearGradientStyle = `${linearGradient} ${paletteColorStop[lastColorStopArrayPosition].color} 100%)`;

    return linearGradientStyle;
  } else {
    linearGradient = `linear-gradient(to right, ${palette[0]} 0%,`;

    for (let i = 1; i < lastColorStopArrayPosition; i++) {
      linearGradient = `${linearGradient} ${palette[i]}\ ${Math.floor(
        (100 * i) / lastColorStopArrayPosition
      )}%,`;
    }

    const linearGradientStyle = `${linearGradient} ${palette[lastColorStopArrayPosition]} 100%)`;

    return linearGradientStyle;
  }
};

// Given an array of objects with key value pairs stop/color or an array of hex colors
// returns an array of objects with key value pairs color/width
export const getFixedLinearGradient = (palette: string[] | ColorStop[]) => {
  const paletteHasStops = palette.some((item: string | ColorStop) => {
    return typeof item === 'object';
  });

  if (paletteHasStops) {
    const paletteColorStop = palette as ColorStop[];

    const fixedLinearGradientWithStops = paletteColorStop.map(
      (colorStop: ColorStop, index: number) => {
        const lastColorStopArrayPosition = palette.length - 1;

        const lastColorStopDecimal =
          100 / paletteColorStop[lastColorStopArrayPosition].stop;

        const isFirstColorStop = index === 0;

        let previousColorStopWidth;

        if (isFirstColorStop) {
          previousColorStopWidth = 0;
        } else {
          previousColorStopWidth = Math.floor(
            paletteColorStop[index - 1].stop * lastColorStopDecimal
          );
        }

        const currentColorStopWidth = Math.floor(
          colorStop.stop * lastColorStopDecimal
        );

        const colorStopWidth = currentColorStopWidth - previousColorStopWidth;

        return {
          color: colorStop.color,
          width: `${colorStopWidth}%`,
        };
      }
    );

    return fixedLinearGradientWithStops;
  } else {
    const paletteColorStop = palette as string[];
    const paletteWidth = 100 / palette.length;

    const fixedLinearGradientWidthAuto = paletteColorStop.map(
      (hexCode: string) => ({
        color: hexCode,
        width: `${paletteWidth}%`,
      })
    );

    return fixedLinearGradientWidthAuto;
  }
};
