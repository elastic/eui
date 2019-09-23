import { isValidHex } from '../../../services';
import { ColorStop } from './color_stop_thumb';

export const DEFAULT_COLOR = '#FF0000';

export const removeStop = (colorStops: ColorStop[], index: number) => {
  if (colorStops.length === 1) {
    return colorStops;
  }

  return [...colorStops.slice(0, index), ...colorStops.slice(index + 1)];
};

export const addStop = (colorStops: ColorStop[], index: number) => {
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
    color: DEFAULT_COLOR,
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
  return colorStops.some((colorStop, index) => {
    // expect stops to be in ascending order
    let isDescending = false;
    if (index !== 0) {
      const prevStop = colorStops[index - 1].stop;
      isDescending = prevStop >= colorStop.stop;
    }

    return (
      isColorInvalid(colorStop.color) ||
      isStopInvalid(colorStop.stop) ||
      isDescending
    );
  });
};

export const calculateScale = (trackWidth: number) => {
  const EUI_THUMB_SIZE = 16;
  const thumbToTrackRatio = EUI_THUMB_SIZE / trackWidth;
  return (1 - thumbToTrackRatio) * 100;
};
