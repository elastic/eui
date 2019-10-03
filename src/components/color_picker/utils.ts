import { MouseEvent as ReactMouseEvent, TouchEvent, useEffect } from 'react';

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
  }, []);
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
