/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiPopoverPosition } from './types';

interface EuiPopoverBoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface EuiPopoverAnchorRect extends EuiPopoverBoundingBox {
  right: number;
  bottom: number;
}

interface EuiPopoverDimensions {
  width: number;
  height: number;
}

interface EuiPopoverPositionedBox extends EuiPopoverBoundingBox {
  position: EuiPopoverPosition;
}

const getVisibleArea = (
  bounds: EuiPopoverBoundingBox,
  windowWidth: number,
  windowHeight: number
): number => {
  const { left, top, width, height } = bounds;
  // This is a common algorithm for finding the intersected area among two rectangles.
  const dx = Math.min(left + width, windowWidth) - Math.max(left, 0);
  const dy = Math.min(top + height, windowHeight) - Math.max(top, 0);
  return dx * dy;
};

type Positioner = (
  bounds: EuiPopoverAnchorRect,
  width: number,
  height: number,
  buffer: number
) => EuiPopoverBoundingBox;

const positionAtTop: Positioner = (anchorBounds, width, height, buffer) => {
  const widthDifference = width - anchorBounds.width;
  const left = anchorBounds.left - widthDifference * 0.5;
  const top = anchorBounds.top - height - buffer;
  return { left, top, width, height };
};

const positionAtRight: Positioner = (anchorBounds, width, height, buffer) => {
  const left = anchorBounds.right + buffer;
  const heightDifference = height - anchorBounds.height;
  const top = anchorBounds.top - heightDifference * 0.5;
  return { left, top, width, height };
};

const positionAtBottom: Positioner = (anchorBounds, width, height, buffer) => {
  const widthDifference = width - anchorBounds.width;
  const left = anchorBounds.left - widthDifference * 0.5;
  const top = anchorBounds.bottom + buffer;
  return { left, top, width, height };
};

const positionAtLeft: Positioner = (anchorBounds, width, height, buffer) => {
  const left = anchorBounds.left - width - buffer;
  const heightDifference = height - anchorBounds.height;
  const top = anchorBounds.top - heightDifference * 0.5;
  return { left, top, width, height };
};

const positionToPositionerMap: { [position: string]: Positioner } = {
  top: positionAtTop,
  right: positionAtRight,
  bottom: positionAtBottom,
  left: positionAtLeft,
};

/**
 * Determine the best position for a popover that avoids clipping by the window view port.
 *
 * @param {Object} anchorBounds - getBoundingClientRect() of the node the popover is tethered to (e.g. a button).
 * @param {Object} popoverBounds - getBoundingClientRect() of the popover node (e.g. the tooltip).
 * @param {string} requestedPosition - Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param {number} buffer - The space between the wrapper and the popover. Also the minimum space between the
 * popover and the window.
 * @param {Array} positions - List of acceptable positions. Defaults to ["top", "right", "bottom", "left"].
 *
 * @returns {Object} With properties position (one of ["top", "right", "bottom", "left"]), left, top, width, and height.
 */
export function calculatePopoverPosition(
  anchorBounds: EuiPopoverAnchorRect,
  popoverBounds: EuiPopoverDimensions,
  requestedPosition: EuiPopoverPosition,
  buffer: number = 16,
  positions: EuiPopoverPosition[] = ['top', 'right', 'bottom', 'left']
): EuiPopoverPositionedBox {
  if (typeof buffer !== 'number') {
    throw new Error(
      `calculatePopoverPosition received a buffer argument of ${buffer}' but expected a number`
    );
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const { width: popoverWidth, height: popoverHeight } = popoverBounds;

  const positionToBoundsMap: { [position: string]: EuiPopoverBoundingBox } = {};
  const positionToVisibleAreaMap: { [positon: string]: number } = {};

  positions.forEach((position) => {
    const bounds = positionToPositionerMap[position](
      anchorBounds,
      popoverWidth,
      popoverHeight,
      buffer
    );
    positionToBoundsMap[position] = bounds;

    // Calculate how much area of the popover is visible at each position.
    positionToVisibleAreaMap[position] = getVisibleArea(
      bounds,
      windowWidth,
      windowHeight
    );
  });

  // If the requested position clips the popover, find the position which clips the popover the least.
  // Default to use the requested position.
  const calculatedPopoverPosition = positions.reduce(
    (mostVisiblePosition, position) => {
      if (
        positionToVisibleAreaMap[position] >
        positionToVisibleAreaMap[mostVisiblePosition]
      ) {
        return position;
      }
      return mostVisiblePosition;
    },
    requestedPosition
  );

  return {
    position: calculatedPopoverPosition,
    ...positionToBoundsMap[calculatedPopoverPosition],
  };
}
