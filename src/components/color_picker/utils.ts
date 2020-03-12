import { MouseEvent as ReactMouseEvent, TouchEvent, useEffect } from 'react';
import chroma, { ColorSpaces } from 'chroma-js';

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

export const throttle = (fn: (...args: any[]) => void, wait = 50) => {
  let time = Date.now();
  return (...args: any[]) => {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
};

export function isMouseEvent<T = HTMLDivElement>(
  event: ReactMouseEvent<T> | TouchEvent<T>
): event is ReactMouseEvent<T> {
  return typeof event === 'object' && 'pageX' in event && 'pageY' in event;
}

export function useMouseMove<T = HTMLDivElement>(
  handleChange: (
    location: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => void,
  interactionConditional: any = true
): [
  (e: ReactMouseEvent<T>) => void,
  (e: ReactMouseEvent<T> | TouchEvent<T>, isFirstInteraction?: boolean) => void
] {
  useEffect(() => {
    return unbindEventListeners;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleInteraction = (
    e: ReactMouseEvent<T> | TouchEvent<T>,
    isFirstInteraction?: boolean
  ) => {
    if (e) {
      if (interactionConditional) {
        const x = isMouseEvent<T>(e) ? e.pageX : e.touches[0].pageX;
        const y = isMouseEvent<T>(e) ? e.pageY : e.touches[0].pageY;
        handleChange({ x, y }, isFirstInteraction);
      }
    }
  };
  const handleMouseMove = throttle((e: ReactMouseEvent) => {
    handleChange({ x: e.pageX, y: e.pageY }, false);
  });
  const handleMouseDown = (e: ReactMouseEvent<T>) => {
    handleInteraction(e, true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', unbindEventListeners);
  };
  const unbindEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', unbindEventListeners);
  };

  return [handleMouseDown, handleInteraction];
}

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
      .filter(n => n !== '')
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
