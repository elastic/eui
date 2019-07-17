const GROUP_NUMERIC = /^([\d.]+)/;

// Find CSS `transition-duration` and `transition-dealy` intervals
// and return the value of each computed property
export const getTransitionTimings = (element: Element) => {
  const computedStyle = window.getComputedStyle(element);
  console.log(computedStyle);

  const computedDuration = computedStyle.getPropertyValue(
    'transition-duration'
  );
  const durationMatchArray = computedDuration.match(GROUP_NUMERIC);
  const durationMatch = durationMatchArray
    ? parseFloat(durationMatchArray[1]) * 1000
    : 0;

  const computedDelay = computedStyle.getPropertyValue('transition-delay');
  const delayMatchArray = computedDelay.match(GROUP_NUMERIC);
  const delayMatch = delayMatchArray
    ? parseFloat(delayMatchArray[1]) * 1000
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

// Uses `getTransitionTimings` to find the total transition time for
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
