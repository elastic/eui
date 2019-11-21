import { getEventPosition } from '../utils';
import { isValidHex, DEFAULT_VISUALIZATION_COLOR } from '../../../services';
import { ColorStop } from './color_stop_thumb';

const EUI_THUMB_SIZE = 16; // Same as $euiRangeThumbHeight & $euiRangeThumbWidth

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
  return [...colorStops, newStop];
};

export const addStop = (
  colorStops: ColorStop[],
  color: ColorStop['color'] = DEFAULT_VISUALIZATION_COLOR,
  max: number
) => {
  const index = colorStops.length ? colorStops.length - 1 : 0;
  const stops = colorStops.map(el => el.stop);
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

export const isColorInvalid = (color: string) => {
  return !isValidHex(color) || color === '';
};

export const isStopInvalid = (stop: ColorStop['stop']) => {
  return stop == null || isNaN(stop);
};

export const isInvalid = (colorStops: ColorStop[]) => {
  return colorStops.some(colorStop => {
    return isColorInvalid(colorStop.color) || isStopInvalid(colorStop.stop);
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
      calculateScale(ref ? ref.clientWidth : 100)
    ).toFixed(1)
  );
};
