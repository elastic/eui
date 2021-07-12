/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const EUI_THUMB_SIZE = 16;

export const calculateThumbPosition = (
  value: number,
  min: number,
  max: number,
  width: number,
  thumbSize: number = EUI_THUMB_SIZE
) => {
  // Calculate the left position based on value
  const decimal = (value - min) / (max - min);
  // Must be between 0-100%
  let valuePosition = decimal <= 1 ? decimal : 1;
  valuePosition = valuePosition >= 0 ? valuePosition : 0;

  const trackWidth = width ?? 0;
  const thumbToTrackRatio = thumbSize / trackWidth;
  const trackPositionScale = (1 - thumbToTrackRatio) * 100;

  return valuePosition * trackPositionScale;
};
