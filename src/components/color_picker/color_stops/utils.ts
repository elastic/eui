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

import { getEventPosition, getChromaColor } from '../utils';
import { DEFAULT_VISUALIZATION_COLOR } from '../../../services';
import { ColorStop } from './color_stop_thumb';
import { EUI_THUMB_SIZE } from '../../form/range/utils';

export const removeStop = (colorStops: ColorStop[], index: number) => {
  if (colorStops.length === 1) {
    return colorStops;
  }

  return [...colorStops.slice(0, index), ...colorStops.slice(index + 1)];
};

export const addDefinedStop = (
  colorStops: ColorStop[],
  stop: ColorStop['stop'],
  color: ColorStop['color'] = DEFAULT_VISUALIZATION_COLOR
) => {
  const newStop = {
    stop,
    color,
  };
  colorStops = [...colorStops, newStop];
  colorStops.sort((a, b) => {
    if (a.stop < b.stop) {
      return -1;
    }
    if (a.stop > b.stop) {
      return 1;
    }
    return 0;
  });
  return colorStops;
};

export const addStop = (
  colorStops: ColorStop[],
  color: ColorStop['color'] = DEFAULT_VISUALIZATION_COLOR,
  max: number
) => {
  const index = colorStops.length ? colorStops.length - 1 : 0;
  const stops = colorStops.map((el) => el.stop);
  const currentStop = stops[index] != null ? stops[index] : max;
  let delta = 1;
  if (index !== 0) {
    const prevStop = stops[index - 1];
    delta = currentStop - prevStop;
  }

  let stop = currentStop + delta;

  if (stop > max) {
    stop = max;
  }

  // We've reached the max, so start working backwards
  while (stops.indexOf(stop) > -1) {
    stop--;
  }

  const newStop = {
    stop,
    color,
  };
  return [
    ...colorStops.slice(0, index + 1),
    newStop,
    ...colorStops.slice(index + 1),
  ];
};

export const isColorInvalid = (color: string, showAlpha: boolean = false) => {
  return getChromaColor(color, showAlpha) == null || color === '';
};

export const isStopInvalid = (stop: ColorStop['stop']) => {
  return stop == null || isNaN(stop);
};

export const isInvalid = (
  colorStops: ColorStop[],
  showAlpha: boolean = false
) => {
  return colorStops.some((colorStop) => {
    return (
      isColorInvalid(colorStop.color, showAlpha) ||
      isStopInvalid(colorStop.stop)
    );
  });
};

export const calculateScale = (trackWidth: number) => {
  const thumbToTrackRatio = EUI_THUMB_SIZE / trackWidth;
  return (1 - thumbToTrackRatio) * 100;
};

export const getStopFromMouseLocation = (
  location: { x: number; y: number },
  ref: HTMLDivElement,
  min: number,
  max: number
) => {
  const box = getEventPosition(location, ref);
  return Math.round((box.left / box.width) * (max - min) + min);
};

export const getPositionFromStop = (
  stop: ColorStop['stop'],
  ref: HTMLDivElement,
  min: number,
  max: number
) => {
  // For wide implementations, integer percentages can be visually off.
  // Use 1 decimal place for more accuracy
  return parseFloat(
    (
      ((stop - min) / (max - min)) *
      calculateScale(ref && ref.clientWidth > 0 ? ref.clientWidth : 100)
    ).toFixed(1)
  );
};
