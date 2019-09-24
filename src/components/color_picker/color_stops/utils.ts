import { getEventPosition } from '../utils';
import { isValidHex } from '../../../services';
import { ColorStop } from './color_stop_thumb';

export const DEFAULT_COLOR = '#FF0000';

export const removeStop = (colorStops: ColorStop[], index: number) => {
  if (colorStops.length === 1) {
    return colorStops;
  }

  return [...colorStops.slice(0, index), ...colorStops.slice(index + 1)];
};

export const addDefinedStop = (
  colorStops: ColorStop[],
  stop: ColorStop['stop'],
  color: ColorStop['color'] = DEFAULT_COLOR
) => {
  const newStop = {
    stop,
    color,
  };
  return [...colorStops, newStop];
};

export const addStop = (
  colorStops: ColorStop[],
  index: number,
  color: ColorStop['color'] = DEFAULT_COLOR
) => {
  const currentStop = colorStops[index].stop;
  let delta = 1;
  if (index === colorStops.length - 1) {
    // Adding stop to end of list.
    if (index !== 0) {
      const prevStop = colorStops[index - 1].stop;
      delta = currentStop - prevStop;
    }
  } else {
    // Adding stop in middle of list.
    const nextStop = colorStops[index + 1].stop;
    delta = (nextStop - currentStop) / 2;
  }

  const newStop = {
    stop: currentStop + delta,
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
  const EUI_THUMB_SIZE = 16;
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
  return Math.round(
    ((stop - min) / (max - min)) * calculateScale(ref ? ref.clientWidth : 100)
  );
};
