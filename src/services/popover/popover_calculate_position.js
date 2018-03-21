/**
 * Determine the best position for a popover that avoids clipping by the window view port.
 *
 * @param {native DOM Element} anchorBounds - getBoundingClientRect() of the node the popover is tethered to (e.g. a button).
 * @param {native DOM Element} popoverBounds - getBoundingClientRect() of the popover node (e.g. the tooltip).
 * @param {string} requestedPosition - Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param {number} buffer - The space between the wrapper and the popover. Also the minimum space between the popover and the window.
 *
 * @returns {string} One of ["top", "right", "bottom", "left"] that ensures the least amount of window overflow.
 */

const getVisibleArea = (bounds, windowWidth, windowHeight) => {
  const { left, top, width, height } = bounds;
  // This is a common algorithm for finding the intersected area among two rectangles.
  const dx = Math.min(left + width, windowWidth) - Math.max(left, 0);
  const dy = Math.min(top + height, windowHeight) - Math.max(top, 0);
  return dx * dy;
};

const positionAtTop = (anchorBounds, width, height, buffer) => {
  const widthDifference = width - anchorBounds.width;
  const left = (anchorBounds.left - widthDifference) * 0.5;
  const top = anchorBounds.top - height - buffer;
  return { left, top, width, height };
};

const positionAtRight = (anchorBounds, width, height, buffer) => {
  const left = anchorBounds.right + buffer;
  const heightDifference = (height - anchorBounds.height) * 0.5;
  const top = anchorBounds.top - heightDifference;
  return { left, top, width, height };
};

const positionAtBottom = (anchorBounds, width, height, buffer) => {
  const widthDifference = width - anchorBounds.width;
  const left = (anchorBounds.left - widthDifference) * 0.5;
  const top = anchorBounds.bottom + buffer;
  return { left, top, width, height };
};

const positionAtLeft = (anchorBounds, width, height, buffer) => {
  const left = anchorBounds.left - width - buffer;
  const heightDifference = (height - anchorBounds.height) * 0.5;
  const top = anchorBounds.top - heightDifference;
  return { left, top, width, height };
};

export function calculatePopoverPosition(anchorBounds, popoverBounds, requestedPosition, buffer = 16) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const { width: popoverWidth, height: popoverHeight } = popoverBounds;

  // Calculate how much area of the popover is visible at each position.
  const positionToVisibleAreaMap = {
    top: getVisibleArea(positionAtTop(anchorBounds, popoverWidth, popoverHeight, buffer), windowWidth, windowHeight),
    right: getVisibleArea(positionAtRight(anchorBounds, popoverWidth, popoverHeight, buffer), windowWidth, windowHeight),
    bottom: getVisibleArea(positionAtBottom(anchorBounds, popoverWidth, popoverHeight, buffer), windowWidth, windowHeight),
    left: getVisibleArea(positionAtLeft(anchorBounds, popoverWidth, popoverHeight, buffer), windowWidth, windowHeight),
  };

  // Default to use the requested position.
  let calculatedPopoverPosition = requestedPosition;

  // If the requested position clips the popover, find the position which clips the popover the least.
  Object.keys(positionToVisibleAreaMap).forEach((position) => {
    if (positionToVisibleAreaMap[position] > positionToVisibleAreaMap[calculatedPopoverPosition]) {
      calculatedPopoverPosition = position;
    }
  });

  return calculatedPopoverPosition;
}
