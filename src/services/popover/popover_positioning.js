import { findDOMNode } from 'react-dom';
import { capitalizeWord } from '../text';

const relatedDimension = {
  top: 'height',
  right: 'width',
  bottom: 'height',
  left: 'width'
};

const dimensionPositionAttribute = {
  height: 'top',
  width: 'left'
};

const positionComplements = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

// always resolving to top/left is taken advantage of by knowing they are the
// minimum edges of the bounding box
const positionSubstitues = {
  top: 'left',
  right: 'top',
  bottom: 'left',
  left: 'top'
};

/**
 * Calculates the absolute positioning (relative to document.body) to place a popover element
 *
 * @param anchor {HTMLElement|React.Component} Element to anchor the popover to
 * @param popover {HTMLElement|React.Component} Element containing the popover content
 * @param position {string} Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param [buffer=0] {number} Minimum distance between the popover and the bounding container
 * @param [offset=0] {number} Distance between the popover and the anchor
 * @param [container=document.body] {HTMLElement|React.Component} Element the popover must be constrained to fit within
 *
 * @returns {{top: number, left: number, position: string}|null} absolute page coordinates for the popover,
 * and the placements's relation to the anchor; if there's no room this returns null
 */
export function findPopoverPosition({ anchor, popover, position, buffer=0, offset=0, container = document.body }) {
  container = findDOMNode(container); // resolve any React abstractions

  const anchorBoundingBox = getElementBoundingBox(anchor);
  const popoverBoundingBox = getElementBoundingBox(popover);
  const containerBoundingBox = getElementBoundingBox(container);

  const windowBoundingBox = {
    top: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
    left: 0,
    height: window.innerHeight,
    width: window.innerWidth
  };

  let iterationPosition = position;

  // iterate over the four positions until there's room
  for (let iteration = 0; iteration <= 3; iteration++) {
    const availableWindowSpace = getAvailableSpace(anchorBoundingBox, windowBoundingBox, buffer, offset, iterationPosition);
    const availableContainerSpace = getAvailableSpace(anchorBoundingBox, containerBoundingBox, buffer, offset, iterationPosition);

    const screenCoordinates = getPopoverScreenCoordinates({
      position: iterationPosition,
      anchorBoundingBox,
      popoverBoundingBox,
      availableWindowSpace,
      availableContainerSpace,
      offset
    });

    if (screenCoordinates != null) {
      // this position works
      return {
        position: iterationPosition,
        relativePosition: screenCoordinates.relativePosition,
        top: screenCoordinates.top + window.scrollY,
        left: screenCoordinates.left + window.scrollX,
      };
    }

    if (iteration === 0 || iteration === 2) {
      // iteration 0 checks for the user-desired position
      // iteration 2 is first check along the non-desired axis
      // the position didn't work, flip to the complimentary position
      iterationPosition = positionComplements[iterationPosition];
    } else if (iteration === 1) {
      // iteration 1 is the complement of the requested position,
      // the desired axis doesn't have room, try the opposite one
      iterationPosition = positionSubstitues[iterationPosition];
    } else if (iteration === 3) {
      // there's no room anywhere so go with the desired position...
      iterationPosition = position;
    }
  }

  return null;
}

/**
 * Given a target position and the popover's surrounding context, returns either an
 * object with {top, left} screen coordinates or `null` if it's not possible to show
 * content in the target position
 * @param position {string} the target position, one of ["top", "right", "bottom", "left"]
 * @param anchorBoundingBox {Object} bounding box of the anchor element
 * @param popoverBoundingBox {Object} bounding box of the popover element
 * @param availableWindowSpace {Object} available between anchor and window elements
 * @param availableContainerSpace {Object} available space between anchor and container elements
 * @param [offset=0] {number} Distance between the popover and the anchor
 *
 * @returns {{top: number, left: number, relativePlacement: string}|null} object with top/left position
 * coordinates and the popover's relative position, if there is no room in this placement then null
 */
export function getPopoverScreenCoordinates({ position, anchorBoundingBox, popoverBoundingBox, availableWindowSpace, availableContainerSpace, offset=0 }) {
  // ** check if the popover content fits in this position of the anchor
  const primaryAxisDimension = relatedDimension[position]; // "top" -> "height"
  const popoverSizeOnPrimaryAxis = popoverBoundingBox[primaryAxisDimension];
  const fitsInWindow = availableWindowSpace[position] >= popoverSizeOnPrimaryAxis;
  const fitsInContainer = availableContainerSpace[position] >= popoverSizeOnPrimaryAxis;

  if (fitsInWindow && fitsInContainer) {
    // ** check if popover content has room on the complementary sides
    // e.g. if we're popping to top then make sure there's room on the left & right to display
    const crossAxisFirstSide = positionSubstitues[position]; // "top" -> "left"
    const crossAxisSecondSide = positionComplements[crossAxisFirstSide]; // "left" -> "right"
    const crossAxisDimension = relatedDimension[crossAxisFirstSide]; // "left" -> "width"

    const popoverSizeOnCrossAxis = popoverBoundingBox[crossAxisDimension];
    const anchorSizeOnCrossAxis = anchorBoundingBox[crossAxisDimension];

    const availableWindowSpaceOnCrossAxis = availableWindowSpace[crossAxisFirstSide] + availableWindowSpace[crossAxisSecondSide];
    const availableContainerSpaceOnCrossAxis = availableContainerSpace[crossAxisFirstSide] + availableContainerSpace[crossAxisSecondSide];
    const availableSpaceOnCrossAxis = Math.min(availableWindowSpaceOnCrossAxis, availableContainerSpaceOnCrossAxis) + anchorSizeOnCrossAxis;

    if (availableSpaceOnCrossAxis >= popoverSizeOnCrossAxis) {
      // there is room to display content in this position,
      // but it may require an offset along the cross axis
      const spaceAvailableOnFirstSide = Math.min(availableWindowSpace[crossAxisFirstSide], availableContainerSpace[crossAxisFirstSide]);
      const spaceAvailableOnSecondSide = Math.min(availableWindowSpace[crossAxisSecondSide], availableContainerSpace[crossAxisSecondSide]);
      const leastAvailableSpace = Math.min(spaceAvailableOnFirstSide, spaceAvailableOnSecondSide);
      const isShiftTowardFirstSide = spaceAvailableOnFirstSide > spaceAvailableOnSecondSide;
      const shiftDirection = isShiftTowardFirstSide ? -1 : 1;

      const contentOverflowSize = (popoverSizeOnCrossAxis - anchorSizeOnCrossAxis) / 2; // how much of the popover overflows past one side of the anchor
      const needsShift = contentOverflowSize > leastAvailableSpace;
      const amountOfShiftNeeded = needsShift ? contentOverflowSize - leastAvailableSpace : 0;
      const anchorHalfSize = anchorSizeOnCrossAxis / 2;
      const crossAxisPosition = (amountOfShiftNeeded * shiftDirection) + anchorHalfSize + anchorBoundingBox[crossAxisFirstSide] - popoverSizeOnCrossAxis / 2;

      const isOffsetDecreasing = position === 'top' || position === 'left';

      // start at the top or left edge of the anchor element
      const primaryAxisPositionName = dimensionPositionAttribute[primaryAxisDimension]; // "height" -> "top"
      const anchorEdgeOrigin = anchorBoundingBox[primaryAxisPositionName];

      const anchorSizeOnPrimaryAxis = anchorBoundingBox[primaryAxisDimension];
      const primaryAxisOffset = isOffsetDecreasing ? popoverSizeOnPrimaryAxis : anchorSizeOnPrimaryAxis;
      const contentOffset = (offset + primaryAxisOffset) * (isOffsetDecreasing ? -1 : 1);
      const primaryAxisPosition = anchorEdgeOrigin + contentOffset;

      // if the popover shifts too far its position relationship changes, e.g. "top" could become "topLeft"
      let popoverAlignment = 'center'; // default to the center
      if (needsShift && amountOfShiftNeeded > anchorHalfSize) {
        popoverAlignment = shiftDirection === -1 ? crossAxisFirstSide : crossAxisSecondSide;
      }

      return {
        relativePosition: `${position}${capitalizeWord(popoverAlignment)}`,
        [crossAxisFirstSide]: crossAxisPosition,
        [primaryAxisPositionName]: primaryAxisPosition
      };
    }
  }

  // position doesn't have room for content
  return null;
}

/**
 * Finds the client pixel coordinate of each edge for the element's bounding box,
 * and the bounding box's width & height
 *
 * @param {HTMLElement|React.Component} element
 * @returns {{top: number, right: number, bottom: number, left: number, height: number, width: number}}
 */
export function getElementBoundingBox(element) {
  element = findDOMNode(element); // resolve any React abstractions

  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    height: rect.height,
    width: rect.width
  };
}

/**
 * Calculates the available content space between anchor and container
 *
 * @param {Object} anchorBoundingBox Client bounding box of the anchor element
 * @param {Object} containerBoundingBox Client bounding box of the container element
 * @param {number} buffer Minimum distance between the popover and the bounding container
 * @param {number} offset Distance between the popover and the anchor
 * @param {string} offset Side the offset needs to be applied to, one of ["top", "right", "bottom", "left"]
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
export function getAvailableSpace(anchorBoundingBox, containerBoundingBox, buffer, offset, offsetSide) {
  return {
    top: anchorBoundingBox.top - containerBoundingBox.top - buffer - (offsetSide === 'top' ? offset : 0),
    right: containerBoundingBox.right - anchorBoundingBox.right - buffer - (offsetSide === 'right' ? offset : 0),
    bottom: containerBoundingBox.bottom - anchorBoundingBox.bottom - buffer - (offsetSide === 'bottom' ? offset : 0),
    left: anchorBoundingBox.left - containerBoundingBox.left - buffer - (offsetSide === 'left' ? offset : 0),
  };
}
