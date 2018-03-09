
/**
 * Determine the best position for a popup that avoids clipping by the window view port.
 *
 * @param {native DOM Element} wrapperRect - getBoundingClientRect() of wrapping node around the popover.
 * @param {native DOM Element} popupRect - getBoundingClientRect() of the popup node.
 * @param {string} requestedPosition - Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param {number} buffer - The space between the wrapper and the popup. Also the minimum space between the popup and the window.
 *
 * @returns {string} One of ["top", "right", "bottom", "left"] that ensures no window overflow.
 */
export function calculatePopoverPosition(wrapperRect, popupRect, requestedPosition, buffer = 16) {

  // determine popup overflow in each direction
  // negative values signal window overflow, large values signal lots of free space
  const popupOverflow = {
    top: wrapperRect.top - (popupRect.height + (2 * buffer)),
    right: window.innerWidth - wrapperRect.right - (popupRect.width + (2 * buffer)),
    left: wrapperRect.left - (popupRect.width + (2 * buffer)),
    bottom: window.innerHeight - wrapperRect.bottom - (popupRect.height + (2 * buffer)),
  };

  function hasCrossDimensionOverflow(key) {
    if (key === 'left' || key === 'right') {
      const domNodeCenterY = wrapperRect.top + (wrapperRect.height / 2);
      const tooltipTop = domNodeCenterY - ((popupRect.height / 2) + buffer);
      if (tooltipTop <= 0) {
        return true;
      }
      const tooltipBottom = domNodeCenterY + (popupRect.height / 2) + buffer;
      if (tooltipBottom >= window.innerHeight) {
        return true;
      }
    } else {
      const domNodeCenterX = wrapperRect.left + (wrapperRect.width / 2);
      const tooltipLeft = domNodeCenterX - ((popupRect.width / 2) + buffer);
      if (tooltipLeft <= 0) {
        return true;
      }
      const tooltipRight = domNodeCenterX + (popupRect.width / 2) + buffer;
      if (tooltipRight >= window.innerWidth) {
        return true;
      }
    }
    return false;
  }

  let calculatedPopoverPosition = requestedPosition;
  if (popupOverflow[requestedPosition] <= 0 || hasCrossDimensionOverflow(requestedPosition)) {
    // requested position overflows window bounds
    // select direction what has the most free space
    Object.keys(popupOverflow).forEach((key) => {
      if (popupOverflow[key] > popupOverflow[calculatedPopoverPosition] && !hasCrossDimensionOverflow(key)) {
        calculatedPopoverPosition = key;
      }
    });
  }

  return calculatedPopoverPosition;
}
