const GROUP_NUMERIC = /^([\d.]+)(s|ms)/;

function getMilliseconds(value: string, unit: string) {
  // Given the regex match and capture groups, we can assume `unit` to be either 's' or 'ms'
  const multiplier = unit === 's' ? 1000 : 1;
  return parseFloat(value) * multiplier;
}
// Find CSS `transition-duration` and `transition-delay` intervals
// and return the value of each computed property in 'ms'
export const getTransitionTimings = (element: Element) => {
  const computedStyle = window.getComputedStyle(element);

  const computedDuration = computedStyle.getPropertyValue(
    'transition-duration'
  );
  const durationMatchArray = computedDuration.match(GROUP_NUMERIC);
  const durationMatch = durationMatchArray
    ? getMilliseconds(durationMatchArray[1], durationMatchArray[2])
    : 0;

  const computedDelay = computedStyle.getPropertyValue('transition-delay');
  const delayMatchArray = computedDelay.match(GROUP_NUMERIC);
  const delayMatch = delayMatchArray
    ? getMilliseconds(delayMatchArray[1], delayMatchArray[2])
    : 0;

  return { durationMatch, delayMatch };
};

function isElementNode(element: Node): element is Element {
  return element.nodeType === document.ELEMENT_NODE;
}
// Uses `getTransitionTimings` to find the total transition time for
// all elements targeted by a MutationObserver callback
export const getWaitDuration = (records: MutationRecord[]) => {
  return records.reduce((waitDuration, record) => {
    // only check for CSS transition values for ELEMENT nodes
    if (isElementNode(record.target)) {
      const { durationMatch, delayMatch } = getTransitionTimings(record.target);
      waitDuration = Math.max(waitDuration, durationMatch + delayMatch);
    }

    return waitDuration;
  }, 0);
};

// Uses `requestAnimationFrame` to perform a given callback after a specified waiting period
export const performOnFrame = (waitDuration: number, toPerform: () => void) => {
  if (waitDuration > 0) {
    const startTime = Date.now();
    const endTime = startTime + waitDuration;

    const onFrame = () => {
      toPerform();

      if (endTime > Date.now()) {
        requestAnimationFrame(onFrame);
      }
    };

    requestAnimationFrame(onFrame);
  }
};

// Convenience method for combining the result of 'getWaitDuration' directly with 'performOnFrame'
export const getDurationAndPerformOnFrame = (
  records: MutationRecord[],
  toPerform: () => void
) => {
  performOnFrame(getWaitDuration(records), toPerform);
};
